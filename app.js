import express from "express";
const app = express();

import mqtt from "mqtt";

import dotenv from "dotenv";
dotenv.config();

import { cleanupDatabase, connectWithRetry, writeDatatoDatabase } from "./database/database.js";

import { connectMqtt } from "./mqtt/mqtt.js";

const topic = process.env.TOPIC + "#";
console.log(topic)
const apiKey = process.env.API_KEY;
console.log(apiKey)
const userTTN = process.env.TTN_USER;
console.log(userTTN)
const brokerURL = process.env.BROKER_URL;
console.log(brokerURL)

const client = mqtt.connect(brokerURL, {
  username: userTTN,
  password: apiKey,
});

connectMqtt(client, topic);
console.log("test");


//const table = process.env.MYSQL_TABLE;
let data = {};

// Eine Nachricht von dem Topic empfangen
client.on("message", async (topic, message) => {
  try {
    //message in Json-Format umwandeln
    const jsonData = JSON.parse(message.toString());

    // console.log("**************Empfangene Daten**************");
    // console.log(jsonData);
    // console.log("********************************");

    /*Hier kann man die Daten die man in die Datenbank schreiben möchte anpassen. 
    Hierbei gilt zu beachten, dass die Reihenfolge und Benennung den Spalten der Tabelle entspricht,
    in die sie eingefügt werden sollen. */

    const payload = jsonData.uplink_message.decoded_payload;
    const table = process.env.MYSQL_TABLE;

    data = {
      dev_eui: jsonData.end_device_ids.dev_eui,
      received_at: new Date(jsonData.received_at),
      ...payload
    };

    console.log("************Daten zum Einfügen****************");
    console.log(data);
    console.log("********************************************");

    writeDatatoDatabase(table, data);
  } catch (error) {
    console.error("Fehler beim Empfang der Daten:", error);
  }
});

const port = process.env.PORT || 5000;

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

const startApp = async () => {
  try {
    const isConnected = await connectWithRetry();
    if (isConnected) {
      startServer(); // Start der Serveranwendung, wenn die Verbindung zur Datenbank erfolgreich hergestellt wurde
    } else {
      console.error(
        "Verbindung zur Datenbank konnte nicht hergestellt werden."
      );
    }
    process.on("exit", cleanupDatabase);
    process.on("SIGINT", cleanupDatabase); // Für das SIGINT-Signal (z.B. Strg+C)
    process.on("uncaughtException", (err) => {
      console.error("Unbehandelter Fehler:", err);
      cleanupDatabase();
      process.exit(1); // Prozess mit einem Fehlercode beenden
    });
  } catch (error) {
    console.error("Fehler beim Starten der Anwendung:", error);
  }
};

startApp();
