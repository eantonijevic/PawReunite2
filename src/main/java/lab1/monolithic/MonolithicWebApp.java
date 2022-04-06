package lab1.monolithic;


import spark.Spark;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

public class MonolithicWebApp {

    private final Routes routes = new Routes();

    public void start() {
        startWebServer();
    }

    public void stop() {
        stopWebServer();
    }

    private void startWebServer() {
        staticFiles.location("public");
        port(4321);
        final MonolithicSystem system = MonolithicSystem.create("monolithic-db");
        routes.create(system);
    }

    private void stopWebServer() {
        Spark.stop();
    }

}
