## password is just "password"
INSERT INTO user (email, password, username)
VALUES ('test1@test.pl', '$2a$10$FKyI3VHkkTEMCHk2exDdmu5kcMiHRtEjAR0pdm.Y5xJtfFOe09jU2', 'konrad');
INSERT INTO user (email, password, username)
VALUES ('test2@test.pl', '$2a$10$FKyI3VHkkTEMCHk2exDdmu5kcMiHRtEjAR0pdm.Y5xJtfFOe09jU2', 'maciek');


## pre-definied species
INSERT INTO species (creator_id, fertilization_dose, fertilization_routine, max_age, name, needed_insolation,
                     water_dose, water_routine)
VALUES (-1, 1, 1, 1, 'koperek', 2, 100, 1);

INSERT INTO species (creator_id, fertilization_dose, fertilization_routine, max_age, name, needed_insolation,
                     water_dose, water_routine)
VALUES (-1, 2, 2, 5, 'kaktus', 1, 20, 1);

INSERT INTO species (creator_id, fertilization_dose, fertilization_routine, max_age, name, needed_insolation,
                     water_dose, water_routine)
VALUES (-1, 1, 1, 5, 'fiolek', 1, 44, 4);

INSERT INTO species (creator_id, fertilization_dose, fertilization_routine, max_age, name, needed_insolation,
                     water_dose, water_routine)
VALUES (-1, 2, 20, 20, 'roza', 1, 200, 7);

INSERT INTO species (creator_id, fertilization_dose, fertilization_routine, max_age, name, needed_insolation,
                     water_dose, water_routine)
VALUES (-1, 1, 60, 20, 'Magnolia', 2, 2600, 7);

INSERT INTO species (creator_id, fertilization_dose, fertilization_routine, max_age, name, needed_insolation,
                     water_dose, water_routine)
VALUES (-1, 1, 365, 1, 'Stokrotka', 2, 100, 3);


## first user private species
INSERT INTO species (creator_id, fertilization_dose, fertilization_routine, max_age, name, needed_insolation,
                     water_dose, water_routine)
VALUES (1, 2, 2, 1, 'wyjatkowy storczyk', 2, 50, 1);

INSERT INTO species (creator_id, fertilization_dose, fertilization_routine, max_age, name, needed_insolation,
                     water_dose, water_routine)
VALUES (1, 2, 2, 1, 'specjalna paprotka', 2, 50, 1);


## second user private species
INSERT INTO species (creator_id, fertilization_dose, fertilization_routine, max_age, name, needed_insolation,
                     water_dose, water_routine)
VALUES (2, 2, 20, 1, 'wyjatkowy kaktus', 2, 50, 10);

INSERT INTO species (creator_id, fertilization_dose, fertilization_routine, max_age, name, needed_insolation,
                     water_dose, water_routine)
VALUES (2, 2, 20, 5, 'specjalna magnolia', 2, 500, 10);


## plants for user1
INSERT INTO plants (actual_insolation, favourite, name, note, url, species_id, user_id)
VALUES (1, true, 'Storczyk z biurka', 'Storczyk na biurku se stoi',
        'https://zielonyogrodek.pl/i/images/4/9/8/d2FjPTkwMHgxLjQwMA==_src_34498-storczyk_z_supermarketu_fot._RainerBerns_-_Pixabay.com.jpg'
           , 1, 1);

INSERT INTO plants (actual_insolation, favourite, name, note, url, species_id, user_id)
VALUES (1, false, 'Magnolia Ewa', 'Taka stokowa zwykla magnolia, imieniem Ewa, herbu doniczka',
        'https://cdn1.hk-green.pl/sztuczna-magnolia-w-doniczce-21-cm-p3873329.jpg'
           , 5, 1);

INSERT INTO plants (actual_insolation, favourite, name, note, url, species_id, user_id)
VALUES (2, true, 'Kaktusek', 'Nie chce tanczyc',
        'https://sztuczne-rosliny.pl/wp-content/uploads/2017/01/sztuczny-kaktus-karnegia-800-800-1.jpg'
           , 2, 1);

INSERT INTO plants (actual_insolation, favourite, name, note, url, species_id, user_id)
VALUES (2, false, 'Fiolek', 'Just fiolek, nic specjalnego w tym fiolku.',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBeW_ppritYkcCOgAam8WNcHAwJRO2a57uug&usqp=CAU'
           , 3, 1);

INSERT INTO plants (actual_insolation, favourite, name, note, url, species_id, user_id)
VALUES (2, false, 'Moja paprotka', 'specjalna paprotka, tylko moja',
        'https://thumbs.img-sprzedajemy.pl/1000x901c/23/ac/94/paprotka-eukaliptus-trawa-trawka-pozostale-kozieglowy-530579814.jpg'
           , 8, 1);

## plants for user 2
INSERT INTO plants (actual_insolation, favourite, name, note, url, species_id, user_id)
VALUES (1, true, 'Rozyczka z koszyczka', 'roza ze smietnika, moze wstanie',
           'https://i.pinimg.com/originals/90/b1/1e/90b11e153d00cc913c3f133f043a0b28.jpg'
        , 4, 2);

