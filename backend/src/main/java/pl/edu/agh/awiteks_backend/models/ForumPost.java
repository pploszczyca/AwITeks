package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;

@JsonIgnoreProperties({"user", "thread"})
public class ForumPost extends AbstractModel<ForumPost> {
    @Schema(required = true)
    private String content;
    @Schema(required = true)
    private User author;
    @Schema(required = true)
    private ForumThread thread;

    public ForumPost(int id, User author, ForumThread thread, String content) {
        super(id, "");
        this.author = author;
        this.thread = thread;
        this.content = content;
    }

    public ForumPost() {
    }

    @Override
    public ForumPost copy() {
        return new ForumPost(this.id, this.author, this.thread, this.content);
    }

    public User getAuthor() {
        return author;
    }

    public ForumThread getThread(){return thread;}

    public String getContent(){
        return content;
    }

    public void setContent(String newContent){
        this.content = newContent;
    }
}
