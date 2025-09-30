import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  NotesList: undefined;
  NoteEditor: {
    noteId?: number;
    mode: 'create' | 'edit';
  };
};

export type NotesListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NotesList'
>;

export type NoteEditorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NoteEditor'
>;

export type NoteEditorScreenRouteProp = RouteProp<
  RootStackParamList,
  'NoteEditor'
>;