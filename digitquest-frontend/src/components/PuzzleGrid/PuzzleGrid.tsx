import { memo, type ChangeEvent, type FC, type JSX } from "react";
import Cell from "@/components/PuzzleGrid/Cell";
import { gridData, solutionDefaultValue, solutionIndexes } from "@/data/PuzzleData";



type PuzzleGridProps = {
    onChange: (value: ChangeEvent<HTMLInputElement>) => void;
    solutions?: { positions: string | Number[];}
    searchPage?: boolean;
}

const PuzzleGridComponent : FC<PuzzleGridProps> = (PuzzleGridProps) => {
    const ROW: number = 6;
    const COL: number = 7;
    const orderKey = [0, 5, 9, 6, 2, 4, 7, 10, 7]

    const solutionArray = PuzzleGridProps.solutions?.positions.toString().split("").map(Number);

    

    const hasCell = (position: string | number): boolean => {
        return position in gridData
    }
    
    const shouldRenderCell = (row: number, col: number): boolean => {
        if(row === 6 && col === 4) return false;
        if((col === 2 || col === 6) && row !== 6) return false;
        if(col === 4 && row !== 1) return false;
        return true;
    };
    
    const renderCell = (row: number, col: number): JSX.Element => {
        const key: string = `${row}:${col}`; 
        if (shouldRenderCell(row, col)) {
            if (hasCell(key)) {
                return <Cell key={key} index={key} disabled={true} value={gridData[key]} onChanged={PuzzleGridProps.onChange}></Cell>;
            }else if (solutionArray && solutionArray.length > 0) {
                const value = solutionArray[Number(solutionIndexes[key])];
                orderKey.shift();
                return <Cell key={key} index={key} disabled={true} value={value} onChanged={PuzzleGridProps.onChange}></Cell>;
            }
            else if (PuzzleGridProps.searchPage) {
                const value = solutionDefaultValue[key];
                return <Cell key={key} index={key} disabled={true} value={value} onChanged={PuzzleGridProps.onChange}></Cell>;
            }
            else{

                return <Cell key={key} index={key} disabled={false} onChanged={PuzzleGridProps.onChange}></Cell>;

            }
            
        }
        return <div key={key}></div>;
    };

    return(
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div 
                className="grid grid-rows-6 grid-cols-7 gap-2  place-content-center"
                onClick={ solutionArray ? () => {alert("Dans l'history")} : undefined }
            >
                {Array.from({ length: ROW }, (_, rowIndex) =>
                    Array.from({ length: COL }, (_, colIndex) =>
                        renderCell(rowIndex + 1, colIndex + 1)
                    )
                ).flat()}
            </div>
        </div>
    )
}

export const PuzzleGrid = memo(PuzzleGridComponent);