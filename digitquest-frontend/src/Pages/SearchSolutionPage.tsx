import { CircleQuestionMark } from "lucide-react";
import { memo, useState } from "react";
import { createPortal } from "react-dom";


const SearchSolutionPage = () => {
    const [hoveredItem, setHoveredItem] = useState<boolean | null >(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltipPosition({
            x: rect.left - 280,
            y: rect.top + 55
        });
        setHoveredItem(true);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Search Solution Page</h1>
            <div className="relative w-1/3">
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-3xl bg-[#E6E8F7] opacity-80 focus:ring-blue-500 border-0 focus:border-blue-500 dark:bg-[#c5ccfa]  dark:placeholder-gray-800 placeholder:italic dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-lg " placeholder="Search by position 1:2:3" required />
                <button type="submit" className="absolute end-2.5 bottom-2.5 rounded-lg hover:scale-110 hover:bg-[#b5befa] focus:ring-[#7c89db]  focus:ring-1 focus:outline-none  font-medium  text-sm px-2 py-2 bg-white/30 text-gray-800 shadow-lg">
                    <svg className="w-4 h-4 text-black dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </button>
                <div>
                    <CircleQuestionMark 
                        size={20} 
                        strokeWidth={1.75} 
                        className="absolute top-4 left-3 text-gray-600"
                        onMouseEnter={(e) => handleMouseEnter(e)}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>
            </div>

            {hoveredItem && createPortal(
                <div 
                    className="fixed w-1/4 bg-gray-800 text-white px-2 py-1 rounded-b-lg rounded-l-lg text-sm pointer-events-none whitespace]"
                    style={{
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y - 12}px`,
                    }}
                >
                   <p className="text-[0.6rem]">
                        Vous pouvez rechercher une solution en entrant 
                        <span className="font-bold"> une position au format : </span><br />
                        <span className="text-red-300 font-bold text-sm justify-center ">x</span>:
                        <span className="text-purple-300 font-bold text-sm ">y</span>:
                        <span className="text-blue-300 font-bold text-sm">v</span>, 
                        <br/>
                        <span className="text-red-300 font-bold text-sm justify-center ">x</span> represente la position horizontale,<br/>
                        <span className="text-purple-300 font-bold text-sm">y</span> represente la position verticale,<br/>
                        <span className="text-blue-300 font-bold text-sm">v</span> represente la valeur de la case.<br/>
                   </p>
                </div>,
                document.body
            )}
            
        </div>
    );
}

export default memo(SearchSolutionPage);