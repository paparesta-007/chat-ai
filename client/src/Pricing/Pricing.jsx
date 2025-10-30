import React, { useState } from 'react';
import pricingPlans from '../data/pricingplans.js';
import {useNavigate} from "react-router";

const Pricing = () => {
    const [isIndividual, setIsIndividual] = useState(true);
    const plans = pricingPlans[0];
    const selectedPlans = isIndividual ? plans.individual : plans.team;
    const navigate = useNavigate();
    return (
        <div className="bg-[var(--background-Primary)] relative p-10 h-screen w-screen overflow-y-auto flex flex-col items-center">

            <h1 className="text-3xl font-semibold text-[var(--color-primary)] text-center">
                Choose the plan that best fits your needs
            </h1>

            {/* Toggle */}
            <div className="bg-[var(--background-Secondary)] mt-10 flex gap-2 p-1 rounded-full">
                <button
                    className={
                        "text-[var(--color-primary)] cursor-pointer w-[150px] py-2 rounded-full transition " +
                        (isIndividual ? "bg-[var(--background-Primary)]" : "bg-transparent")
                    }
                    onClick={() => setIsIndividual(true)}
                >
                    Individual
                </button>
                <button
                    className={
                        "text-[var(--color-primary)] cursor-pointer w-[150px] py-2 rounded-full transition " +
                        (!isIndividual ? "bg-[var(--background-Primary)]" : "bg-transparent")
                    }
                    onClick={() => setIsIndividual(false)}
                >
                    Team
                </button>
            </div>

            <div className="mt-10 text-[var(--color-primary)] flex gap-4 flex-wrap justify-center">
                {selectedPlans.map((plan) => (
                    <div
                        key={plan.name}
                        className="pricing-card bg-[var(--background-Secondary)]  p-6 rounded-2xl w-[350px] h-[500px] flex flex-col justify-between"
                    >
                        {/* Titolo */}
                        <div>
                            <h2 className="text-xl font-bold mb-2">{plan.title}</h2>
                            <p className="text-lg font-semibold mb-4">${plan.priceMonthly}/mo*</p>
                        </div>

                        {/* Body / Benefits */}
                        <div className="flex-1">
                            <p className="text-[var(--color-primary)] mb-4">{plan.description}</p>
                            <ul className="list-none list-inside flex flex-col gap-2">
                                {plan.benefits.map((benefit) => (
                                    <li key={benefit} className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                        </svg>
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Bottone in basso */}
                        <div className="mt-4">
                            <button className="bg-[var(--background-Tertiary)] text-[var(--color-secondary)] cursor-pointer w-full   px-2 py-2 rounded-xl ">
                                {plan.buttonText || "Select Plan"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <small className="text-[var(--color-primary)]">*22% VAT not included</small>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] text-center mt-10">Compare plans</h2>
            <table className="sm:w-[80%] w-full mt-6 bg-transparent text-[var(--color-primary)] border-collapse">
                <thead>
                <tr className="border-b border-gray-600">
                    <th className="text-left px-4 py-2">Plan</th>
                    <th className="text-left px-4 py-2">Individual</th>
                    <th className="text-left px-4 py-2">Team</th>
                </tr>
                </thead>
                <tbody>
                {/* Rows will go here */}
                <tr className="border-b border-gray-700 text-[var(--color-third)]">
                    <td className="px-4 py-2">Basic</td>
                    <td className="px-4 py-2">✔</td>
                    <td className="px-4 py-2">✔</td>
                </tr>
                <tr className="border-b border-gray-700 text-[var(--color-third)]">
                    <td className="px-4 py-2">Pro</td>
                    <td className="px-4 py-2">✔</td>
                    <td className="px-4 py-2">✔</td>
                </tr>
                </tbody>
            </table>

            <div className="absolute top-2 right-2 cursor-pointer text-[var(--color-primary)]" onClick={() => navigate(-1)}>X</div>
        </div>
    );
};

export default Pricing;
