package pl.edu.agh.awiteks_backend.mail;
import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

public class MailAuthenticator extends Authenticator {

    @Override
    protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication("PLACE-EMAIL-HERE", "PLACE-PASSWORD-HERE");
    }
}
