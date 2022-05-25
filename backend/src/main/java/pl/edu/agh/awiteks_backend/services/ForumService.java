package pl.edu.agh.awiteks_backend.services;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.awiteks_backend.api.forum.body_models.AddPostRequestBody;
import pl.edu.agh.awiteks_backend.api.forum.body_models.AddThreadRequestBody;
import pl.edu.agh.awiteks_backend.api.forum.body_models.ForumPostUserIncluded;
import pl.edu.agh.awiteks_backend.api.forum.body_models.ForumThreadSummaryResponseBody;
import pl.edu.agh.awiteks_backend.mappers.ForumMapper;
import pl.edu.agh.awiteks_backend.models.ForumPost;
import pl.edu.agh.awiteks_backend.models.ForumThread;
import pl.edu.agh.awiteks_backend.models.User;
import pl.edu.agh.awiteks_backend.repositories.ForumRepository;
import pl.edu.agh.awiteks_backend.repositories.PostRepository;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;
import pl.edu.agh.awiteks_backend.utilities.StreamUtilities;

@Service
public class ForumService {
    private final UserRepository userRepository;

    private final ForumRepository forumRepository;

    private final PostRepository postRepository;

    private final StreamUtilities streamUtilities;

    @Autowired
    public ForumService(ForumRepository forumRepository,
                        UserRepository userRepository,
                        PostRepository postRepository,
                        StreamUtilities streamUtilities) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.forumRepository = forumRepository;
        this.streamUtilities = streamUtilities;
    }

    public ForumThread addThread(AddThreadRequestBody addThreadRequestBody,
                                 int userId) {
        final User creator = userRepository.findById(userId).orElseThrow();
        final ForumThread forumThread = new ForumThread(
                addThreadRequestBody.name(),
                creator
        );
        final ForumPost post = new ForumPost(
                creator,
                forumThread,
                addThreadRequestBody.content()
        );
        creator.addThread(forumThread);
        forumThread.addForumPost(post);
        creator.getForumPostList().add(post);
        forumRepository.save(forumThread);
        postRepository.save(post);
        return forumThread;
    }

    public List<ForumThreadSummaryResponseBody> getAllThreads() {
        return this.streamUtilities.asStream(forumRepository.findAll())
                .map(ForumMapper::mapForumThreadToForumThreadSummary).toList();
    }

    public Optional<ForumThread> get(int id) {
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

    public List<ForumThreadSummaryResponseBody> getThreadsWithMatchingName(
            String searchKey) {
        return this.getAllThreads().stream()
                .filter(thread -> thread.title().toLowerCase(Locale.ROOT)
                        .contains(searchKey.toLowerCase(Locale.ROOT))).toList();
    }

    public ForumPost addPostToThread(Integer threadId,
                                     AddPostRequestBody postRequestBody,
                                     Integer authorId) {
        final ForumThread thread =
                this.forumRepository.findById(threadId).orElseThrow();
        final User creator = userRepository.findById(authorId).orElseThrow();
        final ForumPost post =
                new ForumPost(creator, thread, postRequestBody.content());
        thread.addForumPost(post);
        creator.getForumPostList().add(post);
        this.postRepository.save(post);
        return post;
    }

    public List<ForumPostUserIncluded> getPostsUserIncludedFromThread(
            int threadId) {
        return getPostsFromThread(threadId).stream()
                .map(ForumMapper::mapForumPostToForumPostUserIncluded).collect(
                        Collectors.toList());
    }

    private List<ForumPost> getPostsFromThread(Integer threadId) {
        final ForumThread thread =
                this.forumRepository.findById(threadId).orElseThrow();
        return thread.getForumPosts();
    }

    public ForumPost editPost(Integer threadId, Integer postId,
                              AddPostRequestBody postRequestBody,
                              Integer userId) {
        final ForumThread thread =
                this.forumRepository.findById(threadId).orElseThrow();
        final User creator = userRepository.findById(userId).orElseThrow();
        final ForumPost post =
                this.postRepository.findById(postId).orElseThrow();
        if (!(post.getUser() == creator)) {
            throw new IllegalCallerException();
        }
        creator.getForumPostList().remove(post);
        post.setContent(postRequestBody.content());
        thread.addForumPost(post);
        creator.getForumPostList().add(post);
        this.postRepository.save(post);
        return post;
    }
}
