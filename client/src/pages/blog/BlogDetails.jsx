import axios from "axios";
import { toBengaliNumber } from "bengali-number";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import { BsFacebook, BsTelegram } from 'react-icons/bs';
import { FaWhatsappSquare } from 'react-icons/fa';
import { Link, useParams } from "react-router-dom";
import useUserStore from "../../store/userStore";
import apiUrl from "../../utils/apiUrl";
import BlogDelete from "./BlogDelete";
import Loading from "../../component/Loading";
import Head from "../../component/Head";

const BlogDetails = () => {
    const { user, isLoading, activeLoading, cancelLoading } = useUserStore()
    const { id } = useParams()
    const [blog, setBlog] = useState({})
    const [open, setOpen] = useState(false)
    const [deleteId, setDeleteId] = useState('')

    const getBlog = async (id) => {
        activeLoading()
        try {
            const res = await axios.get(`${apiUrl}/api/blog/${id}`)
            if (res.data.status === 200) {
                cancelLoading()
                setBlog(res.data.data)
            }
        } catch (error) {
            cancelLoading()
            toast.error(error?.response?.data?.message)
        }
    }
    useEffect(() => {
        getBlog(id)
    }, [id])

    return (
        <div
            className="p-2 md:w-10/12 mx-auto md:mt-2 space-y-5 bg-red-50/80 rounded "
        >
            <Head {...{
                title: `${blog?.title}`
            }} />
            <div
                className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
            >
                <div className="md:w-5/12 overflow-hidden">
                    <img src={`${apiUrl}${blog?.image}`}
                        alt="" className="h-[300px] md:h-[350px] w-auto mx-auto rounded" />
                </div>
                <div
                    className="md:w-7/12 flex flex-col justify-center items-center"
                >
                    <h2
                        className="mb-5 text-xl text-red-500 font-bold"
                    >
                        {blog?.title}
                    </h2>
                    <img
                        src={`${apiUrl}${blog?.user?.image}`}
                        className="h-12 w-12 p-0.5 border border-red-500 rounded-full"
                    />
                    <p
                        className="text-gray-600"
                    >
                        <span>
                            পোস্ট করেছেনঃ  {blog?.user?.name}
                        </span>
                        <span>|</span>
                        <span>
                            {toBengaliNumber(new Date(blog?.createdAt).toLocaleDateString())}
                        </span>
                    </p>
                    <p
                        className="text-gray-600 space-x-2"
                    >
                        <span>
                            পোস্টটি দেখা হয়েছেঃ
                        </span>
                        <span>
                            {toBengaliNumber(blog?.views)} বার
                        </span>
                    </p>
                    <div
                        className="flex space-x-3"
                    >
                        <div>
                            শেয়ার করুনঃ
                        </div>
                        <div
                            className="flex items-center space-x-1"
                        >
                            <BsFacebook
                                size={25}
                                className='p-0.5 bg-white text-blue-500 rounded-full'
                            />
                            <AiFillTwitterCircle
                                size={25}
                                className='p-0.5 bg-white text-blue-500 rounded-full'
                            />
                            <AiFillInstagram
                                size={25}
                                className='p-0.5 bg-white text-pink-500 rounded-full'
                            />
                            <FaWhatsappSquare
                                size={25}
                                className='p-0.5 bg-white text-green-500 rounded-full'
                            />
                            <BsTelegram
                                size={25}
                                className='p-0.5 bg-white text-blue-400 rounded-full'
                            />
                        </div>
                    </div>
                    {user?._id === blog?.user?._id &&
                        <div
                            className="pt-2 space-x-2 text-sm"
                        >
                            <button
                                onClick={() => {
                                    setDeleteId(blog?._id)
                                    setOpen(!open)
                                }}
                                className="px-4 py-1 bg-red-500 text-white rounded"
                            >
                                ডিলিট করুন
                            </button>
                            <Link
                                to={`/blog/update/${blog?._id}`}
                                className="px-4 py-1 bg-blue-500 text-white rounded"
                            >
                                আপডেট করুন
                            </Link>
                        </div>
                    }

                </div>
            </div>
            <div
                className="p-4 bg-white rounded"
                dangerouslySetInnerHTML={{ __html: blog?.description }}
            >

            </div>
            {open &&
                <BlogDelete {...{
                    id: deleteId,
                    open,
                    setOpen
                }} />
            }
            {isLoading &&
                <Loading />
            }
        </div>
    );
};

export default BlogDetails;