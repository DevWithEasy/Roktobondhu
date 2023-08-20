import { useState } from 'react';
import { AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import DeleteContributer from './DeleteModal';
import DatailsContributer from './DetailsModal';

// eslint-disable-next-line react/prop-types
const ContributerTableView = ({ contributers }) => {
    const navigate = useNavigate()
    const [open, setOpen] =useState(false)
    const [view, setView] =useState(false)
    const [id,setId] = useState('')
    return (

        <div className="hidden md:block relative overflow-x-auto">
            <table className="w-full text-left">
                <thead className=" bg-red-400 text-white">
                    <tr>
                        <th scope="col" className="px-6 py-2">
                            নাম
                        </th>
                        <th scope="col" className="px-6 py-2">
                            ইমেইল
                        </th>
                        <th scope="col" className="px-6 py-2">
                            ফোন
                        </th>
                        <th scope="col" className="px-6 py-2 text-center">
                            একশন
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // eslint-disable-next-line react/prop-types
                        contributers.map((contributer, i) =>
                            <tr
                                key={i}
                                className="bg-white border-b">
                                <td scope="row" className="px-6 py-2">
                                    {contributer?.name}
                                </td>
                                <td className="px-6 py-2">
                                    {contributer?.email}
                                </td>
                                <td className="px-6 py-2">
                                    {contributer?.phone}
                                </td>
                                <td className="px-6 py-2 flex justify-center items-center space-x-2">
                                    <AiOutlineInfoCircle
                                        onClick={()=>{
                                            setId(contributer?._id);
                                            setView(!view)
                                        }}
                                        size={20}
                                        className='text-gray-500 cursor-pointer'
                                    />
                                    <BiEdit
                                        size={20}
                                        onClick={()=>navigate(`/user/update/contributor/${contributer?._id}`)}
                                        className='text-blue-500 cursor-pointer'
                                    />
                                    <AiOutlineDelete
                                        onClick={()=>{
                                            setId(contributer?._id);
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
            {
                open && 
                <DeleteContributer {...{
                    id,
                    open,
                    setOpen
                }}/>
            }
            {
                view && 
                <DatailsContributer {...{
                    id,
                    view,
                    setView
                }}/>
            }
        </div>

    );
};

export default ContributerTableView;