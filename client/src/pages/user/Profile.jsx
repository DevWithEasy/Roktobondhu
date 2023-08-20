import { BiSolidUser, BiSolidDonateBlood, BiEditAlt, BiSolidLogOutCircle } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaAddressCard } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsPersonFillAdd } from 'react-icons/bs';
import { VscOrganization } from 'react-icons/vsc';
import { FaUsers } from 'react-icons/fa';
import useUserStore from '../../store/userStore';
import {HiUsers} from 'react-icons/hi'
import { useState } from 'react';
import {AiOutlineMenuFold,AiOutlineMenuUnfold} from 'react-icons/ai'
import SideBar from '../../component/SideBar';
import Head from '../../component/Head';

// eslint-disable-next-line react/prop-types
const Profile = ({ children }) => {
    const { user, removeUser } = useUserStore()
    const navigate = useNavigate()
    const [open,setOpen] = useState(false)
    const handleLogout = () => {
        removeUser()
        navigate('/')
        localStorage.removeItem('token')
    }
    return (
        <div
            className='flex md:m-5'
        >
            <Head {...{
                title : `রক্তবন্ধু - ${user?.name} প্রোফাইল`
            }}/>
            <div
                className='hidden md:w-[250px]  md:flex flex-col space-y-2 p-2 bg-red-400 text-white rounded'
            >
                <NavLink
                    to='/profile'
                    className='flex items-center space-x-2 p-2 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
                >
                    <BiSolidUser size={20} />
                    <span
                        className='hidden md:inline-block'
                    >
                        প্রোফাইল
                    </span>
                </NavLink>
                <NavLink
                    to='/user/update/info'
                    className='flex items-center space-x-2 p-2 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
                >
                    <BiEditAlt size={20} />
                    <span
                        className='hidden md:inline-block'
                    >
                        তথ্য আপডেট
                    </span>
                </NavLink>
                <NavLink
                    to='/user/update/address'
                    className='flex items-center space-x-2 p-2 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
                >
                    <FaAddressCard size={20} />
                    <span
                        className='hidden md:inline-block'
                    >
                        ঠিকানা আপডেট
                    </span>
                </NavLink>
                <NavLink
                    to='/user/update/donate'
                    className='flex items-center space-x-2 p-2 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
                >
                    <BiSolidDonateBlood size={20} />
                    <span
                        className='hidden md:inline-block'
                    >
                        ডোনেট আপডেট
                    </span>
                </NavLink>
                {user?.isAdmin &&
                    <div>
                        <NavLink
                            to='/user/add/contributor'
                            className='flex items-center space-x-2 p-2 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
                        >
                            <BsPersonFillAdd size={20} />
                            <span
                                className='hidden md:inline-block'
                            >
                                নতুন কন্ট্রিবিউট্রর
                            </span>
                        </NavLink>
                        <NavLink
                            to='/user/all/users'
                            className='flex items-center space-x-2 p-2 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
                        >
                            <HiUsers size={20} />
                            <span
                                className='hidden md:inline-block'
                            >
                                সকল ব্যবহারকারী
                            </span>
                        </NavLink>
                        <NavLink
                            to='/user/all/volantears'
                            className='flex items-center space-x-2 p-2 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
                        >
                            <FaUsers size={20} />
                            <span
                                className='hidden md:inline-block'
                            >
                                সকল ভলান্টিয়ার্স
                            </span>
                        </NavLink>
                        <NavLink
                            to='/user/all/partners'
                            className='flex items-center space-x-2 p-2 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
                        >
                            <VscOrganization size={20} />
                            <span
                                className='hidden md:inline-block'
                            >
                                সকল পার্টনার
                            </span>
                        </NavLink>
                    </div>
                }
                <NavLink
                    to='/user/update/password'
                    className='flex items-center space-x-2 p-2 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
                >
                    <RiLockPasswordFill size={20} />
                    <span
                        className='hidden md:inline-block'
                    >
                        পাসওয়ার্ড পরিবর্তন
                    </span>
                </NavLink>
                <button
                    onClick={() => handleLogout()}
                    className='flex items-center space-x-2 p-2 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
                >
                    <BiSolidLogOutCircle size={20} />
                    <span
                        className='hidden md:inline-block'
                    >
                        লগ আউট
                    </span>
                </button>
            </div>
            {open &&
                <SideBar {...{handleLogout}}/>
            }
            <div
                className='w-full px-2 md:px-5 pt-2 pb-5 rounded-r bg-red-50'
            >
                <button
                    className='md:hidden'
                >
                    {!open ?
                        <AiOutlineMenuFold
                            onClick={()=>setOpen(!open)}
                            size={20}
                            className=''
                        />
                        :
                        <AiOutlineMenuUnfold
                            onClick={()=>setOpen(!open)}
                            size={20}
                            className=''
                        />                    }
                </button>
                {children}
            </div>
        </div>
    );
};

export default Profile;