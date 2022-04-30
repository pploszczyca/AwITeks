package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@JsonIgnoreProperties({"user"})
public class ForumThread extends AbstractModel<ForumThread>{
    @Schema(required = true)
    private User creator;

    @Schema(required = true)
    private List<ForumPost> forumPosts;

    public ForumThread(Integer id, String name, User user){
        super(id, name);
        this.creator = user;
        this.forumPosts = new ArrayList<>();
    }

    public ForumThread(Integer id, String name, User user, List<ForumPost> forumPosts){
        super(id, name);
        this.creator = user;
        this.forumPosts = forumPosts;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User user) {
        this.creator = user;
    }

    public void addPost(ForumPost post){
        this.forumPosts.add(post);
    }

    public List<ForumPost> getForumPosts(){
        return this.forumPosts;
    }

    @Override
    public ForumThread copy() {
        return new ForumThread(
                this.id,
                this.name,
                this.creator,
                this.forumPosts
        );
    }
}
