import React, {useEffect} from 'react';
import apiProvider from '../../data/providerApi';
import { Link, redirect } from 'react-router-dom';
const ApiIntegration = () => {
    const [searchTerm, setSearchTerm] = React.useState('');

    
    return (
        <div>
            <h2 className="text-lg font-semibold text-[var(--color-primary)] font-mono">External API Providers</h2>
            <p className="text-sm text-[var(--color-secondary)]">Configure your API integration for custom responses</p>
            <input onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='Search API Providers' className='w-full p-2 mt-4 mb-6 border bg-[red] rounded-md' />
            <ul className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                {Object.entries(apiProvider).filter(([key, provider]) => (
                    provider.name.toLowerCase().includes(searchTerm.toLowerCase())
                )).map(([key, provider]) => (
                    <Link key={key}
                        to={`/settings/api-integration/${provider.name}`}
                        className='rounded-lg p-4 bg-[var(--background-Primary)] mb-4 border border-[var(--border-primary)] hover:brightness-110 transition-colors'>
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
                        <p className='text-[var(--color-primary)]'>API URL: <a href={provider.apiUrl} target="_blank" rel="noopener noreferrer">{provider.apiUrl}</a></p>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default ApiIntegration;