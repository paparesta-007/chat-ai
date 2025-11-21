import { ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr';
const GoBack = () => {
    return(
        <button onClick={() => window.history.back()} className="flex mb-4 items-center gap-2 text-[var(--color-primary)] text-md"><ArrowLeftIcon size={20}/>Go back</button>
                    
    )
}
export default GoBack;