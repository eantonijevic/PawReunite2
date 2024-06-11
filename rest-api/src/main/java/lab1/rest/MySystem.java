package lab1.rest;

import lab1.rest.model.LostPet;
import lab1.rest.model.RegistrationPetForm;
import lab1.rest.model.RegistrationUserForm;
import lab1.rest.model.RegistrationKennelForm;
import lab1.rest.model.User;
import lab1.rest.model.Kennel;
import lab1.rest.persistence.Kennels;
import lab1.rest.persistence.LostPets;
import lab1.rest.persistence.Users;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public class MySystem {

    private final EntityManagerFactory factory;

    private MySystem(EntityManagerFactory factory) {
        this.factory = factory;
    }

    public static MySystem create(String persistenceUnitName) {
        final EntityManagerFactory factory = Persistence.createEntityManagerFactory(persistenceUnitName);
        return new MySystem(factory);
    }

    public Optional<User> registerUser(RegistrationUserForm form) {
        return runInTransaction(datasource -> {
            final Users users = datasource.users();
            return users.exists(form.getId()) ? Optional.empty() : Optional.of(users.createUser(form));
        });
    }
    public Optional<Kennel> registerKennel(RegistrationKennelForm form) {
        return runInTransaction(datasource -> {
            final Kennels kennels = datasource.kennels();
            return kennels.exists(form.getEmail()) ? Optional.empty() : Optional.of(kennels.createKennel(form));
        });
    }

    public Optional<User> findUserByEmail(String email) {
        return runInTransaction(
                ds -> ds.users().findByEmail(email)
        );
    }

    public Optional<User> findUserById(int id) {
        return runInTransaction(
                ds -> ds.users().findById(id)
        );
    }

    public Optional<LostPet> findLostPetByName(String name) {
        return runInTransaction(
                ds -> ds.lostPets().findByName(name)
        );
    }

    public List<User> listUsers() {
        return runInTransaction(
                ds -> ds.users().list()
        );
    }

    public Optional<LostPet> registerLostPet(RegistrationPetForm form) {
        return runInTransaction(datasource -> {
            final LostPets lostpets = datasource.lostPets();
            return lostpets.exists(form.getName()) ? Optional.empty() : Optional.of(lostpets.createLostPet(form));
        });
    }

    public List<LostPet> listLostPets() {
        return runInTransaction(
                ds -> ds.lostPets().list()
        );
    }


    private <E> E runInTransaction(Function<MySystemRepository, E> closure) {
        final EntityManager entityManager = factory.createEntityManager();
        final MySystemRepository ds = MySystemRepository.create(entityManager);

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

    public boolean validPassword(String password, User foundUser) {
        // Super dummy implementation. Zero security
        return foundUser.getPassword().equals(password);
    }

    public boolean deleteUser(int id) {
        return runInTransaction(datasource -> {
            final Users users = datasource.users();
            return users.deleteUser(id);
        });
    }

    public boolean deleteLostPet(String name) {
        return runInTransaction(datasource -> {
        final LostPets lostPets = datasource.lostPets();
        return lostPets.deleteLostPet(name);
    });
    }
    public boolean deleteKennel(int id) {
        return runInTransaction(datasource -> {
            final Kennels kennels = datasource.kennels();
            return kennels.deleteKennel(id);
        });
    }
}

