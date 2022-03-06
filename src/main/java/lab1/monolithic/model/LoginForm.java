package lab1.monolithic.model;

import org.eclipse.jetty.util.MultiMap;
import org.eclipse.jetty.util.UrlEncoded;

import java.util.List;

public class LoginForm {
    private final String email;
    private final String password;

    public LoginForm(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public static LoginForm create(List<String> email, List<String> password) {
        return new LoginForm(email.get(0), password.get(0));
    }

    public static LoginForm createFromBody(String body) {
        final MultiMap<String> params = new MultiMap<>();
        UrlEncoded.decodeTo(body, params, "UTF-8");

        return LoginForm.create(
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
