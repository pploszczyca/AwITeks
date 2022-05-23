package pl.edu.agh.awiteks_backend.api.forum;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.agh.awiteks_backend.api.forum.body_models.AddPostRequestBody;
import pl.edu.agh.awiteks_backend.api.forum.body_models.AddThreadRequestBody;
import pl.edu.agh.awiteks_backend.api.forum.body_models.ForumThreadSummaryResponseBody;
import pl.edu.agh.awiteks_backend.models.ForumPost;
import pl.edu.agh.awiteks_backend.models.ForumThread;
import pl.edu.agh.awiteks_backend.security.jwt.JwtAccessToken;
import pl.edu.agh.awiteks_backend.services.ForumService;

import java.util.List;
import java.util.Optional;

import static pl.edu.agh.awiteks_backend.configs.SwaggerConfig.JWT_AUTH;

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
    public List<ForumThreadSummaryResponseBody> getAllThreads() {
        return forumService.getAllThreads();
    }

    @Operation(summary = "Get thread by id")
    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<ForumThread> getThread(@PathVariable int id) {
        return forumService.get(id);
    }


    @Operation(summary = "Get all threads with matching names")
    @GetMapping(value = "/search", produces = "application/json")
    public List<ForumThreadSummaryResponseBody> getThreadsWithMatchingName(@RequestParam(name = "searchKey", defaultValue = "") String searchKey){
        return forumService.getThreadsWithMatchingName(searchKey);
    }

    @Operation(summary = "Add new thread with initial post")
    @PostMapping
    @ResponseBody
    public ForumThread addThread(@RequestBody AddThreadRequestBody thread, JwtAccessToken jwtAccessToken) {
        return forumService.addThread(thread, jwtAccessToken.getUserId());
    }

    @Operation(summary = "Add post to thread")
    @PostMapping(value = "/{threadId}")
    public ForumPost addPostToThread(@RequestBody AddPostRequestBody postRequestBody, @PathVariable int threadId, JwtAccessToken jwtAccessToken) {
        return forumService.addPostToThread(threadId, postRequestBody, jwtAccessToken.getUserId());
    }

    @Operation(summary = "Get all posts for given thread")
    @GetMapping(value = "/{threadId}/posts")
    public List<ForumPost> getPostsFromThread(@PathVariable int threadId) {
        return forumService.getPostsFromThread(threadId);
    }

    @Operation(summary = "Edit post")
    @PostMapping(value = "/{threadId}/{postId}/edit")
    public ForumPost editPost(@RequestBody AddPostRequestBody postRequestBody, @PathVariable int threadId, @PathVariable int postId, JwtAccessToken jwtAccessToken){
        try {
            return forumService.editPost(threadId, postId, postRequestBody, jwtAccessToken.getUserId());
        }catch (IllegalCallerException e){
            return new ForumPost();
        }
    }
}
