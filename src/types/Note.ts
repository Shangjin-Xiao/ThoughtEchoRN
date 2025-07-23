export interface Note {
  id?: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteCreate {
  title: string;
  content: string;
}

export interface NoteUpdate {
  id: number;
  title?: string;
  content?: string;
}