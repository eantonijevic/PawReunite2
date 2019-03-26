package austral.ing.lab1.listener;

import austral.ing.lab1.util.EntityManagers;

import javax.persistence.EntityManagerFactory;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static austral.ing.lab1.util.Servlets.getEntityManagerFactory;

@WebFilter(urlPatterns = "/*")
public class CloseEntityManagerFilter extends HttpFilter {

  @Override
  protected void doFilter(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
    try {
      super.doFilter(req, res, chain);

    } finally {
      EntityManagers.close();
    }
  }

}
