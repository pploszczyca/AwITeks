package pl.edu.agh.awiteks_backend.repositories;

import pl.edu.agh.awiteks_backend.models.AbstractModel;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Repository
public class RepositoryImp<T> implements Repository<T> {
    private final List<AbstractModel<T>> modelList;

    public RepositoryImp(List<AbstractModel<T>> modelList) {
        this.modelList = modelList;
    }

    public RepositoryImp() {
        this(new ArrayList<AbstractModel<T>>());
    }

    @Override
    public void add(T object) {
        modelList.add((AbstractModel<T>) object);
    }

    @Override
    public void remove(T object) {
        modelList.remove((AbstractModel<T>) object);
    }

    @Override
    public void remove(int objectID) {
        Optional<AbstractModel<T>> speciesToDelete = modelList
                .stream()
                .filter(species -> species.getId() == objectID)
                .findFirst();

        speciesToDelete.ifPresent(species -> modelList.remove(species));
    }

    @Override
    public Optional<T> get(int objectID) {
        return (Optional<T>) modelList.stream().filter(model -> model.getId() == objectID).findFirst();
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
