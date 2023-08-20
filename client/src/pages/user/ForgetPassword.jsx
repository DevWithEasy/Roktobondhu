import axios from 'axios';
import { useState } from 'react';
import InputUpdate from '../../component/InputUpdate';
import apiUrl from '../../utils/apiUrl';
import {useNavigate} from 'react-router-dom'
import Loading from '../../component/Loading';
import useUserStore from '../../store/userStore';
import { toast } from 'react-hot-toast';

const ForgetPassword = () => {
    const { isLoading,activeLoading,cancelLoading } = useUserStore()
    const navigate = useNavigate()
    const [value, setValue] = useState({
        email: ''
    })

    const [user, setUser] = useState({})

    const handleFind = async () => {
        activeLoading()
        try {
            const res = await axios.get(`${apiUrl}/api/auth/find?email=${value.email}`)
            if(res.data.status === 200) {
                cancelLoading()
                setUser(res.data.data)
            }
        } catch (error) {
            cancelLoading()
            toast.error(error?.response?.data?.message)
        }
    }

    const handleForget = async () => {
        activeLoading()
        try {
            const res = await axios.post(`${apiUrl}/api/auth/forget?email=${value.email}`)
            if(res.data.status === 200){
                cancelLoading()
                localStorage.setItem('reset_token',res.data.reset_token)
                navigate('/reset')
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
                    <InputUpdate {...{
                        label: 'ইমেইল',
                        name: 'email',
                        type: 'email',
                        fieldValue : value.email,
                        value,
                        setValue,
                    }} />
                    <button
                        onClick={() => handleFind()}
                        className='px-6 py-2 bg-red-400 hover:bg-red-500 text-white rounded'
                    >
                        খুজুন
                    </button>
                </div>
                {user?.email &&
                    <div
                        className='m-2 flex space-x-4 border rounded p-1'
                    >
                        <img
                            className='w-20 h-20 p-0.5 border border-red-400 rounded-full'
                            src={`${apiUrl}${user?.image}`} alt=""
                        />
                        <div>
                            <p>নামঃ {user?.name}</p>
                            <p>ই-মেইলঃ {user?.email}</p>
                            <div
                                className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2'
                            >
                                <button
                                    onClick={()=>{
                                        setValue({
                                            email : ''
                                        })
                                        setUser({})
                                    }}
                                    className='px-4 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded'
                                >
                                    আমার একাউন্ট না
                                </button>
                                <button
                                    onClick={() => handleForget()}
                                    className='px-4 py-1 bg-red-400 hover:bg-red-500 text-white rounded'
                                >
                                    পাসওয়ার্ড রিসেট
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {isLoading &&
                <Loading/>
            }
        </div>
    );
};

export default ForgetPassword;