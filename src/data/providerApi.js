const apiProvider = {
    OpenAI: {
        name: "ChatGPT",
        owner: "OpenAI",
        apiUrl: "https://platform.openai.com/api-keys",
        price: "Free",
        img: "icons8-chatgpt-50.png",
        description: "OpenAI offre potenti modelli di intelligenza artificiale come GPT-3 e GPT-4, ideali per chatbot, generazione di testo e automazione conversazionale. L'accesso API è semplice e gratuito per usi di base.",
        allModels: `Pricing`

    },
    Anthropic: {
        name: "Claude",
        owner: "Anthropic",
        apiUrl: "https://docs.claude.com/en/api/admin-api/apikeys/get-api-key",
        price: "Pro plan required",
        img: "icons8-claude-48.png",
        description: "Anthropic è l'azienda dietro Claude, un assistente AI attento all'etica, progettato per interazioni conversazionali avanzate e sicure. L'API richiede un piano professionale."
    },
    Google: {
        name: "Gemini",
        owner: "Google",
        apiUrl: "https://aistudio.google.com/api-keys",
        price: "Free",
        img: "icons8-google-48.png",
        description: "Google Gemini è una piattaforma AI di Google che consente l'accesso a modelli di linguaggio avanzati per la creazione di chatbot, analisi del testo e automazione. L'API è gratuita."
    },
    xAI: {
        name: "Grok",
        owner: "xAI",
        apiUrl: "https://docs.x.ai/docs/models",
        price: "Pro plan required",
        img: "icons8-grok-48.png",
        description: "Grok, sviluppato da xAI, offre modelli di intelligenza artificiale innovativi focalizzati su risposte rapide e pertinenti. L'API è accessibile con un piano professionale."
    },
    OpenRouter: {
        name: "OpenRouter",
        owner: "OpenRouter",
        apiUrl: "https://openrouter.ai/docs/api-reference/authentication",
        price: "Free",
        img: "icons8-openrouter-48.png",
        description: "OpenRouter permette di collegarsi facilmente a diversi modelli AI tramite un'unica API, semplificando l'integrazione e la gestione delle chiavi. L'accesso è gratuito."
    },
    Deepseek: {
        name: "Deepseek",
        owner: "Deepseek",
        apiUrl: "https://api-docs.deepseek.com/",
        price: "Pro plan required",
        img: "icons8-deepseek-48.png",
        description: "Deepseek propone soluzioni AI avanzate per l'analisi e la generazione di testo, ideali per applicazioni conversazionali e ricerca. L'API richiede un piano professionale."
    }
};
export default apiProvider;