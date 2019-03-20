package austral.ing.lab1.repository;

import austral.ing.lab1.model.User;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

public class UserDB {

  private final EntityManager entityManager;

  public UserDB(EntityManager entityManager) {
    this.entityManager = entityManager;
  }

  public Optional<User> findById(Long id){
    return tx(() ->
      Optional.of(entityManager.find(User.class, id))
    );
  }

  public <R> R tx(Supplier<R> s) {
    final EntityTransaction tx = entityManager.getTransaction();

    try {
      tx.begin();

      R r = s.get();

      tx.commit();
      return r;
    } catch (Exception e) {
      tx.rollback();
      throw e;
    }
  }

  public void tx(Runnable r){
    final EntityTransaction tx = entityManager.getTransaction();

    try {
      tx.begin();

      r.run();

      tx.commit();
    } catch (Exception e) {
      tx.rollback();
      throw e;
    }
  }

  public Optional<User> findByEmail(String email){
    return Optional.empty();
  }

  public List<User> listAll() {
    return Collections.emptyList();
  }

  public User persist(User user) {
    final EntityTransaction tx = entityManager.getTransaction();

    try {
      tx.begin();

      entityManager.persist(user);

      tx.commit();
      return user;
    } catch (Exception e) {
      tx.rollback();
      throw e;
    }
  }
}
