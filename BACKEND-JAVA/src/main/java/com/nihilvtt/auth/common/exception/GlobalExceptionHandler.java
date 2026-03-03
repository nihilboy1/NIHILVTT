package com.nihilvtt.auth.common.exception;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
    Map<String, String> fieldErrors = new LinkedHashMap<>();
    for (FieldError error : ex.getBindingResult().getFieldErrors()) {
      fieldErrors.put(error.getField(), error.getDefaultMessage());
    }

    Map<String, Object> body = new LinkedHashMap<>();
    body.put("timestamp", Instant.now().toString());
    body.put("status", HttpStatus.BAD_REQUEST.value());
    body.put("code", "VALIDATION_ERROR");
    body.put("error", HttpStatus.BAD_REQUEST.getReasonPhrase());
    body.put("message", "Dados de entrada inválidos.");
    body.put("fieldErrors", fieldErrors);
    return ResponseEntity.badRequest().body(body);
  }

  @ExceptionHandler(ResponseStatusException.class)
  public ResponseEntity<Map<String, Object>> handleResponseStatus(ResponseStatusException ex) {
    HttpStatus status = HttpStatus.valueOf(ex.getStatusCode().value());
    Map<String, Object> body = new LinkedHashMap<>();
    body.put("timestamp", Instant.now().toString());
    body.put("status", status.value());
    body.put("code", mapErrorCode(status));
    body.put("error", status.getReasonPhrase());
    body.put("message", ex.getReason());
    body.put("fieldErrors", Map.of());
    return ResponseEntity.status(status).body(body);
  }

  @ExceptionHandler(FieldValidationException.class)
  public ResponseEntity<Map<String, Object>> handleFieldValidation(FieldValidationException ex) {
    Map<String, Object> body = new LinkedHashMap<>();
    body.put("timestamp", Instant.now().toString());
    body.put("status", HttpStatus.BAD_REQUEST.value());
    body.put("code", "VALIDATION_ERROR");
    body.put("error", HttpStatus.BAD_REQUEST.getReasonPhrase());
    body.put("message", ex.getMessage());
    body.put("fieldErrors", ex.getFieldErrors());
    return ResponseEntity.badRequest().body(body);
  }

  @ExceptionHandler(RateLimitException.class)
  public ResponseEntity<Map<String, Object>> handleRateLimit(RateLimitException ex) {
    Map<String, Object> body = new LinkedHashMap<>();
    body.put("timestamp", Instant.now().toString());
    body.put("status", HttpStatus.TOO_MANY_REQUESTS.value());
    body.put("code", "TOO_MANY_REQUESTS");
    body.put("error", HttpStatus.TOO_MANY_REQUESTS.getReasonPhrase());
    body.put("message", ex.getMessage());
    body.put("retryAfterSeconds", ex.getRetryAfterSeconds());
    body.put("fieldErrors", Map.of());
    return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
        .header("Retry-After", Long.toString(ex.getRetryAfterSeconds()))
        .body(body);
  }

  private String mapErrorCode(HttpStatus status) {
    return switch (status) {
      case BAD_REQUEST -> "VALIDATION_ERROR";
      case UNAUTHORIZED -> "UNAUTHORIZED";
      case FORBIDDEN -> "FORBIDDEN";
      case CONFLICT -> "CONFLICT";
      case TOO_MANY_REQUESTS -> "TOO_MANY_REQUESTS";
      default -> "UNKNOWN_ERROR";
    };
  }
}

