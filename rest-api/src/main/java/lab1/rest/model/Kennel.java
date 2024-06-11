package lab1.rest.model;

import javax.persistence.*;

@Entity
@Table(name = "Client")
public class Kennel {

    @Id
    @GeneratedValue
    private int id;

    private String name;
    private String email;

    private String password;

    private String address;

    private String phoneNumber;
    private String type= "Kennel";

    public Kennel() {
    }

    public Kennel(int id, String name, String email, String password, String address, String phoneNumber,String type) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public static Kennel create(int id, String name, String email, String password, String address, String phoneNumber,String type) {
        return new Kennel(id,name, email, password, address, phoneNumber,type);
    }

    // Getters and Setters

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public int getId() {return id;}
    public String getType() {return type;}
}