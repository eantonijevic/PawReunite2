package austral.ing.lab1.service;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static austral.ing.lab1.util.LangUtils.EMPTY_ARRAY;
import static austral.ing.lab1.util.LangUtils.notEmpty;
import static austral.ing.lab1.util.LangUtils.notNull;
import static java.lang.String.join;

@WebServlet("/servlet")
public class ServletExample extends HttpServlet {


  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    final String param1 = join(", ", notNull(req.getParameterValues("param1"), EMPTY_ARRAY));
    final String param2 = join(", ", notNull(req.getParameterValues("param2"), EMPTY_ARRAY));


    final PrintWriter out = resp.getWriter();


    out.println("<html>");
    out.println("  <head>");
    out.println("    <title>Ejemplo Servlet</title>");
    out.println("  </head>");
    out.println("  <body>");
    out.println("    <h1>Ejemplo Servlet</h1>");
    out.println("    <ul>");
    out.println("      <li> param1: " +  notEmpty(param1, "None") + "</li>");
    out.println("      <li> param2: " +  notEmpty(param2, "None") + "</li>");
    out.println("    </ul>");
    out.println("  </body>");
    out.println("</html>");

    out.flush();
  }

}


