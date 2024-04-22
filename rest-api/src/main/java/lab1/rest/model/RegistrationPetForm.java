package lab1.rest.model;

import static lab1.rest.json.JsonParser.fromJson;

public class RegistrationPetForm {
    private final String id;
    private final String name;
    private final String species;
    private final String userEmail;

    public RegistrationPetForm(String id, String name, String species, String userEmail) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.userEmail = userEmail;
    }

    public static RegistrationPetForm createFromJson(String body) {
        return fromJson(body, RegistrationPetForm.class);
    }

    public String getId() {
        return id;
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
}

