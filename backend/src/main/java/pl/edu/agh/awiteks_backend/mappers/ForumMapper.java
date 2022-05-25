package pl.edu.agh.awiteks_backend.mappers;

import pl.edu.agh.awiteks_backend.api.forum.body_models.ForumPostUserIncluded;
import pl.edu.agh.awiteks_backend.api.forum.body_models.ForumThreadSummaryResponseBody;
import pl.edu.agh.awiteks_backend.models.ForumPost;
import pl.edu.agh.awiteks_backend.models.ForumThread;

public class ForumMapper {
    public static ForumThreadSummaryResponseBody mapForumThreadToForumThreadSummary(ForumThread forumThread){
        if(forumThread == null){
            return null;
        }
        return new ForumThreadSummaryResponseBody(
                forumThread.getId(),
                forumThread.getTitle(),
                forumThread.getUser().getUsername(),
                forumThread.getCreationTime(),
                forumThread.getPostsCount(),
                forumThread.getUser().isFollowing(forumThread)
        );
    }
    public static ForumPostUserIncluded mapForumPostToForumPostUserIncluded(ForumPost post){
        if(post == null) return null;
        return new ForumPostUserIncluded(
                post.getId(),
                post.getContent(),
                post.getUser().getUsername(),
                post.getDate()
        );
    }
}
