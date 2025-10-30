# Chat AI

A full-stack AI-powered chat application built with React and Node.js, featuring PDF analysis, document management, and integration with Google's Gemini AI.

## 🚀 Features

- **AI Chat Interface**: Interactive chat powered by Google Gemini AI
- **PDF Analyzer**: Upload and analyze PDF documents with AI assistance
- **Document Library**: Manage and organize your documents
- **User Authentication**: Secure login and user management
- **Explore & Discover**: Browse and discover AI capabilities
- **Pricing Plans**: Multiple subscription tiers
- **Release Notes**: Track application updates and changes
- **Responsive Design**: Built with Tailwind CSS for mobile-first experience

## 📁 Project Structure

```
chat-ai/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── App.jsx        # Main application component
│   │   ├── ChatPage/      # Chat interface components
│   │   ├── pdfAnalyzer/   # PDF analysis features
│   │   ├── library/       # Document library management
│   │   ├── Login/         # Authentication components
│   │   ├── Settings/      # User settings
│   │   ├── Explore/       # Discovery features
│   │   ├── Pricing/       # Pricing page
│   │   └── ...
│   ├── api/               # Client-side API utilities
│   └── public/            # Static assets
│
└── server/                # Backend Node.js server
    ├── gemini.ts          # Gemini AI integration
    └── static/            # Static files
```

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety
- **ESLint** - Code linting

### Backend
- **Node.js** - Runtime environment
- **TypeScript** - Type safety
- **Google Gemini AI** - AI model integration

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat-ai
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

   Create a `.env` file in the `server` directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   ```

## 🚀 Running the Application

### Development Mode

1. **Start the server**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Production Build

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Build the server**
   ```bash
   cd server
   npm run build
   ```

## 📝 Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

## 🔑 Key Features Explained

### PDF Analyzer
Upload and analyze PDF documents using AI. The system extracts text and provides intelligent insights about the content.

### Chat Interface
Engage in conversations with the Gemini AI model. The chat supports context-aware responses and maintains conversation history.

### Document Library
Store, organize, and manage your documents with easy access to previous analyses and conversations.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powering the AI capabilities
- React community for excellent tooling and libraries
- All contributors who help improve this project

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Built with ❤️ using React and Google Gemini AI
```