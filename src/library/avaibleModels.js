const geminiModels = [
    {
        name: "Gemini 2.5 Pro",
        id: "gemini-2.5-pro",
        description: "Our most powerful reasoning model, which excels at coding and complex reasoning tasks.",
        pricing: {
            upTo200K: { input: 1.25, output: 10.0 },
            above200K: { input: 2.5, output: 15.0 }
        },
        knowledgeCutoff: "gen 2025"
    },
    {
        name: "Gemini 2.5 Flash",
        id: "gemini-2.5-flash",
        description: "Our hybrid reasoning model, with a 1M token context window and thinking budgets.",
        pricing: {
            allContextLengths: { input: 0.3, output: 2.5 }
        },
        knowledgeCutoff: "gen 2025"
    },
    {
        name: "Gemini 2.5 Flash-Lite",
        id: "gemini-2.5-flash-lite",
        description: "Our smallest and most cost effective model, built for at scale usage.",
        pricing: {
            allContextLengths: { input: 0.1, output: 0.4 }
        },
        knowledgeCutoff: "gen 2025"
    }
];
export default geminiModels;
