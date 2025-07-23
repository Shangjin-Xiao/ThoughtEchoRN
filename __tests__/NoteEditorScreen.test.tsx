import React from 'react';
import { render } from '@testing-library/react-native';
import NoteEditorScreen from '../src/screens/NoteEditorScreen';

// Mock navigation and route
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
};

const mockRoute = {
  params: {
    mode: 'create' as const,
  },
};

describe('NoteEditorScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly in create mode', () => {
    const { getByText, getByPlaceholderText } = render(
      <NoteEditorScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
    expect(getByPlaceholderText('Enter note title...')).toBeTruthy();
    expect(getByPlaceholderText('Write your note here...')).toBeTruthy();
    expect(getByText('Save')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('renders correctly in edit mode', () => {
    const editRoute = {
      params: {
        mode: 'edit' as const,
        noteId: 1,
      },
    };

    const { getByText } = render(
      <NoteEditorScreen navigation={mockNavigation} route={editRoute} />
    );

    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
  });
});