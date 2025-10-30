import React from "react"
import SkeletonConversation from "../Components/Skeleton"
const Test = ()=>{
    return(
        <div className="bg-[var(--background-Primary)] h-screen w-screen">
            <SkeletonConversation />
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
