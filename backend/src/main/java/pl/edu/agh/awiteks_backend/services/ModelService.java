package pl.edu.agh.awiteks_backend.services;

import pl.edu.agh.awiteks_backend.repositories.Repository;

import java.util.List;
import java.util.Optional;

public abstract class ModelService<T> {
    private final Repository<T> modelRepository;

    public ModelService(Repository<T> modelRepository) {
        this.modelRepository = modelRepository;
    }

    public List<T> getAll() {
        return modelRepository.getAll();
    }

    public Optional<T> get(int id) {
        return modelRepository.get(id);
    }

    public void add(T object) {
        modelRepository.add(object);
    }

    public void update(T object) {
        modelRepository.update(object);
    }

    public void remove(int id) {
        modelRepository.remove(id);
    }
}
