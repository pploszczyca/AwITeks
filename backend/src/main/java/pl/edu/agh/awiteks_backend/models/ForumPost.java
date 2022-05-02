package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;

@JsonIgnoreProperties({"user", "thread"})
public class ForumPost {
    @Schema(required = true)
    private Integer id;
    @Schema(required = true)
    private String content;
    @Schema(required = true)
    private User author;
    @Schema(required = true)
    private ForumThread thread;
    @Schema(required = true)
    private String date;

    public ForumPost(int id, User author, ForumThread thread, String content) {
        this.id = id;
        this.author = author;
        this.thread = thread;
        this.content = content;
    }

    public ForumPost() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User newAuthor) {
        this.author = newAuthor;
    }

    public ForumThread getThread() {
        return thread;
    }

    public void setThread(ForumThread thread) {
        this.thread = thread;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String newContent) {
        this.content = newContent;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
