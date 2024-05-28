package lab1.rest.model;

import static lab1.rest.json.JsonParser.fromJson;

public class RegistrationUserForm {
    private final String type = "user";
    private final String name;
    private final String email;
    private final String password;
    private int Id = new User().getId();

    public RegistrationUserForm(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public static RegistrationUserForm createFromJson(String body) {
        return fromJson(body, RegistrationUserForm.class);
    }

    public String getPassword() {
        return password;
    }
    public String getType() {
        return type;
    }

    public String getEmail() {
        return email;
    }
    public String getName() {
        return name;
    }

    public int getId() {return Id;}
}
