/*import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

class NotesDatabase {
  final String tableName = "notes";
  static Database? _database;

  Future<Database> get database async {
    if (_database != null) return _database!;

    _database = await openDatabase(
      join(await getDatabasesPath(), 'notes_database.db'),
      onCreate: (db, version) {
        return db.execute(
          "CREATE TABLE $tableName(id INTEGER PRIMARY KEY, title TEXT, content TEXT)",
        );
      },
      version: 1,
    );

    return _database!;
  }

  Future<void> insert(Note note) async {
    final db = await database;
    await db.insert(tableName, note.toMap());
  }

  Future<List<Note>> getAllNotes() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(tableName);
    return List.generate(maps.length, (i) {
      return Note(
        id: maps[i]['id'],
        title: maps[i]['title'],
        content: maps[i]['content'],
      );
    });
  }

  Future<void> update(Note note) async {
    final db = await database;
    await db.update(
      tableName,
      note.toMap(),
      where: "id = ?",
      whereArgs: [note.id],
    );
  }

  Future<void> delete(int id) async {
    await _database?.delete(tableName, where: 'id = ?', whereArgs: [id]);
  }
}

class Note {
  int? id;
  final String title;
  final String content;

  Note({
    this.id,
    required this.title,
    required this.content,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
      'content': content,
    };
  }
}*/
import 'package:flutter/material.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

class NotesDatabase {
  final String tableName = "notes";
  static Database? _database;

  Future<Database> get database async {
    if (_database != null) return _database!;

    _database = await openDatabase(
      join(await getDatabasesPath(), 'notes_database.db'),
      onCreate: (db, version) {
        return db.execute(
          "CREATE TABLE $tableName(id INTEGER PRIMARY KEY, title TEXT, content TEXT, color INTEGER)",
        );
      },
      version: 1,
    );

    return _database!;
  }

  Future<void> insert(Note note) async {
    final db = await database;
    await db.insert(tableName, note.toMap());
  }

  Future<List<Note>> getAllNotes() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(tableName);
    return List.generate(maps.length, (i) {
      return Note(
        id: maps[i]['id'],
        title: maps[i]['title'],
        content: maps[i]['content'],
        color: maps[i]['color'] != null
            ? maps[i]['color']
            : Colors.white
                .value, // Asigna un valor predeterminado si el color es nulo
      );
    });
  }

  Future<void> update(Note note) async {
    final db = await database;
    await db.update(
      tableName,
      note.toMap(),
      where: "id = ?",
      whereArgs: [note.id],
    );
  }

  Future<void> delete(int id) async {
    await _database?.delete(tableName, where: 'id = ?', whereArgs: [id]);
  }
}

class Note {
  int? id;
  final String title;
  final String content;
  int color; // Campo para almacenar el color de la nota

  Note({
    this.id,
    required this.title,
    required this.content,
    required this.color, // Añade el color en el constructor
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
      'content': content,
      'color': color, // Incluye el color en el mapeo de datos
    };
  }
}
