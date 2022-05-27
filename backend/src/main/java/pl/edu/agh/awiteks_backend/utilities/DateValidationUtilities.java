package pl.edu.agh.awiteks_backend.utilities;

import java.time.LocalDate;

public class DateValidationUtilities {

    /**
     * @param date - YYYY-MM-DD format
     */
    public static boolean isInTheFuture(String date) {
        return LocalDate.parse(date).isAfter(LocalDate.now());
    }
}
