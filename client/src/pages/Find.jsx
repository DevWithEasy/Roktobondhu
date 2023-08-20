import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import AccessModal from "../component/AccessModal";
import FindCardView from "../component/FindCardView";
import FindTableView from "../component/FindTableView";
import SearchModal from "../component/SearchBloodModal";
import useUserStore from "../store/userStore";
import Head from "../component/Head";

const Find = () => {
    const {search,users} = useUserStore()
    const [open, setOpen] = useState(false)
    const [access, setAccess] = useState(false)

    return (
        <div
            className="m-2 space-y-2"
        >
            <Head {...{
                title : `${search?.bloodGroup} গ্রুপের রক্তবন্ধুদের তালিকা`
            }}/>
            
            <h2
                className="pt-2 text-center text-xl text-white md:text-black bg-red-400 md:bg-transparent rounded"
            >
                {search?.bloodGroup} গ্রুপের রক্তবন্ধুদের তালিকা
            </h2>

            <p
                className="flex items-center space-x-3"
            >
                <span
                    className=""
                >
                    সার্চঃ  {`${search?.category} - (${search?.bloodGroup}) - ${search?.upazila} - ${search?.district} `}
                </span>
                <BiEdit
                    onClick={() => setOpen(!open)}
                    className="cursor-pointer"
                />
            </p>

            {open &&
                <SearchModal {...{
                    open, setOpen
                }} />
            }

            {
                access && 
                <AccessModal {...{
                    access, setAccess
                }}/>
            }
            {
                users.length == 0 &&
                <p
                    className="py-10 text-center text-red-500"
                >
                    কোন রক্তবন্ধু খুজে পাওয়া যায়নি।
                </p>
            }
            <FindTableView {...{ users,access, setAccess }} />
            <FindCardView {...{ users,access, setAccess }} />
        </div>
    );
};

export default Find;