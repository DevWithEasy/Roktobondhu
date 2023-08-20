import { BiSolidPhoneCall } from 'react-icons/bi';
import { BsFacebook } from 'react-icons/bs';
import { GrFacebook } from 'react-icons/gr';
import apiUrl from '../../utils/apiUrl';
import {toBengaliNumber} from 'bengali-number'

const ContributerCard = ({ contributer }) => {
    return (
        <div

            className='p-4 border rounded flex flex-col justify-center items-center space-y-2'
        >
            <img
                src={`${apiUrl}${contributer?.image}`}
                className='h-[150px] w-[150px] border rounded-full'
            />
            <p
                className='font-bold text-xl'
            >
                {contributer?.name}
            </p>
            {contributer?.contributerType === 'partner' ?
                <p
                    className=''
                >
                    {contributer?.address}
                </p>
                :
                <p
                    className=''
                >
                    {contributer?.designation}
                </p>
            }

            <p
                className=''
            >
                <a href={`tel:${contributer?.phone}`}>
                    {toBengaliNumber(contributer?.phone)}
                </a>

            </p>
            <div
                className='flex justify-between items-center space-x-2 border rounded'
            >
                <a
                    href={contributer?.facebookPage}
                    className='flex items-center space-x-1 p-2 group hover:bg-blue-500 transition-all duration-500'
                >
                    <BsFacebook
                        className='text-blue-500 group-hover:text-white'
                    />
                    <span className='text-sm group-hover:text-white'> Page</span>
                </a>
                {contributer?.contributerType === 'partner' ?
                    <a
                        href={contributer?.facebookGroup}
                        className='flex items-center space-x-1 p-2 group hover:bg-blue-500 transition-all duration-500'
                    >
                        <GrFacebook
                            className='text-blue-500 group-hover:text-white'
                        />
                        <span className='text-sm group-hover:text-white'>Group</span>
                    </a>
                    :
                    <a
                        href={`tel:${contributer?.phone}`}
                        className='flex items-center space-x-1 p-2 group hover:bg-blue-500 transition-all duration-500'
                    >
                        <BiSolidPhoneCall
                            className='text-blue-500 group-hover:text-white'
                        />
                        <span className='text-sm group-hover:text-white'>Call</span>
                    </a>
                }
            </div>
        </div>
    );
};

export default ContributerCard;