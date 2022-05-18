package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "forum_thread")
@JsonIgnoreProperties({"user"})
public class ForumThread {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(required = true)
    private Integer id;

    @Schema(required = true)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @Schema(required = true)
    private User user;

    @OneToMany(mappedBy = "thread", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Schema(required = true)
    private List<ForumPost> forumPosts;

    @ManyToMany(mappedBy = "followedThreads", cascade = CascadeType.ALL)
    @Schema(required = true)
    private List<User> followingUsers;

    @Schema(required = false)
    private final LocalDateTime creationTime = LocalDateTime.now();

    public ForumThread(String name, User user) {
        this.title = name;
        this.user = user;
        this.forumPosts = new ArrayList<>();
    }

    public ForumThread(String title, User user, List<ForumPost> forumPosts) {
        this.title = title;
        this.user = user;
        this.forumPosts = forumPosts;
    }

    public ForumThread() {
    }

    public Integer getId() {
        return id;
    }

    public ForumThread copy() {
        return null;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public LocalDateTime getCreationTime() {
        return creationTime;
    }

    public Integer getPostsCount() {
        return forumPosts.size();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}
