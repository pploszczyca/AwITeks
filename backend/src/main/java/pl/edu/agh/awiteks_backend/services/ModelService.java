package pl.edu.agh.awiteks_backend.services;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public abstract class ModelService<T> {
    private final CrudRepository<T, Integer> modelRepository;

    public ModelService(CrudRepository<T, Integer> modelRepository) {
        this.modelRepository = modelRepository;
    }

    public List<T> getAll() {
        return iterableToList(modelRepository.findAll());
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

    public static <T> List<T> iterableToList(final Iterable<T> iterable) {
        return StreamSupport
                .stream(iterable.spliterator(), false)
                .collect(Collectors.toList());
    }
}
