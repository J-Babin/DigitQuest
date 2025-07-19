import { getSolutionByPosition } from "@/api/solutions";
import { PuzzleGrid } from "@/components/PuzzleGrid/PuzzleGrid";
import { Alphaindex, solutionDefaultValue } from "@/data/PuzzleData";
import { CircleQuestionMark, Puzzle } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

const SearchSolutionPage = () => {
    const [hoveredItem, setHoveredItem] = useState<boolean | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [searchValue, setSearchValue] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasSearched, setHasSearched] = useState<boolean>(false);

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

    const handleSearch = async (event: React.MouseEvent) => {
        event.preventDefault();
        const input = document.getElementById("default-search") as HTMLInputElement;
        const searchTerm = input.value.trim();
        
        if (searchTerm) {
            const [position, value] = searchTerm.split(":");
            if (position && value) {
                setLoading(true); // Début du chargement
                setHasSearched(true);
                
                try {
                    let index = parseInt(Alphaindex[position], 10);
                    let result = await getSolutionByPosition(index, parseInt(value, 10));

                    if (Array.isArray(result) && result.length > 0) {
                        setSearchValue(result);
                        console.log("Search results:", result);
                        toast.success(`Solution found for ${position}:${value}`);
                    } else {
                        setSearchValue([]); // Vider les résultats précédents
                        toast.error(`No solution found for ${position}:${value}`);
                    }
                } catch (error) {
                    console.error("Search error:", error);
                    setSearchValue([]);
                    toast.error("Une erreur s'est produite lors de la recherche");
                } finally {
                    setLoading(false); // Fin du chargement
                }
                
                input.value = "";
            } else {
                toast.error("Format invalide. Utilisez le format 'Position:Valeur' (ex: A:1)");
            }
        } else {
            toast.error("Veuillez entrer un terme de recherche au format: A:1");
        }
    };

    const handleClearResults = () => {
        setSearchValue([]);
        setHasSearched(false);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch(event as any);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Search Solution Page</h1>
            <div className="relative w-1/3">
                <input 
                    type="search" 
                    id="default-search" 
                    className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-3xl bg-[#E6E8F7] opacity-80 focus:ring-blue-500 border-0 focus:border-blue-500 dark:bg-[#c5ccfa] dark:placeholder-gray-800 placeholder:italic dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-lg" 
                    placeholder="Search by position A:1" 
                    required 
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                />
                <button 
                    type="submit" 
                    className="absolute end-2.5 bottom-2.5 rounded-lg hover:scale-110 hover:bg-[#b5befa] focus:ring-[#7c89db] focus:ring-1 focus:outline-none font-medium text-sm px-2 py-2 bg-white/30 text-gray-800 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-800"></div>
                    ) : (
                        <svg className="w-4 h-4 text-black dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    )}
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

            {hasSearched && searchValue.length > 0 && !loading && (
                <button 
                    onClick={handleClearResults}
                    className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                    Effacer les résultats
                </button>
            )}

            {!hasSearched && !loading && (
                <div className="flex flex-col items-center justify-center mt-4 w-2/3">
                    <PuzzleGrid onChange={() => {}} searchPage={true} />
                </div>
            )}

            {loading && (
                <div className="flex items-center justify-center mt-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <span className="ml-3 text-gray-700">Recherche en cours...</span>
                </div>
            )}

            {!loading && hasSearched && searchValue.length > 0 && (
                <div className="flex flex-row h-2/3 w-full pb-3 mt-3">
                    <div className="grid grid-cols-2 mx-2 gap-2 overflow-y-auto max-h-full w-screen">
                        {searchValue.map((result, index) => (
                            <div key={index} className="m-2 p-2 shadow-xl/30">
                                <PuzzleGrid onChange={() => {}} solutions={result} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!loading && hasSearched && searchValue.length === 0 && (
                <div className="mt-8 text-gray-500 text-center">
                    <Puzzle size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="text-lg mb-2">Aucun résultat trouvé</p>
                    <p className="text-sm">Essayez une autre combinaison position:valeur</p>
                </div>
            )}

            {!hasSearched && !loading && (
                <div className="mt-8 text-gray-500 text-center">
                    <CircleQuestionMark size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="text-lg mb-2">Recherchez une solution</p>
                    <p className="text-sm">Entrez une position et une valeur au format A:1</p>
                </div>
            )}

            {hoveredItem && createPortal(
                <div 
                    className="fixed w-1/4 bg-gray-800 text-white px-2 py-1 rounded-b-lg rounded-l-lg text-sm pointer-events-none whitespace-normal z-50"
                    style={{
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y - 12}px`,
                    }}
                >
                    <p className="text-[0.6rem]">
                        Vous pouvez rechercher une solution en entrant 
                        <span className="font-bold"> une position au format : </span><br />
                        <span className="text-red-300 font-bold text-sm justify-center">A</span>:
                        <span className="text-blue-300 font-bold text-sm">V</span>, 
                        <br/>
                        <span className="text-red-300 font-bold text-sm justify-center">A</span> représente la position,<br/>
                        <span className="text-blue-300 font-bold text-sm">V</span> représente la valeur de la case.<br/>
                        <br/>
                        <span className="text-yellow-300 text-xs">Exemples: A:1, B:5, C:3</span>
                    </p>
                </div>,
                document.body
            )}
        </div>
    );
}

export default memo(SearchSolutionPage);