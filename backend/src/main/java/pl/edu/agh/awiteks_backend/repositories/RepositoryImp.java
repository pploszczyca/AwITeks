package pl.edu.agh.awiteks_backend.repositories;

import pl.edu.agh.awiteks_backend.models.AbstractModel;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class RepositoryImp<T> implements Repository<T> {
    private final List<AbstractModel<T>> modelList;

    public RepositoryImp(List<AbstractModel<T>> modelList) {
        this.modelList = modelList;
    }

    public RepositoryImp() {
        this(new ArrayList<AbstractModel<T>>());
    }

    @Override
    public void add(T species) {
        modelList.add((AbstractModel<T>) species);
    }

    @Override
    public void remove(T species) {
        modelList.remove((AbstractModel<T>) species);
    }

    @Override
    public void remove(int speciesID) {
        Optional<AbstractModel<T>> speciesToDelete = modelList
                .stream()
                .filter(species -> species.getId() == speciesID)
                .findFirst();

        speciesToDelete.ifPresent(species -> modelList.remove(species));
    }

    @Override
    public Optional<T> get(int modelID) {
        return (Optional<T>) modelList.stream().filter(model -> model.getId() == modelID).findFirst();
    }

    @Override
    public List<T> getAll() {
        return this.modelList.stream().map(AbstractModel::copy).toList();
    }

    @Override
    public void update(T object) {
        AbstractModel<T> model = (AbstractModel<T>) object;
        this.get(model.getId()).ifPresent(present ->
                modelList
                        .set(modelList.indexOf(present), (AbstractModel<T>) object));
    }
}
