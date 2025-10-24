const apiProvider = {
    openAI: {
        name: "ChatGPT",
        owner: "OpenAI",
        apiUrl: "https://platform.openai.com/api-keys",
        price: "Free",
        img: "icons8-chatgpt-50.png",
        description: "OpenAI offre potenti modelli di intelligenza artificiale come GPT-3 e GPT-4, ideali per chatbot, generazione di testo e automazione conversazionale. L'accesso API è semplice e gratuito per usi di base.",
        allModels: `Pricing
=======

### 

Text tokens

Prices per 1M tokens.

Batch

|Model|Input|Cached input|Output|
|---|---|---|---|
|gpt-5|$0.625|$0.0625|$5.00|
|gpt-5-mini|$0.125|$0.0125|$1.00|
|gpt-5-nano|$0.025|$0.0025|$0.20|
|gpt-5-pro|$7.50|-|$60.00|
|gpt-4.1|$1.00|-|$4.00|
|gpt-4.1-mini|$0.20|-|$0.80|
|gpt-4.1-nano|$0.05|-|$0.20|
|gpt-4o|$1.25|-|$5.00|
|gpt-4o-2024-05-13|$2.50|-|$7.50|
|gpt-4o-mini|$0.075|-|$0.30|
|o1|$7.50|-|$30.00|
|o1-pro|$75.00|-|$300.00|
|o3-pro|$10.00|-|$40.00|
|o3|$1.00|-|$4.00|
|o3-deep-research|$5.00|-|$20.00|
|o4-mini|$0.55|-|$2.20|
|o4-mini-deep-research|$1.00|-|$4.00|
|o3-mini|$0.55|-|$2.20|
|o1-mini|$0.55|-|$2.20|
|computer-use-preview|$1.50|-|$6.00|
`
    },
    claude: {
        name: "Claude",
        owner: "Anthropic",
        apiUrl: "https://docs.claude.com/en/api/admin-api/apikeys/get-api-key",
        price: "Pro plan required",
        img: "icons8-claude-48.png",
        description: "Anthropic è l'azienda dietro Claude, un assistente AI attento all'etica, progettato per interazioni conversazionali avanzate e sicure. L'API richiede un piano professionale."
    },
    gemini: {
        name: "Gemini",
        owner: "Google",
        apiUrl: "https://aistudio.google.com/api-keys",
        price: "Free",
        img: "icons8-google-48.png",
        description: "Google Gemini è una piattaforma AI di Google che consente l'accesso a modelli di linguaggio avanzati per la creazione di chatbot, analisi del testo e automazione. L'API è gratuita."
    },
    grok: {
        name: "Grok",
        owner: "xAI",
        apiUrl: "https://docs.x.ai/docs/models",
        price: "Pro plan required",
        img: "icons8-grok-48.png",
        description: "Grok, sviluppato da xAI, offre modelli di intelligenza artificiale innovativi focalizzati su risposte rapide e pertinenti. L'API è accessibile con un piano professionale."
    },
    openRouter: {
        name: "OpenRouter",
        owner: "OpenRouter",
        apiUrl: "https://openrouter.ai/docs/api-reference/authentication",
        price: "Free",
        img: "icons8-openrouter-48.png",
        description: "OpenRouter permette di collegarsi facilmente a diversi modelli AI tramite un'unica API, semplificando l'integrazione e la gestione delle chiavi. L'accesso è gratuito."
    },
    deepseek: {
        name: "Deepseek",
        owner: "Deepseek",
        apiUrl: "https://api-docs.deepseek.com/",
        price: "Pro plan required",
        img: "icons8-deepseek-48.png",
        description: "Deepseek propone soluzioni AI avanzate per l'analisi e la generazione di testo, ideali per applicazioni conversazionali e ricerca. L'API richiede un piano professionale."
    }
};
export default apiProvider;