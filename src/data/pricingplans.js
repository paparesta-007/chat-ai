const pricingPlans = [
    {
        individual: [
            {
                name: "Hobby",
                title: "Hobby Plan",
                priceMonthly: 0,
                priceAnnual: 0,
                description: "Start for free with basic features and limited API usage. Perfect for hobbyists and small projects.",
                benefits: [
                    "Basic features",
                    "Chats not used for training",
                    "Limited API access (OpenAI, DeepSeek)"
                ],
                buttonText: "Continue for free"
            },
            {
                name: "Pro",
                title: "Pro Individual",
                priceMonthly: 9.99,
                priceAnnual: 99.99,
                description: "For advanced users needing unlimited access and more powerful AI models.",
                benefits: [
                    "Up to 30x more usage",
                    "Advanced AI models",
                    "Connect APIs from multiple services",
                    "Priority support"
                ],
                buttonText: "Get Started"
            },
            {
                name: "Enterprise",
                title: "Enterprise",
                priceMonthly: 39.99,
                priceAnnual: 399.99,
                description: "For people that need more usage",
                benefits: [
                    "Unlimited  usage",
                    "Advanced AI models",
                    "Connect APIs from multiple services",
                    "Priority support",
                    "Access to new features",
                ],
                buttonText: "Get Started"
            }
        ],
        team: [
            {
                name: "Team Basic",
                title: "Team Starter",
                priceMonthly: "30 per seat, minimum 2 seats",
                priceAnnual: "Scalable price",
                description: "Perfect for small teams to collaborate with shared chats and centralized billing.",
                benefits: [
                    "Up to 5 team members",
                    "Shared chat history",
                    "Basic collaboration tools",
                    "Centralized billing"
                ],
                buttonText: "Get Started"
            },
            {
                name: "Team Pro",
                title: "Team Professional",
                priceMonthly: "60 per seat, minimum 5 seats",
                priceAnnual: "Scalable price",
                description: "Designed for larger teams with advanced admin controls and enhanced security.",
                benefits: [
                    "Unlimited team members",
                    "Admin controls",
                    "Dedicated account manager",
                    "SSO (SAML)",
                    "Enhanced security"
                ],
                buttonText: "Get Started"
            },
            {
                name: "Team Enterprise",
                title: "Team Enterprise",
                priceMonthly: "199 per seat, minimum 20 seats",
                priceAnnual: "Scalable price",
                description: "For people that need more usage",
                benefits: [
                    "Unlimited  usage",
                    "Advanced AI models",
                    "Connect APIs from multiple services",
                    "Priority support",
                    "Access to new features",
                    "Connect your workspace with Notion, Slack and more"
                ],
                buttonText: "Contact us"
            }
        ]
    }
];
export default pricingPlans;