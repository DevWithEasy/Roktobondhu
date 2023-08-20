import { useState } from "react";
import InputUpdate from "../../component/InputUpdate";
import useUserStore from "../../store/userStore";
import { handleUpdate } from '../../utils/apiRequestUtils';
import getBirthday from "../../utils/getBirthday";
import handleChange from "../../utils/handleChange";
import Loading from "../../component/Loading";

const UpdateInfo = () => {
    const { user,addUser,isLoading,activeLoading,cancelLoading  } = useUserStore()
    const [value, setValue] = useState(user);
    return (
        <div
            className=''
        >
            <h2
                className='p-1 font-bold text-center text-xl bg-red-400 text-white'
            >
                তথ্য আপডেট
            </h2>
            <div
                className='py-2 space-y-2'
            >
                <InputUpdate
                    {...{
                        value,
                        setValue,
                        fieldValue : value?.name,
                        label: "নামঃ",
                        name: "name",
                        type: "text",
                        className: "",
                    }}
                />
                <InputUpdate
                    {...{
                        value,
                        setValue,
                        fieldValue : value?.email,
                        label: "ই-মেইলঃ",
                        name: "email",
                        type: "email",
                        className: "",
                    }}
                />
                <InputUpdate
                    {...{
                        value,
                        setValue,
                        fieldValue : value?.phone,
                        label: "মোবাইল নম্বরঃ (ইংরেজিতে - ১১ সংখ্যা)",
                        name: "phone",
                        type: "phone",
                        className: "",
                    }}
                />
                <InputUpdate
                    {...{
                        value,
                        setValue,
                        fieldValue: getBirthday(value?.dob),
                        label: "জন্ম তারিখঃ",
                        name: "dob",
                        type: "date",
                        className: "",
                    }}
                />
                <div>
                    <label className="block">লিঙ্গঃ </label>
                    <select
                        name="gender"
                        value={value?.gender}
                        onChange={(e) => handleChange(e, value, setValue)}
                        className="w-full p-2 block  focus:outline-none border focus:border-red-500 rounded"
                    >
                        <option>নির্বাচন করুন </option>
                        <option value='পুরুষ'>পুরুষ </option>
                        <option value='মহিলা'>মহিলা </option>
                        <option value='অন্যান্য'>অন্যান্য </option>
                    </select>
                </div>
                <button
                    onClick={()=>handleUpdate(value,addUser,activeLoading,cancelLoading)}
                    className='px-6 py-2 bg-red-500 text-white rounded'
                >
                    সাবমিট
                </button>
            </div>
            {isLoading &&
                <Loading/>
            }
        </div>
    );
};

export default UpdateInfo;