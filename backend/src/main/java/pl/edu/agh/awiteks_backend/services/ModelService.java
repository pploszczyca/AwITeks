package pl.edu.agh.awiteks_backend.services;

import org.springframework.data.repository.CrudRepository;
import pl.edu.agh.awiteks_backend.utilities.ListUtilities;

import java.util.List;
import java.util.Optional;

public abstract class ModelService<T> {
    private final CrudRepository<T, Integer> modelRepository;
    private final ListUtilities listUtilities;

    public ModelService(CrudRepository<T, Integer> modelRepository, ListUtilities listUtilities) {
        this.modelRepository = modelRepository;
        this.listUtilities = listUtilities;
    }

    public List<T> getAll() {
        return listUtilities.iterableToList(modelRepository.findAll());
    }

    public Optional<T> get(int id) {
        return modelRepository.findById(id);
    }

    public void add(T object) {
        modelRepository.save(object);
    }

    public void update(T object) {
        modelRepository.save(object);
    }

    public void remove(int id) {
        modelRepository.deleteById(id);
    }
}
