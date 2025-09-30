const Tooltip = ({text}:{text:string})=>{
    return(
         <div className="absolute left-1/2 -translate-x-1/2 bottom-[-3rem] animate-slideDown mb-2 hidden group-hover:flex animate-tooltip transition duration-200 flex-col items-center">
            <div className="relative bg-[var(--color-primary)] text-white text-xs rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
            {text}
            {/* Freccia */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[var(--color-primary)]"></div>
            </div>
        </div>
    )
}
export default Tooltip