package austral.ing.lab1.listener;

import austral.ing.lab1.util.EntityManagers;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import static austral.ing.lab1.util.Servlets.setEntityManagerFactory;

@WebListener
public class EntityManagerFactoryLifecycle implements ServletContextListener {

  private static EntityManagerFactory emf;

  @Override
  public void contextInitialized(ServletContextEvent sce) {
    emf = Persistence.createEntityManagerFactory("test");
    EntityManagers.setFactory(emf);
  }

  @Override
  public void contextDestroyed(ServletContextEvent sce) {
    setEntityManagerFactory(sce.getServletContext(), null);
    emf.close();
  }

}
