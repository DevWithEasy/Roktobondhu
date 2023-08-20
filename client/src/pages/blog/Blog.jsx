import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BlogCard from "../../component/BlogCard";
import useUserStore from "../../store/userStore";
import apiUrl from "../../utils/apiUrl";
import Loading from "../../component/Loading";
import Head from "../../component/Head";

const Blog = () => {
    const { isAuth,isLoading,activeLoading,cancelLoading } = useUserStore()
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    const getBlogs = async () => {
        activeLoading()
        try {
            const res = await axios.get(`${apiUrl}/api/blog`)
            if (res.data.status === 200) {
                cancelLoading()
                setBlogs(res.data.data)
            }
        } catch (error) {
            cancelLoading()
            toast.error(error?.response?.data?.message)
        }
    }
    useEffect(() => {
        getBlogs()
    }, [])

    return (
        <div
            className="m-2  md:w-10/12 md:mx-auto"
        >
            <Head {...{
                title : `রক্তবন্ধু - ব্লগ`
            }}/>
            {isAuth &&
                <button
                    onClick={() => navigate('/blog/create')}
                    className="my-2 px-4 py-2 bg-red-400 text-white rounded"
                >
                    নতুন ব্লগ লিখুন
                </button>
            }

            <div className="grid md:grid-cols-3 gap-4">
                {blogs &&
                    blogs.map(blog =>
                        <BlogCard
                        key={blog._id}
                        {...{blog}}
                        />
                    )
                }
            </div>
            {isLoading &&
                <Loading/>
            }
        </div>
    );
};

export default Blog;