package pl.edu.agh.awiteks_backend.mappers;

import pl.edu.agh.awiteks_backend.api.forum.body_models.ForumThreadSummaryRequestBody;
import pl.edu.agh.awiteks_backend.models.ForumThread;

public class ForumMapper {
    public static ForumThreadSummaryRequestBody mapForumThreadToForumThreadSummary(ForumThread forumThread){
        if(forumThread == null){
            return null;
        }
        return new ForumThreadSummaryRequestBody(
                forumThread.getId(),
                forumThread.getTitle(),
                forumThread.getCreator().getUsername(),
                forumThread.getCreationTime(),
                forumThread.getPostsCount(),
                forumThread.getCreator().isFollowing(forumThread)
        );
    }
}
