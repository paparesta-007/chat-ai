import React, { useEffect, useState } from 'react';
import apiProvider from '../../data/providerApi';
import { Link } from 'react-router-dom';
import supabase from '../../library/supabaseclient';
import getAllProviders from '../../services/apiProviders/getAllProvider.js'
import TableApiIntegration from './TableApiIntegration';
const ApiIntegration = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [user_id, setUser_id] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isApiKeyExisting, setIsApiKeyExisting] = useState<boolean>(false);
    const [apiKeys, setApiKeys] = useState<any[]>([]);
    useEffect(() => {
        getUser();
        document.title = "API Integration Settings";
    }, []);
    const getUser = async () => {
        const { data: { user } = {} } = await supabase.auth.getUser();
        if (user?.id) {
            setUser_id(user.id);
            const apiKeys = await getAllProviders(user.id);
            if (apiKeys && apiKeys.length > 0) {
                setIsApiKeyExisting(true);
                setApiKeys(apiKeys);
            }


        } else {
            console.error('No authenticated user');
        }
        setIsLoading(false);
    }


    return (
        <>
            {isLoading ? (
                <div className='flex justify-center w-full h-full items-center'>
                    <div className='loader'></div>
                </div>
            ) : (
                <div className='text-[var(--color-primary)] flex flex-col gap-10'>
                    <div className='flex flex-col'>
                        <h2 className="text-2xl font-semibold text-[var(--color-primary)] ">External API Providers</h2>
                        <p className="text-sm text-[var(--color-secondary)]">Configure your API integration for custom responses</p>
                        <div>
                            <hr className='my-4 border-[var(--border-primary)]' />
                            <div >
                                <h3 className='text-sm font-semibold text-[var(--color-primary)]'>Your API Integrations</h3>
                                <p className='text-xs text-[var(--color-secondary)] mb-2'>Manage your connected API providers</p>
                                <div className='bg-[var(--background-Primary)] border border-[var(--border-primary)] rounded-md p-4'>
                                    {!isApiKeyExisting ? (
                                        <p className='text-sm text-[var(--color-secondary)]'>You have no API integrations set up yet.</p>
                                    ) : (
                                        <TableApiIntegration apiKeys={apiKeys} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <h3 className='text-md font-semibold text-[var(--color-primary)]'>Available API Providers</h3>
                        <input onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='Search API Providers' className='w-full p-2 mt-4 mb-6 border border-[var(--border-primary)]
                     outline-none focus:ring-2 ring-[var(--border-secondary)] bg-[var(--background-Secondary)] rounded-md transition-all duration-100' />
                        <ul className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                            {Object.entries(apiProvider).filter(([key, provider]) => (
                                provider.name.toLowerCase().includes(searchTerm.toLowerCase())
                            )).map(([key, provider]) => (
                                <Link key={key}
                                    to={`/settings/api-integration/${provider.name}`}
                                    className='rounded-lg p-4 bg-[var(--background-Primary)] border-2 border-[var(--border-primary)] hover:border-[var(--border-secondary)] hover:brightness-110 transition-colors'>
                                    <div className='flex justify-between mb-2'>
                                        <img
                                            src={`/img/providers/${provider.img}`}
                                            alt={`${provider.name} logo`}
                                            className='w-12 h-12 mb-2 rounded-md'
                                        />
                                        <div className='border rounded-full h-8 px-3 border-[var(--border-primary)] flex items-center'>
                                            <p className='text-[var(--color-third)] font-semibold'>{provider.price}</p>
                                        </div>
                                    </div>
                                    <h3 className="text-md font-semibold text-[var(--color-primary)]">{provider.name}</h3>
                                    <p className='text-sm text-[var(--color-third)] mt-1'>{provider.description}</p>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default ApiIntegration;