import React from 'react';
import exploreProducts from '../data/exploreProducts';
import { useState } from 'react';
const Explore = () => {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <div className="w-screen h-screen bg-[var(--background-Primary)] overflow-y-auto flex flex-col gap-6 items-center px-4 py-6">

            {/* Titolo */}
            <h1 className="text-4xl text-center font-bold text-[var(--color-primary)] tracking-wide">
                Explore all products
            </h1>

            {/* Barra di ricerca */}
            <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[60%] max-w-2xl text-[var(--color-primary)] p-3 rounded-xl border border-[var(--border-secondary)]
                   bg-[var(--background-Secondary)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />

            {/* Griglia prodotti */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:w-[70%] md:w-[90%] w-full gap-6 mt-4">
                {exploreProducts.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()
                    || product.description.toLowerCase().includes(searchQuery.toLowerCase()))
                    || product.type.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((product) => (
                    <div
                        key={product.title}
                        className="flex flex-col gap-3 bg-[var(--background-Secondary)] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        {/* Titolo prodotto */}
                        <h2 className="text-xl font-semibold text-[var(--color-primary)]">
                            {product.title}
                        </h2>

                        {/* Descrizione */}
                        <p className="text-[var(--color-third)] text-sm leading-relaxed">
                            {product.description}
                        </p>

                        {/* Tipo */}
                        <p className="text-[var(--color-primary)] font-medium italic">
                            {product.type}
                        </p>

                        {/* Pulsante */}
                        <button
                            className="mt-2 bg-[var(--background-Tertiary)] text-[var(--color-primary)] cursor-pointer
                         px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:brightness-110 transition"
                        >
                            {product.buttonText}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Explore;
