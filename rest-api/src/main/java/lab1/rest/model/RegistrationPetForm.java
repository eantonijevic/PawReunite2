package lab1.rest.model;

import static lab1.rest.json.JsonParser.fromJson;

public class RegistrationPetForm {
    private final String name;
    private final String species;
    private final String userEmail;

    private final String comment;

    public RegistrationPetForm(String name, String species, String userEmail, String comment) {
        this.name = name;
        this.species = species;
        this.userEmail = userEmail;
        this.comment = comment;
    }

    public static RegistrationPetForm createFromJson(String body) {
        return fromJson(body, RegistrationPetForm.class);
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
}

