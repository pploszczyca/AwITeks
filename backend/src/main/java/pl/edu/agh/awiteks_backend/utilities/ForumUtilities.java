package pl.edu.agh.awiteks_backend.utilities;

import org.apache.commons.lang3.tuple.Pair;
import pl.edu.agh.awiteks_backend.models.ForumPost;
import pl.edu.agh.awiteks_backend.models.User;
import java.util.Comparator;
import java.util.List;

public class ForumUtilities {
    private static final int LIMIT = 5;

    public List<Pair<String, ForumPost>> getNewestForumPostsFromFollowedThreads(User user) {
        return user.getFollowedThreads().stream().limit(LIMIT).map(forumThread -> {
            forumThread.getForumPosts().sort(Comparator.comparing(ForumPost::getDate));
            return Pair.of(forumThread.getTitle(), forumThread.getForumPosts().stream().findFirst().orElseThrow());
        }).toList();
    }
}
