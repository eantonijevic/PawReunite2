package lab1.monolithic.repository;

import lab1.monolithic.model.RegistrationUserForm;
import lab1.monolithic.model.User;

import javax.persistence.EntityTransaction;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static lab1.monolithic.persistence.EntityManagers.currentEntityManager;
import static lab1.monolithic.persistence.Transactions.tx;

public class Users {

    public User createUser(RegistrationUserForm signUpValues) {
        final User newUser = User.create(signUpValues.getEmail(), signUpValues.getPassword());

        if (exists(newUser.getEmail())) throw new IllegalStateException("User already exists.");

        return persist(newUser);
    }

    public boolean exists(String email) {
        return findByEmail(email).isPresent();
    }

    public Optional<User> findByEmail(String email) {
        return tx(() -> currentEntityManager()
                .createQuery("SELECT u FROM User u WHERE u.email LIKE :email", User.class)
                .setParameter("email", email).getResultList()).stream()
                .findFirst();
    }

    public User persist(User user) {
        final EntityTransaction tx = currentEntityManager().getTransaction();

        try {
            tx.begin();

            currentEntityManager().persist(user);

            tx.commit();
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            tx.rollback();
            throw e;
        }
    }
}
