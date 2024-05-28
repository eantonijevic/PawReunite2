package lab1.rest.model;

import static lab1.rest.json.JsonParser.fromJson;

public class RegistrationKennelForm {
        private final String type = "Kennel";
        private final int id;
        private final String name;
        private final String address;
        private final String phoneNumber;
        private final String email;
        private final String password;

        public RegistrationKennelForm(int id, String email, String password, String name, String address, String phoneNumber) {
            this.id = id;
            this.email = email;
            this.password = password;
            this.name = name;
            this.address = address;
            this.phoneNumber = phoneNumber;
        }

        public static RegistrationKennelForm createFromJson(String body) {
            return fromJson(body, RegistrationKennelForm.class);
        }

        public String getType() {return type;}
        public String getPassword() {
            return password;
        }
        public String getPhoneNumber() {
            return phoneNumber;
        }
        public String getAddress() {
            return address;
        }

        public String getEmail() {
            return email;
        }
        public String getName() {
            return name;
        }

        public int getId() { return id;
    }
}
