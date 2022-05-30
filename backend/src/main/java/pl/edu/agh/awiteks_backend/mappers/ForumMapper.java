package pl.edu.agh.awiteks_backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.edu.agh.awiteks_backend.api.forum.body_models.ForumPostUserIncluded;
import pl.edu.agh.awiteks_backend.api.forum.body_models.ForumThreadSummaryResponseBody;
import pl.edu.agh.awiteks_backend.models.ForumPost;
import pl.edu.agh.awiteks_backend.models.ForumThread;
import pl.edu.agh.awiteks_backend.models.User;

@Mapper(componentModel = "spring")
public interface ForumMapper {
    @Mapping(target = "id", source = "forumThread.id")
    @Mapping(target = "creatorName", expression = "java(forumThread.getUser().getUsername())")
    @Mapping(target = "creationDate", source = "forumThread.creationTime")
    @Mapping(target = "isFollowed", expression = "java(user.isFollowing(forumThread))")
    ForumThreadSummaryResponseBody forumThreadToSummary(ForumThread forumThread, User user);

    @Mapping(target = "userName", source = "forumPost.user.username")
    @Mapping(target = "creationDate", source = "forumPost.date")
    ForumPostUserIncluded forumPostToPostUserIncluded(ForumPost forumPost);
}
