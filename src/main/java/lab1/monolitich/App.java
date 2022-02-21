package lab1.monolitich;

import static spark.Spark.*;

public class App {

    public static void main(String[] args) {
        get("/", (req, resp) -> "Hello, World!!!");
    }

}
