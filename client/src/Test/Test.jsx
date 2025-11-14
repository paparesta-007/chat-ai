import React , {useState} from "react"
import SkeletonConversation from "../Components/Skeleton"
import ConfirmDialog from "../Components/ConfirmDialog"
const Test = ()=>{
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className="bg-[var(--background-Primary)] h-screen w-screen">
            <div className="text-[var(--color-primary)]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta natus quo fuga maxime nulla quibusdam. Tempora, ea facilis. Facere aliquam, at voluptatem tempore earum officiis praesentium neque fuga quam cumque!</div>
            <button className="bg-[var(--color-primary)] px-2 py-1 rounded-md cursor-pointer" onClick={() => setIsOpen(true)}>Open Confirm Dialog</button>
            <ConfirmDialog 
                message="Sei sicuro di voler eliminare questa conversazione?" 
                onConfirm={() => {
                    console.log("Confirmed!");
                    setIsOpen(false);
                }}
                onCancel={() => setIsOpen(false)}
                open={isOpen}
            />
        </div>
    )
}
export default Test



// const SkeletonConversation = () => {
//   const items = [1, 2, 3,4,5,6,7,8,9,0]; // numero di skeleton
//   const [visibleIndexes, setVisibleIndexes] = useState([]);

//   useEffect(() => {
//     let time = 0;

//     items.forEach((_, index) => {
//       const delay = index === 0 ? 300 : 200; // primo 0.3s, poi 0.2s
//       time += delay;

//       setTimeout(() => {
//         setVisibleIndexes((prev) => [...prev, index]);
//       }, time);
//     });
//   }, []);

//   return (
//     <div className="flex flex-col gap-1">
//       {items.map((item, index) => (
//         <div
//           key={index}
//           className={`h-2 rounded-2xl w-full skeleton transition-opacity duration-300 ${
//             visibleIndexes.includes(index) ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           {/* puoi mettere "ciao" o lasciare vuoto */}
//         </div>
//       ))}
//     </div>
//   );
// };
