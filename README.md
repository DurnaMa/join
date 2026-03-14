# Join – Kanban Board

Ein webbasiertes **Kanban-Board** inspiriert von [Trello](https://trello.com), entwickelt als Gruppenprojekt. Mit **Join** können Teams ihre Aufgaben visuell organisieren, priorisieren und den Fortschritt in Echtzeit verfolgen.

## Inhaltsverzeichnis

- [Über das Projekt](#über-das-projekt)
- [Features](#features)
- [Technologien](#technologien)
- [Projektstruktur](#projektstruktur)
- [Installation & Nutzung](#installation--nutzung)
- [Autoren](#autoren)

## Über das Projekt

**Join** ist ein Projektmanagement-Tool, das es Nutzern ermöglicht, Aufgaben auf einem Kanban-Board zu verwalten. Aufgaben können per **Drag & Drop** zwischen verschiedenen Spalten verschoben werden, um den aktuellen Fortschritt abzubilden.

Das Projekt wurde als **Gruppenarbeit** im Rahmen eines Kurses entwickelt.

## Features

- **Benutzer-Authentifizierung** – Registrierung (Sign Up) und Login mit E-Mail & Passwort sowie Gast-Login
- **Summary Dashboard** – Übersicht mit Key Metrics: Anzahl der Tasks nach Status, dringende Aufgaben und nächste Deadline
- **Kanban Board** – Vier Spalten: _To Do_, _In Progress_, _Await Feedback_ und _Done_
- **Drag & Drop** – Aufgaben per Drag & Drop zwischen Spalten verschieben
- **Task-Verwaltung** – Aufgaben erstellen, bearbeiten und löschen mit Titel, Beschreibung, Fälligkeitsdatum, Priorität, Kategorie und Subtasks
- **Kontakte verwalten** – Kontakte erstellen, bearbeiten und löschen; Kontakte den Aufgaben zuweisen
- **Aufgabensuche** – Schnelles Finden von Tasks über die Suchfunktion
- **Responsive Design** – Optimiert für Desktop und mobile Geräte mit separaten mobilen Templates
- **Datenschutz & Impressum** – Integrierte Seiten für Privacy Policy und Legal Notice

## Technologien

| Technologie                    | Verwendung                                                |
| ------------------------------ | --------------------------------------------------------- |
| **HTML5**                      | Seitenstruktur und Markup                                 |
| **CSS3**                       | Styling, Responsive Design, Animationen                   |
| **JavaScript (Vanilla)**       | Anwendungslogik, DOM-Manipulation, Drag & Drop            |
| **Firebase Realtime Database** | Backend – Speicherung von Nutzern, Kontakten und Aufgaben |

## Projektstruktur

```
join/
├── index.html                  # Startseite (Login)
├── script.js                   # Globale Funktionen & Firebase-Anbindung
├── style.css                   # Globale Styles
│
├── pages/                      # Unterseiten
│   ├── addTask.html            # Aufgabe erstellen
│   ├── board.html              # Kanban Board
│   ├── contacts.html           # Kontaktverwaltung
│   ├── summary.html            # Dashboard / Übersicht
│   ├── signUp.html             # Registrierung
│   ├── help.html               # Hilfeseite
│   ├── data-protection.html    # Datenschutz
│   └── legale-notice.html      # Impressum
│
├── js/                         # JavaScript-Module
│   ├── addTask.js              # Task-Erstellung Logik
│   ├── board.js                # Board-Rendering
│   ├── boardPopUp.js           # Board-PopUps (Task-Details / Bearbeitung)
│   ├── contacts.js             # Kontakte laden & verwalten
│   ├── taskManagement.js       # Task-CRUD-Operationen
│   ├── taskProcess.js          # Task-Verarbeitung & Drag-and-Drop
│   ├── signUplogIn.js          # Authentifizierung
│   ├── summeryGuest.js         # Summary-Dashboard Logik
│   ├── formularValidierung.js  # Formulare validieren
│   ├── includeTemplates.js     # HTML-Templates einbinden
│   └── templates.js            # HTML-Templates generieren
│
├── css/                        # Stylesheets
│   ├── board.css               # Board-Styles
│   ├── contacts.css            # Kontakte-Styles
│   ├── addTask.css             # Task-Erstellung Styles
│   ├── logIn.css               # Login-Styles
│   └── ...                     # Weitere komponentenspezifische Styles
│
├── assets/                     # Statische Ressourcen
│   ├── fonts/                  # Schriftarten
│   ├── icons/                  # Icons
│   └── img/                    # Bilder & Logos
│
├── templates/                  # Wiederverwendbare HTML-Templates
│   ├── header/                 # Header-Template
│   └── sidebar/                # Sidebar-Template
│
└── mobileTemplates/            # Mobile-spezifische Templates
    ├── header/                 # Mobiler Header
    └── footer/                 # Mobiler Footer
```

## Installation & Nutzung

1. **Repository klonen**

   ```bash
   git clone <repository-url>
   ```

2. **Projekt öffnen** – Da es sich um eine reine Frontend-Anwendung handelt, kann das Projekt direkt im Browser geöffnet werden:
   - `index.html` mit einem Browser öffnen, **oder**
   - Einen lokalen Server verwenden (z. B. VS Code _Live Server_ Extension)

3. **Loslegen** – Registrieren oder als Gast einloggen und das Kanban Board nutzen!

> **Hinweis:** Die Anwendung nutzt Firebase als Backend. Die Datenbank-URL ist bereits im Code konfiguriert.

## Autoren

Dieses Projekt wurde als Gruppenarbeit entwickelt von:

- Mahir Durna
- Dominik Lieblang
- Hardavan Alaie
