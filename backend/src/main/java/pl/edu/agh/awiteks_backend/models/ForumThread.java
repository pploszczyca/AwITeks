package pl.edu.agh.awiteks_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "forum_thread")
@JsonIgnoreProperties({"user"})
@Getter
@Setter
@NoArgsConstructor
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
    private LocalDateTime creationTime = LocalDateTime.now();

    public ForumThread(String name, User user) {
        this.title = name;
        this.user = user;
        this.forumPosts = new ArrayList<>();
    }

    public void addForumPost(ForumPost post) {
        this.forumPosts.add(post);
    }

    public Integer getPostsCount() {
        return forumPosts.size();
    }
}
