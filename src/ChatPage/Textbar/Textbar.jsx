import React from 'react';
import availableModels from '../../library/avaibleModels';
const TextBar = ( {handleSend,setPrompt,isAnswering,prompt,setModel} ) => {
    const onKeyDown = (e) => {
        if (e.key === "Enter" && !isAnswering) {
            handleSend();
        }
    };
    const handleModelChange = (e) => {
        const selectedId = e.target.value;
        const selectedModel = availableModels.find(model => model.id === selectedId);
        if (selectedModel) {
            setModel(selectedModel);
        }
    };

    return(
            <div className="flex flex-col shadow-2xl 950 border border-[var(--border-secondary)] items-center absolute bottom-5 left-[50%] translate-x-[-50%] p-2 justify-center bg-[var(--background-Secondary)] w-[550px] rounded-2xl">
                <div className="flex w-full">
                    <input
                        type="text"
                        placeholder="Type your message"
                        value={prompt}
                        className="px-4 py-2 flex-grow outline-none text-[var(--color-primary)] placeholder:text-[#7a7e7d]"
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !isAnswering) {
                                handleSend();
                                setPrompt(""); // opzionale: pulisce input subito dopo invio
                            }
                        }}
                    />
                    <button onClick={()=>{handleSend();setPrompt("")}} onKeyDown={onKeyDown} disabled={isAnswering} className={isAnswering ? "p-1.5 bg-[var(--background-Tertiary)] cursor-not-allowed text-white border border-[var(--border-Tertiary)] rounded" : "p-1.5 bg-[var(--background-Tertiary)] cursor-pointer text-white border border-[var(--border-Tertiary)] rounded"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-send-fill" viewBox="0 0 16 16">
                            <path
                                d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                        </svg>
                    </button>
                </div>
                <div className="flex w-full gap-2 mt-2">
                    <button className=" p-1.5 text-[#7a7e7d] border-[#7a7e7d] rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-image-fill" viewBox="0 0 16 16">
                            <path
                                d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                        </svg>
                    </button>
                    <button className=" p-1.5 text-[#7a7e7d] border-[#7a7e7d] rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-globe" viewBox="0 0 16 16">
                            <path
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
                        </svg>
                    </button>
                    <button className=" p-1.5 text-[#7a7e7d] border-[#7a7e7d] rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-plus" viewBox="0 0 16 16">
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                        </svg>
                    </button>
                    <select onChange={handleModelChange} className=" p-1.5 rounded-lg bg-[var(--background-Secondary)] text-xs text-[var(--color-third)] outline-none rounded">
                       {availableModels.map((model,index)=>{
                            return(
                                <option key={model.id} selected={index===2} value={model.id}>{model.name}</option>
                            )
                       })}
                    </select>
                </div>
            </div>
    )
};

export default TextBar;
