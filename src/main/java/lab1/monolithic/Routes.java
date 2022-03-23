package lab1.monolithic;

import lab1.monolithic.model.LoginForm;
import lab1.monolithic.model.RegistrationUserForm;
import lab1.monolithic.model.User;
import spark.ModelAndView;
import spark.Request;
import spark.Route;
import spark.Session;
import spark.template.freemarker.FreeMarkerEngine;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static spark.Spark.*;

public class Routes {

    private static final String USER_SESSION_ID = "user";

    /**
     * TEMPLATES
     **/
    public static final String SIGN_UP_TEMPLATE = "register.ftl";
    public static final String LOGIN_TEMPLATE = "login.ftl";
    public static final String HOME_TEMPLATE = "home.ftl";

    /**
     * ROUTES
     **/
    public static final String STATUS_ROUTE = "/status";
    public static final String HOME_ROUTE = "/home";
    public static final String REGISTER_ROUTE = "/register";
    public static final String LOGIN_ROUTE = "/login";
    public static final String LOGOUT_ROUTE = "/logout";

    final static private MonolithicSystem system = new MonolithicSystem();

    public void create() {
        routes();
    }

    private void routes() {
        get(REGISTER_ROUTE, (req, res) -> render(SIGN_UP_TEMPLATE));
        post(REGISTER_ROUTE, (req, res) -> {
            final RegistrationUserForm form = RegistrationUserForm.createFromBody(req.body());

            final User user = system.registerUser(form);

            if (user != null) {
                res.redirect("/login?ok");
                return halt();
            } else {
                final Map<String, Object> model = Map.of("message", "User already exists");
                return render(model, SIGN_UP_TEMPLATE);
            }
        });

        get(LOGIN_ROUTE, (req, res) -> {
            final Optional<User> authenticatedUser = getAuthenticatedUser(req);

            if (authenticatedUser.isEmpty()) {
                final Map<String, Object> model = new HashMap<>();

                if (req.queryParams("ok") != null) model.put("message", "User created");

                return render(model, LOGIN_TEMPLATE);
            }

            res.redirect(HOME_ROUTE);
            return halt();
        });
        post(LOGIN_ROUTE, (req, res) -> {
            final Optional<User> authenticatedUser = getAuthenticatedUser(req);

            if (authenticatedUser.isEmpty()) {
                final LoginForm form = LoginForm.createFromBody(req.body());

                final Optional<User> validUser = system.checkLogin(form);

                if (validUser.isPresent()) {
                    setAuthenticatedUser(req, validUser.get());
                    res.redirect(HOME_ROUTE);
                    return halt();
                } else {
                    final Map<String, Object> model = new HashMap<>();
                    model.put("message", "Invalid user or password");
                    return render(model, LOGIN_TEMPLATE);
                }
            } else {
                res.redirect(LOGIN_ROUTE);
                return halt();
            }
        });

        get(LOGOUT_ROUTE, (req, res) -> {
            clearAuthenticatedUser(req);
            res.redirect(LOGIN_ROUTE);
            return halt();
        });

        get(STATUS_ROUTE, (req, res) -> "Monolithic App is up and running!");

        authenticatedGet(HOME_ROUTE, (req, res) -> render(HOME_TEMPLATE));
    }

    private void setAuthenticatedUser(Request req, User user) {
        Session session = req.session(true);
        session.attribute(USER_SESSION_ID, user.getEmail());
    }

    private void clearAuthenticatedUser(Request req) {
        req.session().invalidate();
    }

    private static void authenticatedGet(final String path, final Route route) {
        get(path, (request, response) -> {
            final Optional<User> authenticatedUser = getAuthenticatedUser(request);

            if (authenticatedUser.isPresent()) {
                return route.handle(request, response);
            } else {
                response.redirect(LOGIN_ROUTE);
                return halt();
            }
        });
    }

//    private static void unauthenticatedGet(final String path, final Route route) {
//        get(path, (request, response) -> {
//            final User authenticatedUser = getAuthenticatedUser(request);
//
//            if (authenticatedUser == null) {
//                return route.handle(request, response);
//            } else {
//                response.redirect("/home");
//                return halt();
//            }
//        });
//    }

    private Object render(Map<String, Object> model, String template) {
        return new FreeMarkerEngine().render(new ModelAndView(model, template));
    }

    private Object render(String template) {
        return new FreeMarkerEngine().render(new ModelAndView(Collections.emptyMap(), template));
    }

    private static Optional<User> getAuthenticatedUser(Request request) {
        final String email = request.session().attribute(USER_SESSION_ID);
        return Optional.ofNullable(email).flatMap(system::findUserByEmail);
    }
}
