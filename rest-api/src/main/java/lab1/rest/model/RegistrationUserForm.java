package lab1.rest.model;

import static lab1.rest.json.JsonParser.fromJson;

public class RegistrationUserForm {

    private final String email;
    private final String password;

    public RegistrationUserForm(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public static RegistrationUserForm createFromJson(String body) {
        return fromJson(body, RegistrationUserForm.class);
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }
}
