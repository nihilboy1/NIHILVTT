package com.nihilvtt.auth.media.service;

import com.nihilvtt.auth.common.exception.FieldValidationException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class GameCoverStorageService {
  private static final long MAX_COVER_BYTES = 10_000_000;
  private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
      "image/jpeg",
      "image/png",
      "image/webp"
  );

  private final Path storageDir;
  private final String publicBaseUrl;

  public GameCoverStorageService(
      @Value("${app.game-cover.storage-dir:./data/game-covers}") String storageDir,
      @Value("${app.game-cover.public-base-url:http://localhost:8080/media/game-covers}") String publicBaseUrl
  ) {
    this.storageDir = Paths.get(storageDir).toAbsolutePath().normalize();
    this.publicBaseUrl = stripTrailingSlash(publicBaseUrl);

    try {
      Files.createDirectories(this.storageDir);
    } catch (IOException e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Falha ao inicializar storage de capas.");
    }
  }

  public String storeCover(MultipartFile file) {
    validateCover(file);

    String extension = extensionFromContentType(file.getContentType());
    String fileName = UUID.randomUUID() + extension;
    Path destination = storageDir.resolve(fileName).normalize();

    if (!destination.startsWith(storageDir)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Caminho de capa invalido.");
    }

    try {
      Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
      return publicBaseUrl + "/" + fileName;
    } catch (IOException e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Falha ao salvar capa.");
    }
  }

  public Resource loadCoverResource(String fileName) {
    Path filePath = storageDir.resolve(fileName).normalize();
    if (!filePath.startsWith(storageDir)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Arquivo invalido.");
    }

    try {
      Resource resource = new UrlResource(filePath.toUri());
      if (!resource.exists() || !resource.isReadable()) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Capa nao encontrada.");
      }
      return resource;
    } catch (IOException e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Falha ao carregar capa.");
    }
  }

  public String detectContentType(String fileName) {
    try {
      String detected = Files.probeContentType(storageDir.resolve(fileName).normalize());
      return detected != null ? detected : "application/octet-stream";
    } catch (IOException e) {
      return "application/octet-stream";
    }
  }

  public void deleteIfManaged(String coverUrl) {
    if (coverUrl == null || coverUrl.isBlank() || !isManagedUrl(coverUrl)) {
      return;
    }

    String fileName = coverUrl.substring((publicBaseUrl + "/").length());
    Path filePath = storageDir.resolve(fileName).normalize();
    if (!filePath.startsWith(storageDir)) {
      return;
    }

    try {
      Files.deleteIfExists(filePath);
    } catch (IOException ignored) {
      // Nao bloqueia o fluxo principal se a limpeza do arquivo falhar.
    }
  }

  private void validateCover(MultipartFile file) {
    if (file == null || file.isEmpty()) {
      throw new FieldValidationException(
          "Dados de entrada invalidos.",
          Map.of("coverFile", "Selecione uma imagem para upload.")
      );
    }

    if (file.getSize() > MAX_COVER_BYTES) {
      throw new FieldValidationException(
          "Dados de entrada invalidos.",
          Map.of("coverFile", "A imagem deve ter no maximo 10MB.")
      );
    }

    String contentType = file.getContentType();
    if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType)) {
      throw new FieldValidationException(
          "Dados de entrada invalidos.",
          Map.of("coverFile", "Formato de imagem nao suportado.")
      );
    }
  }

  private String extensionFromContentType(String contentType) {
    return switch (contentType) {
      case "image/jpeg" -> ".jpg";
      case "image/png" -> ".png";
      case "image/webp" -> ".webp";
      default -> ".bin";
    };
  }

  private boolean isManagedUrl(String coverUrl) {
    return coverUrl.startsWith(publicBaseUrl + "/");
  }

  private String stripTrailingSlash(String value) {
    return value.endsWith("/") ? value.substring(0, value.length() - 1) : value;
  }
}
