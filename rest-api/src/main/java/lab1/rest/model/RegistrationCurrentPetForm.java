package lab1.rest.model;

import java.time.LocalDate;
import java.util.Date;

import static lab1.rest.json.JsonParser.fromJson;

public class RegistrationCurrentPetForm {
    private final String name;
    private final String species;
    private final String userEmail;

    private final String comment;

    private final String date;

    public RegistrationCurrentPetForm(String name, String species, String userEmail, String comment, String date) {
        this.name = name;
        this.species = species;
        this.userEmail = userEmail;
        this.comment = comment;
        this.date = date;
    }

    public static RegistrationCurrentPetForm createFromJson(String body) {
        return fromJson(body, RegistrationCurrentPetForm.class);
    }

    public String getName() {
        return name;
    }

    public String getSpecies() {
        return species;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getComment() {
        return comment;
    }

    public String getDate() {
        return date;
    }
}
