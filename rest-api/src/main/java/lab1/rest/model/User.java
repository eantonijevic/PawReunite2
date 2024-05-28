package lab1.rest.model;

import javax.persistence.*;

@Entity
@Table(name = "Client")
public class User {

    @Id
    @GeneratedValue
    private int id;

    private String name;
    private String email;

    private String password;


    public User() {
    }

    public User(int id ,String name, String email, String password, String type) {
        this.id =id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public static User create(int id,String name,String email, String password,String type) {
        return new User(id,name, email, password, type);
    }

    public String getName(){return name;}
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
    public int getId(){return id;}
}
