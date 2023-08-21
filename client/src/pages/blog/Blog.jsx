import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BlogCard from "../../component/BlogCard";
import useUserStore from "../../store/userStore";
import apiUrl from "../../utils/apiUrl";
import Loading from "../../component/Loading";
import Head from "../../component/Head";
import ReactPaginate from "react-paginate";

const Blog = () => {
    const { isAuth,isLoading,activeLoading,cancelLoading } = useUserStore()
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)

    const handlePage = (e) => {
        setPage(e.selected)
    }
    const getBlogs = async (page) => {
        activeLoading()
        try {
            const res = await axios.get(`${apiUrl}/api/blog/?page=${page}`)
            if (res.data.status === 200) {
                cancelLoading()
                setPages(res.data.data.pages)
                setBlogs(res.data.data.blogs)
            }
        } catch (error) {
            cancelLoading()
            toast.error(error?.response?.data?.message)
        }
    }
    useEffect(() => {
        getBlogs(page)
    }, [page])

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
                    className="my-2 px-4 py-2 bg-red-500 text-white rounded"
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
            <div
                className="flex justify-center py-2"
            >
                <ReactPaginate
                    className=""
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePage}
                    pageRangeDisplayed={5}
                    pageCount={pages}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName="paginate"
                    activeClassName="p-active"
                />
            </div>
            {isLoading &&
                <Loading/>
            }
        </div>
    );
};

export default Blog;