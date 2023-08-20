import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import Input from "./Input";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useUserStore from "../store/userStore";

// eslint-disable-next-line react/prop-types
const AccessModal = ({ access, setAccess }) => {
    const {setViewAccess} = useUserStore()
    const [value, setValue] = useState({
        secret: ''
    })

    const handleAccess=()=>{
        if(!value.secret){
            return toast.error('আপনি কোন কোড প্রবেশ করান নি।')
        }else if(value.secret === '010203'){
            setAccess(!access)
            return setViewAccess()
        }else{
            return toast.error('আপনি সঠিক কোড প্রবেশ করান নি।')
        }
    }
    return (
        <div
            className="fixed -top-2 left-0 h-screen w-full z-10 flex justify-center items-center bg-gray-500/70"
        >
            <div
                className="w-full mx-2 md:w-4/12 md:mx-auto space-y-2 p-4 bg-white rounded-md shadow-lg"
            >
                <h2
                    className="relative pb-2 font-bold border-b"
                >
                    নাম্বার দেখার অনুমতি
                    <RxCrossCircled
                        size={25}
                        onClick={() => setAccess(!access)}
                        className='absolute top-0 right-0 cursor-pointer hover:text-red-500'
                    />
                </h2>
                <div
                    className="space-y-2"
                >
                    <p>
                        মহিলা ডোনাদের নাম্বার দেখার অনুমতি পেতে এডমিন প্যানেল হতে গোপন সংখ্যা সংগ্রহ করুন।
                        <Link
                            to='/contact'
                            className="text-red-500"
                        >
                            যোগাযোগ করুন
                        </Link>
                    </p>
                    <Input
                        {...{
                            value,
                            setValue,
                            label: "গোপন সংখ্যাঃ",
                            name: "secret",
                            type: "phone",
                            className: "",
                        }}
                    />
                    <button
                        onClick={()=>handleAccess()}
                        className="float-right px-4 py-2 bg-red-500 text-white rounded"
                    >
                        সাবমিট
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccessModal;