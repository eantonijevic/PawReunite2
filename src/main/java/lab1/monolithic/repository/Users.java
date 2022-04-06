package lab1.monolithic.repository;

import lab1.monolithic.model.RegistrationUserForm;
import lab1.monolithic.model.User;
import lab1.monolithic.persistence.Transactions;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static lab1.monolithic.persistence.EntityManagers.currentEntityManager;
import static lab1.monolithic.persistence.Transactions.tx;

public class Users {

    private final EntityManager entityManager;

    public Users(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public User createUser(RegistrationUserForm signUpValues) {
        final User newUser = User.create(signUpValues.getEmail(), signUpValues.getPassword());

        if (exists(newUser.getEmail())) throw new IllegalStateException("User already exists.");

        entityManager.persist(newUser);

        return newUser;
    }

    public boolean exists(String email) {
        return findByEmail(email).isPresent();
    }

    public Optional<User> findByEmail(String email) {
        return entityManager.createQuery("SELECT u FROM User u WHERE u.email LIKE :email", User.class)
                .setParameter("email", email).getResultList().stream()
                .findFirst();
    }

    public List<User> list() {
        return entityManager.createQuery("SELECT u FROM User u", User.class)
                .getResultList();
    }
}
