---
title: Kommandozeilen-Interface Referenz
description: Referenz für das Shulkerscript Kommandozeilen-Tool
sidebar:
    label: CLI
---

Das Shulkerscript CLI ist ein Kommandozeilen-Tool zum Verwalten von Shulkerscript-Projekten.


## init
Initialisiert ein Projekt im angegebenen Pfad.
Erstellt Projektdateien und -verzeichnisse.
```bash
shulkerscript init [OPTIONS] [PATH]
```
- `PATH`: Der Pfad zu dem Verzeichnis, in dem das Projekt erstellt werden soll. Standardmäßig das aktuelle Verzeichnis.

Optionen:
- `--force`: Erlaubt das Initialisieren in einem nicht-leeren Verzeichnis.
- `--name`: Der Name des Projekts. Standardmäßig der Name des Verzeichnisses.
- `--description`: Die Beschreibung des Projekts.
- `--pack-format`: Das Format des Packs. Standardmäßig `26`.
- `--icon`: Pfad zu der Icon-Datei. Für das Standard-Icon leer lassen.
- `--batch`: Keine fehlenden Daten durch Eingaben anfordern, Standardwerte verwenden oder fehlschlagen.
- `--vcs`: Das gewünschte Versionskontrollsystem. Standardmäßig `git`.

## build
Baut das Projekt im angegebenen Pfad in das `dist`-Verzeichnis.
```bash
shulkerscript build [OPTIONS] [PATH]
```
- `PATH`: Der Pfad zum Verzeichnis, in dem sich das Projekt befindet. Standardmäßig das aktuelle Verzeichnis.

Optionen:
- `--assets <ASSETS>`  Pfad zum Assets-Ordner [Standard: `./assets`]
- `--output <OUTPUT>`  Ausgabe-Ordner, überschreibt die `DATAPACK_DIR` Umgebungsvariable
- `--no-validate`      Validierung des Pack-Formats überspringen
- `--zip`              Verpackt die Ausgabe in eine Zip-Datei

Umgebungsvariablen:
- `DATAPACK_DIR`       Ausgabe-Ordner [Standard: `./dist`]

## watch
```bash
shulkerscript watch [OPTIONS] [PATH]
```
- `PATH`: Pfad des zu beobachtenden Ordners [Standard: `.`]

Optionen:
- `--no-initial`                     Den Befehl nicht initial ausführen
- `--debounce-time <DEBOUNCE_TIME>`  Die zu wartende Zeit in ms nach der letzten Änderung bevor der Befehl erneut ausgeführt wird [default: `2000`]
- `--execute <COMMAND>`              Die Shulkerscript Befehle, die im Projekt ausgeführt werden sollen, wenn Änderungen erkannt wurden [Mehrfach-Argument, Standard: `build .`]
- `--no-execute`                     Keine vordefinierten Shulkerscript Befehle ausführen
- `--shell`                          Die Shell-Befehle, die im Projekt ausgeführt werden sollen, wenn Änderungen erkannt wurden [Mehrfach-Argument]

## clean
Reinigt das Ausgabeverzeichnis des Projekts im angegebenen Pfad.
```bash
shulkerscript clean [OPTIONS] [PATH]
```
- `PATH`: Der Pfad des Projektordners, der gereinigt werden soll [Standard: `.`]

Optionen:
- `--output <OUTPUT>`  Der Ausgabeordner, überschreibt die `DATAPACK_DIR` Umgebungsvariable
- `--all`              Löscht alle Dateien im Ausgabeverzeichnis, auch wenn sie nicht vom Projekt stammen
- `--force`            Notwendig für `--all`, um das Löschen aller Dateien zu bestätigen

Umgebungsvariablen:
- `DATAPACK_DIR`       Der Ausgabeordner [Standard: `./dist`]