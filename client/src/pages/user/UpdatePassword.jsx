import { useState } from 'react';
import Input from '../../component/Input';
import axios from 'axios';
import token from '../../utils/token';
import useUserStore from '../../store/userStore';
import { toast } from 'react-hot-toast';
import apiUrl from '../../utils/apiUrl';
import Loading from '../../component/Loading';

const UpdatePassword = () => {
    const {addUser,isLoading,activeLoading,cancelLoading } = useUserStore()
    const [value, setValue] = useState({
        oldPassword : '',
        password : '',
        confirmPassword : ''
    })
    const handleChangePassword = async()=>{
        activeLoading()
        try {
            const res= await axios.put(`${apiUrl}/api/auth/updatePassword`,value,{
                headers : {
                    'authorization' : token()
                }
            })
            if(res.data.status === 200){
                cancelLoading()
                addUser(res.data.data)
                toast.success('আপডেট হয়েছে।')
            }
        } catch (error) {
            cancelLoading()
            toast.error(error?.response?.data?.message)
        }
    }
    
    return (
        <div
            
        >
            <h2
                className='p-1 font-bold text-center text-xl bg-red-400 text-white'
            >
            পাসওয়ার্ড পরিবর্তন
            </h2>
            <div
                className='py-2 space-y-2'
            >
            <Input
                {...{
                    value,
                    setValue,
                    label: "পুরাতন পাসওয়ার্ডঃ ",
                    name: "oldPassword",
                    type: "text",
                    className: "",
                }}
            />
            <Input
                {...{
                    value,
                    setValue,
                    label: "নতুন পাসওয়ার্ডঃ ",
                    name: "password",
                    type: "text",
                    className: "",
                }}
            />
            <Input
                {...{
                    value,
                    setValue,
                    label: "কনফার্ম পাসওয়ার্ডঃ ",
                    name: "confirmPassword",
                    type: "text",
                    className: "",
                }}
            />
            <p
                    className="text-red-500"
                >
                    {
                        value.password && value.password != value.confirmPassword && 'আপনার পাসওয়ার্ড মিল নাই। '
                    }
                </p>
            <button
                onClick={()=>handleChangePassword()}
                className='px-6 py-2 bg-red-500 text-white rounded'
            >
                সাবমিট
            </button>
            </div>
            {isLoading &&
                <Loading/>
            }
        </div>
    );
};

export default UpdatePassword;