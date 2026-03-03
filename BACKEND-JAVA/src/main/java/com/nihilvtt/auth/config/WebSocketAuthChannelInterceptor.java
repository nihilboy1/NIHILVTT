package com.nihilvtt.auth.config;

import com.nihilvtt.auth.auth.service.TokenService;
import com.nihilvtt.auth.game.service.GameAccessService;
import io.jsonwebtoken.Claims;
import java.security.Principal;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
public class WebSocketAuthChannelInterceptor implements ChannelInterceptor {
  private static final Pattern GAME_TOPIC_PATTERN = Pattern.compile("^/topic/games\\.(\\d+)\\.events$");

  private final TokenService tokenService;
  private final GameAccessService gameAccessService;

  public WebSocketAuthChannelInterceptor(
      TokenService tokenService,
      GameAccessService gameAccessService
  ) {
    this.tokenService = tokenService;
    this.gameAccessService = gameAccessService;
  }

  @Override
  public Message<?> preSend(Message<?> message, MessageChannel channel) {
    StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
    if (accessor == null || accessor.getCommand() == null) {
      return message;
    }

    StompCommand command = accessor.getCommand();
    if (StompCommand.CONNECT.equals(command)) {
      authenticate(accessor);
      return message;
    }

    if (StompCommand.SUBSCRIBE.equals(command)) {
      authorizeSubscription(accessor);
      return message;
    }

    return message;
  }

  private void authenticate(StompHeaderAccessor accessor) {
    String headerValue = accessor.getFirstNativeHeader("Authorization");
    if (headerValue == null || !headerValue.startsWith("Bearer ")) {
      throw new IllegalArgumentException("Missing Authorization header.");
    }

    String token = headerValue.substring(7);
    Claims claims = tokenService.parseAccessToken(token);
    Long userId = Long.parseLong(claims.getSubject());

    accessor.setUser(new StompUserPrincipal(userId));
  }

  private void authorizeSubscription(StompHeaderAccessor accessor) {
    Principal principal = accessor.getUser();
    if (!(principal instanceof StompUserPrincipal stompUserPrincipal)) {
      throw new IllegalArgumentException("Unauthenticated websocket subscription.");
    }

    String destination = accessor.getDestination();
    if (destination == null) {
      throw new IllegalArgumentException("Missing destination.");
    }

    Matcher matcher = GAME_TOPIC_PATTERN.matcher(destination);
    if (!matcher.matches()) {
      throw new IllegalArgumentException("Invalid destination.");
    }

    Long gameId = Long.parseLong(matcher.group(1));
    boolean hasAccess = gameAccessService.hasAccess(gameId, stompUserPrincipal.userId());
    if (!hasAccess) {
      throw new IllegalArgumentException("No access to game topic.");
    }
  }

  private record StompUserPrincipal(Long userId) implements Principal {
    @Override
    public String getName() {
      return String.valueOf(userId);
    }
  }
}
