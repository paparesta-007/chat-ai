import { useParams } from 'react-router-dom';
import apiProvider from '../../data/providerApi';
import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { Book, Hotel } from 'lucide-react';
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
    if (!providerName) return <div>No provider specified</div>;
    const provider = Object.values(apiProvider).find(
        (p) => p.name.toLowerCase() === providerName.toLowerCase()
    );

    useEffect(() => {
        const fetchUserAndProvider = async () => {
            // Recupera l'utente
            const { data: { user } = {} } = await supabase.auth.getUser();
            if (user?.id) {
                setUser_id(user.id);
                console.log(user.id);
                
                // Ora che abbiamo user.id, recupera il provider
                console.log("Fetching provider for user:", user.id, "and providerName:", provider?.owner);
                const apiKeyProvider = await getSingleProvider(provider?.owner, user.id);
                if (apiKeyProvider) {
                    console.log("API Key Provider:", apiKeyProvider);
                    setInputApiKey(apiKeyProvider.apiKey); // Assumendo che 'apiKey' sia il campo che contiene l'API Key
                    setIsApiKeyExisting(true);
                } else {
                    console.log("No API Key Provider found");
                }
            }
        };
        fetchUserAndProvider();
    }, [providerName]);

    const handleSaveIntegration = async (providerName: string, apiKey: string) => {
        if (isApiKeyExisting) {
            // Logica per aggiornare l'integrazione esistente
            console.log("Updating existing integration for", providerName);
            const updatedProvider = await editSingleProvider(providerName, user_id!, apiKey);
            console.log("Integration updated:", updatedProvider);
            // Implementa la logica di aggiornamento qui
        } else {
            // Logica per inserire una nuova integrazione
            console.log("Inserting new integration for", providerName);
            const newProvider = await insertApiKeyProvider(providerName, apiKey);
            if (newProvider) {
                setIsApiKeyExisting(true);
                console.log("New integration saved:", newProvider);
            }
        }
    }
    const insertApiKeyProvider = async (providerName: string, apiKey: string) => {
        if (!user_id) return null;
        const provider = await insertSingleProvider(providerName, apiKey, user_id);
        return provider;
        
    }
    if (!provider) return <div>Provider not found</div>;

    return (
        <div className='flex flex-col gap-4'>
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
                selectedTab === 'add-integration' && <div> {/* Add Integration div*/}
                    <h3 className='mb-2'>insert below the API Key</h3>
                    <div className='flex '>
                        <input type="text" value={inputApiKey} onChange={(e) => setInputApiKey(e.target.value)} placeholder='API Key' className='h-12 p-2 border rounded-md mb-4 border-[var(--border-secondary)] outline-none' />
                        <button className='bg-[var(--color-primary)] h-12 px-3 text-sm text-white rounded-md hover:brightness-110 transition-colors'>Test Connection</button>
                    </div>

                    <button onClick={() => handleSaveIntegration(provider.owner, inputApiKey)} className='bg-[var(--color-primary)] h-12 px-3 text-sm text-white rounded-md hover:brightness-110 transition-colors'>Save Integration</button>
                </div>
            }
        </div>
    );
};

export default ProviderModal;