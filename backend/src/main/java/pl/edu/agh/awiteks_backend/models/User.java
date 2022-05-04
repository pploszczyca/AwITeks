package pl.edu.agh.awiteks_backend.models;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.context.annotation.Lazy;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
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
            String name,
            @Lazy List<Plant> userPlants,
            @Lazy List<ForumPost> forumPostList,
            @Lazy List<ForumThread> forumThreadList) {
        this.name = name;
        this.userPlants = userPlants;
        this.forumPostList = forumPostList;
        this.forumThreadList = forumThreadList;
    }

    public User(String name) {
        this(name, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
