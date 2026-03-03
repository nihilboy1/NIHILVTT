package com.nihilvtt.auth.media.controller;

import com.nihilvtt.auth.media.service.GameCoverStorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/media/game-covers")
public class GameCoverController {
  private final GameCoverStorageService gameCoverStorageService;

  public GameCoverController(GameCoverStorageService gameCoverStorageService) {
    this.gameCoverStorageService = gameCoverStorageService;
  }

  @GetMapping("/{fileName:.+}")
  public ResponseEntity<Resource> getCover(@PathVariable String fileName) {
    Resource resource = gameCoverStorageService.loadCoverResource(fileName);
    String contentType = gameCoverStorageService.detectContentType(fileName);

    return ResponseEntity.ok()
        .contentType(MediaType.parseMediaType(contentType))
        .body(resource);
  }
}
