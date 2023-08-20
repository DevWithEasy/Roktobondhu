import { useState } from "react";
import { AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import DeleteContributer from './DeleteModal';
import DatailsContributer from './DetailsModal';

// eslint-disable-next-line react/prop-types
const ContributerCardView = ({ contributers }) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [view, setView] = useState(false)
    const [id, setId] = useState('')
    return (
        <div
            className="md:hidden"
        >
            <div
                className="space-y-2"
            >
                {
                    // eslint-disable-next-line react/prop-types
                    contributers.map((contributer, i) =>
                        <div
                            key={i}
                            className="p-4 bg-white rounded"
                        >
                            <p>
                                <span
                                    className="pr-2 font-bold"
                                >
                                    নামঃ 
                                </span>
                                <span>
                                {contributer?.name}
                                </span>
                            </p>
                            <p>
                                <span
                                    className="pr-2 font-bold"
                                >
                                    ই-মেইলঃ 
                                </span>
                                <span>
                                {contributer?.email}
                                </span>
                            </p>
                            <p>
                                <span
                                    className="pr-2 font-bold"
                                >
                                    ফোনঃ 
                                </span>
                                <span>
                                <a href={`tel:${contributer?.phone}`}>
                                    {contributer?.phone}
                                    </a>
                                </span>
                            </p>
                            <p>
                                <span
                                    className="pr-2 font-bold"
                                >
                                    ঠিকানাঃ 
                                </span>
                                <span>
                                {contributer?.address}
                                </span>
                            </p>
                            <div
                                className="flex items-center space-x-2 pt-2"
                            >
                                <AiOutlineInfoCircle
                                    onClick={() => {
                                        setId(contributer?._id);
                                        setView(!view)
                                    }}
                                    size={20}
                                    className='text-gray-500 cursor-pointer'
                                />
                                <BiEdit
                                    size={20}
                                    onClick={() => navigate(`/user/update/contributor/${contributer?._id}`)}
                                    className='text-blue-500 cursor-pointer'
                                />
                                <AiOutlineDelete
                                    onClick={() => {
                                        setId(contributer?._id);
                                        setOpen(!open)
                                    }}
                                    size={20}
                                    className='text-red-500 cursor-pointer'
                                />
                            </div>

                        </div>
                    )
                }
            </div>
            {
                open &&
                <DeleteContributer {...{
                    id,
                    open,
                    setOpen
                }} />
            }
            {
                view &&
                <DatailsContributer {...{
                    id,
                    view,
                    setView
                }} />
            }
        </div>
    );
};

export default ContributerCardView;