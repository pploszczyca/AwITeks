package pl.edu.agh.awiteks_backend.services;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.CrudRepository;

@RequiredArgsConstructor
public abstract class ModelService<T> {
    private final CrudRepository<T, Integer> modelRepository;

    public Optional<T> get(int id) {
        return modelRepository.findById(id);
    }

    public void add(T object) {
        modelRepository.save(object);
    }

    public void remove(int id) {
        modelRepository.deleteById(id);
    }
}
