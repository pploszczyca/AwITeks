package pl.edu.agh.awiteks_backend.models;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(required = true)
    private Integer id;

    @Schema(required = true)
    private String username;

    @Schema(required = true)
    private String email;

    @Schema(hidden = true)
    private String password;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Schema(required = true)
    private List<Plant> userPlants;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Schema(required = true)
    private List<ForumPost> forumPostList;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Schema(required = true)
    private List<ForumThread> forumThreadList;

    @ManyToMany
    @JoinTable(
            name = "follow_threads",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "forum_thread_id")
    )
    @Schema(required = true)
    private List<ForumThread> followedThreads;

    public void addPlant(Plant plant) {
        userPlants.add(plant);
    }

    public void addThread(ForumThread thread) {
        this.forumThreadList.add(thread);
    }

    public void removePlant(Plant plant) {
        userPlants.remove(plant);
    }

    public void removeThread(ForumThread forumThread) {
        forumThreadList.remove(forumThread);
    }

    public boolean isFollowing(ForumThread thread) {
        return followedThreads.contains(thread);
    }
}
