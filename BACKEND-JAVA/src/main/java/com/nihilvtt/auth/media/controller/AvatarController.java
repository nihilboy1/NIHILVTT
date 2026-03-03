package com.nihilvtt.auth.media.controller;

import com.nihilvtt.auth.media.service.AvatarStorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/media/avatars")
public class AvatarController {
  private final AvatarStorageService avatarStorageService;

  public AvatarController(AvatarStorageService avatarStorageService) {
    this.avatarStorageService = avatarStorageService;
  }

  @GetMapping("/{fileName:.+}")
  public ResponseEntity<Resource> getAvatar(@PathVariable String fileName) {
    Resource resource = avatarStorageService.loadAvatarResource(fileName);
    String contentType = avatarStorageService.detectContentType(fileName);

    return ResponseEntity.ok()
        .contentType(MediaType.parseMediaType(contentType))
        .body(resource);
  }
}
