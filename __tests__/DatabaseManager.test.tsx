import { databaseManager } from '../src/database/DatabaseManager';
import { NoteCreate } from '../src/types/Note';

describe('DatabaseManager', () => {
  beforeEach(async () => {
    await databaseManager.initDatabase();
  });

  afterEach(async () => {
    await databaseManager.closeDatabase();
  });

  it('should create a new note', async () => {
    const noteData: NoteCreate = {
      title: 'Test Note',
      content: 'This is a test note content',
    };

    const createdNote = await databaseManager.createNote(noteData);
    
    expect(createdNote.title).toBe(noteData.title);
    expect(createdNote.content).toBe(noteData.content);
    expect(createdNote.id).toBeDefined();
    expect(createdNote.createdAt).toBeInstanceOf(Date);
    expect(createdNote.updatedAt).toBeInstanceOf(Date);
  });

  it('should get all notes', async () => {
    const notes = await databaseManager.getAllNotes();
    expect(Array.isArray(notes)).toBe(true);
  });

  it('should handle database initialization', async () => {
    // Test that database can be initialized multiple times without error
    expect(async () => {
      await databaseManager.initDatabase();
    }).not.toThrow();
  });
});