package pl.edu.agh.awiteks_backend.api.forum;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.agh.awiteks_backend.api.forum.body_models.AddPostRequestBody;
import pl.edu.agh.awiteks_backend.api.forum.body_models.AddThreadRequestBody;
import pl.edu.agh.awiteks_backend.api.forum.body_models.ForumPostUserIncluded;
import pl.edu.agh.awiteks_backend.api.forum.body_models.ForumThreadSummaryResponseBody;
import static pl.edu.agh.awiteks_backend.configs.SwaggerConfig.JWT_AUTH;
import pl.edu.agh.awiteks_backend.models.ForumPost;
import pl.edu.agh.awiteks_backend.models.ForumThread;
import pl.edu.agh.awiteks_backend.security.jwt.JwtAccessToken;
import pl.edu.agh.awiteks_backend.services.ForumService;

@RestController
@RequestMapping("/forum")
public class ForumController {
    private final ForumService forumService;

    @Autowired
    public ForumController(ForumService forumService) {
        this.forumService = forumService;
    }

    @Operation(summary = "Get all forum threads", security = @SecurityRequirement(name = JWT_AUTH))
    @GetMapping(produces = "application/json")
    public List<ForumThreadSummaryResponseBody> getAllThreads(
            JwtAccessToken jwtAccessToken) {
        return forumService.getAllThreads(jwtAccessToken.getUserId());
    }

    @Operation(summary = "Get all threads with matching names", security = @SecurityRequirement(name = JWT_AUTH))
    @GetMapping(value = "/search", produces = "application/json")
    public List<ForumThreadSummaryResponseBody> getThreadsWithMatchingName(
            @RequestParam(name = "searchKey", defaultValue = "")
            String searchKey,
            JwtAccessToken jwtAccessToken) {
        return forumService.getThreadsWithMatchingName(searchKey,
                jwtAccessToken.getUserId());
    }

    @Operation(summary = "Add new thread with initial post", security = @SecurityRequirement(name = JWT_AUTH))
    @PostMapping
    @ResponseBody
    public ForumThread addThread(@RequestBody AddThreadRequestBody thread,
                                 JwtAccessToken jwtAccessToken) {
        return forumService.addThread(thread, jwtAccessToken.getUserId());
    }

    @Operation(summary = "Add post to thread", security = @SecurityRequirement(name = JWT_AUTH))
    @PostMapping(value = "/{threadId}")
    public ForumPost addPostToThread(
            @RequestBody AddPostRequestBody postRequestBody,
            @PathVariable int threadId, JwtAccessToken jwtAccessToken) {
        return forumService.addPostToThread(threadId, postRequestBody,
                jwtAccessToken.getUserId());
    }

    @Operation(summary = "Get all posts for given thread", security = @SecurityRequirement(name = JWT_AUTH))
    @GetMapping(value = "/{threadId}/posts")
    public List<ForumPostUserIncluded> getPostsUserIncludedFromThread(
            @PathVariable int threadId) {
        return forumService.getPostsUserIncludedFromThread(threadId);
    }

    @Operation(summary = "Edit post", security = @SecurityRequirement(name = JWT_AUTH))
    @PutMapping(value = "/{threadId}/{postId}/edit")
    public ForumPost editPost(@RequestBody AddPostRequestBody postRequestBody,
                              @PathVariable int threadId,
                              @PathVariable int postId,
                              JwtAccessToken jwtAccessToken) {
        return forumService.editPost(threadId, postId, postRequestBody,
                jwtAccessToken.getUserId());
    }

    @Operation(summary = "Follow thread", security = @SecurityRequirement(name = JWT_AUTH))
    @PutMapping(value = "/follow/{threadId}")
    public ForumThread toggleThreadFollowing(@PathVariable int threadId,
                                             JwtAccessToken jwtAccessToken) {
        return forumService.toggleThreadFollowing(threadId,
                jwtAccessToken.getUserId());
    }
}
