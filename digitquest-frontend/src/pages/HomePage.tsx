import { memo } from "react";


const Home = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Bienvenu sur DigitQuest!</h1>
        </div>
    );
}

export default memo(Home);