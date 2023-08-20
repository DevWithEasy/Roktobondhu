import { toBengaliNumber } from "bengali-number";
import { Link, useNavigate } from "react-router-dom";
import apiUrl from "../utils/apiUrl";

const BlogCard = ({blog}) => {
    const navigate = useNavigate()
    return (
        <div
                            
                            className="flex flex-col shadow-lg rounded bg-white">
                            <div className="h-26 w-full overflow-hidden">
                                <img
                                    onClick={() => navigate(`/blog/${blog._id}`)}
                                    src={`${apiUrl}${blog?.image}`}
                                    alt="" className="h-[250px] w-full rounded-t cursor-pointer" 
                                />
                            </div>
                            <div className="w-full p-4 flex-1">
                                <div>
                                    <Link
                                        to={`/blog/${blog?._id}`}
                                        className="text-xl text-red-500 font-bold"
                                    >
                                        {blog?.title}
                                    </Link>
                                    <p
                                        className="text-gray-600 text-sm"
                                    >
                                        <span>
                                            পোস্ট করেছেনঃ  {blog?.user?.name}
                                        </span>
                                        <span>|</span>
                                        <span>
                                            {
                                                toBengaliNumber(new Date(blog?.createdAt).toLocaleDateString())
                                            }
                                        </span>
                                    </p>
                                </div>
                                <div
                                    className="text-gray-400"
                                    dangerouslySetInnerHTML={{ __html: blog.description.slice(0, 150) }}
                                />

                            </div>
                        </div>
    );
};

export default BlogCard;