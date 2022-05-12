package pl.edu.agh.awiteks_backend.utilities;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserDataValidationUtilitiesTest {

    @Autowired
    private UserDataValidationUtilities userDataValidationUtilities;

    // PASSWORD TESTS

    @Test
    @DisplayName("Putting good password test")
    void properPassword() {
        testPassword("1Ab.;'@#ls", true);
    }

    @Test
    @DisplayName("Putting password with no small chars test")
    void noSmallCharsPassword() {
        testPassword("1AAABBB23", false);
    }

    @Test
    @DisplayName("Putting password with no big chars test")
    void noBigCharsPassword() {
        testPassword("aaaabbbb32435", false);
    }

    @Test
    @DisplayName("Putting password with no numbers chars test")
    void noNumbersPassword() {
        testPassword("AAAbbbbbEEFs", false);
    }

    // USERNAME TESTS

    @Test
    @DisplayName("Putting good username test")
    void properUsername() {
        testUsername("Piotr2000", true);
    }

    @Test
    @DisplayName("Putting username with digit at first place test")
    void startWithNumberUsername() {
        testUsername("1Piotr", false);
    }

    @Test
    @DisplayName("Putting username with special chars test")
    void containsSpecialCharsUsername() {
        testUsername("piotr.12", false);
    }

    // EMAIL TESTS

    @Test
    @DisplayName("Putting proper email test")
    void properEmail() {
        testEmail("test1-23_it.works@test.pl", true);
    }

    @Test
    @DisplayName("Putting email with dot at first place test")
    void dotAtFirstEmail() {
        testEmail(".@test.pl", false);
    }

    @Test
    @DisplayName("Putting email with consecutive dots test")
    void consecutiveDotsEmail() {
        testEmail("test1@test..pl", false);
    }

    private void testPassword(String password, boolean expected) {
        assertEquals(expected, userDataValidationUtilities.validatePassword(password));
    }

    private void testUsername(String username, boolean expected) {
        assertEquals(expected, userDataValidationUtilities.validateUsername(username));
    }

    private void testEmail(String email, boolean expected) {
        assertEquals(expected, userDataValidationUtilities.validateEmail(email));
    }
}