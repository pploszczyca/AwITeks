package pl.edu.agh.awiteks_backend.api.forum;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.awiteks_backend.models.ForumPost;
import pl.edu.agh.awiteks_backend.models.ForumThread;
import pl.edu.agh.awiteks_backend.services.ForumService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/forum")
public class ForumController {
    private final ForumService forumService;

    @Autowired
    public ForumController(ForumService forumService) {
        this.forumService = forumService;
    }

    @Operation(summary = "Get all forum threads")
    @GetMapping(produces = "application/json")
    public List<ForumThreadSummary> getAllThreads(@RequestParam(name = "favOnly", defaultValue = "false") String favOnly,
                                                  @RequestParam(name = "ownOnly", defaultValue = "false") String ownOnly) {
        // TODO creatorID from JWT
        final int userId = 0;
        return forumService.getAllThreads(favOnly, ownOnly, userId);
    }

    @Operation(summary = "Get thread by id")
    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<ForumThread> getThread(@PathVariable int id) {
        return forumService.get(id);
    }


    @Operation(summary = "Get all threads with matching names")
    @GetMapping(value = "/search", produces = "application/json")
    public List<ForumThreadSummary> getThreadsWithMatchingName(@RequestParam(name = "keyword", defaultValue = "") String searchKey){
        return forumService.getThreadsWithMatchingName(searchKey);
    }

    @Operation(summary = "Add new thread with initial post")
    @PostMapping
    @ResponseBody
    public ForumThread addThread(@RequestBody AddThreadRequestBody thread) {
        // TODO creatorID from JWT
        final int authorId = 0;
        return forumService.addThread(thread, authorId);
    }

    @Operation(summary = "Add post to thread")
    @PostMapping(value = "/{threadId}")
    public ForumPost addPostToThread(@RequestBody AddPostRequestBody postRequestBody, @PathVariable int threadId) {
        // TODO creatorID from JWT
        final int authorId = 0;
        return forumService.addPostToThread(threadId, postRequestBody, authorId);
    }

    @Operation(summary = "Get all posts for given thread")
    @GetMapping(value = "/{threadId}/posts")
    public List<ForumPost> getPostsFromThread(@PathVariable int threadId) {
        return forumService.getPostsFromThread(threadId);
    }
}
