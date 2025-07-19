import { test } from "@/api/test";
import { memo } from "react";


const Home = () => {

    const testrequest = async () => {
        let result: void = await test()
        console.log(result);
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Welcome to the Home Page!</h1>
            <button onClick={testrequest} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
                Test API Request
            </button>
        </div>
    );
}

export default memo(Home);