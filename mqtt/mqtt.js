import mqtt from "mqtt";

async function connectMqtt(client, topic) {
  while (true) {
    try {
      await new Promise((resolve) => {
        client.on("connect", () => {
          console.log(
            `Verbindung mit Mqtt-Broker hergestellt: ${client.connected}`
          );
          console.log(`Topic: ${topic}`);
          client.subscribe(topic);
          resolve();
        });
      });

      client.on("close", () => {
        console.log("Keine Verbindung zum Mqtt-Broker.");
      });

      // Wiederverbindungsintervall (z.B. 5 Sekunden)
      //console.log("Warte 5 Sekunden vor dem erneuten Verbinden...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
      console.error(
        "Fehler beim Herstellen der Verbindung mit dem Mqtt-Broker:",
        error
      );
      // Wiederverbindungsintervall (z.B. 5 Sekunden)
      console.log("Warte 5 Sekunden vor dem erneuten Verbinden...2");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

export {connectMqtt };
