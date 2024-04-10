import mysql from "mysql2/promise"

import dotenv from "dotenv";
dotenv.config();

let retryCount = 0;
const maxRetries = 10; // Maximale Anzahl von Wiederholungsversuchen
const retryInterval = 5000; //Intervall für Wiedeholungsversuche

let pool;
 let isCleanup = false; // prüfen ob Cleanup schon ausgeführt wurde
 
/**
 * Verbindung mit der Datenbank herstellen
 * Es wird dabei ein Connectionpool erstellt 
 */
async function connectDatabase() {
  try {
    pool = mysql.createPool({
      host: 'localhost',
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 5,
      maxIdle: 5,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    });

    await pool.getConnection();
    console.log('Connectionpool erstellt.');
  } catch (error) {
    console.error('Fehler beim Herstellen der Datenbankverbindung:', error);
    throw error;
  }
}

/**
 * Verbindung mit der Datenbank
 * Es werden eine gegebene Anzahl von Verbindungsversuchen (maxRetries) in einem angegebenen Intervall (retryIntervall)
 * durchgeführt, bis entweder eine Verbindung hergestellt oder die maximale Anzahl von Verbindungsversuchen erreicht wurde
 * @returns true wenn eine Verbindung hergestellt wurde und false falls eine Verbindung zur Datenbank nicht möglich ist
 */

  async function connectWithRetry() {
    try {
      await connectDatabase();
      console.log('Verbindung zur Datenbank hergestellt.');
      return true; // Erfolgsmeldung zurückgeben
    } catch (error) {
      console.error('Verbindung zur Datenbank unterbrochen:', error);
      retryCount++;
  
      if (retryCount >= maxRetries) {
        console.error(`Maximale Anzahl von Wiederholungsversuchen (${maxRetries}) erreicht.`);
        // Hier können Sie den Administrator benachrichtigen, z.B. per E-Mail oder anderem Nachrichtendienst
        //sendAdminNotification('Verbindung zur Datenbank konnte nicht wiederhergestellt werden.');
        return false; // Fehlermeldung zurückgeben
      }
  
      // Timer für Wiederholungsversuche
      setTimeout(connectWithRetry, retryInterval); // Erneuter Versuch nach retryInterval
      return false; // Fehlermeldung zurückgeben
    }
  }

  /**
   * Ermöglicht das Einfügen von Daten aus einem JSON-Objekt in eine MySQL-Datenbanktabelle.
   * Erstellt ein INSERT SQL-Statement basierend auf den bereitgestellten Daten und führt dieses Statement
   *  in der Datenbank aus.
   * @param {String} table Der Name der Zieltabelle, in die die Daten eingefügt werden sollen.
   * @param {Object} jsonData Json das die Daten enthält
   * Die Funktion gibt eine Promise zurück, die entweder erfolgreich aufgelöst wird und die Ergebnisse 
   * des Datenbank-Einfügevorgangs enthält oder abgelehnt wird, wenn ein Fehler auftritt.
   */

  async function writeDatatoDatabase(table, jsonData) {
    try {
        //  Keys  (Spaltennamen) und Values (einzufügende Werte) aus jsonData extrahieren
        const columns = Object.keys(jsonData);
        const values = Object.values(jsonData);

        // Platzhalter für die VALUES-Klausel des SQL-Querys
        const placeholders = Array.from({ length: columns.length }, () => '?').join(', ');

        // SQL-Query-String
        const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;

        // Ausführen
        const [results, _] = await pool.execute(query, values);

        console.log('Datensatz erfolgreich eingefügt');
        return results;
    } catch (error) {
        console.error('Fehler beim Einfügen in die MySQL-Datenbank:', error);
        // Versuch die Verbindung zur Datenbank wiederherzustellen
        const isConnected = await connectWithRetry();
        // Wenn die Verbindung wiederhergestellt wurde, versuchen Sie erneuterneuter Versuch die Daten einzufügen
        if (isConnected){
        try {
            const columns = Object.keys(jsonData);
            const values = Object.values(jsonData);
            const placeholders = Array.from({ length: columns.length }, () => '?').join(', ');
            const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
            const [results, _] = await pool.execute(query, values);
            console.log('Datensatz erfolgreich eingefügt');
            return results;
        } catch (retryError) {
            console.error('Fehler beim erneuten Einfügen in die MySQL-Datenbank:', retryError);
            throw retryError; // Fehler, falls das erneute Einfügen fehlschlägt
        }
      }
    }
}

/**
 * Die Funktion cleanupDatabase wird verwendet, um die Verbindung zur Datenbank zu schließen 
 * und alle damit verbundenen Ressourcen freizugeben. Dies ist nützlich, um sicherzustellen, dass die Anwendung 
 * ordnungsgemäß beendet wird und keine offenen Datenbankverbindungen zurückbleiben.
 * Die Funktion sollte in der Regel aufgerufen werden, wenn die Anwendung heruntergefahren oder beendet wird, 
 * um sicherzustellen, dass die Datenbankverbindung sauber geschlossen wird.
 */

  function cleanupDatabase() {
    if (!isCleanup) {
      isCleanup = true; // Auf true setzen, um mehrfache Aufrufe zu verhindern
      if (pool) {
        pool.end((err) => {
          if (err) {
            console.error('Fehler beim Schließen der Datenbankverbindung:', err);
          } else {
            console.log('Datenbankverbindung geschlossen.');
          }
        });
      }
    }
  }

  export { connectDatabase, connectWithRetry, cleanupDatabase, writeDatatoDatabase }