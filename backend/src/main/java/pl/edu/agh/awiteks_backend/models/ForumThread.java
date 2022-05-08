package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;

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
    private User creator;

    @OneToMany(mappedBy = "thread", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
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
