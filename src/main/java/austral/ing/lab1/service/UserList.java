package austral.ing.lab1.service;

import austral.ing.lab1.entity.Users;
import austral.ing.lab1.model.User;
import austral.ing.lab1.repository.UserDB;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static austral.ing.lab1.util.LangUtils.*;
import static java.lang.String.join;

@WebServlet("/secure/user-list")
public class UserList extends HttpServlet {


  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {

    final List<User> users = Users.listAll();

    req.setAttribute("users", users);

    final RequestDispatcher view = req.getRequestDispatcher("userList.jsp");
    view.forward(req, resp);
  }

}


