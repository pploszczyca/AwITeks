INSERT INTO user (id, name) VALUES (1, 'test');

INSERT INTO species (creator_id, fertilization_dose, fertilization_routine, max_age, name, needed_insolation, water_dose, water_routine)
VALUES (1, 1, 1, 1, 'test specie', 1, 1, 1);
INSERT INTO species (creator_id, fertilization_dose, fertilization_routine, max_age, name, needed_insolation, water_dose, water_routine)
VALUES (1, 1, 2, 1, 'test specie2', 1, 1, 1);

INSERT INTO plants (actual_insolation, is_favourite, name, note, url, species_id, user_id)
VALUES (1, false, 'test plant', 'test note', 'https://netscroll.pl/wp-content/uploads/2021/10/CactusToy1.jpg', 1, 1);