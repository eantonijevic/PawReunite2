package lab1.rest.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "CurrentPet")
public class CurrentPet {

    @Id
    private String id;
    private String name;

    private String species;
    private String userEmail;
    private String comment;
    private String date;

    public CurrentPet() {
    }

    public CurrentPet(String id, String name,String species, String userEmail, String comment, String date) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.userEmail = userEmail;
        this.comment = comment;
        this.date = date;
    }

    public static CurrentPet create(String id, String name, String species, String userEmail, String comment, String date) {
        return new CurrentPet(id, name, species, userEmail, comment, date);
    }

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String getSpecies() {
        return species;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String registrationDate) {
        this.date = registrationDate;
    }

    public void setSpecies(String species) {
        this.species = species;
    }
}