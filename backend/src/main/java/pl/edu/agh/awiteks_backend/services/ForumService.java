package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.forum.AddPostRequestBody;
import pl.edu.agh.awiteks_backend.api.forum.AddThreadRequestBody;
import pl.edu.agh.awiteks_backend.models.ForumPost;
import pl.edu.agh.awiteks_backend.models.ForumThread;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.Repository;

import java.util.List;

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
        int threadId =  (int)(Math.random() * 99999 + 1790);
        var forumThread = new ForumThread(
                threadId,
                addThreadRequestBody.name(),
                userRepository.get(creatorId).orElseThrow()
        );
        ForumPost post = new ForumPost(
                (int)(Math.random() * 99999 + 1790),
                creator,
                forumThread,
                addThreadRequestBody.content()
        );
        forumThread.addForumPost(post);
        return forumThread;
    }

    public List<ForumThread> getAllThreads(){
        return this.getAll();
    }

    public ForumPost addPostToThread(Integer threadId, AddPostRequestBody postRequestBody, Integer authorId){
        ForumThread thread = this.get(threadId).orElseThrow();
        User creator = userRepository.get(authorId).orElseThrow();
        int postId =  (int)(Math.random() * 99999 + 1790);
        ForumPost post = new ForumPost(postId, creator, thread, postRequestBody.content());
        thread.addForumPost(post);
        return post;
    }

    public List<ForumPost> getPostsFromThread(Integer threadId){
        ForumThread thread = this.get(threadId).orElseThrow();
        return thread.getForumPosts();
    }
}