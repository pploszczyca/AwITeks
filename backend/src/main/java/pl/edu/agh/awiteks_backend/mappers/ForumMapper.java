package pl.edu.agh.awiteks_backend.mappers;

import pl.edu.agh.awiteks_backend.api.forum.ForumThreadSummary;
import pl.edu.agh.awiteks_backend.models.ForumThread;

public class ForumMapper {
    public static ForumThreadSummary mapForumThreadToForumThreadSummary(ForumThread forumThread){
        if(forumThread == null){
            return null;
        }
        return new ForumThreadSummary(
                forumThread.getId(),
                forumThread.getName(),
                forumThread.getCreator(),
                forumThread.getCreationTime(),
                forumThread.getPostsCount(),
                forumThread.getCreator().isFollowing(forumThread)
        );
    }
}
