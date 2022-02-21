package lab1.monolithic;


import spark.Spark;

import static spark.Spark.port;
import static spark.Spark.staticFiles;

public class MonolithicWebApp {

    private final Routes routes = new Routes();

    public void start() {
        staticFiles.location("public");
        port(4321);
        routes.create();
    }

    public void stop() {
        Spark.stop();
    }

}
