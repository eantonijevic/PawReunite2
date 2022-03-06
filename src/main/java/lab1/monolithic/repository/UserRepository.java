package lab1.monolithic.repository;

import lab1.monolithic.model.RegistrationUserForm;
import lab1.monolithic.model.User;

import java.util.ArrayList;
import java.util.List;

public class UserRepository {

    private final List<User> users = new ArrayList<>();

    public User createUser(RegistrationUserForm signUpValues) {
        final User newUser = User.create(signUpValues.getEmail(), signUpValues.getPassword());

        if (exists(newUser.getEmail())) throw new IllegalStateException("User already exists.");

        users.add(newUser);

        return newUser;
    }

    public boolean exists(String email) {
        return users.stream().anyMatch(user -> user.getEmail().equalsIgnoreCase(email));
    }

    public User findByEmail(String email) {
        return users.stream().filter(user -> user.getEmail().equalsIgnoreCase(email)).findFirst().orElse(null);
    }
}
