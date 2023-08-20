import { BiEditAlt, BiSolidDonateBlood, BiSolidLogOutCircle, BiSolidUser } from 'react-icons/bi';
import { FaAddressCard, FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import useUserStore from '../store/userStore';
import { BsPersonFillAdd } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi';
import { VscOrganization } from 'react-icons/vsc';
import { RiLockPasswordFill } from 'react-icons/ri';

// eslint-disable-next-line react/prop-types
const SideBar = ({handleLogout}) => {
    const { user } = useUserStore()
    return (
        <div
        className='flex flex-col space-y-2 p-1 bg-red-400 text-white'
    >
        <NavLink
            to='/profile'
            className='p-1 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
        >
            <BiSolidUser size={20} />
        </NavLink>
        <NavLink
            to='/user/update/info'
            className='p-1 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
        >
            <BiEditAlt size={20} />
        </NavLink>
        <NavLink
            to='/user/update/address'
            className='p-1 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
        >
            <FaAddressCard size={20} />
        </NavLink>
        <NavLink
            to='/user/update/donate'
            className='p-1 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
        >
            <BiSolidDonateBlood size={20} />
        </NavLink>
        {user?.isAdmin &&
            <div
                className='space-y-2'
            >
                <NavLink
                    to='/user/add/contributor'
                    className='flex items-center space-x-2 p-1 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
                >
                    <BsPersonFillAdd size={20} />
                </NavLink>
                <NavLink
                    to='/user/all/users'
                    className='flex items-center space-x-2 p-1 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
                >
                    <HiUsers size={20} />
                </NavLink>
                <NavLink
                    to='/user/all/volantears'
                    className='flex items-center space-x-2 p-1 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
                >
                    <FaUsers size={20} />
                </NavLink>
                <NavLink
                    to='/user/all/partners'
                    className='flex items-center space-x-2 p-1 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
                >
                    <VscOrganization size={20} />
                </NavLink>
            </div>
        }
        <NavLink
            to='/user/update/password'
            className='p-1 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
        >
            <RiLockPasswordFill size={20} />
        </NavLink>
        <button
            onClick={() => handleLogout()}
            className='flex items-center space-x-2 p-1 hover:bg-gray-500 hover:text-white rounded transition-all duration-500'
        >
            <BiSolidLogOutCircle size={20} />
        </button>
    </div>
    );
};

export default SideBar;