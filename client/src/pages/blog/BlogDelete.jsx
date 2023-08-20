import axios from "axios";
import { toast } from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../utils/apiUrl";
import token from "../../utils/token";
import Loading from "../../component/Loading";
import useUserStore from "../../store/userStore";

// eslint-disable-next-line react/prop-types
const BlogDelete = ({ id,open, setOpen }) => {
    const {isLoading,activeLoading,cancelLoading } = useUserStore()
    const navigate = useNavigate()
    const handleDelete = async() => {
        activeLoading()
        try {
            const res = await axios.delete(`${apiUrl}/api/blog/${id}`,{
                headers: {
                    'authorization': token()
                }
            })
            if(res.data.status === 200){
                cancelLoading()
                toast.success('ডিলিট হয়েছে। ')
                setOpen(!open)
                navigate('/blog')
            }
        } catch (error) {
            cancelLoading()
            toast.error(error?.response?.data?.message)
        }
    }
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
                    আপনি কি নিশ্চিত ?
                    <RxCrossCircled
                        size={25}
                        onClick={() => setOpen(!open)}
                        className='absolute top-0 right-0 cursor-pointer hover:text-red-500'
                    />
                </h2>
                <div
                    className="space-y-2"
                >
                    <p>
                        আপনি ডিলিট করলে এটি আর কখনোই ফিরে পাবেন না। তথ্যটি চিরতের জন্য ডাটাবেস থেকে মুছে ফেলা হবে।
                    </p>
                    <div
                        className="flex justify-end space-x-2"
                    >
                    <button
                        onClick={() => setOpen(!open)}
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                        বাতিল
                    </button>
                    <button
                        onClick={() => handleDelete()}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        ডিলিট করুন
                    </button>
                    </div>
                </div>
            </div>
            {isLoading &&
                <Loading/>
            }
        </div>
    );
};

export default BlogDelete;