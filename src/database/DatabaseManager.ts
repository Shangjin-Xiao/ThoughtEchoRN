import SQLite from 'react-native-sqlite-storage';
import { Note, NoteCreate, NoteUpdate } from '../types/Note';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

class DatabaseManager {
  private database: SQLite.SQLiteDatabase | null = null;

  async initDatabase(): Promise<void> {
    try {
      this.database = await SQLite.openDatabase({
        name: 'ThoughtEcho.db',
        location: 'default',
      });
      
      await this.createTables();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.database) {
      throw new Error('Database not initialized');
    }

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await this.database.executeSql(createTableQuery);
  }

  async createNote(noteData: NoteCreate): Promise<Note> {
    if (!this.database) {
      throw new Error('Database not initialized');
    }

    const now = new Date();
    const insertQuery = `
      INSERT INTO notes (title, content, createdAt, updatedAt) 
      VALUES (?, ?, ?, ?);
    `;

    const result = await this.database.executeSql(insertQuery, [
      noteData.title,
      noteData.content,
      now.toISOString(),
      now.toISOString(),
    ]);

    const insertId = result[0].insertId;
    return this.getNoteById(insertId);
  }

  async getAllNotes(): Promise<Note[]> {
    if (!this.database) {
      throw new Error('Database not initialized');
    }

    const selectQuery = 'SELECT * FROM notes ORDER BY updatedAt DESC;';
    const result = await this.database.executeSql(selectQuery);
    
    const notes: Note[] = [];
    const rows = result[0].rows;
    
    for (let i = 0; i < rows.length; i++) {
      const row = rows.item(i);
      notes.push({
        id: row.id,
        title: row.title,
        content: row.content,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt),
      });
    }
    
    return notes;
  }

  async getNoteById(id: number): Promise<Note> {
    if (!this.database) {
      throw new Error('Database not initialized');
    }

    const selectQuery = 'SELECT * FROM notes WHERE id = ?;';
    const result = await this.database.executeSql(selectQuery, [id]);
    
    if (result[0].rows.length === 0) {
      throw new Error('Note not found');
    }
    
    const row = result[0].rows.item(0);
    return {
      id: row.id,
      title: row.title,
      content: row.content,
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    };
  }

  async updateNote(noteData: NoteUpdate): Promise<Note> {
    if (!this.database) {
      throw new Error('Database not initialized');
    }

    const now = new Date();
    const updateQuery = `
      UPDATE notes 
      SET title = COALESCE(?, title), 
          content = COALESCE(?, content), 
          updatedAt = ?
      WHERE id = ?;
    `;

    await this.database.executeSql(updateQuery, [
      noteData.title,
      noteData.content,
      now.toISOString(),
      noteData.id,
    ]);

    return this.getNoteById(noteData.id);
  }

  async deleteNote(id: number): Promise<void> {
    if (!this.database) {
      throw new Error('Database not initialized');
    }

    const deleteQuery = 'DELETE FROM notes WHERE id = ?;';
    await this.database.executeSql(deleteQuery, [id]);
  }

  async closeDatabase(): Promise<void> {
    if (this.database) {
      await this.database.close();
      this.database = null;
      console.log('Database closed');
    }
  }
}

export const databaseManager = new DatabaseManager();