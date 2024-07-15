package lab1.rest.model;

import static lab1.rest.json.JsonParser.fromJson;

public class RegistrationPetForm {
    private final String name;
    private final String species;
    private final String userEmail;

    private final String comment;

    private final Boolean adopp;

    public RegistrationPetForm(String name, String species, String userEmail, String comment, Boolean adopp) {
        this.name = name;
        this.species = species;
        this.userEmail = userEmail;
        this.comment = comment;
        this.adopp = adopp;
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

    public Boolean getAdopp() { return adopp;}
    }