INSERT INTO plants (actual_insolation, favourite, name, note, url, species_id, user_id)
VALUES (1, false, 'Swieza Stokrotka', 'stokrotka, tak jak ten akademik ds8',
        'https://www.weranda.pl/data/articles/stokrotka_(8).jpg'
           , 6, 2);

INSERT INTO plants (actual_insolation, favourite, name, note, url, species_id, user_id)
VALUES (1, false, 'moj wyjatkowy kaktus', 'bardzo bardzo specjalny kaktus wygladajacy jak ludzik',
        'https://succulentcity.com/wp-content/uploads/2019/10/What-Is-Special-About-A-Cactus-4.-Their-unique-growth-habits-sc.jpg'
           , 2, 2);

INSERT INTO plants (actual_insolation, favourite, name, note, url, species_id, user_id)
VALUES (2, false, 'Fiolek', 'Just fiolek, nic specjalnego w tym fiolku.',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBeW_ppritYkcCOgAam8WNcHAwJRO2a57uug&usqp=CAU'
           , 3, 2);

INSERT INTO plants (actual_insolation, favourite, name, note, url, species_id, user_id)
VALUES (2, true, 'Magnolia Stefan', 'Magnolia, nie reaguje na imie',
        'https://mardecor.pl/images/KWIATY/YL14-1939.jpg'
           , 10, 2);

#ughh time for activities
INSERT INTO activities (activity_type, date, plant_id)
VALUES (0, '2022-05-05' , 1);
INSERT INTO activities (activity_type, date, plant_id)
VALUES (1, '2022-05-01' , 1);

INSERT INTO activities (activity_type, date, plant_id)
VALUES (0, '2022-05-12' , 2);
INSERT INTO activities (activity_type, date, plant_id)
VALUES (1, '2022-04-25' , 2);

INSERT INTO activities (activity_type, date, plant_id)
VALUES (0, '2022-05-08' , 3);
INSERT INTO activities (activity_type, date, plant_id)
VALUES (1, '2022-04-22' , 3);

INSERT INTO activities (activity_type, date, plant_id)
VALUES (0, '2022-05-10' , 4);
INSERT INTO activities (activity_type, date, plant_id)
VALUES (1, '2022-05-03' , 4);

INSERT INTO activities (activity_type, date, plant_id)
VALUES (0, '2022-05-05' , 5);
INSERT INTO activities (activity_type, date, plant_id)
VALUES (1, '2022-04-01' , 5);

INSERT INTO activities (activity_type, date, plant_id)
VALUES (0, '2022-05-10' , 6);
INSERT INTO activities (activity_type, date, plant_id)
VALUES (1, '2022-05-09' , 6);

INSERT INTO activities (activity_type, date, plant_id)
VALUES (0, '2022-05-12' , 7);
INSERT INTO activities (activity_type, date, plant_id)
VALUES (1, '2022-05-02' , 7);

INSERT INTO activities (activity_type, date, plant_id)
VALUES (0, '2022-05-07' , 8);
INSERT INTO activities (activity_type, date, plant_id)
VALUES (1, '2022-03-01' , 8);

INSERT INTO activities (activity_type, date, plant_id)
VALUES (0, '2022-05-04' , 9);
INSERT INTO activities (activity_type, date, plant_id)
VALUES (1, '2022-04-28' , 9);

INSERT INTO activities (activity_type, date, plant_id)
VALUES (0, '2022-05-08' , 10);
INSERT INTO activities (activity_type, date, plant_id)
VALUES (1, '2022-04-10' , 10);

## forum threads and posts
INSERT INTO forum_thread (title, user_id, creation_time)
VALUES ('Kaktus nie tanczy', 1, 2019-12-12);

INSERT INTO forum_post(content, date, user_id, forum_thread_id)
VALUES ('Moj kaktus nie tanczy, HELP!!!oneone11', '2022-05-12',1, 1);
INSERT INTO forum_post(content, date, user_id, forum_thread_id)
VALUES ('Sprobuj wlaczyc mu muzyke', '2022-05-12',2, 1);
INSERT INTO forum_post(content, date, user_id, forum_thread_id)
VALUES ('Nic to nie daje, leniwy jakis', '2022-05-12',1, 1);
INSERT INTO forum_post(content, date, user_id, forum_thread_id)
VALUES ('Koniecznie Cypisa, utwor: Gdzie jest bialy wegorz. Moj tanczy tak: https://youtu.be/hHm6lgzyU0o?t=16 ', '2022-05-12',2, 1);


INSERT INTO forum_thread (title, user_id)
VALUES ('Paprotka ma problem z doniczka.', 2);

INSERT INTO forum_post(content, date, user_id, forum_thread_id)
VALUES ('Moja paprotka wyszla z doniczki.','2022-05-12',2, 2);
INSERT INTO forum_post(content, date, user_id, forum_thread_id)
VALUES ('Temat poruszany na forum wiele razy. Uzyj szukajki, bo jest.', '2022-05-12',1, 2);
INSERT INTO forum_post(content, date, user_id, forum_thread_id)
VALUES ('Google milczy na temat maszerujaych paprotek :(','2022-05-12',2, 2);







