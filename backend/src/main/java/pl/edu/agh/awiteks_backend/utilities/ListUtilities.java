package pl.edu.agh.awiteks_backend.utilities;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class ListUtilities {
    public <T> List<T> iterableToList(final Iterable<T> iterable) {
        return StreamSupport
                .stream(iterable.spliterator(), false)
                .collect(Collectors.toList());
    }
}
