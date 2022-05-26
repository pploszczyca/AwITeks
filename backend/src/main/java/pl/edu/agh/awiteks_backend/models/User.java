package pl.edu.agh.awiteks_backend.models;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.LinkedList;
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
import org.springframework.context.annotation.Lazy;

@Entity
@Table(name = "user",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
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

    //TODO: Test this
    @ManyToMany
    @JoinTable(
            name="follow_threads",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="forum_thread_id")
    )
    @Schema(required = true)
    private List<ForumThread> followedThreads;

    public User(
            String username,
            String email,
            String password,
            @Lazy List<Plant> userPlants,
            @Lazy List<ForumPost> forumPostList,
            @Lazy List<ForumThread> forumThreadList) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.userPlants = userPlants;
        this.forumPostList = forumPostList;
        this.forumThreadList = forumThreadList;
    }

    public User(String username, String email, String password) {
        this(username, email, password, new LinkedList<>(), new LinkedList<>(),
                new LinkedList<>());
    }

    public User() {

    }

    public void addPlant(Plant plant) {
        userPlants.add(plant);
    }

    public void addThread(ForumThread thread){
        this.forumThreadList.add(thread);
    }

    public void removePlant(Plant plant) {
        userPlants.remove(plant);
    }

    public void removeThread(ForumThread forumThread){
        forumThreadList.remove(forumThread);
    }

    public List<Plant> getUserPlants() {
        return userPlants;
    }

    public void setUserPlants(List<Plant> userPlants) {
        this.userPlants = userPlants;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<ForumPost> getForumPostList() {
        return forumPostList;
    }

    public void setForumPostList(List<ForumPost> forumPostList) {
        this.forumPostList = forumPostList;
    }

    public List<ForumThread> getForumThreadList() {
        return forumThreadList;
    }

    public List<ForumThread> getFollowedThreads() {
        return followedThreads;
    }

    public void setFollowedThreads(List<ForumThread> followedThreads) {
        this.followedThreads = followedThreads;
    }

    public void setForumThreadList(List<ForumThread> forumThreadList) {
        this.forumThreadList = forumThreadList;
    }

    public boolean isFollowing(ForumThread thread) {
        return followedThreads.contains(thread);
    }
}
