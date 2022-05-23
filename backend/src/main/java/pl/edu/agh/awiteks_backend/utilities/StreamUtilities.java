package pl.edu.agh.awiteks_backend.utilities;

import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class StreamUtilities {
    public <T> Stream<T> asStream(final Iterable<T> sourceIterable) {
        return asStream(sourceIterable, false);
    }

    public <T> Stream<T> asStream(final Iterable<T> sourceIterable,
                                  boolean parallel) {
        return StreamSupport
                .stream(sourceIterable.spliterator(), parallel);
    }
}
