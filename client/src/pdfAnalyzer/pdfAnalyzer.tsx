import React, { useRef, useState, useEffect } from "react";
import { Upload, FileText } from "lucide-react";

const PdfAnalyzer = () => {
    const [prompt, setPrompt] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isAnswering, setIsAnswering] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFile = (selectedFile: File) => {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) handleFile(selectedFile);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) handleFile(droppedFile);
    };

    const handleSend = () => {
        console.log(prompt, model, file);
    };

    const handleConvert = () => {
        if (file) {
            console.log("Converti PDF:", file.name);
            // aggiungi qui logica di estrazione testo o analisi

        }
    };

    return (
        <div className="h-screen w-screen bg-[var(--background-Primary)] p-4 flex flex-col">
            {/* Header */}
            <header className="w-full mb-4">
                <h1 className="text-2xl font-bold text-[var(--color-primary)]">
                    PDF Analyzer
                </h1>
            </header>

            {/* Main content */}
            <div className="flex flex-row flex-1 gap-4">
                {/* Left empty column */}
                <div className="w-1/4"></div>

                {/* Center main column */}
                <div className="w-1/2 flex flex-col gap-4">
                    <input
                        type="file"
                        accept=".pdf"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleChange}
                    />

                    <div
                        onClick={!file ? handleClick : undefined}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-[var(--border-secondary)] rounded-xl overflow-hidden relative"
                    >
                        {!file ? (
                            <div className="flex flex-col items-center gap-2 text-[var(--color-primary)]">
                                <Upload className="w-8 h-8" />
                                <p className="font-medium">Carica un PDF</p>
                                <span className="text-sm text-gray-400">Trascina o clicca qui</span>
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col">
                                <div className="px-4 py-2  bg-[var(--background-secondary)] text-sm text-gray-300 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    {file.name}
                                </div>

                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">

                        <button
                            onClick={handleConvert}
                            className="bg-[var(--background-Tertiary)] text-[var(--color-Primary)] w-full px-4 py-2 rounded-xl"
                        >
                            Converti PDF
                        </button>
                    </div>

                    {/* Chat section */}
                    <div className="h-1/2 border-2 border-dashed border-[var(--border-secondary)] rounded-xl flex flex-col">
                        <div className="flex-1 p-4 overflow-auto">
                            <p className="text-gray-400 text-sm">Chat in arrivo...</p>
                        </div>
                        <div className="border-t border-[var(--border-secondary)] p-2">

                        </div>
                    </div>
                </div>

                {/* Right empty column */}
                <div className="w-1/4 h-full bg-[var(--background-Secondary)] p-2 rounded-xl flex flex-col gap-4">
                    <div className="flex justify-between flex-row items-center gap-2">
                        <div className="flex flex-col">
                            <span className="text-[var(--color-primary)] text-lg font-semibold">Model</span>
                            <span className="text-[var(--color-third)] text-sm font-semibold">Choose the best model</span>
                        </div>
                        <select className="bg-[var(--background-Secondary)] outline-none px-4 py-2 border border-[var(--border-secondary)] text-[var(--color-primary)] rounded-xl">
                            <option value="">Seleziona modello</option>
                            <option value="gpt-3.5-turbo">GPT-3.5-Turbo</option>
                            <option value="gpt-4">GPT-4</option>
                            <option value="gpt-4o">GPT-4o</option>
                            <option value="gpt-4o-mini">GPT-4o-mini</option>
                        </select>
                    </div>
                    <div className="flex justify-between flex-row items-center gap-2">
                        <div className="flex flex-col">
                            <span className="text-[var(--color-primary)] text-lg font-semibold">Style</span>
                            <span className="text-[var(--color-third)] text-sm font-semibold">Browse all style templates or create one</span>
                        </div>
                        <select className="bg-[var(--background-Secondary)] outline-none px-4 py-2 border border-[var(--border-secondary)] text-[var(--color-primary)] rounded-xl">
                            <option value="">Seleziona modello</option>
                            <option value="gpt-3.5-turbo">GPT-3.5-Turbo</option>
                            <option value="gpt-4">GPT-4</option>
                            <option value="gpt-4o">GPT-4o</option>
                            <option value="gpt-4o-mini">GPT-4o-mini</option>
                        </select>
                    </div>
                    <div className="flex justify-between flex-row items-center gap-2">
                        <div className="flex flex-col">
                            <span className="text-[var(--color-primary)] text-lg font-semibold">Additional information</span>
                            <span className="text-[var(--color-third)] text-sm font-semibold">Let our AI know what you want so that it can better understand your needs</span>

                        </div>
                        <textarea className="bg-[var(--background-Secondary)] px-4 py-2 border border-[var(--border-secondary)] text-[var(--color-primary)] rounded-xl"></textarea>
                    </div>
                    <input type="text" placeholder="Inserisci il prompt" className="bg-[var(--background-Secondary)] px-4 py-2 border border-[var(--border-secondary)] text-[var(--color-primary)] rounded-xl" />
                    <button className="bg-[var(--background-Tertiary)] text-[var(--color-Primary)] w-full px-4 py-2 rounded-xl">Converti PDF</button>
                </div>
            </div>
        </div>
    );
};

export default PdfAnalyzer;
