import { useState } from "react";
import Input from "../component/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import apiUrl from "../utils/apiUrl";
import useUserStore from "../store/userStore";
import { toast } from "react-hot-toast";
import Loading from "../component/Loading";
import Head from "../component/Head";

const Login = () => {
    const navigate= useNavigate()
    const {addUser,isLoading,activeLoading,cancelLoading} = useUserStore()
    const [value,setValue] = useState({
        email : '',
        password : ''
    })
    
    const handleLoging=async(e) => {
        e.preventDefault()
        activeLoading()
        try {
            const res = await axios.post(`${apiUrl}/api/auth/signin`,value)
            if(res.data.status === 200) {
                cancelLoading()
                if(res.data.data.isVerified === false){
                    navigate('/verification')
                }else{
                    localStorage.setItem('token',res.data.data.token)
                    addUser(res.data.data)
                    navigate('/profile')
                }
            }
        } catch (error) {
            cancelLoading()
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div
            className="mx-2 md:w-4/12 md:mx-auto mt-5 border shadow-lg rounded"
        >
            <Head {...{
                title : `রক্তবন্ধু - একাউন্ট লগ-ইন`
            }}/>
            <h2
                className="text-red-500 font-bold p-2 text-xl text-center mx-2 py-2 border-b-2"
            >
                লগ-ইন করুন
            </h2>
            <form
                onSubmit={(e)=>handleLoging(e)}
                className='p-4 space-y-2'
            >
                <Input
                    {...{
                        value,
                        setValue,
                        label: 'ই-মেইলঃ',
                        name: 'email',
                        className: ''
                    }}
                />
                <Input
                    {...{
                        value,
                        setValue,
                        label: 'পাসওয়ার্ডঃ ',
                        name: 'password',
                        className: ''
                    }}
                />
                <div
                    className="flex justify-between items-center"
                >
                    <Link to='/forget'
                        className="px-4 py-2 text-red-500"
                    >
                        পাসওয়ার্ড ভুলে গেছেন?
                    </Link>
                    <button 
                        type="submit"
                        className="px-6 pt-2 pb-1 bg-red-400 text-white rounded"
                    >
                        লগ-ইন
                    </button>
                </div>
            </form>
            {isLoading &&
                <Loading/>
            }
        </div>
    );
};

export default Login;