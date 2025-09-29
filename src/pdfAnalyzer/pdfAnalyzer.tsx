import React, {useRef, useState} from "react";
import {Upload, FileText} from "lucide-react";
import TextBar from "../ChatPage/Textbar/Textbar";

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
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
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
            // qui aggiungi logica di estrazione testo o analisi
        }
    };

    return (
        <div className="h-screen w-screen bg-[var(--background-Primary)] p-4 overflow-hidden flex flex-col">
            <header className="w-screen md:w-1/2  flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-[var(--color-primary)]">
                    PDF Analyzer
                </h1>
            </header>
            <div className="flex md:flex-row flex-col h-full gap-4">
                {/* Colonna sinistra: Upload + Anteprima */}
                <div className="w-full md:w-1/2 h-full flex flex-col gap-4">
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
                                <Upload className="w-8 h-8"/>
                                <p className="font-medium">Carica un PDF</p>
                                <span className="text-sm text-gray-400">
                Trascina o clicca qui
              </span>
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col">
                                <div
                                    className="px-4 py-2 bg-[var(--background-secondary)] text-sm text-gray-300 flex items-center gap-2">
                                    <FileText className="w-4 h-4"/>
                                    {file.name}
                                </div>
                                {previewUrl && (
                                    <embed
                                        src={previewUrl}
                                        title="Anteprima PDF"
                                        className="w-full flex-1"
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                       <div className="flex gap-4  items-center">
                           <select name="Modello" id="" className="bg-[var(--background-Secondary)] px-4 py-2 border border-[var(--border-secondary)] text-[var(--color-primary)] rounded-xl">
                               <option value="">Seleziona modello</option>
                               <option value="gpt-3.5-turbo">GPT-3.5-Turbo</option>
                               <option value="gpt-4">GPT-4</option>
                               <option value="gpt-4o">GPT-4o</option>
                               <option value="gpt-4o-mini">GPT-4o-mini</option>
                           </select>
                           <select name="" id="" className="bg-[var(--background-Secondary)] px-4 py-2 border border-[var(--border-secondary)] text-[var(--color-primary)] rounded-xl">
                               <option value="">Seleziona stile</option>
                               <option value="">Concise</option>
                               <option value="">Educational</option>
                               <option value="">Creative</option>
                           </select>
                           <select name="" id="" className="bg-[var(--background-Secondary)] px-4 py-2 border border-[var(--border-secondary)] text-[var(--color-primary)] rounded-xl">
                               <option value="">Seleziona lingua</option>
                               <option value="">Italiano</option>
                               <option value="">Inglese</option>
                               <option value="">Spagnolo</option>
                               <option value="">Francese</option>
                           </select>
                       </div>
                        <button onClick={handleConvert}
                                className="bg-[var(--background-Tertiary)] text-[var(--color-Primary)] w-full px-4 py-2 rounded-xl">Converti
                            PDF
                        </button>
                    </div>
                </div>

                {/* Colonna destra: Chat */}
                <div
                    className="w-full md:w-1/2 h-full border-2 border-dashed border-[var(--border-secondary)] rounded-xl flex flex-col">
                    <div className="flex-1 p-4 overflow-auto">
                        {/* Qui puoi mostrare i messaggi della chat */}
                        <p className="text-gray-400 text-sm">Chat in arrivo...</p>
                    </div>
                    <div className="border-t border-[var(--border-secondary)] p-2">
                        <TextBar
                            prompt={prompt}
                            setPrompt={setPrompt}
                            setModel={setModel}
                            handleSend={handleSend}
                            isAnswering={isAnswering}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfAnalyzer;
