import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Input from "../component/Input";
import Loading from "../component/Loading";
import useUserStore from "../store/userStore";
import apiUrl from "../utils/apiUrl";
import token from "../utils/token";

const Verification = () => {
    const { isLoading,activeLoading,cancelLoading } = useUserStore()
    const navigate = useNavigate()
    const [value, setValue] = useState({
        code: ''
    })

    const handleVerification=async(e)=>{
        e.preventDefault()
        activeLoading()
        try {
            const res = await axios.post(`${apiUrl}/api/auth/verify`,
                value,
                {
                    headers: {
                        'authorization' : token()
                    }
                }
            )
            if(res.data.status === 200){
                cancelLoading()
                localStorage.removeItem('token')
                navigate('/login')
            }
        } catch (error) {
            cancelLoading()
            toast.error(error?.response?.data?.message)
        }
    }

    const handleSendCodeAgain=async() => {
        activeLoading()
        try {
            const res = await axios.post(`${apiUrl}/api/auth/sendCodeAgain`,{},{
                headers : {
                    'authorization' : token()
                }
            })
            if(res.data.status === 200) {
                cancelLoading()
                toast.success('পুনরায় একটি যাচাকরন কোড পাঠানো হয়েছে।')
            }
        } catch (error) {
            cancelLoading()
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div
            className="m-2 pt-4"
        >
            <div
                className="w-full md:w-4/12 md:mx-auto shadow rounded"
            >
                <h2
                    className="p-2 bg-red-400 text-white font-bold rounded"
                >
                    একাউন্ট যাচাইকরণ
                </h2>
                <form
                    onSubmit={(e) => handleVerification(e)}
                    className="p-2 space-y-2"
                >
                    <Input {...{
                        value,
                        setValue,
                        label: "কোডঃ",
                        name: "code",
                        type: "text",
                        className: "",
                    }} />
                    {value.code && value.code.length < 6 &&
                        <p
                            className="text-red-500 text-sm"
                        >
                            ছয় সংখ্যার যাচাইকরন কোড দিন। 
                        </p>
                    }
                    <button
                        type="submit"
                        className="px-6 py-2 bg-red-400 text-white rounded"
                    >
                        সাবমিট
                    </button>
                </form>
                <button
                    onClick={() =>handleSendCodeAgain()}
                    className="p-2 text-red-500"
                >
                    পুনরায় কোড পাঠান
                </button>
            </div>
            {isLoading &&
                <Loading/>
            }
        </div>
    );
};

export default Verification;