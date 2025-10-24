import { useParams } from 'react-router-dom';
import apiProvider from '../../data/providerApi';
import { useState } from 'react';
import { marked } from 'marked';
const ProviderModal = () => {
    const { providerName } = useParams();
    const [selectedTab, setSelectedTab] = useState('overview');
    if (!providerName) return <div>No provider specified</div>;
    const provider = Object.values(apiProvider).find(
        (p) => p.name.toLowerCase() === providerName.toLowerCase()
    );
    // const markedText = marked(provider.allModels);
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
            {selectedTab === 'overview' && <div> {/* Overview div*/}
                <div className='flex gap-8'>
                    <p className='flex flex-col gap-2'><span className='font-mono tracking-wider'>OWNER</span> <span className='font-semibold'>{provider.owner}</span></p>
                    <p className='flex flex-col gap-2'><span className='font-mono tracking-wider'>DOCS</span> <a className='font-semibold' href={provider.apiUrl} target="_blank" rel="noopener noreferrer">{provider.name} Documentation</a></p>
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
                        <input type="text" placeholder='API Key' className='h-12 p-2 border rounded-md mb-4 border-[var(--border-secondary)] outline-none' />
                        <button className='bg-[var(--color-primary)] h-12 px-3 text-sm text-white rounded-md hover:brightness-110 transition-colors'>Test Connection</button>
                    </div>
                    {/* <div
                        className="renderChat"
                        dangerouslySetInnerHTML={{ __html: markedText }}
                    /> */}
                </div>
            }
        </div>
    );
};

export default ProviderModal;