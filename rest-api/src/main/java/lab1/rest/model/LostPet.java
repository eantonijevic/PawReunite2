package lab1.rest.model;

import javax.persistence.*;

@Entity
@Table(name = "LostPet")
public class LostPet {

    @Id
    private String id;

    private String name;

    private String species;

    private String userEmail;

    private String comment;

    private boolean adopp = false;

    public LostPet() {
    }

    public LostPet(String id, String name, String species, String userEmail, String comment) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.userEmail = userEmail;
        this.comment = comment;
    }

    public static LostPet create(String id, String name, String species, String userEmail, String comment) {
        return new LostPet(id, name, species, userEmail, comment);
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

    public boolean isAdopp(){
        return adopp;
    }
    public boolean TrueAdopp(){
        return adopp = true;
    }
}