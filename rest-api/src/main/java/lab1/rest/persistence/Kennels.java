package lab1.rest.persistence;

import lab1.rest.model.RegistrationKennelForm;
import lab1.rest.model.Kennel;
import lab1.rest.model.User;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
public class Kennels {
        private final EntityManager entityManager;

        public Kennels(EntityManager entityManager) {
            this.entityManager = entityManager;
        }

        public Kennel createKennel(RegistrationKennelForm signUpValues) {
            final Kennel newKennel = Kennel.create(signUpValues.getId(), signUpValues.getName(), signUpValues.getEmail(), signUpValues.getPassword(), signUpValues.getPhoneNumber(), signUpValues.getAddress(),signUpValues.getType());

            if (exists(newKennel.getEmail())) throw new IllegalStateException("User already exists.");

            entityManager.persist(newKennel);

            return newKennel;
        }
        public boolean deleteKennel(int id) {
            Optional<Kennel> optionalKennel = findById(id);
            if (optionalKennel.isPresent()) {
                Kennel kennel = optionalKennel.get();
                entityManager.remove(kennel);
                return true;
            }
            return false;
        }

        public boolean exists(String email) {
            return findByEmail(email).isPresent();
        }
        public Optional<Kennel> findByEmail(String email) {
            return entityManager.createQuery("SELECT u FROM Kennel u WHERE u.email LIKE :email", Kennel.class)
                    .setParameter("email", email).getResultList().stream()
                    .findFirst();
        }

        public Optional<Kennel> findById(int id) {
            return entityManager.createQuery("SELECT u FROM Kennel u WHERE u.id = :id", Kennel.class)
                    .setParameter("id", id).getResultList().stream()
                    .findFirst();
        }

        public List<Kennel> list() {
            return entityManager.createQuery("SELECT u FROM Kennel u", Kennel.class)
                    .getResultList();
        }

}
