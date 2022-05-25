package pl.edu.agh.awiteks_backend.mail;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class MailMessagePreparer {

    public static MimeMessage prepareTextMessageObject(String recipient, String subject, String content) throws MessagingException {
        final MimeMessage textMessage = prepareMessageObject(recipient, subject);
        textMessage.setText(content);
        return textMessage;
    }

    private static MimeMessage prepareMessageObject(String recipient, String subject) throws MessagingException {
        final Properties properties = MailConfiguration.getConfiguration();
        final MailAuthenticator authenticator = new MailAuthenticator();

        final Session session = Session.getInstance(properties, authenticator);

        final MimeMessage mimeMessage = new MimeMessage(session);
        mimeMessage.setSubject(subject, "UTF-8");
        final PasswordAuthentication passwordAuthentication = authenticator.getPasswordAuthentication();
        mimeMessage.setFrom(passwordAuthentication.getUserName());
        mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(recipient));
        return mimeMessage;
    }
}
