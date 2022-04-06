package lab1.monolithic;

import lab1.monolithic.model.LoginForm;
import lab1.monolithic.model.RegistrationUserForm;
import lab1.monolithic.model.User;
import lab1.monolithic.repository.SystemRepository;
import lab1.monolithic.repository.Users;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public class MonolithicSystem {

    private final EntityManagerFactory factory;

    private MonolithicSystem(EntityManagerFactory factory) {
        this.factory = factory;
    }

    public static MonolithicSystem create(String persistenceUnitName) {
        final EntityManagerFactory factory = Persistence.createEntityManagerFactory(persistenceUnitName);
        return new MonolithicSystem(factory);
    }


    public User registerUser(RegistrationUserForm form) {
        return runInTransaction(datasource -> {

            final Users users = datasource.users();
            return users.exists(form.getEmail()) ? null : users.createUser(form);

        });
    }

    public Optional<User> findUserByEmail(String email) {
        return runInTransaction(
                ds -> ds.users().findByEmail(email)
        );
    }

    public List<User> listUsers() {
        return runInTransaction(
                ds -> ds.users().list()
        );
    }

    public Optional<User> checkLogin(LoginForm form) {
        return runInTransaction(ds -> {
            final Users users = ds.users();
            return users.findByEmail(form.getEmail())
                    .filter(foundUser -> validPassword(form, foundUser));
        });
    }

    private <E> E runInTransaction(Function<SystemRepository, E> closure) {
        final EntityManager entityManager = factory.createEntityManager();
        final SystemRepository ds = SystemRepository.create(entityManager);

        try {
            entityManager.getTransaction().begin();
            final E result = closure.apply(ds);
            entityManager.getTransaction().commit();
            return result;
        } catch (Throwable e) {
            e.printStackTrace();
            entityManager.getTransaction().rollback();
            throw e;
        } finally {
            entityManager.close();
        }
    }

    private boolean validPassword(LoginForm form, User foundUser) {
        // Super dummy implementation. Zero security
        return form.getPassword().equals(foundUser.getPassword());
    }
}
