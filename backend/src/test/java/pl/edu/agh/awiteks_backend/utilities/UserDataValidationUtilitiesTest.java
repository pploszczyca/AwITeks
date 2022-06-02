package pl.edu.agh.awiteks_backend.utilities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UserDataValidationUtilitiesTest {

    @Autowired
    private UserDataValidationUtilities userDataValidationUtilities;

    @ParameterizedTest
    @CsvSource({"1Ab.;'@#ls,true", "1AAABBB23,false", "aaaabbbb32435,false",
            "AAAbbbbbEEFs,false"})
    void testPassword(String password, boolean expected) {
        assertEquals(expected,
                userDataValidationUtilities.validatePassword(password));
    }

    @ParameterizedTest
    @CsvSource({"Piotr2000,true", "1Piotr,false", "piotr.12,false"})
    void testUsername(String username, boolean expected) {
        assertEquals(expected,
                userDataValidationUtilities.validateUsername(username));
    }

    @ParameterizedTest
    @CsvSource({"test1-23_it.works@test.pl,true", "@test.pl,false",
            "test1@test..pl,false"})
    void testEmail(String email, boolean expected) {
        assertEquals(expected,
                userDataValidationUtilities.validateEmail(email));
    }
}
