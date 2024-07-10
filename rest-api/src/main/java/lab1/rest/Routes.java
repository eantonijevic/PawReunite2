package lab1.rest;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import lab1.rest.json.JsonParser;
import lab1.rest.model.*;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static java.util.concurrent.TimeUnit.MINUTES;
import static lab1.rest.json.JsonParser.toJson;
import static spark.Spark.*;


public class Routes {

    public static final String REGISTER_ROUTE = "/register";
    public static final String Kennel_create_ROUTE = "/Kennel_create";

    public static final String REGISTERPET_ROUTE = "/registerpet";

    public static final String CURRENT_PET_REGISTER_ROUTE = "/registercurrentpet";
    public static final String AUTH_ROUTE = "/auth";
    public static final String USERS_ROUTE = "/users";

    public static final String PETS_ROUTE = "/lostpets";

    public static final String CURRENT_PETS_ROUTE = "/currentpets";

    private MySystem system;

    public void create(MySystem system) {
        this.system = system;
        routes();
    }

    private void routes() {
        before((req, resp) -> {
            resp.header("Access-Control-Allow-Origin", "*");
            resp.header("Access-Control-Allow-Headers", "*");
            resp.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH, OPTIONS");
        });
        options("/*", (req, resp) -> {
            resp.status(200);
            return "ok";
        });

        post(REGISTER_ROUTE, (req, res) -> {
            // UserSignUpDto data = req.body.toJson
            // data.type = USER
            final RegistrationUserForm form = RegistrationUserForm.createFromJson(req.body());

            system.registerUser(form).ifPresentOrElse(
                    (user) -> {
                        res.status(201);
                        res.body("user created");
                    },
                    () -> {
                        res.status(409);
                        res.body("user already exists");
                    }
            );

            return res.body();
        });

        post(AUTH_ROUTE, (req, res) -> {
            final AuthRequest authReq = AuthRequest.createFromJson(req.body());

            authenticate(authReq)
                    .ifPresentOrElse(token -> {
                        res.status(201);
                        res.body(toJson(Auth.create(token)));
                    }, () -> {
                        res.status(401);
                        res.body("");
                    });

            return res.body();
        });

        post(REGISTERPET_ROUTE, (req, res) -> {
            final RegistrationPetForm form = RegistrationPetForm.createFromJson(req.body());

            system.registerLostPet(form).ifPresentOrElse(
                    (lostPet) -> {
                        res.status(201);
                        res.body("Lost Pet created");
                    },
                    () -> {
                        res.status(409);
                        res.body("Pet already exists");
                    }
            );

            return res.body();
        });

        authorizedDelete(USERS_ROUTE, (req, res) -> {
            getUser(req).ifPresent(user -> {
                boolean deleted = system.deleteUser(user.getId());
                if (deleted) {
                    res.status(204);
                } else {
                    res.status(404);
                }
            });
            return "";
        });

        delete("/lostpets/:petId", (req, res) -> {
            getLostPetbyId(req).ifPresent(lostPet -> {
                boolean deleted = system.deleteLostPetbyId(lostPet.getId());
                if (deleted) {
                    res.status(204);
                } else {
                    res.status(404);
                }
            });
            res.status(404);
            return "";
        });

        delete("/currentpets/:petId", (req, res) -> {
            getCurrentPetbyId(req).ifPresent(currentPet -> {
                boolean deleted = system.deleteCurrentPetbyId(currentPet.getId());
                if (deleted) {
                    res.status(204);
                } else {
                    res.status(404);
                }
            });
            res.status(404);
            return "";
        });

        authorizedGet(USERS_ROUTE, (req, res) -> {
            final List<User> users = system.listUsers();
            return JsonParser.toJson(users);
        });

        get(PETS_ROUTE, (req, res) -> {
            final List<LostPet> lostPets = system.listLostPets();
            return JsonParser.toJson(lostPets);
        });

        get("/lostpets/:petId", (req, res) -> {
            String petId = req.params(":petId");
            Optional<LostPet> lostPet = system.findLostPetById(petId);
            if (lostPet.isPresent()) {
                return JsonParser.toJson(lostPet.get());
            } else {
                res.status(404);
                return "Pet not found";
            }
        });

        get(CURRENT_PETS_ROUTE, (req, res) -> {
            final List<CurrentPet> currentPets = system.listCurrentPets();
            return JsonParser.toJson(currentPets);
        });

        put("/lostpets/:petId", (req, res) -> {
            String petId = req.params(":petId");
            final RegistrationPetForm form = RegistrationPetForm.createFromJson(req.body());

            Optional<LostPet> updatedPet = system.updateLostPet(petId, form);
            if (updatedPet.isPresent()) {
                res.status(200);
                return JsonParser.toJson(updatedPet.get());
            } else {
                res.status(404);
                return "Pet not found";
            }
        });

        put("/currentpets/:petId", (req, res) -> {
            String petId = req.params(":petId");
            final RegistrationCurrentPetForm form = RegistrationCurrentPetForm.createFromJson(req.body());

            Optional<CurrentPet> updatedPet = system.updateCurrentPet(petId, form);
            if (updatedPet.isPresent()) {
                res.status(200);
                return JsonParser.toJson(updatedPet.get());
            } else {
                res.status(404);
                return "Current Pet not found";
            }
        });

        post(CURRENT_PET_REGISTER_ROUTE, (req, res) -> {
            final RegistrationCurrentPetForm form = RegistrationCurrentPetForm.createFromJson(req.body());

            system.registerCurrentPet(form).ifPresentOrElse(
                    (currentPet) -> {
                        res.status(201);
                        res.body("Current Pet created");
                    },
                    () -> {
                        res.status(409);
                        res.body("Current Pet already exists");
                    }
            );

            return res.body();
        });

        post(Kennel_create_ROUTE, (req, res) -> {
            final RegistrationKennelForm form = RegistrationKennelForm.createFromJson(req.body());

            system.registerKennel(form).ifPresentOrElse(
                    (kennel) -> {
                        res.status(201);
                        res.body("Assosiation create susessfuly");
                    },
                    () -> {
                        res.status(409);
                        res.body("Assosiation existing");
                    }
            );

            return res.body();
        });

    }

    private void authorizedGet(final String path, final Route route) {
        get(path, (request, response) -> authorize(route, request, response));
    }

    private void authorizedDelete(final String path, final Route route) {
        delete(path, (request, response) -> authorize(route, request, response));
    }

    private Object authorize(Route route, Request request, Response response) throws Exception {
        if (isAuthorized(request)) {
            return route.handle(request, response);
        } else {
            response.status(401);
            return "Unauthorized";
        }
    }

    private Optional<User> getUser(Request req) {
        return getToken(req)
                .map(emailByToken::getIfPresent)
                .flatMap(email -> system.findUserByEmail(email));
    }

    private Optional<LostPet> getLostPet(Request req) {
        return getToken(req)
                .map(nameByToken::getIfPresent)
                .flatMap(name -> system.findLostPetByName(name));
    }

    private Optional<LostPet> getLostPetbyId(Request req) {
        String petId = req.params(":petId");
        Optional<String> token = getToken(req);

        if (token.isPresent()) {
            String validToken = emailByToken.getIfPresent(token.get());
            if (validToken == null) {
                return Optional.empty();
            }

            return system.findLostPetById(petId);
        } else {
            return Optional.empty();
        }
    }
    private Optional<CurrentPet> getCurrentPetbyId(Request req) {
        String petId = req.params(":petId");
        Optional<String> token = getToken(req);

        if (token.isPresent()) {
            String validToken = emailByToken.getIfPresent(token.get());
            if (validToken == null) {
                return Optional.empty();
            }

            return system.findCurrentPetById(petId);
        } else {
            return Optional.empty();
        }
    }
    private final Cache<String, String> emailByToken = CacheBuilder.newBuilder()
            .expireAfterAccess(30, MINUTES)
            .build();

    private final Cache<String, String> nameByToken = CacheBuilder.newBuilder()
            .expireAfterAccess(30, MINUTES)
            .build();

    private Optional<String> authenticate(AuthRequest req) {
        return system.findUserByEmail(req.getEmail()).flatMap(foundUser -> {
            if (system.validPassword(req.getPassword(), foundUser)) {
                final String token = UUID.randomUUID().toString();
                emailByToken.put(token, foundUser.getEmail());
                return Optional.of(token);
            } else {
                return Optional.empty();
            }
        });
    }


    private boolean isAuthorized(Request request) {
        return getToken(request).map(this::isAuthenticated).orElse(false);
    }

    private static Optional<String> getToken(Request request) {
        return Optional.ofNullable(request.headers("Authorization"))
                .map(Routes::getTokenFromHeader);
    }

    private static String getTokenFromHeader(String authorizationHeader) {
        return authorizationHeader.replace("Bearer ", "");
    }

    private boolean isAuthenticated(String token) {
        return emailByToken.getIfPresent(token) != null;
    }
}
