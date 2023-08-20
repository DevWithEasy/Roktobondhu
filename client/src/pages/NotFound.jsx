import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div
            className="h-96 flex justify-center items-center"
        >
            <div
                className="space-y-2 text-center"
            >
                <p
                    className="font-extrabold text-3xl md:text-6xl text-red-500"
                >
                    Error404
                </p>
                <p
                    className="text-gray-400"
                >
                    Page not found
                </p>
                <button
                    onClick={()=>navigate('/')}
                    className="px-2 py-1 md:p-2 bg-red-500 text-white rounded"
                >
                    Go Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;