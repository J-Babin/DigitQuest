import { memo } from "react";


const HistoryPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">History Page</h1>
            <p>This is the History Page content.</p>
        </div>
    );
}

export default memo(HistoryPage);