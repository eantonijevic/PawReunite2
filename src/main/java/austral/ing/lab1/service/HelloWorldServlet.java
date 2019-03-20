package austral.ing.lab1.service;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/report")
public class HelloWorldServlet extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


    String param1 = String.join(", ", req.getParameterValues("param1"));
    String param2 = String.join(", ", req.getParameterValues("param2"));

    final PrintWriter writer = resp.getWriter();

    writer.print("<html>\n" +
      "  <head>\n" +
      "    <title>$Title$</title>\n" +
      "  </head>\n" +
      "  <body>\n" +
      "    <ul>" + param1 + "</ul>" +
      "    <ul>" + param2 + "</ul>" +
      "  </body>\n" +
      "</html>");
    writer.flush();


  }

}


