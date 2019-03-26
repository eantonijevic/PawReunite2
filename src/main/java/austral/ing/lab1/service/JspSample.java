package austral.ing.lab1.service;

import austral.ing.lab1.model.User;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static austral.ing.lab1.util.LangUtils.EMPTY_ARRAY;
import static austral.ing.lab1.util.LangUtils.notEmpty;
import static austral.ing.lab1.util.LangUtils.notNull;
import static java.lang.String.join;

@WebServlet("/jsp")
public class JspSample extends HttpServlet {


  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
    final String param1 = join(", ", notNull(req.getParameterValues("param1"), EMPTY_ARRAY));
    final String param2 = join(", ", notNull(req.getParameterValues("param2"), EMPTY_ARRAY));

    req.setAttribute("param1", notEmpty(param1, "None"));
    req.setAttribute("param2", notEmpty(param2, "None"));

    final User user = new User();
    user.setLastName("Doe");
    user.setFirstName("John");

    req.setAttribute("user", user);

    final RequestDispatcher view =   req.getRequestDispatcher("sample.jsp");
    view.forward(req, resp);
  }

}


