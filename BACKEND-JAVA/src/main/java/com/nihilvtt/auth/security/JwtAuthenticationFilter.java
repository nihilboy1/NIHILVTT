package com.nihilvtt.auth.security;

import com.nihilvtt.auth.auth.service.TokenService;
import com.nihilvtt.auth.user.entity.UserEntity;
import com.nihilvtt.auth.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
  private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
  private final TokenService tokenService;
  private final UserRepository userRepository;

  public JwtAuthenticationFilter(TokenService tokenService, UserRepository userRepository) {
    this.tokenService = tokenService;
    this.userRepository = userRepository;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain
  ) throws ServletException, IOException {
    String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      if (isCreateGameRequest(request)) {
        logger.warn(
            "event=jwt_missing_bearer method={} uri={} origin={} remoteIp={}",
            request.getMethod(),
            request.getRequestURI(),
            request.getHeader("Origin"),
            request.getRemoteAddr()
        );
      }
      filterChain.doFilter(request, response);
      return;
    }

    String token = authHeader.substring(7);
    try {
      Claims claims = tokenService.parseAccessToken(token);
      Long userId = Long.parseLong(claims.getSubject());
      String role = String.valueOf(claims.get("role"));
      UserEntity user = userRepository.findById(userId).orElse(null);

      if (isCreateGameRequest(request)) {
        logger.info(
            "event=jwt_token_parsed method={} uri={} userId={} role={} userExists={} origin={} remoteIp={}",
            request.getMethod(),
            request.getRequestURI(),
            userId,
            role,
            user != null,
            request.getHeader("Origin"),
            request.getRemoteAddr()
        );
      }

      if (user != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(
                userId,
                null,
                List.of(new SimpleGrantedAuthority("ROLE_" + role))
            );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        if (isCreateGameRequest(request)) {
          logger.info(
              "event=jwt_authentication_set method={} uri={} principal={} authorities={}",
              request.getMethod(),
              request.getRequestURI(),
              authentication.getPrincipal(),
              authentication.getAuthorities()
          );
        }
      }
    } catch (Exception ex) {
      if (isCreateGameRequest(request)) {
        logger.warn(
            "event=jwt_token_rejected method={} uri={} origin={} remoteIp={} reason={}",
            request.getMethod(),
            request.getRequestURI(),
            request.getHeader("Origin"),
            request.getRemoteAddr(),
            ex.getClass().getSimpleName()
        );
      }
      SecurityContextHolder.clearContext();
    }

    filterChain.doFilter(request, response);
  }

  private boolean isCreateGameRequest(HttpServletRequest request) {
    return HttpMethod.POST.matches(request.getMethod()) && "/games".equals(request.getRequestURI());
  }
}
