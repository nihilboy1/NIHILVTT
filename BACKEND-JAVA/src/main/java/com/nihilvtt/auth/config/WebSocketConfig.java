package com.nihilvtt.auth.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
  private final String frontendOrigin;
  private final WebSocketAuthChannelInterceptor webSocketAuthChannelInterceptor;

  public WebSocketConfig(
      @Value("${app.security.cors.allowed-origin}") String frontendOrigin,
      WebSocketAuthChannelInterceptor webSocketAuthChannelInterceptor
  ) {
    this.frontendOrigin = frontendOrigin;
    this.webSocketAuthChannelInterceptor = webSocketAuthChannelInterceptor;
  }

  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config.enableSimpleBroker("/topic");
    config.setApplicationDestinationPrefixes("/app");
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/ws").setAllowedOrigins(frontendOrigin);
  }

  @Override
  public void configureClientInboundChannel(ChannelRegistration registration) {
    registration.interceptors(webSocketAuthChannelInterceptor);
  }
}
