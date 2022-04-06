package agh.edu.pl.awiteks_backend.models;

public abstract class AbstractModel<T> {
    protected int id;
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
