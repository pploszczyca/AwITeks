package pl.edu.agh.awiteks_backend.api;

import pl.edu.agh.awiteks_backend.repositories.Repository;

import java.util.List;
import java.util.Optional;

//@RestController
public abstract class ModelController<T> {
    private final Repository<T> modelRepository;

    public ModelController(Repository<T> modelRepository) {
        this.modelRepository = modelRepository;
    }

    //    @GetMapping(value = "/species", produces = "application/json")
    public List<T> getAll() {
        return modelRepository.getAll();
    }

    //    @GetMapping(value = "/species/{id}", produces = "application/json")
//    public Optional<T> getSpecies(@PathVariable int id){
    public Optional<T> get(int id) {
        return modelRepository.get(id);
    }

    //    @PostMapping(path="/species")
//    @ResponseBody
//    public String addSpecies(@RequestBody T object) {
    public String add(T object) {
        modelRepository.add(object);
        return "ok";
    }

    //    @PutMapping(value = "/species", consumes = "application/json")
//    public void updateSpecies(@RequestBody T object) {
    public void update(T object) {
        modelRepository.update(object);
    }

    //    @DeleteMapping(value = "/species/{id}")
//    public void delete(@PathVariable int id){
    public void deleteSpecies(int id) {
        modelRepository.remove(id);
    }
}

