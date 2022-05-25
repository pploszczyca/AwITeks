package pl.edu.agh.awiteks_backend.api.forum.body_models;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

public record ForumPostUserIncluded (
    @Schema(required = true) Integer id,
    @Schema(required = true) String content,
    @Schema(required = true) String userName,
    @Schema(required = true) LocalDateTime creationDate
){}
