import { useParams } from 'react-router-dom';
import apiProvider from '../../data/providerApi';
import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { Book, Hotel, Eye, EyeClosed } from 'lucide-react';
import supabase from '../../library/supabaseclient';
import getSingleProvider from '../../services/apiProviders/getSingleProvider.js';
import insertSingleProvider from '../../services/apiProviders/insertSingleProvider';
import editSingleProvider from '../../services/apiProviders/editSingleProvider';
const ProviderModal = () => {
    const { providerName } = useParams();
    const [selectedTab, setSelectedTab] = useState<'overview' | 'add-integration'>('overview');
    const [user_id, setUser_id] = useState<string | null>(null);
    const [inputApiKey, setInputApiKey] = useState<string>('');
    const [isApiKeyExisting, setIsApiKeyExisting] = useState<boolean>(false);
    const [showApiKey, setShowApiKey] = useState<boolean>(false);
    const [isApiKeyLoading, setIsApiKeyLoading] = useState<boolean>(false);
    if (!providerName) return <div>No provider specified</div>;
    const provider = Object.values(apiProvider).find(
        (p) => p.name.toLowerCase() === providerName.toLowerCase()
    );

    useEffect(() => {
        const fetchUserAndProvider = async () => {
            const { data: { user } = {} } = await supabase.auth.getUser();
            if (user?.id) {
                setUser_id(user.id);
                console.log(user.id);

                console.log("Fetching provider for user:", user.id, "and providerName:", provider?.owner);
                const apiKeyProvider = await getSingleProvider(provider?.owner, user.id);
                console.log("Fetched provider data:", apiKeyProvider);
                if (apiKeyProvider != null) {
                    console.log("API Key Provider:", apiKeyProvider);
                    setInputApiKey(apiKeyProvider.apiKey);
                    setIsApiKeyExisting(true);
                } else {
                    console.log("No API Key Provider found");
                }
            }
        };
        fetchUserAndProvider();
    }, [providerName]);

    const handleSaveIntegration = async (providerName: string, apiKey: string) => {
        if (!apiKey.trim()) {
            console.error("API Key cannot be empty");
            return;
        }

        setIsApiKeyLoading(true);
        try {
            if (isApiKeyExisting) {
                console.log("Updating existing integration for", providerName);
                const updatedProvider = await editSingleProvider(providerName, apiKey, user_id!);
                if (!updatedProvider) {
                    console.error("Failed to update provider");
                    return;
                }
                console.log("Integration updated:", updatedProvider);
            } else {
                console.log("Inserting new integration for", providerName);
                const newProvider = await insertSingleProvider(providerName, apiKey, user_id!);
                if (!newProvider) {
                    console.error("Failed to insert provider");
                    return;
                }
                setIsApiKeyExisting(true);
                console.log("New integration saved:", newProvider);
            }
        } catch (error) {
            console.error("Error saving integration:", error);
        } finally {
            setIsApiKeyLoading(false);
        }
    }

    if (!provider) return <div>Provider not found</div>;

    return (
        <div className='flex flex-col gap-4 text-[var(--color-primary)]'>
            <div className='flex items-center gap-2'>
                <img src={`/img/providers/${provider.img}`}
                    className='rounded-md'
                    alt={provider.name} />
                <h2 className='text-lg font-semibold'>{provider.name}</h2>
            </div>
            <div className='flex gap-4 mb-4'>
                <button onClick={() => setSelectedTab('overview')} className={selectedTab === 'overview' ? 'border-b-2 ' : 'cursor-pointer border-b-2 border-transparent'}>Overview</button>
                <button onClick={() => setSelectedTab('add-integration')} className={selectedTab === 'add-integration' ? 'border-b-2 ' : 'cursor-pointer border-b-2 border-transparent'}>Add Integration</button>
            </div>
            {selectedTab === 'overview' &&
                <div className='flex flex-col gap-8'> {/* Overview div*/}
                    <div className='flex gap-8 text-[var(--color-third)] text-sm'>
                        <p className='flex flex-col gap-2'><span className='font-mono tracking-wider flex gap-2 items-center'><Hotel className='w-5 h-5' />OWNER</span> <span className='font-semibold'>{provider.owner}</span></p>
                        <p className='flex flex-col gap-2'><span className='font-mono tracking-wider flex gap-2 items-center'><Book className='w-5 h-5' />DOCS</span> <a className='font-semibold underline' href={provider.apiUrl} target="_blank" rel="noopener noreferrer">{provider.name} Documentation</a></p>
                        {/* altri dettagli */}
                    </div>
                    <div>
                        <h3 className='mb-2'>DESCRIPTION</h3>
                        <p>{provider.description}</p>
                    </div>
                </div>
            }
            {
                selectedTab === 'add-integration' && <div className='flex flex-col gap-3'>
                    <h3 className='mb-2 text-xl font-semibold'>Insert below a valid API Key</h3>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center '>
                            <input
                                type={showApiKey ? "text" : "password"}
                                value={inputApiKey ?? ''} // <-- garantisce sempre una stringa
                                onChange={(e) => setInputApiKey(e.target.value)}
                                placeholder='API Key'
                                autoComplete='off'
                                disabled={isApiKeyLoading}
                                className='h-12 p-2 border-y border-l rounded-l-md border-[var(--border-secondary)] outline-none flex-1 disabled:opacity-50'
                            />
                            <button
                                type="button"
                                onClick={() => setShowApiKey((prev) => !prev)}
                                disabled={isApiKeyLoading}
                                className='h-12 px-3 text-[var(--color-third)] p-2 text-sm rounded-r-md border border-[var(--border-secondary)] transition-colors disabled:opacity-50'
                                aria-label={showApiKey ? "Hide API Key" : "Show API Key"}
                            >
                                {!showApiKey ? <EyeClosed /> : <Eye />}
                            </button>
                        </div>
                        <a className='inline-block text-sm text-[var(--color-third)] underline' href={provider.apiUrl} target="_blank" rel="noopener noreferrer">
                            Test Connection
                        </a>
                    </div>

                    <button
                        disabled={isApiKeyLoading || !inputApiKey}
                        onClick={() => handleSaveIntegration(provider.owner, inputApiKey)}
                        className='bg-[var(--background-Tertiary)] border border-[var(--border-Tertiary)] w-64 h-12 px-3 text-sm
                         text-[var(--color-secondary)] rounded-md hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed
                         font-semibold cursor-pointer transition-colors'
                    >
                        {isApiKeyLoading ? 'Saving...' : 'Save Integration'}
                    </button>
                </div>
            }
        </div>
    );
};

export default ProviderModal;