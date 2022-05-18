package pl.edu.agh.awiteks_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.forum.body_models.AddPostRequestBody;
import pl.edu.agh.awiteks_backend.api.forum.body_models.AddThreadRequestBody;
import pl.edu.agh.awiteks_backend.api.forum.body_models.ForumThreadSummaryResponseBody;
import pl.edu.agh.awiteks_backend.mappers.ForumMapper;
import pl.edu.agh.awiteks_backend.models.ForumPost;
import pl.edu.agh.awiteks_backend.models.ForumThread;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.ForumRepository;
import pl.edu.agh.awiteks_backend.repositories.PostRepository;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;
import pl.edu.agh.awiteks_backend.utilities.ListUtilities;
import pl.edu.agh.awiteks_backend.utilities.StreamUtilities;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ForumService {
    private final UserRepository userRepository;
    private final ForumRepository forumRepository;

    private final PostRepository postRepository;

    private final ListUtilities listUtilities;
    private final StreamUtilities streamUtilities;

    @Autowired
    public ForumService(ForumRepository forumRepository, UserRepository userRepository, PostRepository postRepository, ListUtilities listUtilities, StreamUtilities streamUtilities) {
        this.postRepository = postRepository;
        this.listUtilities = listUtilities;
        this.userRepository = userRepository;
        this.forumRepository = forumRepository;
        this.streamUtilities = streamUtilities;
    }

    public ForumThread addThread(AddThreadRequestBody addThreadRequestBody, int userId) {
        User creator = userRepository.findById(userId).orElseThrow();
        ForumThread forumThread = new ForumThread(
                addThreadRequestBody.name(),
                creator
        );
        ForumPost post = new ForumPost(
                creator,
                forumThread,
                addThreadRequestBody.content()
        );
        userRepository
                .findById(userId)
                .ifPresent(presentUser -> {
                    presentUser.addThread(forumThread);
                    forumThread.setUser(creator);
                });
        postRepository.save(post);
        forumRepository.save(forumThread);
        return forumThread;
    }

    public List<ForumThreadSummaryResponseBody> getAllThreads(int userId) {
        return this.streamUtilities.asStream(forumRepository.findAll()).map(ForumMapper::mapForumThreadToForumThreadSummary).collect(Collectors.toList());
    }

    public List<ForumThreadSummaryResponseBody> getAllThreads(String favOnly, String ownOnly, int userId) {
        // todo may not be working :>
        final boolean favThreadsOnly = favOnly.equals("true");
        final boolean ownThreadsOnly = ownOnly.equals("true");
        var requester = userRepository.findById(userId);
        return this.listUtilities.iterableToList(forumRepository.findAll())
                .stream()
                .filter(thread -> favThreadsOnly && requester.isPresent() && requester.get().isFollowing(thread))
                .filter(thread -> ownThreadsOnly && thread.getUser().getId() == userId)
                .map(ForumMapper::mapForumThreadToForumThreadSummary).collect(Collectors.toList());
    }

    public Optional<ForumThread> get(int id, int userId) {
        return this.forumRepository.findById(id);
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
                                .getUser()
                                .removeThread(presentThread)
                );
    }

//    public void changeFavourite(int plantId, int userId) {
//        this.forumRepository
//                .findByIdAndUserId(plantId, userId)
//                .ifPresent(
//                        forumThread -> {
//                            forumThread.setFavourite(!forumThread.isFavourite());
//                            this.forumRepository.save(forumThread);
//                        }
//                );
//    }

    public List<ForumThreadSummaryResponseBody> getThreadsWithMatchingName(int userId, String searchKey) {
        //TODO: Does not work
        return this.getAllThreads(userId).stream().filter(thread -> thread.title().contains(searchKey)).collect(Collectors.toList());
    }

    public ForumPost addPostToThread(Integer threadId, AddPostRequestBody postRequestBody, Integer authorId) {
        ForumThread thread = this.forumRepository.findById(threadId).orElseThrow();
        User creator = userRepository.findById(authorId).orElseThrow();
        ForumPost post = new ForumPost(creator, thread, postRequestBody.content());
        thread.addForumPost(post);  // todo may be source of a problem
        creator.getForumPostList().add(post);//Maybe?
        this.postRepository.save(post);
        return post;
    }

    public List<ForumPost> getPostsFromThread(Integer threadId) {
        ForumThread thread = this.forumRepository.findById(threadId).orElseThrow();
        return thread.getForumPosts();  // todo ???
    }
}