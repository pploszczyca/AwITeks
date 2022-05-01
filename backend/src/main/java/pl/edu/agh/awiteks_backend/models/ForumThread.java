package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@JsonIgnoreProperties({"user"})
public class ForumThread {
    @Schema(required = true)
    private Integer id;
    @Schema(required = true)
    private String title;
    @Schema(required = true)
    private User creator;
    @Schema(required = true)
    private List<ForumPost> forumPosts;

    public ForumThread(Integer id, String name, User user) {
        this.id = id;
        this.creator = user;
        this.forumPosts = new ArrayList<>();
    }

    public ForumThread(Integer id, String title, User user, List<ForumPost> forumPosts) {
        this.id = id;
        this.title = title;
        this.creator = user;
        this.forumPosts = forumPosts;
    }

    public ForumThread() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User user) {
        this.creator = user;
    }

    public void setForumPosts(List<ForumPost> posts) {
        this.forumPosts = posts;
    }

    public List<ForumPost> getForumPosts() {
        return this.forumPosts;
    }

    public void addForumPost(ForumPost post) {
        this.forumPosts.add(post);
    }
}
