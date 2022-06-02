package pl.edu.agh.awiteks_backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import pl.edu.agh.awiteks_backend.api.forum.body_models.ForumPostUserIncluded;
import pl.edu.agh.awiteks_backend.api.forum.body_models.ForumThreadSummaryResponseBody;
import pl.edu.agh.awiteks_backend.models.ForumPost;
import pl.edu.agh.awiteks_backend.models.ForumThread;
import pl.edu.agh.awiteks_backend.repositories.UserRepository;

@Mapper(componentModel = "spring")
public abstract class ForumMapper {

    @Autowired
    protected UserRepository userRepository;

    @Mapping(target = "creatorName", source = "forumThread.user.username")
    @Mapping(target = "creationDate", source = "forumThread.creationTime")
    @Mapping(target = "isFollowed", expression = "java(userRepository.findById(userId).orElseThrow().isFollowing(forumThread))")
    public abstract ForumThreadSummaryResponseBody forumThreadToSummary(
            ForumThread forumThread, int userId);

    @Mapping(target = "userName", source = "forumPost.user.username")
    @Mapping(target = "creationDate", source = "forumPost.date")
    public abstract ForumPostUserIncluded forumPostToPostUserIncluded(
            ForumPost forumPost);
}
