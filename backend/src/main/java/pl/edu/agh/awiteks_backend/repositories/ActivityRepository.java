package pl.edu.agh.awiteks_backend.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import pl.edu.agh.awiteks_backend.models.Activity;

public interface ActivityRepository extends CrudRepository<Activity, Integer> {

    @Query("SELECT a " +
            "FROM Activity a INNER JOIN a.plant p " +
            "WHERE p.user.id = ?1 AND YEAR(DATE(a.date)) = ?2 AND MONTH(DATE(a.date)) = ?3")
    List<Activity> getDisplayableActivities(int userId, int year, int month);

}
