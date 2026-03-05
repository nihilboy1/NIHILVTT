package com.nihilvtt.auth.config;

import com.nihilvtt.auth.security.JwtAuthenticationFilter;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
  private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);
  private final JwtAuthenticationFilter jwtAuthenticationFilter;
  private final String frontendOrigin;

  public SecurityConfig(
      JwtAuthenticationFilter jwtAuthenticationFilter,
      @Value("${app.security.cors.allowed-origin}") String frontendOrigin
  ) {
    this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    this.frontendOrigin = frontendOrigin;
  }

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -> csrf.disable())
        .cors(Customizer.withDefaults())
        .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .exceptionHandling(handling -> handling
            .authenticationEntryPoint((request, response, ex) -> {
              if (isCreateGameRequest(request.getMethod(), request.getRequestURI())) {
                logger.warn(
                    "event=security_auth_entrypoint method={} uri={} origin={} authHeaderPresent={} remoteIp={}",
                    request.getMethod(),
                    request.getRequestURI(),
                    request.getHeader("Origin"),
                    request.getHeader("Authorization") != null,
                    request.getRemoteAddr()
                );
              }
              response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            })
            .accessDeniedHandler((request, response, ex) -> {
              Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
              if (isCreateGameRequest(request.getMethod(), request.getRequestURI())) {
                logger.warn(
                    "event=security_access_denied method={} uri={} origin={} principal={} authenticated={} authorities={} remoteIp={}",
                    request.getMethod(),
                    request.getRequestURI(),
                    request.getHeader("Origin"),
                    authentication != null ? authentication.getPrincipal() : "anonymous",
                    authentication != null && authentication.isAuthenticated(),
                    authentication != null ? authentication.getAuthorities() : List.of(),
                    request.getRemoteAddr()
                );
              }
              response.sendError(HttpServletResponse.SC_FORBIDDEN);
            })
        )
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.POST, "/auth/register", "/auth/login", "/auth/refresh").permitAll()
            .requestMatchers(HttpMethod.GET, "/media/avatars/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/media/game-covers/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/ws/**").permitAll()
            .requestMatchers("/actuator/**").permitAll()
            .anyRequest().authenticated()
        )
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of(frontendOrigin));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Reauth-Token"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  private boolean isCreateGameRequest(String method, String uri) {
    return HttpMethod.POST.matches(method) && "/games".equals(uri);
  }
}
