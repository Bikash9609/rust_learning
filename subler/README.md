# Subler - Modern File Explorer

Subler is a modern, cross-platform file explorer built with Tauri, React, and TypeScript. It provides a sleek and intuitive interface for managing your files and folders with advanced features and a beautiful UI.

## 🌟 Features

- **Modern UI**: Built with Mantine UI components for a beautiful and responsive interface
- **File Operations**:
  - Browse and navigate through files and folders
  - Rename files and directories
  - Delete files and folders
  - File type detection with custom icons
- **Smart Organization**:
  - Intelligent folder categorization with custom icons
  - Support for various file types (music, photos, videos, documents, etc.)
  - Resizable panels for better workspace management
- **Advanced Features**:
  - Spotlight search for quick file access
  - Drag and drop support
  - File preview capabilities
  - Customizable layout

## 🛠️ Tech Stack

- **Frontend**:
  - React 18
  - TypeScript
  - Mantine UI
  - AG Grid for data display
  - RxJS for reactive state management
- **Backend**:
  - Tauri 2.0
  - Rust
  - File system operations
  - Native OS integration

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- Rust (Latest stable version)
- Yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/subler.git
cd subler
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn tauri dev
```

### Building for Production

```bash
yarn tauri build
```

## 🎯 Project Structure

```
subler/
├── src/                 # Frontend source code
│   ├── components/     # React components
│   ├── screens/        # Main application screens
│   ├── theme/          # UI theme configuration
│   └── types/          # TypeScript type definitions
├── src-tauri/          # Tauri backend code
│   ├── src/           # Rust source code
│   └── capabilities/   # Tauri capabilities
└── public/            # Static assets
```

## 📝 License

This project is open source and available under the MIT License. Feel free to use, modify, and distribute it for any purpose.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📸 Preview

<img width="1037" alt="Screenshot 2025-05-28 at 8 31 26 PM" src="https://github.com/user-attachments/assets/3121cd8b-0318-478f-9783-2865e30d2808" />
