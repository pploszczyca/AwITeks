package pl.edu.agh.awiteks_backend.api.forum;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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
    @GetMapping()
    public List<ForumThread> getAllThreads() {
        return forumService.getAllThreads();
    }

    @Operation(summary = "Get thread by id")
    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<ForumThread> getThread(@PathVariable int id) {
        return forumService.get(id);
    }

    @Operation(summary = "Add new thread with initial post")
    @PostMapping
    @ResponseBody
    public ForumThread addThread(@RequestBody AddThreadRequestBody thread) {
        // TODO creatorID from JWT
        return forumService.addThread(thread, 0);
    }
}
