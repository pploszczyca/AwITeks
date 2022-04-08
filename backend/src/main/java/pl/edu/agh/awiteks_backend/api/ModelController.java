package pl.edu.agh.awiteks_backend.api;

import pl.edu.agh.awiteks_backend.repositories.Repository;

import java.util.List;
import java.util.Optional;


public abstract class ModelController<T> {
    private final Repository<T> modelRepository;

    public ModelController(Repository<T> modelRepository) {
        this.modelRepository = modelRepository;
    }

    public List<T> getAll() {
        return modelRepository.getAll();
    }

    public Optional<T> get(int id) {
        return modelRepository.get(id);
    }

    public String add(T object) {
        modelRepository.add(object);
        return "ok";
    }

    public void update(T object) {
        modelRepository.update(object);
    }

    public void remove(int id) {
        modelRepository.remove(id);
    }
}

