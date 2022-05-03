package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties({"creator"})
public class ForumThread extends AbstractModel<ForumThread>{
    @Schema(required = true)
    private User creator;
    @Schema(required = true)
    private List<ForumPost> forumPosts;

    @Schema(required = false)
    private final LocalDateTime creationTime = LocalDateTime.now();

    public ForumThread(Integer id, String name, User user) {
        super(id, name);
        this.creator = user;
        this.forumPosts = new ArrayList<>();
    }

    public ForumThread(Integer id, String title, User user, List<ForumPost> forumPosts) {
        super(id, title);
        this.creator = user;
        this.forumPosts = forumPosts;
    }

    public ForumThread() {
    }

    public int getId() {
        return id;
    }

    @Override
    public ForumThread copy() {
        return null;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public LocalDateTime getCreationTime() {
        return creationTime;
    }

    public Integer getPostsCount(){
        return forumPosts.size();
    }
}
