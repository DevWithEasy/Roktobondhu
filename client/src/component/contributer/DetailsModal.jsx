import { useEffect, useState } from "react";
import { BsFacebook } from "react-icons/bs";
import { GrFacebook } from "react-icons/gr";
import { RxCrossCircled } from "react-icons/rx";
import { getContributor } from "../../utils/apiRequestUtils";
import apiUrl from "../../utils/apiUrl";

// eslint-disable-next-line react/prop-types
const DatailsContributer = ({ id, view, setView }) => {
    const [value, setValue] = useState({})
    useEffect(() => {
        getContributor(id, setValue)
    }, [id])
    return (
        <div
            className="fixed -top-0 left-0 h-screen w-full z-10 flex justify-center items-center bg-gray-500/70"
        >
            <div
                className="w-full mx-2 md:w-4/12 md:mx-auto space-y-2 p-4 bg-white rounded-md shadow-lg"
            >
                <h2
                    className="relative pb-2 font-bold border-b"
                >
                    কন্ট্রিবিউটর্স ডিটেইলস
                    <RxCrossCircled
                        size={25}
                        onClick={() => setView(!view)}
                        className='absolute top-0 right-0 cursor-pointer hover:text-red-500'
                    />
                </h2>
                <div
                    className="space-y-2"
                >
                    <img
                        src={`${apiUrl}${value?.image}`}
                        className='h-[150px] w-[150px] mx-auto border rounded-full'
                    />
                    <p
                        className='font-bold text-xl'
                    >
                        {value?.name}
                    </p>
                    {value?.contributerType == 'volantear' &&
                        <p
                            className=''
                        >
                            পদবীঃ {value?.designation}
                        </p>
                    }

                    <p
                        className=''
                    >
                        ফোনঃ <a href={`tel:${value?.phone}`}>
                            {value?.phone}
                        </a>

                    </p>
                    <p
                        className=''
                    >
                        ই-মেইলঃ {value?.email}
                    </p>
                    <p
                        className=''
                    >
                        স্থানঃ {value?.address}
                    </p>
                    <div
                        className='flex items-center space-x-2'
                    >
                        <a
                            href={value?.facebookPage}
                            className='flex items-center space-x-1 p-2 border rounded group hover:bg-blue-500 transition-all duration-500'
                        >
                            <BsFacebook
                                className='text-blue-500 group-hover:text-white'
                            />
                            <span className='text-sm group-hover:text-white'> Page</span>
                        </a>
                        {value?.contributerType == 'partner' &&
                            <a
                                href={`https://facebook.com/${value?.facebookGroup}`}
                                className='flex items-center space-x-1 p-2 border rounded group hover:bg-blue-500 transition-all duration-500'
                            >
                                <GrFacebook
                                    className='text-blue-500 group-hover:text-white'
                                />
                                <span className='text-sm group-hover:text-white'>Group</span>
                            </a>
                        }
                    </div>
                    <div
                        className="flex justify-end space-x-2"
                    >
                        <button
                            onClick={() => setView(!view)}
                            className="px-4 py-2 bg-gray-500 text-white rounded"
                        >
                            বন্ধ করুন
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DatailsContributer;