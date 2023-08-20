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

const Users = () => {
    const { isLoading, activeLoading, cancelLoading } = useUserStore()
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [id, setId] = useState('')
    const [random,setRandom] = useState(1)

    const getUsers = async () => {
        activeLoading()
        try {
            const res = await axios.get(`${apiUrl}/api/auth/users`, {
                headers: {
                    'authorization': token()
                }
            })
            if (res.data.status === 200) {
                cancelLoading()
                setUsers(res.data.data)
            }
        } catch (error) {
            cancelLoading()
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers()
    }, [random])
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
            {open && 
                <DeleteUser {...{id,open,setOpen,setRandom}}/>
            }
            {isLoading &&
                <Loading />
            }
        </div>
    );
};

export default Users;