package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;

import javax.persistence.*;

@Entity
@Table(name = "forum_post")
@JsonIgnoreProperties({"author", "thread"})
public class ForumPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(required = true)
    private Integer id;

    @Schema(required = true)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @Schema(required = true)
    private User author;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "forum_thread_id", nullable = false)
    @Schema(required = true)
    private ForumThread thread;

    @Schema(required = true)
    private String date;

    @Schema(required = true)
    private boolean favourite;

    public ForumPost(User author, ForumThread thread, String content, boolean favourite) {
        this.author = author;
        this.thread = thread;
        this.content = content;
        this.favourite = favourite;
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
