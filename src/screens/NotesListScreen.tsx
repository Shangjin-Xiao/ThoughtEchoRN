import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { databaseManager } from '../database/DatabaseManager';
import { Note } from '../types/Note';
import { NotesListScreenNavigationProp } from '../types/navigation';
import { globalStyles, screenStyles } from '../styles/globalStyles';

interface NotesListScreenProps {
  navigation: NotesListScreenNavigationProp;
}

const NotesListScreen: React.FC<NotesListScreenProps> = ({ navigation }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadNotes = async () => {
    try {
      const allNotes = await databaseManager.getAllNotes();
      setNotes(allNotes);
    } catch (error) {
      console.error('Error loading notes:', error);
      Alert.alert('Error', 'Failed to load notes');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadNotes();
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const handleNotePress = (note: Note) => {
    navigation.navigate('NoteEditor', {
      noteId: note.id!,
      mode: 'edit',
    });
  };

  const handleDeleteNote = async (noteId: number) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await databaseManager.deleteNote(noteId);
              await loadNotes();
            } catch (error) {
              console.error('Error deleting note:', error);
              Alert.alert('Error', 'Failed to delete note');
            }
          },
        },
      ]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const renderNoteItem = ({ item }: { item: Note }) => (
    <TouchableOpacity
      style={screenStyles.noteItem}
      onPress={() => handleNotePress(item)}
      onLongPress={() => handleDeleteNote(item.id!)}>
      <Text style={screenStyles.noteTitle}>{item.title}</Text>
      <Text style={screenStyles.noteContent}>
        {truncateContent(item.content)}
      </Text>
      <Text style={screenStyles.noteDate}>
        {formatDate(item.updatedAt)}
      </Text>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={globalStyles.emptyState}>
      <Text style={globalStyles.emptyStateText}>
        No notes yet.{'\n'}Tap the + button to create your first note!
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>My Notes</Text>
      </View>
      <View style={screenStyles.notesList}>
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id!.toString()}
          renderItem={renderNoteItem}
          contentContainerStyle={screenStyles.notesListContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={!loading ? renderEmptyState : null}
        />
        <TouchableOpacity
          style={screenStyles.fab}
          onPress={() =>
            navigation.navigate('NoteEditor', {
              mode: 'create',
            })
          }>
          <Text style={screenStyles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NotesListScreen;