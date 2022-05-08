package pl.edu.agh.awiteks_backend.models;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.context.annotation.Lazy;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "author", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Schema(required = true)
    private List<ForumPost> forumPostList;

    @OneToMany(mappedBy = "creator", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Schema(required = true)
    private List<ForumThread> forumThreadList;

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
        this(username, email, password, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
    }

    public User() {

    }

    public void addPlant(Plant plant) {
        userPlants.add(plant);
    }

    public void removePlant(Plant plant) {
        userPlants.remove(plant);
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

    public void setForumThreadList(List<ForumThread> forumThreadList) {
        this.forumThreadList = forumThreadList;
    }
}
