# ThoughtEcho - React Native Notes App

A complete React Native notes application with SQLite database, cross-platform support, and automated CI/CD.

## Features

- ✅ **Cross-Platform**: iOS and Android support
- ✅ **SQLite Database**: Local storage with full CRUD operations
- ✅ **Modern UI**: Clean, intuitive interface with Material Design principles
- ✅ **TypeScript**: Full type safety and better development experience
- ✅ **Navigation**: React Navigation with stack navigator
- ✅ **Testing**: Jest testing framework with coverage
- ✅ **CI/CD**: GitHub Actions automation
- ✅ **Code Quality**: ESLint and Prettier configuration

## Screenshots

*Screenshots will be added once the app is built and tested.*

## Architecture

```
src/
├── components/          # Reusable UI components
├── database/           # SQLite database layer
├── screens/            # Application screens
├── styles/             # Global styles and themes
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (>= 18.0.0)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Shangjin-Xiao/ThoughtEchoRN.git
cd ThoughtEchoRN
```

2. Install dependencies:
```bash
npm install
```

3. For iOS, install CocoaPods dependencies:
```bash
cd ios && pod install && cd ..
```

### Running the Application

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

#### Development Server
```bash
npm start
```

## Testing

Run all tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

TypeScript type checking:
```bash
npm run typecheck
```

Linting:
```bash
npm run lint
```

## Building for Production

### Android APK
```bash
npm run build:android
```

### iOS Archive
Build through Xcode or use the CI/CD pipeline.

## Database Schema

The application uses SQLite with the following schema:

```sql
CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## API Reference

### DatabaseManager

The `DatabaseManager` class provides the following methods:

- `initDatabase()`: Initialize the SQLite database
- `createNote(noteData)`: Create a new note
- `getAllNotes()`: Retrieve all notes
- `getNoteById(id)`: Get a specific note by ID
- `updateNote(noteData)`: Update an existing note
- `deleteNote(id)`: Delete a note by ID
- `closeDatabase()`: Close the database connection

## CI/CD Pipeline

The project includes a comprehensive GitHub Actions workflow that:

1. **Lints and Tests**: Runs ESLint, TypeScript checks, and Jest tests
2. **Builds Android**: Generates release APK
3. **Builds iOS**: Creates iOS archive
4. **Auto-Commits**: Commits successful build status
5. **Notifications**: Provides build status updates

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Performance Considerations

- SQLite operations are optimized for mobile performance
- Navigation uses lazy loading for screens
- Image and asset optimization
- Memory management for large note lists

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Run `npm start -- --reset-cache`
2. **Android build fails**: Clean the build with `npm run clean`
3. **iOS pod install fails**: Update CocoaPods and retry
4. **Database issues**: Check file permissions and storage availability

### Debug Mode

Enable debug mode by setting `SQLite.DEBUG(true)` in `DatabaseManager.ts`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React Native team for the excellent framework
- SQLite for reliable local storage
- React Navigation for smooth navigation experience
- The open-source community for various libraries used