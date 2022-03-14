package lab1.monolithic;

import lab1.monolithic.model.LoginForm;
import lab1.monolithic.model.RegistrationUserForm;
import lab1.monolithic.model.User;
import lab1.monolithic.repository.Users;

import java.util.Optional;

public class MonolithicSystem {

    private Users users = new Users();

    public User registerUser(RegistrationUserForm form) {
        return users.exists(form.getEmail()) ? null : users.createUser(form);
    }

    public Optional<User> findUserByEmail(String email) {
        return users.findByEmail(email);
    }

    public Optional<User> checkLogin(LoginForm form) {
        return users.findByEmail(form.getEmail())
                .filter(foundUser -> validPassword(form, foundUser));
    }

    private boolean validPassword(LoginForm form, User foundUser) {
        return form.getPassword().equals(foundUser.getPassword());
    }
}
