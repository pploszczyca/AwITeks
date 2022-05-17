package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.forum.body_models.AddPostRequestBody;
import pl.edu.agh.awiteks_backend.api.forum.body_models.AddThreadRequestBody;
import pl.edu.agh.awiteks_backend.api.forum.body_models.ForumThreadSummaryRequestBody;
import pl.edu.agh.awiteks_backend.api.plants.body_models.AddPlantRequestBody;
import pl.edu.agh.awiteks_backend.mappers.ForumMapper;
import pl.edu.agh.awiteks_backend.models.ForumPost;
import pl.edu.agh.awiteks_backend.models.ForumThread;
import pl.edu.agh.awiteks_backend.models.Plant;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.ForumRepository;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;
import pl.edu.agh.awiteks_backend.utilities.ListUtilities;

import javax.swing.text.html.Option;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ForumService{
    private final UserRepository userRepository;
    private final ForumRepository forumRepository;
    private final ListUtilities listUtilities;

    @Autowired
    public ForumService(ForumRepository forumRepository, UserRepository userRepository, ListUtilities listUtilities) {
        this.listUtilities = listUtilities;
        this.userRepository = userRepository;
        this.forumRepository = forumRepository;
    }

    public ForumThread addThread(AddThreadRequestBody addThreadRequestBody, int userId) {
        User creator = userRepository.findById(userId).orElseThrow();
        ForumThread forumThread = new ForumThread(
                addThreadRequestBody.name(),
                creator,
                addThreadRequestBody.isFavourite()
        );
        ForumPost post = new ForumPost(
                creator,
                forumThread,
                addThreadRequestBody.content(),
                false
        );
        userRepository
                .findById(userId)
                .ifPresent(presentUser -> {
                    presentUser.addThread(forumThread);
                    forumThread.setCreator(creator);
                });
        forumThread.addForumPost(post);
        forumRepository.save(forumThread);
        return forumThread;
    }

    public List<ForumThread> getAllThreads(int userId) {
        return this.listUtilities.iterableToList(forumRepository.findAllByUserId(userId));
    }

    public List<ForumThreadSummaryRequestBody> getAllThreads(String favOnly, String ownOnly, int userId) {
        // todo may not be working :>
        final boolean favThreadsOnly = favOnly.equals("true");
        final boolean ownThreadsOnly = ownOnly.equals("true");
        var requester = userRepository.findById(userId);
        return this.listUtilities.iterableToList(forumRepository.findAllByUserId(userId))
                .stream()
                .filter(thread -> favThreadsOnly && requester.isPresent() && requester.get().isFollowing(thread))
                .filter(thread -> ownThreadsOnly && thread.getCreator().getId() == userId)
                .map(ForumMapper::mapForumThreadToForumThreadSummary).collect(Collectors.toList());
    }

    public Optional<ForumThread> get(int id, int userId){
        return this.forumRepository.findByIdAndUserId(id, userId);
    }

    public void remove(int id, int userId) {
        if (forumRepository.existsByIdAndUserId(id, userId)) {
            removeForumThreadFromUserList(id);
            this.forumRepository.deleteById(id);
        }
    }

    private void removeForumThreadFromUserList(int id) {
        this.forumRepository
                .findById(id)
                .ifPresent(presentThread ->
                        presentThread
                                .getCreator()
                                .removeThread(presentThread)
                );
    }

    public void changeFavourite(int plantId, int userId) {
        this.forumRepository
                .findByIdAndUserId(plantId, userId)
                .ifPresent(
                        forumThread -> {
                            forumThread.setFavourite(!forumThread.isFavourite());
                            this.forumRepository.save(forumThread);
                        }
                );
    }

    public List<ForumThreadSummaryRequestBody> getThreadsWithMatchingName(int userId, String searchKey) {
        return this.getAllThreads(userId).stream().filter(thread -> thread.getTitle().contains(searchKey)).map(ForumMapper::mapForumThreadToForumThreadSummary).collect(Collectors.toList());
    }

    public ForumPost addPostToThread(Integer threadId, AddPostRequestBody postRequestBody, Integer authorId) { // todo post repository
        ForumThread thread = this.forumRepository.findById(threadId).orElseThrow();
        User creator = userRepository.findById(authorId).orElseThrow();
        ForumPost post = new ForumPost(creator, thread, postRequestBody.content(), false);
        thread.addForumPost(post);
        return post;
    }

    public List<ForumPost> getPostsFromThread(Integer threadId) {
        ForumThread thread = this.forumRepository.findById(threadId).orElseThrow();
        return thread.getForumPosts();
    }
}