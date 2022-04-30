package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.forum.AddThreadRequestBody;
import pl.edu.agh.awiteks_backend.models.ForumPost;
import pl.edu.agh.awiteks_backend.models.ForumThread;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.Repository;

import java.util.List;
import java.util.Optional;

@Service
public class ForumService extends ModelService<ForumThread>{
    private final Repository<User> userRepository;


    @Autowired
    public ForumService(Repository<ForumThread> forumRepository, Repository<User> userRepository) {
        super(forumRepository);
        this.userRepository = userRepository;
    }

    public ForumThread addThread(AddThreadRequestBody addThreadRequestBody, int creatorId){
        User creator = userRepository.get(creatorId).orElseThrow();
        var forumThread = new ForumThread(
                (int)(Math.random() * 99999 + 1790),
                addThreadRequestBody.name(),
                userRepository.get(creatorId).orElseThrow()
        );
        ForumPost post = new ForumPost(
                (int)(Math.random() * 99999 + 1790),
                creator,
                addThreadRequestBody.content()
        );
        forumThread.addPost(post);
        return forumThread;
    }

    public List<ForumThread> getAllThreads(){
        return this.getAll();
    }
}