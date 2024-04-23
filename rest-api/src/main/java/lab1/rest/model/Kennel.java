package lab1.rest.model;

import javax.persistence.*;

@Entity
@Table(name = "KENNEL")
public class Kennel {

    @Id
    private String email;

    private String password;

    private String name;

    private String address;

    private String phoneNumber;

    public Kennel() {
    }

    public Kennel(String email, String password, String name, String address, String phoneNumber) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public static Kennel create(String email, String password, String name, String address, String phoneNumber) {
        return new Kennel(email, password, name, address, phoneNumber);
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
}