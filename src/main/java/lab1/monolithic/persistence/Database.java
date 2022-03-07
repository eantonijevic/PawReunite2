package lab1.monolithic.persistence;

import org.hsqldb.persist.HsqlProperties;

import java.sql.Connection;
import java.sql.DriverManager;

public class Database {

    final String dbLocation = "/tmp/db";
    org.hsqldb.server.Server server;
    Connection dbConn = null;

    public void startDBServer() {
        HsqlProperties props = new HsqlProperties();
        props.setProperty("server.database.0", "file:" + dbLocation + "mydb;");
        props.setProperty("server.dbname.0", "xdb");
        server = new org.hsqldb.Server();
        try {
            server.setProperties(props);
        } catch (Exception e) {
            return;
        }
        server.start();
    }

    public void stopDBServer() {
        server.shutdown();
    }

    public Connection getDBConn() {
        try {
            Class.forName("org.hsqldb.jdbcDriver");
            dbConn = DriverManager.getConnection(
                    "jdbc:hsqldb:hsql://localhost/xdb", "SA", "");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dbConn;
    }
}