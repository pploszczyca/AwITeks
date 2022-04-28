package pl.edu.agh.awiteks_backend.models;

import io.swagger.v3.oas.annotations.media.Schema;

public abstract class AbstractModel<T> {
    @Schema(required = true)
    protected int id;
    @Schema(required = true)
    protected String name;

    public AbstractModel(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public AbstractModel() {

    }

    public int getId() {
        return this.id;
    }

    public String getName() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AbstractModel model = (AbstractModel) o;
        return id == model.id;
    }

    abstract public T copy();

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }
}
