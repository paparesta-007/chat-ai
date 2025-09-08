# Chat AI
###### Created by Tommaso Paparesta

**Chat AI** is an advanced chatbot platform that allows users to interact with multiple AI models in a simple, intuitive, and flexible way. Its main goal is to provide an intelligent conversation experience accessible to everyone, leveraging both free and paid models without compromising the quality of responses.  

---

## Technology and Stack
Chat AI is built with modern, high-performance technologies that ensure speed, scalability, and a smooth user experience:  

- **Frontend:** Built with **ReactJS**, one of the most powerful frameworks for interactive web applications. This ensures a dynamic interface that works seamlessly across all devices.  
- **Styling and Design:** Uses **TailwindCSS** for modular and easily customizable styling. With Tailwind, every component is responsive, lightweight, and visually consistent.  
- **Database and Backend:** Conversation and data management are handled via **Supabase**, an open-source alternative to Firebase that provides advanced functionality.  
- **AI API Integrations:** The platform allows users to easily connect to various AI model providers via API, including:
  - **OpenAI**  
  - **Claude AI**  
  - **Deepseek**  
  - **Groq**  

---

## Key Features

Chat AI goes beyond a simple chat, offering a wide range of advanced functionalities for users of all levels:

1. **Free Models**  
   - Users can access free models like **Gemini 2.5 Flash Lite** to test and experiment without any cost.  
   - Perfect for students, developers, or anyone wanting to explore AI without financial commitment.  

2. **Support for External APIs**  
   - Easily connect your API keys to leverage premium or specialized models.  
   - Multiple providers can be used simultaneously, allowing comparison of responses and performance.  

3. **Conversation Saving**  
   - All chats are automatically saved in the database, allowing users to pick up previous conversations.  
   - Useful for analysis, long-term projects, or simply keeping track of interesting responses.  

4. **Paid Plans**  
   - Premium plans allow access to more advanced models like **Gemini 2.5 Pro**, with faster response times and higher processing capabilities.  
   - Paid users enjoy higher usage limits, advanced customization options, and priority support.  

5. **Intuitive Interface**  
   - Designed to be simple and accessible, even for users with no prior AI experience.  
   - Features include conversation history search, chat management, and project organization, all integrated natively.  

---

## System Requirements

Before installing and running Chat AI, ensure your system meets the following specifications:

- **Node.js:** Version 18.x or higher  
- **npm:** Version 9.x or higher  
- **Operating System:** Windows 10/11, macOS 12+, or Linux (Ubuntu 20.04+ recommended)  
- **Browser:** Latest version of Chrome, Edge, or Firefox for development preview  
- **Memory:** Minimum 4 GB RAM (8 GB+ recommended for large-scale usage)  

---

##  Installation Instructions (open source)

Follow these steps to install and run Chat AI locally using npm:

1. **Clone the repository**
    ```bash
   git clone https://github.com/yourusername/chat-ai.git
   cd chat-ai
   ```  
  
2. **Install dependencies**
     ```bash
   npm install
   ```

3. **Set up environment variables**

    <small> Create a .env file in the root folder and add your API keys:</small>
    ```bash
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_key
    OPENAI_API_KEY=your_openai_key
    CLAUDE_API_KEY=your_claude_key
    ```
4. **Run in development mode**
    ```bash
    npm run dev
    ```