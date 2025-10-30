import React from 'react';
import apiProvider from "../../data/providerApi.js";
import { Link } from 'react-router';
import deleteSingleProvider from '../../services/apiProviders/deleteSingleProvider.js';

type ProviderName = keyof typeof apiProvider;

interface ApiKey {
    id: string;
    providerName: ProviderName;
    apiKey: string;
    updated_at: Date;
    user_id: string;
}

const handleDelete = (apiKey: ApiKey) => {
    deleteSingleProvider(apiKey.providerName, apiKey.user_id);
}   
const TableApiIntegration: React.FC<{ apiKeys: ApiKey[] }> = ({ apiKeys }) => {
    return (
        <table className="w-full table-auto items-center text-left">
            <thead>
                <tr className='text-[var(--color-primary)]'>
                    <th>#</th>
                    <th>Provider </th>
                    <th>Last modify</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {apiKeys.map((apiKey, index) => (
                    <tr key={apiKey.id ? apiKey.id : index} className='text-[var(--color-primary)]'>
                        <td>{index + 1}</td>
                        <td>
                            <img
                                src={`/img/providers/${apiProvider[apiKey.providerName].img}`}
                                alt={apiKey.providerName}
                                className="inline-block rounded-sm w-5 h-5 mr-2"
                            />

                            {apiKey.providerName}</td>
                        <td>{new Date(apiKey.updated_at).toLocaleDateString()}</td>

                        <td className=''>
                            <Link to={`/settings/api-integration/${apiProvider[apiKey.providerName].name}`}>Edit</Link>

                        </td>
                        <td>
                            <button onClick={() => handleDelete(apiKey)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableApiIntegration;