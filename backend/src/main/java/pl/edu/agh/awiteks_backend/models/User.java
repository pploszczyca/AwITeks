package pl.edu.agh.awiteks_backend.models;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.context.annotation.Lazy;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class User extends AbstractModel<User> {
    @Schema(required = true)
    private List<Plant> userPlants;

    @Schema(required = false)
    private List<ForumThread> followedThreads;

    public User(int id, String name,   @Lazy List<Plant> userPlants) {
        super(id, name);
        this.userPlants = userPlants;
    }

    public User(int id, String name) {
        this(id, name, new ArrayList<>());
    }

    public User() {

    }

    public void addPlant(Plant plant) {
        userPlants.add(plant);
    }

    public void removePlant(Plant plant) {
        userPlants.remove(plant);
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<ForumThread> getFollowedThreads() {
        return followedThreads;
    }

    public void setFollowedThreads(List<ForumThread> followedThreads) {
        this.followedThreads = followedThreads;
    }

    public void addFollowedThread(ForumThread thread){
        this.followedThreads.add(thread);
    }

    @Override
    public User copy() {
        List<Plant> list = this.userPlants.stream().map(AbstractModel::copy).toList();
        return new User(
                id,
                name,
                list);
    }

    public List<Plant> getUserPlants() {
        return userPlants;
    }

    public void setUserPlants(List<Plant> userPlants) {
        this.userPlants = userPlants;
    }

    public boolean isFollowing(ForumThread thread) {
        return followedThreads.contains(thread);
    }
}
