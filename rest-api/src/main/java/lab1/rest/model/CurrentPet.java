package lab1.rest.model;

import java.util.Date;

public class CurrentPet {
    private String id;
    private String name;
    private String species;
    private String userEmail;
    private String comment;
    private Date registrationDate;

    public CurrentPet() {
    }

    public CurrentPet(String id, String name, String species, String userEmail, String comment, Date registrationDate) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.userEmail = userEmail;
        this.comment = comment;
        this.registrationDate = registrationDate;
    }

    public static CurrentPet create(String id, String name, String species, String userEmail, String comment, Date registrationDate) {
        return new CurrentPet(id, name, species, userEmail, comment, registrationDate);
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

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
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

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }
}