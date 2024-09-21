---
title: Kommandozeilen-Interface Referenz
description: Referenz für das ShulkerScript Kommandozeilen-Tool
sidebar:
    label: CLI
---

Das ShulkerScript CLI ist ein Kommandozeilen-Tool zum Verwalten von ShulkerScript-Projekten.


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
- `--vcs`: Das gewünschte Versionskontrollsystem. Standardmäßig `git`.

## build
Baut das Projekt im angegebenen Pfad in das `dist`-Verzeichnis.
```bash
shulkerscript build [PATH]
```
- `PATH`: Der Pfad zum Verzeichnis, in dem sich das Projekt befindet. Standardmäßig das aktuelle Verzeichnis.

## package
Baut und verpackt das Projekt im angegebenen Pfad in eine `.zip`-Datei.
```bash
shulkerscript build --zip [PATH]
```