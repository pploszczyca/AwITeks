package agh.edu.pl.awiteks_backend.repositories;

import java.util.List;
import java.util.Optional;

public interface Repository<T> {

    void add(T object);

    void remove(T object);

    void remove(int speciesID);

    Optional<T> get(int id);

    List<T> getAll();

    void update(T object);
}
