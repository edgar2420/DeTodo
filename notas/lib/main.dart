/*import 'package:flutter/material.dart';
import 'package:notas/notas.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: NoteList(),
      theme: ThemeData(
        primarySwatch:
            Colors.amber, // Color de acento similar al de Google Keep
      ),
    );
  }
}

class NoteList extends StatefulWidget {
  @override
  _NoteListState createState() => _NoteListState();
}

class _NoteListState extends State<NoteList> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _contentController = TextEditingController();
  final NotesDatabase _database = NotesDatabase();
  List<Note> _notes = [];
  Note? _editingNote;

  @override
  void initState() {
    super.initState();
    _loadNotes();
  }

  Future<void> _loadNotes() async {
    final notes = await _database.getAllNotes();
    setState(() {
      _notes = notes;
    });
  }

  Future<void> _saveNote() async {
    final title = _titleController.text;
    final content = _contentController.text;

    if (title.isNotEmpty || content.isNotEmpty) {
      final note = Note(
        title: title,
        content: content,
      );

      if (_editingNote == null) {
        await _database.insert(note);
      } else {
        note.id = _editingNote!.id;
        await _database.update(note);
      }

      _titleController.clear();
      _contentController.clear();
      _editingNote = null;
      _loadNotes();
    }

    Navigator.of(context).pop(); // Cierra el AlertDialog
  }

  Future<void> _editNote(Note note) async {
    _titleController.text = note.title;
    _contentController.text = note.content;
    setState(() {
      _editingNote = note;
    });

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Editar Nota'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              TextField(
                controller: _titleController,
                decoration: InputDecoration(
                  hintText: 'Título',
                ),
              ),
              TextField(
                controller: _contentController,
                decoration: InputDecoration(
                  hintText: 'Añadir nota...',
                ),
              ),
            ],
          ),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                _saveNote();
              },
              child: Text('Guardar'),
            ),
          ],
        );
      },
    );
  }

  Future<void> _deleteNote(int id) async {
    await _database.delete(id);
    _loadNotes();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Bloc de Notas Practico4'),
      ),
      body: ListView.builder(
        itemCount: _notes.length,
        itemBuilder: (context, index) {
          final note = _notes[index];
          return Dismissible(
            key: Key(note.id.toString()),
            onDismissed: (direction) {
              _deleteNote(note.id!);
            },
            background: Container(
              color: Colors.red,
              alignment: Alignment.centerRight,
              child: Padding(
                padding: EdgeInsets.only(right: 20.0),
                child: Icon(
                  Icons.delete,
                  color: Colors.white,
                ),
              ),
            ),
            child: Card(
              color: Colors.white, // Fondo de tarjeta blanco
              elevation: 2, // Sombra en la tarjeta
              child: ListTile(
                title: Text(
                  note.title,
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                subtitle: Text(note.content),
                onTap: () {
                  _editNote(note);
                },
              ),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          _titleController.clear();
          _contentController.clear();
          _editingNote = null;

          showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                title: Text('Nueva Nota'),
                content: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    TextField(
                      controller: _titleController,
                      decoration: InputDecoration(
                        hintText: 'Título',
                      ),
                    ),
                    TextField(
                      controller: _contentController,
                      decoration: InputDecoration(
                        hintText: 'Añadir nota...',
                      ),
                    ),
                  ],
                ),
                actions: <Widget>[
                  TextButton(
                    onPressed: () {
                      _saveNote();
                    },
                    child: Text('Guardar'),
                  ),
                ],
              );
            },
          );
        },
        child: Icon(Icons.add),
      ),
    );
  }
}*/
import 'package:flutter/material.dart';
import 'package:notas/notas.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: NoteList(),
      theme: ThemeData(
        primarySwatch:
            Colors.amber, // Color de acento similar al de Google Keep
      ),
    );
  }
}

class NoteList extends StatefulWidget {
  @override
  _NoteListState createState() => _NoteListState();
}

class _NoteListState extends State<NoteList> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _contentController = TextEditingController();
  final NotesDatabase _database = NotesDatabase();
  List<Note> _notes = [];
  Note? _editingNote;
  Color? selectedColor;

  @override
  void initState() {
    super.initState();
    _loadNotes();
  }

  Future<void> _loadNotes() async {
    final notes = await _database.getAllNotes();
    setState(() {
      _notes = notes;
    });
  }

  void _changeNoteColor(Color color) {
    setState(() {
      selectedColor = color;
    });
  }

  Future<void> _saveNote() async {
    final title = _titleController.text;
    final content = _contentController.text;

    if (title.isNotEmpty || content.isNotEmpty) {
      final note = Note(
        title: title,
        content: content,
        color:
            selectedColor != null ? selectedColor!.value : Colors.white.value,
      );

      if (_editingNote == null) {
        await _database.insert(note);
      } else {
        note.id = _editingNote!.id;
        await _database.update(note);
      }

      _titleController.clear();
      _contentController.clear();
      _editingNote = null;
      _loadNotes();
      selectedColor = null;
    }

    Navigator.of(context).pop(); // Cierra el AlertDialog
  }

  Future<void> _editNote(Note note) async {
    _titleController.text = note.title;
    _contentController.text = note.content;
    setState(() {
      _editingNote = note;
      selectedColor = note.color != null ? Color(note.color) : Colors.white;
    });

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Editar Nota'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              TextField(
                controller: _titleController,
                decoration: InputDecoration(
                  hintText: 'Título',
                ),
              ),
              TextField(
                controller: _contentController,
                decoration: InputDecoration(
                  hintText: 'Añadir nota...',
                ),
              ),
              ElevatedButton(
                onPressed: () {
                  _changeNoteColor(Colors
                      .red); // Cambia esto para mostrar una lista de colores o un selector de colores
                },
                child: Text('Seleccionar color'),
              ),
            ],
          ),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                _saveNote();
              },
              child: Text('Guardar'),
            ),
          ],
        );
      },
    );
  }

  Future<void> _deleteNote(int id) async {
    await _database.delete(id);
    _loadNotes();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Bloc de Notas Practico4'),
      ),
      body: ListView.builder(
        itemCount: _notes.length,
        itemBuilder: (context, index) {
          final note = _notes[index];
          return Dismissible(
            key: Key(note.id.toString()),
            onDismissed: (direction) {
              _deleteNote(note.id!);
            },
            background: Container(
              color: Colors.red,
              alignment: Alignment.centerRight,
              child: Padding(
                padding: EdgeInsets.only(right: 20.0),
                child: Icon(
                  Icons.delete,
                  color: Colors.white,
                ),
              ),
            ),
            child: Card(
              color: Color(note.color), // Usar el color de la nota
              elevation: 2,
              child: ListTile(
                title: Text(
                  note.title,
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                subtitle: Text(note.content),
                onTap: () {
                  _editNote(note);
                },
              ),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          _titleController.clear();
          _contentController.clear();
          _editingNote = null;

          showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                title: Text('Nueva Nota'),
                content: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    TextField(
                      controller: _titleController,
                      decoration: InputDecoration(
                        hintText: 'Título',
                      ),
                    ),
                    TextField(
                      controller: _contentController,
                      decoration: InputDecoration(
                        hintText: 'Añadir nota...',
                      ),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        _changeNoteColor(Colors
                            .red); // Cambia esto para mostrar una lista de colores o un selector de colores
                      },
                      child: Text('Seleccionar color'),
                    ),
                  ],
                ),
                actions: <Widget>[
                  TextButton(
                    onPressed: () {
                      _saveNote();
                    },
                    child: Text('Guardar'),
                  ),
                ],
              );
            },
          );
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
