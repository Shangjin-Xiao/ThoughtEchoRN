import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { databaseManager } from '../database/DatabaseManager';
import {
  NoteEditorScreenNavigationProp,
  NoteEditorScreenRouteProp,
} from '../types/navigation';
import { globalStyles, screenStyles } from '../styles/globalStyles';

interface NoteEditorScreenProps {
  navigation: NoteEditorScreenNavigationProp;
  route: NoteEditorScreenRouteProp;
}

const NoteEditorScreen: React.FC<NoteEditorScreenProps> = ({
  navigation,
  route,
}) => {
  const { noteId, mode } = route.params;
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  const loadNote = useCallback(async () => {
    try {
      setLoading(true);
      const note = await databaseManager.getNoteById(noteId!);
      setTitle(note.title);
      setContent(note.content);
    } catch (error) {
      console.error('Error loading note:', error);
      Alert.alert('Error', 'Failed to load note');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  }, [noteId, navigation]);

  useEffect(() => {
    const loadNoteData = async () => {
      if (mode === 'edit' && noteId) {
        await loadNote();
      }
    };
    loadNoteData();
  }, [noteId, mode, loadNote]);

  useEffect(() => {
    navigation.setOptions({
      title: mode === 'create' ? 'New Note' : 'Edit Note',
    });
  }, [mode, navigation]);

  const handleTitleChange = (text: string) => {
    setTitle(text);
    setHasChanges(true);
  };

  const handleContentChange = (text: string) => {
    setContent(text);
    setHasChanges(true);
  };

  const validateInput = (): boolean => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a title for your note');
      return false;
    }
    if (!content.trim()) {
      Alert.alert('Validation Error', 'Please enter some content for your note');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateInput()) return;

    try {
      setLoading(true);
      
      if (mode === 'create') {
        await databaseManager.createNote({
          title: title.trim(),
          content: content.trim(),
        });
        Alert.alert('Success', 'Note created successfully!');
      } else {
        await databaseManager.updateNote({
          id: noteId!,
          title: title.trim(),
          content: content.trim(),
        });
        Alert.alert('Success', 'Note updated successfully!');
      }
      
      setHasChanges(false);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('Error', 'Failed to save note');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Are you sure you want to discard them?',
        [
          {
            text: 'Keep Editing',
            style: 'cancel',
          },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  if (loading && mode === 'edit') {
    return (
      <SafeAreaView style={globalStyles.container}>
        <View style={globalStyles.emptyState}>
          <Text style={globalStyles.emptyStateText}>Loading note...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <KeyboardAvoidingView
        style={screenStyles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={screenStyles.noteEditor}>
          <ScrollView
            style={screenStyles.editorContent}
            keyboardShouldPersistTaps="handled">
            <Text style={globalStyles.label}>Title</Text>
            <TextInput
              style={globalStyles.input}
              value={title}
              onChangeText={handleTitleChange}
              placeholder="Enter note title..."
              maxLength={100}
            />

            <Text style={[globalStyles.label, screenStyles.contentLabel]}>Content</Text>
            <TextInput
              style={[globalStyles.input, globalStyles.textArea]}
              value={content}
              onChangeText={handleContentChange}
              placeholder="Write your note here..."
              multiline={true}
              textAlignVertical="top"
            />
          </ScrollView>

          <View style={screenStyles.editorActions}>
            <TouchableOpacity
              style={[
                globalStyles.button,
                globalStyles.buttonSecondary,
                screenStyles.actionButton,
              ]}
              onPress={handleCancel}>
              <Text
                style={[
                  globalStyles.buttonText,
                  globalStyles.buttonSecondaryText,
                ]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[globalStyles.button, screenStyles.actionButton]}
              onPress={handleSave}
              disabled={loading}>
              <Text style={globalStyles.buttonText}>
                {loading ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NoteEditorScreen;