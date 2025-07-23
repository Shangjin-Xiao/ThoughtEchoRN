import React from 'react';
import { render } from '@testing-library/react-native';
import NotesListScreen from '../src/screens/NotesListScreen';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
};

describe('NotesListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with empty state', () => {
    const { getByText } = render(
      <NotesListScreen navigation={mockNavigation} />
    );

    expect(getByText('My Notes')).toBeTruthy();
    expect(getByText('No notes yet.\nTap the + button to create your first note!')).toBeTruthy();
  });

  it('renders correctly with fab button', () => {
    const { getByText } = render(
      <NotesListScreen navigation={mockNavigation} />
    );

    const fabButton = getByText('+');
    expect(fabButton).toBeTruthy();
  });
});