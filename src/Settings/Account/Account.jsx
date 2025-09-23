import React from 'react';
import './account.css';
import { CircleUser, LockKeyholeOpen, BadgeDollarSign } from 'lucide-react';
const AccountSettings = () => {
    return (
        <div className="h-full w-full flex flex-col items-center ">
            <h1 className="text-3xl text-left w-full font-semibold text-[var(--color-primary)]">Hello </h1>
            <div className="setting-card-container">
                <div className="setting-card">
                    <CircleUser className="w-8 h-10 text-[var(--color-primary)]"/>
                    <h2>Manage your account</h2>
                    <p>Update your profile, add contact..</p>
                    <a>Add personal information</a>
                </div>
                <div className="setting-card">
                    <LockKeyholeOpen className="w-8 h-10 text-[var(--color-primary)]"/>
                    <h2>Access and security</h2>
                    <p>Manage your account, change password or email...</p>
                    <a>Modify authentication method</a>
                </div>
                <div className="setting-card">
                    <BadgeDollarSign className="w-8 h-10 text-[var(--color-primary)]"/>
                    <h2>Marketing preferences</h2>
                    <p>Manage your account, change password or email...</p>
                    <a>Update preferences</a>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
