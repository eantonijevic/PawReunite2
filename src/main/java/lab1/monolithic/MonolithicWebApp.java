package lab1.monolithic;


import lab1.monolithic.persistence.Database;
import lab1.monolithic.persistence.EntityManagers;
import spark.Spark;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

public class MonolithicWebApp {

    private final Routes routes = new Routes();
    private final Database db = new Database();

    public void start() {
        startDatabase();
        startWebServer();
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("monolithic-db");
        EntityManagers.setFactory(entityManagerFactory);
    }

    public void stop() {
        stopWebServer();
        stopDatabase();
    }

    private void startDatabase() {
        db.startDBServer();
    }

    private void startWebServer() {
        staticFiles.location("public");
        port(4321);
        routes.create();
    }

    private void stopDatabase() {
        db.stopDBServer();
    }

    private void stopWebServer() {
        Spark.stop();
    }

}
