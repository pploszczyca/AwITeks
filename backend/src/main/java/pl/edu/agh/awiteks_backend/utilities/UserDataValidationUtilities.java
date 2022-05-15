package pl.edu.agh.awiteks_backend.utilities;

import java.util.regex.Pattern;

public class UserDataValidationUtilities {
    /**
     * Function to validate email based on <a href="https://www.baeldung.com/java-email-validation-regex">this article</a>.
     *  <br><br>
     * Rules to local part:
     * <ul>
     *  <li>It allows numeric values from 0 to 9,</li>
     *  <li>Both uppercase and lowercase letters from a to z are allowed,</li>
     *  <li>Allowed are underscore “_”, hyphen “-“, and dot “.”,</li>
     *  <li>Dot isn't allowed at the start and end of the local part,</li>
     *  <li>Consecutive dots aren't allowed,</li>
     *  <li>For the local part, a maximum of 64 characters are allowed.</li>
     * </ul>
     * Rules to domain part:
     * <ul>
     *  <li>It allows numeric values from 0 to 9,</li>
     *  <li>We allow both uppercase and lowercase letters from a to z,</li>
     *  <li>Hyphen “-” and dot “.” aren't allowed at the start and end of the domain part,</li>
     *  <li>No consecutive dots.</li>
     * </ul>
     * */
    public boolean validateEmail(String email) {
        String regexPattern = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        return patternMatches(email, regexPattern);
    }

    /** Function to validate password
     *  <br><br>
     * Rules:
     * <ul>
     *  <li>a digit must occur at least once,</li>
     *  <li>a lower case letter must occur at least once,</li>
     *  <li>an upper case letter must occur at least once,</li>
     * </ul>
     *  */
    public boolean validatePassword(String password) {
        String regexPattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{1,}$";
        return patternMatches(password, regexPattern);
    }

    /** Function to validate username
     *  <br><br>
     * Rules:
     * <ul>
     *  <li>contain at least 3 chars,</li>
     *  <li>start with big, or small letter,</li>
     *  <li>rest chars can be big, or small letters, or digits.</li>
     * </ul>
     * */
    public boolean validateUsername(String username) {
        String regexPattern = "^[A-Za-z_][A-Za-z0-9_]{2,}$";
        return patternMatches(username, regexPattern);
    }

    private boolean patternMatches(String emailAddress, String regexPattern) {
        return Pattern.compile(regexPattern)
                .matcher(emailAddress)
                .matches();
    }
}
