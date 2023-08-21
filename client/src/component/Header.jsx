import { useState } from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import { NavLink, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";

const Header = () => {
    const { removeUser } = useUserStore()
    const navigate = useNavigate()
    const { isAuth } = useUserStore()
    const [open, setOpen] = useState(false)
    const handleLogout = () => {
        removeUser()
        navigate('/')
        localStorage.removeItem('token')
    }
    return (
        <div
            className="flex justify-between items-center px-4 py-2  bg-red-500 text-white"
        >
            <div
                className="w-3/12 flex items-center"
            >
                <h1
                    className='p-2 font-bold text-2xl cursor-pointer'
                    onClick={() => navigate('/')}
                >
                    রক্তবন্ধু
                </h1>
            </div>
            <div
                className="hidden md:w-9/12 md:flex justify-end space-x-2"
            >
                {isAuth &&
                    <NavLink
                        className='px-4 py-2 rounded hover:bg-gray-500 transition-all duration-500'
                        to='/profile'>
                        প্রোফাইল
                    </NavLink>
                }
                <NavLink
                    className='px-4 py-2 rounded hover:bg-gray-500 transition-all duration-500'
                    to='/blog'>
                    ব্লগ
                </NavLink>
                <NavLink
                    className='px-4 py-2 rounded hover:bg-gray-500 transition-all duration-500'
                    to='/volanrears'>
                    ভলান্টিয়ার্স
                </NavLink>
                <NavLink
                    className='px-4 py-2 rounded hover:bg-gray-500 transition-all duration-500'
                    to='/partners'>
                    সহযোগী সংগঠন
                </NavLink>
                
                <NavLink
                    className='px-4 py-2 rounded hover:bg-gray-500 transition-all duration-500'
                    to='/about'>
                    আমাদের সম্পর্কে
                </NavLink>
                <NavLink
                    className='px-4 py-2 rounded hover:bg-gray-500 transition-all duration-500'
                    to='/contact'>
                    যোগাযোগ
                </NavLink>
                {!isAuth &&
                    <NavLink
                    className='px-4 py-2 rounded hover:bg-gray-500 transition-all duration-500'
                    to='/login'>
                    লগ-ইন
                </NavLink>
                }
                {!isAuth &&
                    <NavLink
                    className='px-4 py-2 rounded hover:bg-gray-500 transition-all duration-500'
                    to='/registration'>
                    রেজিস্ট্রেশন
                </NavLink>
                }
                
            </div>
            <div
                className="relative md:hidden"
            >
                <AiOutlineMenu
                    size={25}
                    onClick={() => setOpen(!open)}
                    className=" cursor-pointer"
                />
                {open &&
                    <div
                        className="w-[200px] absolute right-0 z-10 bg-white p-2 rounded shadow text-black"
                    >
                        {
                            isAuth &&
                            <button
                                onClick={() => {
                                    navigate('/profile');
                                    setOpen(!open)
                                }}
                                className="w-full p-2 text-left hover:bg-red-400 hover:text-white transition-all duration-500 rounded"
                            >
                                প্রোফাইল
                            </button>
                        }
                        <button
                            onClick={() => {
                                navigate('/blog');
                                setOpen(!open)
                            }}
                            className="w-full p-2 text-left hover:bg-red-400 hover:text-white transition-all duration-500 rounded"
                        >
                            ব্লগ
                        </button>
                        <button
                            onClick={() => {
                                navigate('/volanrears');
                                setOpen(!open)
                            }}
                            className="w-full p-2 text-left hover:bg-red-400 hover:text-white transition-all duration-500 rounded"
                        >
                            ভলান্টিয়ার্স
                        </button>
                        <button
                            onClick={() => {
                                navigate('/partners');
                                setOpen(!open)
                            }}
                            className="w-full p-2 text-left hover:bg-red-400 hover:text-white transition-all duration-500 rounded"
                        >
                            সহযোগী সংগঠন
                        </button>
                        <button
                            onClick={() => {
                                navigate('/contact');
                                setOpen(!open)
                            }}
                            className="w-full p-2 text-left hover:bg-red-400 hover:text-white transition-all duration-500 rounded"
                        >
                            যোগাযোগ
                        </button>
                        <button
                            onClick={() => {
                                navigate('/about');
                                setOpen(!open)
                            }}
                            className="w-full p-2 text-left hover:bg-red-400 hover:text-white transition-all duration-500 rounded"
                        >
                            আমাদের সম্পর্কে
                        </button>
                        {!isAuth &&
                            <button
                            onClick={() => {
                                navigate('/login');
                                setOpen(!open)
                            }}
                            className="w-full p-2 text-left hover:bg-red-400 hover:text-white transition-all duration-500 rounded"
                        >
                            লগ-ইন
                        </button>
                        }
                        {!isAuth &&
                            <button
                            onClick={() => {
                                navigate('/registration');
                                setOpen(!open)
                            }}
                            className="w-full p-2 text-left hover:bg-red-400 hover:text-white transition-all duration-500 rounded"
                        >
                            রেজিস্ট্রেশন

                        </button>
                        }
                        
                        {
                            isAuth &&
                            <button
                                onClick={() => handleLogout()}
                                className='w-full p-2 text-left hover:bg-red-400 hover:text-white transition-all duration-500 rounded'
                            >
                                লগ আউট
                            </button>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default Header;
