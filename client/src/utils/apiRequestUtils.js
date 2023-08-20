import axios from "axios"
import apiUrl from "./apiUrl"
import token from "./token"
import {toast} from 'react-hot-toast'

export const handleUpdate = async(value,addUser,activeLoading,cancelLoading) => {
    activeLoading()
    try {
        const  res = await axios.put(`${apiUrl}/api/auth/update`,value,{
            headers : {
                'authorization' : token()
            }
        })
        if(res.data.status === 200){
            cancelLoading()
            addUser(res.data.data)
            toast.success("আপডেট হয়েছে।")
        }
    } catch (error) {
        cancelLoading()
        toast.error(error?.response?.data?.message)
    }
}

export const getContributors=async(q,setContributers,activeLoading,cancelLoading)=>{
    activeLoading()
    try {
        const res = await axios.get(`${apiUrl}/api/contributer/?q=${q}`)
        if(res.data.status === 200){
            cancelLoading()
            setContributers(res.data.data)
        }
    } catch (error) {
        cancelLoading()
        toast.error(error?.response?.data?.message)
    }
}

export const getContributor = async(id,setValue) =>{
    try {
        const res = await axios.get(`${apiUrl}/api/contributer/${id}`,{
            headers : {
                'authorization' : token()
            }
        })
        if(res.data.status === 200) {
            setValue(res.data.data)
        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
}
