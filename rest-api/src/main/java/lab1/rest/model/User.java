package lab1.rest.model;

import javax.persistence.*;

@Entity
@Table(name = "USER")
public class User {

    @Id
    private String email;

    private String password;

    public User() {
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public static User create(String email, String password) {
        return new User(email, password);
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
