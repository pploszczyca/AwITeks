package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.forum.AddPostRequestBody;
import pl.edu.agh.awiteks_backend.api.forum.AddThreadRequestBody;
import pl.edu.agh.awiteks_backend.api.forum.ForumThreadSummary;
import pl.edu.agh.awiteks_backend.mappers.ForumMapper;
import pl.edu.agh.awiteks_backend.models.ForumPost;
import pl.edu.agh.awiteks_backend.models.ForumThread;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ForumService extends ModelService<ForumThread> {
    private final Repository<User> userRepository;

    @Autowired
    public ForumService(Repository<ForumThread> forumRepository, Repository<User> userRepository) {
        super(forumRepository);
        this.userRepository = userRepository;
    }

    public ForumThread addThread(AddThreadRequestBody addThreadRequestBody, int creatorId) {
        User creator = userRepository.get(creatorId).orElseThrow();
        int threadId = (int) (Math.random() * 99999 + 1790);
        var forumThread = new ForumThread(
                threadId,
                addThreadRequestBody.name(),
                userRepository.get(creatorId).orElseThrow()
        );
        ForumPost post = new ForumPost(
                (int) (Math.random() * 99999 + 1790),
                creator,
                forumThread,
                addThreadRequestBody.content()
        );
        forumThread.addForumPost(post);
        this.add(forumThread);
        return forumThread;
    }

    public List<ForumThreadSummary> getAllThreads() {
        return this.getAll().stream().map(ForumMapper::mapForumThreadToForumThreadSummary).collect(Collectors.toList());
    }

    public List<ForumThreadSummary> getAllThreads(String favOnly, String ownOnly, int userId) {
        final boolean favThreadsOnly = favOnly.equals("true");
        final boolean ownThreadsOnly = ownOnly.equals("true");
        var requester = userRepository.get(userId);
        return this.getAll()
                .stream()
                .filter(thread -> favThreadsOnly && requester.isPresent() && requester.get().isFollowing(thread))
                .filter(thread -> ownThreadsOnly && thread.getCreator().getId() == userId)
                .map(ForumMapper::mapForumThreadToForumThreadSummary).collect(Collectors.toList());
    }

    public List<ForumThreadSummary> getThreadsWithMatchingName(String searchKey) {
        return this.getAll().stream().filter(thread -> thread.getName().contains(searchKey)).map(ForumMapper::mapForumThreadToForumThreadSummary).collect(Collectors.toList());
    }

    public ForumPost addPostToThread(Integer threadId, AddPostRequestBody postRequestBody, Integer authorId) {
        ForumThread thread = this.get(threadId).orElseThrow();
        User creator = userRepository.get(authorId).orElseThrow();
        int postId = (int) (Math.random() * 99999 + 1790);
        ForumPost post = new ForumPost(postId, creator, thread, postRequestBody.content());
        thread.addForumPost(post);
        return post;
    }

    public List<ForumPost> getPostsFromThread(Integer threadId) {
        ForumThread thread = this.get(threadId).orElseThrow();
        return thread.getForumPosts();
    }
}