package pl.edu.agh.awiteks_backend.mail;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

public class MailAuthenticator extends Authenticator {

    @Override
    protected PasswordAuthentication getPasswordAuthentication() {
        final var senderEmailAddr = System.getenv("NOTIFICATION_EMAIL");
        final var senderEmailPassword = System.getenv("NOTIFICATION_PASSWD");
        return new PasswordAuthentication(senderEmailAddr, senderEmailPassword);
    }
}
