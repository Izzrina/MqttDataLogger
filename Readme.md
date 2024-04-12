
##  Aktualisieren Sie Ihr System

Bevor Sie mit der Installation beginnen, ist es ratsam, sicherzustellen, dass Ihr Raspberry Pi auf dem neuesten Stand ist. Führen Sie dazu die folgenden Befehle aus:

```bash
sudo apt update
sudo apt upgrade
```

## Installation von Node.js und Package Manager

Node.js: Node.js ist eine Open-Source-JavaScript-Laufzeitumgebung, die es ermöglicht, JavaScript-Code außerhalb eines Webbrowsers auszuführen. Es basiert auf der V8-JavaScript-Engine von Google Chrome und ermöglicht die Entwicklung von serverseitigen Anwendungen. Node.js bietet eine ereignisgesteuerte, nicht-blockierende Architektur, die gut für die Entwicklung von skalierbaren und leistungsstarken Webanwendungen ist. Entwickler können mit Node.js Backend-Logik schreiben, APIs erstellen, Datenbanken abfragen und vieles mehr, alles mit JavaScript.

```bash
sudo apt install nodejs
```

npm (Node Package Manager): npm ist der Paketmanager für Node.js und die weltweit größte Software-Registry. Mit npm können Entwickler Pakete (auch als Module bezeichnet) installieren, verwalten und teilen, die Funktionalität zu ihren Node.js-Projekten hinzufügen. Es wird standardmäßig mit Node.js installiert und bietet Befehle zum Installieren, Aktualisieren, Entfernen und Verwalten von Abhängigkeiten in einem Projekt. Durch die Verwendung von npm können Entwickler auf eine Vielzahl von Bibliotheken und Tools zugreifen, um die Entwicklung von Node.js-Anwendungen zu erleichtern und zu beschleunigen.

```bash
sudo apt install npm
```
Überprüfen Sie ob die Installation erfolgreich war mit:

```bash
node -v
```
bzw.

```bash
npm -v 
```

## Installation von MariaDB auf dem Raspberry Pi

#### Installieren Sie MariaDB

Installieren Sie MariaDB, indem Sie den folgenden Befehl ausführen:

```bash
sudo apt install mariadb-server
```

#### Konfigurieren Sie die Sicherheit

MariaDB bietet ein Skript namens mysql_secure_installation, das Ihnen hilft, die Sicherheit Ihrer Installation zu verbessern. Führen Sie dieses Skript aus, indem Sie den folgenden Befehl eingeben:

```bash
sudo mysql_secure_installation
```
Das Skript wird Sie durch einige Sicherheitsmaßnahmen führen, einschließlich des Ändern des Root-Passworts, der Entfernung anonymer Benutzerkonten, der Deaktivierung der Fernanmeldung für den Root-Benutzer und der Entfernung der Testdatenbank. Sie können die vorgeschlagenen Optionen entsprechend Ihren Anforderungen auswählen.

#### Aktivieren Sie den automatischen Start

Um sicherzustellen, dass MariaDB beim Start des Raspberry Pi automatisch gestartet wird, können Sie den folgenden Befehl ausführen:

```bash
sudo systemctl enable mariadb
```

#### Starten Sie MariaDB manuell
Wenn Sie MariaDB manuell starten möchten, können Sie den folgenden Befehl ausführen:

```bash
sudo systemctl start mariadb
```

Dieser Befehl startet den MariaDB-Dienst sofort.

#### Überprüfen Sie den Status von MariaDB

Um den Status von MariaDB zu überprüfen, führen Sie den folgenden Befehl aus:

```bash
sudo systemctl status mariadb
```

Dieser Befehl zeigt den aktuellen Status von MariaDB an, einschließlich Informationen darüber, ob der Dienst aktiv (running) ist und ob es Probleme gibt.

#### Zugriff auf die MariaDB-Datenbank

Um auf die MariaDB-Datenbank über die Befehlszeile zuzugreifen, können Sie den Befehl `mysql` verwenden:

```bash
mysql -u root -p
```

## Globale Installation von PM2

PM2 ist ein Daemon-Prozess-Manager, der Ihnen helfen wird, Ihre Anwendung rund um die Uhr online zu halten und zu verwalten.

#### Installation von PM2

Um PM2 global auf Ihrem System zu installieren, können Sie den folgenden Befehl ausführen:

```bash
npm install -g pm2
```
PM2 bietet eine Vielzahl von Funktionen, darunter:

Daemon-Prozess-Manager: PM2 verwaltet Ihre Anwendungsprozesse als Daemons, was bedeutet, dass sie im Hintergrund laufen können, auch wenn Sie nicht angemeldet sind oder Ihr Terminalfenster geschlossen ist.

24/7 Verfügbarkeit: PM2 überwacht Ihre Anwendungen und stellt sicher, dass sie automatisch neu gestartet werden, falls sie abstürzen oder unerwartet beendet werden, um sicherzustellen, dass Ihre Anwendung rund um die Uhr verfügbar ist.

Logging und Monitoring: PM2 bietet umfangreiche Logging- und Überwachungsfunktionen, mit denen Sie den Status Ihrer Anwendungen überwachen, Protokolle anzeigen und bei Bedarf Fehlerbehebungsmaßnahmen ergreifen können.

Skalierung und Load Balancing: PM2 ermöglicht es Ihnen, mehrere Instanzen Ihrer Anwendung zu starten und automatisch den Lastenausgleich zwischen ihnen zu verteilen, um die Leistung und Verfügbarkeit Ihrer Anwendung zu verbessern.

