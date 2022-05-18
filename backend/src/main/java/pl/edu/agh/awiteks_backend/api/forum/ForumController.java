package pl.edu.agh.awiteks_backend.api.forum;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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
    public List<ForumThreadSummaryResponseBody> getAllThreads(@RequestParam(name = "favOnly", defaultValue = "false") String favOnly,
                                                             @RequestParam(name = "ownOnly", defaultValue = "false") String ownOnly,
                                                             JwtAccessToken jwtAccessToken) {
        return forumService.getAllThreads(jwtAccessToken.getUserId());
    }

    @Operation(summary = "Get thread by id")
    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<ForumThread> getThread(@PathVariable int id, JwtAccessToken jwtAccessToken) {
        return forumService.get(id, jwtAccessToken.getUserId());
    }


    @Operation(summary = "Get all threads with matching names")
    @GetMapping(value = "/search", produces = "application/json")
    public List<ForumThreadSummaryResponseBody> getThreadsWithMatchingName(@RequestParam(name = "keyword", defaultValue = "") String searchKey, JwtAccessToken jwtAccessToken){
        return forumService.getThreadsWithMatchingName(0, searchKey);   //TODO: Does not work, returns all. What?
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
    public List<ForumPost> getPostsFromThread(@PathVariable int threadId, JwtAccessToken jwtAccessToken) {
        return forumService.getPostsFromThread(threadId);
    }
}
