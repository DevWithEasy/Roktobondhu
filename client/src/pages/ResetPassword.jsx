import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../component/Input";
import { useState } from "react";
import apiUrl from "../utils/apiUrl";
import useUserStore from "../store/userStore";
import { toast } from "react-hot-toast";
import Loading from "../component/Loading";

const ResetPassword = () => {
    const {isLoading,activeLoading,cancelLoading } = useUserStore()
    const navigate = useNavigate()
    const [value,setValue] = useState({
        code : "",
        password: "",
        confirmPassword: ""
    })
    const handleReset=async()=>{
        activeLoading()
        try {
            const res = await axios.put(`${apiUrl}/api/auth/reset`,value,{
                headers : {
                    'authorization' : 'Bareer '+localStorage.getItem('reset_token')
                }
            })
            if(res.data.status === 200){
                cancelLoading()
                navigate('/login')
            }
        } catch (error) {
            cancelLoading()
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <div
            className='m-2 mt-5'
        >
            <div
                className='md:w-4/12 pb-2 mx-auto shadow rounded'
            >
                <h2
                    className='p-2 bg-red-400 text-white rounded'
                >
                    আপনার একাউন্ট খুজুন
                </h2>
                <div
                    className='p-2 space-y-2'
                >
                    <Input {...{
                        label: 'কোডঃ',
                        name: 'code',
                        type: 'text',
                        value,
                        setValue,
                    }} />
                    <Input {...{
                        label: 'পাসওয়ার্ডঃ',
                        name: 'password',
                        type: 'text',
                        value,
                        setValue,
                    }} />
                    <Input {...{
                        label: 'কনফার্ম পাসওয়ার্ডঃ',
                        name: 'confirmPassword',
                        type: 'text',
                        value,
                        setValue,
                    }} />
                    <p
                    className="text-red-500"
                >
                    {
                        value.password && value.password != value.confirmPassword && 'আপনার পাসওয়ার্ড মিল নাই। '
                    }
                </p>
                    <button
                        onClick={() => handleReset()}
                        className='px-6 py-2 bg-red-400 hover:bg-red-500 text-white rounded'
                    >
                        খুজুন
                    </button>
                </div>
            </div>
            {isLoading &&
                <Loading/>
            }
        </div>
    );
};

export default ResetPassword;