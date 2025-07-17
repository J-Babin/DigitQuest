import { memo, type JSX } from "react";
import Cell from "./Cell";

interface GridData{
    [key: string]: string | null;
}


const PuzzleGridComponent = () => {
    const NUMBER: number[] = [1,2,3,4,5,6,7,8,9];
    const ROW: number = 6;
    const COL: number = 7;
    const gridData: GridData = {
        "1:4": "-",
        "1:7": "66",
        "2:1": "+",
        "2:3": "x",
        "2:5": "-",
        "2:7": "=",
        "3:1": "13",
        "3:3": "12",
        "3:5": "11",
        "3:7": "10",
        "4:1": "x",
        "4:3": "+",
        "4:5": "+",
        "4:7": "-",
        "6:1": ":",
        "6:3": "+",
        "6:5": "x",
        "6:7": ":",
    };

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
        const key = `${row}:${col}`; 
        if (shouldRenderCell(row, col)) {
            if (hasCell(key)) {
                return <Cell key={key} index={key} disabled={true} value={gridData[key]}></Cell>;
            }else{
                return <Cell key={key} index={key} disabled={false} ></Cell>;
            }
            
        }
        return <div key={key}></div>;
    };

    return(
        <div className="flex flex-col items-center justify-center h-full">
            <div className="grid grid-rows-6 grid-cols-7 gap-2 w-1/2 place-content-center">
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