package austral.ing.lab1.repository;

import austral.ing.lab1.entity.Users;
import austral.ing.lab1.model.User;
import austral.ing.lab1.util.EntityManagers;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.greaterThan;
import static org.junit.Assert.assertThat;

public class UsersTest {
  private EntityManagerFactory managerFactory;

  @After
  public void tearDown() throws Exception {
    managerFactory.close();
  }

  @Before
  public void setUp() {
    managerFactory = Persistence.createEntityManagerFactory("test");
    EntityManagers.setFactory(managerFactory);
  }

  @Test
  public void createUser() {
    final User user = new User();

    user.setEmail("diego.larralde@gmail.com");
    user.setFirstName("Diego");
    user.setLastName("Larralde");

    assertThat(Users.persist(user).getId(), greaterThan(0L));

    final Optional<User> persistedUser = Users.findById(user.getId());

    assertThat(persistedUser.isPresent(), is(true));
    assertThat(persistedUser.get().getEmail(), is("diego.larralde@gmail.com"));
    assertThat(persistedUser.get().getFirstName(), is("Diego"));
    assertThat(persistedUser.get().getLastName(), is("Larralde"));

    Optional<User> byEmail = Users.findByEmail(persistedUser.get().getEmail());
    System.out.println(byEmail);
  }

}