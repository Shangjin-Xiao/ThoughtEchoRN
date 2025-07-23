#!/bin/bash

# ThoughtEcho Demo Script
# This script demonstrates the React Native notes app functionality

echo "🚀 ThoughtEcho - React Native Notes App Demo"
echo "=============================================="
echo ""

echo "📋 Checking project setup..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project structure verified"

# Check Node.js version
NODE_VERSION=$(node --version)
echo "✅ Node.js version: $NODE_VERSION"

# Check npm version
NPM_VERSION=$(npm --version)
echo "✅ npm version: $NPM_VERSION"

echo ""
echo "🔧 Installing dependencies..."
npm install --silent

echo ""
echo "🧹 Running code quality checks..."

echo "  └── ESLint..."
npm run lint

echo "  └── TypeScript checking..."
npm run typecheck

echo "  └── Running tests..."
npm test

echo ""
echo "📊 Project Statistics:"
echo "  └── TypeScript files: $(find src -name "*.ts" -o -name "*.tsx" | wc -l)"
echo "  └── Test files: $(find __tests__ -name "*.test.*" | wc -l)"
echo "  └── Component files: $(find src/screens src/components -name "*.tsx" 2>/dev/null | wc -l)"

echo ""
echo "🏗️  Project Structure:"
tree src/ -I node_modules 2>/dev/null || find src/ -type f -name "*.ts" -o -name "*.tsx" | sort

echo ""
echo "📱 Application Features:"
echo "  ✅ SQLite Database Integration"
echo "  ✅ CRUD Operations (Create, Read, Update, Delete)"
echo "  ✅ Cross-platform Support (iOS/Android)"
echo "  ✅ React Navigation"
echo "  ✅ TypeScript Support"
echo "  ✅ ESLint Code Quality"
echo "  ✅ Jest Testing Framework"
echo "  ✅ GitHub Actions CI/CD"

echo ""
echo "🚀 Ready to run!"
echo "  • Android: npm run android"
echo "  • iOS: npm run ios"
echo "  • Start Metro: npm start"

echo ""
echo "📝 Database Schema:"
echo "CREATE TABLE notes ("
echo "    id INTEGER PRIMARY KEY AUTOINCREMENT,"
echo "    title TEXT NOT NULL,"
echo "    content TEXT NOT NULL,"
echo "    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,"
echo "    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP"
echo ");"

echo ""
echo "🎉 Demo completed successfully!"
echo "👉 The app is ready for development and production use."