Einfache Verwaltung: Mit PM2 können Sie Ihre Anwendungen einfach starten, stoppen, neu starten und verwalten, sowohl lokal als auch remote über eine benutzerfreundliche Befehlszeilenschnittstelle.

Durch die Verwendung von PM2 können Sie sicherstellen, dass Ihre Anwendungen stabil, zuverlässig und stets verfügbar sind, was besonders wichtig ist, wenn Sie produktive Umgebungen betreiben.

## Automatisches Anlegen der Datenbank für die Anwendung

Der Programmordner enhält eine Datei create_database.sql, die automatisch die passende Datenbank sowie einen Benutzer anlegt. 

```bash
sudo mysql -u root -p < Pfad-zur-Datei/create_database.sql
```
Überprüfen Sie ob das Anlegen der Datenbank erfolgreich war, indem sie auf mysql zugreifen.

Anzeigen der Datenbanken: SHOW DATABASES;

Zugriff auf die Datenbank: USE beebase;

Anzeigen der Tabellen: SHOW TABLES;

Überprüfung einzelner Tabellen: DESC *tabellenname*;

Anzeigen der Benutzer: SELECT User, Host FROM mysql.user;

Es ist natürlich auch möglich die in dem Script enthaltenen SQL-Statements anzupassen oder selbst auszuführen.


## Installation der Dependencies für das Node.js-Projekt

Wenn Sie das Node.js-Projekt von GitHub heruntergeladen haben und die Dependencies installieren möchten, führen Sie bitte die folgenden Schritte aus:

1. **Öffnen Sie ein Terminal**: Öffnen Sie ein Terminal oder eine Befehlszeile auf Ihrem System.

2. **Navigieren Sie zum Projektordner**: Verwenden Sie den `cd`-Befehl, um zum Verzeichnis zu navigieren, in das Sie das Node.js-Projekt heruntergeladen haben.

3. **Installieren Sie die Dependencies**: Führen Sie den folgenden Befehl aus, um die Dependencies zu installieren:

```bash
npm install
```
Dieser Befehl liest die Informationen aus der Datei `package.json` im Projektordner und installiert automatisch alle in dieser Datei aufgeführten Dependencies sowie deren Abhängigkeiten.

4. **Warten Sie, bis die Installation abgeschlossen ist**: Der Befehl `npm install` lädt die erforderlichen Pakete aus dem npm-Repository herunter und installiert sie lokal im Projektordner. Warten Sie, bis der Vorgang abgeschlossen ist.

5. **Überprüfen**: Überprüfen Sie nach Abschluss des Installationsvorgangs, ob alle Dependencies erfolgreich installiert wurden. Sie können dies überprüfen, indem Sie sicherstellen, dass ein Ordner namens `node_modules` im Projektordner erstellt wurde. Dieser Ordner enthält alle installierten Dependencies.

Das ist alles! Durch Ausführen des Befehls `npm install` im Projektordner sollten Sie alle erforderlichen Dependencies für das Node.js-Projekt installieren können, basierend auf den Informationen aus der `package.json`-Datei.

## Anlegen einer .env-Datei

Ein .env-Datei ist eine Textdatei, die Umgebungsvariablen für eine Anwendung oder ein Projekt enthält. Diese Variablen werden normalerweise als Schlüssel-Wert-Paare definiert, wobei der Schlüssel den Namen der Variablen angibt und der Wert den entsprechenden Wert enthält. Die .env-Datei wird oft verwendet, um sensible Informationen wie Zugangsdaten, API-Schlüssel oder Konfigurationsoptionen zu speichern, ohne sie direkt im Quellcode der Anwendung zu hinterlegen.

Das .env-Format ermöglicht es Entwicklern, Umgebungsvariablen einfach zu verwalten und in verschiedenen Umgebungen zu verwenden, wie z. B. Entwicklung, Test und Produktion. Die Werte in einer .env-Datei können dann von der Anwendung oder dem Projekt eingelesen werden, um die Konfiguration anzupassen oder auf vertrauliche Informationen zuzugreifen.

Der Name ".env" steht für "environment" (Umgebung) und wird von vielen Frameworks und Bibliotheken automatisch erkannt und geladen, um die Umgebungskonfiguration zu laden. Das .env-Format ist plattformunabhängig und wird in verschiedenen Umgebungen und Programmiersprachen verwendet.

Die Zugangsdaten und vertraulichen Informationen die für die Datenbank- und Mqtt-Verbindung notwendig sind, werden aus Sicherheitsgründen dieser Datei gespeichert, die im Projektordner angelegt werden muss.

## Starten der Anwendung mit PM2

Im Projektordner auführen:

```bash
pm2 start app.js
```

Liste der aktiven Anwendungen anzeigen:

```bash
pm2 list
```

| id | name  | mode | ↺  | status | cpu  | memory |
|----|-------|------|----|--------|------|--------|
| 0  | app   | fork | 0  | online | 0%   | 73.2mb |

Anwendung beenden:

```bash
pm2 stop app.js
```

Um die Anwendung automatisch beim Starten des Raspberry Pi zu starten, wird die laufende Konfiguration mit 

```bash
pm2 startup
```
einem Startup-Script hinzugefügt und mit 

```bash
pm2 save
```
gespeichert.

Die Konsolenausgabe und Fehlermeldungen der Anwendungen werden in Logfiles gespeichert. Die neuesten Meldungen können mit 

```bash
pm2 logs
```
angezeigt werden.



