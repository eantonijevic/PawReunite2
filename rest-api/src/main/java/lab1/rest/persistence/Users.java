package lab1.rest.persistence;

import lab1.rest.model.RegistrationUserForm;
import lab1.rest.model.User;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class Users {

    private final EntityManager entityManager;

    public Users(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public User createUser(RegistrationUserForm signUpValues) {
        final User newUser = User.create(signUpValues.getId(),signUpValues.getName(), signUpValues.getEmail(), signUpValues.getPassword(),signUpValues.getType());

        if (exists(newUser.getId())) throw new IllegalStateException("User already exists.");

        entityManager.persist(newUser);

        return newUser;
    }
    public boolean deleteUser(int id) {
        Optional<User> optionalUser = findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            entityManager.remove(user);
            return true;
        }
        return false;
    }

    public boolean exists(int id) {
        return findById(id).isPresent();
    }
//
//    public Optional<User> findByEmail(String email) {
//        return entityManager.createQuery("SELECT u FROM User u WHERE u.email LIKE :email", User.class)
//                .setParameter("email", email).getResultList().stream()
//                .findFirst();
//    }
    public Optional<User> findById(int id) {
        return entityManager.createQuery("SELECT u FROM User u WHERE u.id LIKE :id", User.class)
                .setParameter("id", id).getResultList().stream()
                .findFirst();
    }

    public List<User> list() {
        return entityManager.createQuery("SELECT u FROM User u", User.class)
                .getResultList();
    }
}
