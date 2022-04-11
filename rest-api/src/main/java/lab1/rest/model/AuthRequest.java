package lab1.rest.model;

import lab1.rest.json.JsonParser;
import org.eclipse.jetty.util.MultiMap;
import org.eclipse.jetty.util.UrlEncoded;

import java.util.List;

public class AuthRequest {
    private final String email;
    private final String password;

    public AuthRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public static AuthRequest create(List<String> email, List<String> password) {
        return new AuthRequest(email.get(0), password.get(0));
    }

    public static AuthRequest createFromJson(String body) {
        return JsonParser.fromJson(body, AuthRequest.class);
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }
}
