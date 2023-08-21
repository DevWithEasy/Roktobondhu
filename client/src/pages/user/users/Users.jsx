import axios from "axios";
import { toBengaliNumber } from "bengali-number";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import Loading from "../../../component/Loading";
import useUserStore from "../../../store/userStore";
import apiUrl from "../../../utils/apiUrl";
import token from "../../../utils/token";
import DeleteUser from "./DeleteUser";
import ReactPaginate from 'react-paginate';

const Users = () => {
    const { isLoading, activeLoading, cancelLoading } = useUserStore()
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [id, setId] = useState('')
    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)

    const handlePage = (e) => {
        setPage(e.selected)
    }

    const getUsers = async (page) => {
        activeLoading()
        try {
            const res = await axios.get(`${apiUrl}/api/auth/users?page=${page}`, {
                headers: {
                    'authorization': token()
                }
            })
            if (res.data.status === 200) {
                cancelLoading()
                setPages(res.data.data.pages)
                setUsers(res.data.data.users)
            }
        } catch (error) {
            cancelLoading()
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers(page)
    }, [page])
    return (
        <div
            className=""
        >
            <div className="relative overflow-x-auto">
                <table className="w-full">
                    <thead className="text-white bg-red-400">
                        <tr>
                            <td className="p-2">
                                নাম
                            </td>
                            <td className="p-2">
                                ফোন
                            </td>
                            <td className="p-2">
                                ই-মেইল
                            </td>
                            <td className="p-2 text-center">
                                একশন
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {users &&
                            // eslint-disable-next-line react/prop-types
                            users.map((user) =>
                                <tr
                                    key={user?._id}
                                    className='bg-white border-b'>
                                    <td className="p-2">
                                        {user?.name}
                                    </td>
                                    <td className="p-2">
                                        {toBengaliNumber(user?.phone)}
                                    </td>
                                    <td className="p-2">
                                        {user?.email}
                                    </td>
                                    <td className="p-2 flex justify-center items-center space-x-2">
                                        <BiEdit
                                            size={20}
                                            onClick={() => navigate(`/user/all/users/update/${user?._id}`)}
                                            className='text-blue-500 cursor-pointer'
                                        />
                                        <AiOutlineDelete
                                            onClick={() => {
                                                setId(user?._id);
                                                setOpen(!open)
                                            }}
                                            size={20}
                                            className='text-red-500 cursor-pointer'
                                        />
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
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
            {open &&
                <DeleteUser {...{ id, open, setOpen }} />
            }
            {isLoading &&
                <Loading />
            }
        </div>
    );
};

export default Users;