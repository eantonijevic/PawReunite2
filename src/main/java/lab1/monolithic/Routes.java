package lab1.monolithic;

import static spark.Spark.get;

public class Routes {

    public void create() {
        routes();
    }

    private void routes() {
        get("status", (req, res) -> "Monolithic App is up and running!");
    }
}
