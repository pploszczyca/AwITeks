package pl.edu.agh.awiteks_backend.utilities;

import pl.edu.agh.awiteks_backend.api.users.body_models.UserForumThreadsSummary;
import pl.edu.agh.awiteks_backend.models.ForumPost;
import pl.edu.agh.awiteks_backend.models.User;
import java.util.Comparator;
import java.util.List;

public class ForumUtilities {
    private static final int LIMIT = 5;

    public List<UserForumThreadsSummary> getNewestForumPostsFromFollowedThreads(User user) {
        return user.getFollowedThreads().stream().limit(LIMIT).map(forumThread -> {
            forumThread.getForumPosts().sort(Comparator.comparing(ForumPost::getDate));
            final var forumPost = forumThread.getForumPosts().stream().findFirst().orElseThrow();
            return new UserForumThreadsSummary(forumThread.getId(), forumThread.getTitle(),
                    forumPost.getContent(),
                   forumPost.getDate().toString());
        }).toList();
    }
}
