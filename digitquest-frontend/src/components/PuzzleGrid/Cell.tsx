import { motion } from "framer-motion";
import { memo, type ChangeEvent, type FC, type PropsWithChildren, type ReactNode } from "react";

// interface CellData {
//     value: number | null,
//     isClickable: boolean
// }

type CellProps = PropsWithChildren<{
    index: string,
    color?: string,
    disabled?: boolean,
    value?: ReactNode,
    onChanged: (value: ChangeEvent<HTMLInputElement>) => void
}>



const Cell: FC<CellProps> = (CellProps) => {

    

    return (
        <div className="box">
            <motion.input 
            type="text" 
            id={CellProps.index} 
            onChange={(e) => {CellProps.onChanged(e)}} 
            data-input-counter 
            data-input-counter-min="1" 
            data-input-counter-max="9" 
            aria-describedby="choose a number between 1 and 9" 
            placeholder="?" 
            className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                // onClick={() => alert("Cell clicked! Index: " + CellProps.index)}
               disabled={CellProps.disabled}   
               defaultValue={CellProps.value?.toString()}           
            >
            </motion.input>
        </div>
    )
}

export default memo(Cell);