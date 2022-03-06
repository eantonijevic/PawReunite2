package lab1.monolithic;

import lab1.monolithic.model.LoginForm;
import lab1.monolithic.model.RegistrationUserForm;
import lab1.monolithic.model.User;
import lab1.monolithic.repository.UserRepository;

public class MonolithicSystem {

    private final UserRepository userRepository = new UserRepository();

    public User registerUser(RegistrationUserForm form) {
        if (userRepository.exists(form.getEmail())) {
            return null;
        }
        return userRepository.createUser(form);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User checkLogin(LoginForm form) {
        final User foundUser = userRepository.findByEmail(form.getEmail());

        return foundUser != null && validPassword(form, foundUser) ? foundUser : null;
    }

    private boolean validPassword(LoginForm form, User foundUser) {
        return form.getPassword().equals(foundUser.getPassword());
    }
}
