#!/usr/bin/env bash

java -cp ../lib/hsqldb.jar org.hsqldb.server.WebServer --database.0 file:../db/mydb --dbname.0 xdb --port 9001