package lab1.monolithic.model;

import org.eclipse.jetty.util.MultiMap;
import org.eclipse.jetty.util.UrlEncoded;

import java.util.List;

public class RegistrationUserForm {
    private final String email;
    private final String password;

    public RegistrationUserForm(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public static RegistrationUserForm create(List<String> email, List<String> password) {
        return new RegistrationUserForm(email.get(0), password.get(0));
    }

    public static RegistrationUserForm createFromBody(String body) {
        final MultiMap<String> params = new MultiMap<>();
        UrlEncoded.decodeTo(body, params, "UTF-8");

        return RegistrationUserForm.create(
                params.getValues("email"),
                params.getValues("password")
        );
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }
}
