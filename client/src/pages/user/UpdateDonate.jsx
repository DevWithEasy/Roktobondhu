import { useState } from "react";
import bloodsGroups from "../../assets/data/bloodGroups";
import InputUpdate from "../../component/InputUpdate";
import useUserStore from "../../store/userStore";
import { handleUpdate } from "../../utils/apiRequestUtils";
import handleChange from "../../utils/handleChange";
import getBirthday from "../../utils/getBirthday";
import Loading from "../../component/Loading";

const UpdateDonate = () => {
    const { user, addUser,isLoading,activeLoading,cancelLoading  } = useUserStore()
    const [value, setValue] = useState(user);
    const [checked, setChecked] = useState(value.platelet)

    return (
        <div
            className=''
        >
            <h2
                className='p-1 font-bold text-center text-xl bg-red-400 text-white'
            >
                ডোনেট আপডেট
            </h2>
            <div
                className='py-2 space-y-2'
            >
                <div>
                    <label className="block">রক্তের গ্রুপঃ </label>
                    <select
                        name="bloodGroup"
                        value={value?.bloodGroup}
                        onChange={(e) => handleChange(e, value, setValue)}
                        className="w-full p-2 block  focus:outline-none border focus:border-red-500 rounded"
                    >
                        <option>নির্বাচন করুন </option>
                        {bloodsGroups &&
                            bloodsGroups.map((blood) => (
                                <option key={blood}>{blood}</option>
                            ))}
                    </select>
                </div>
                <InputUpdate
                    {...{
                        value,
                        setValue,
                        fieldValue: getBirthday(value?.lastDonate),
                        label: "সর্বশেষ রক্ত দানের তারিখঃ ",
                        name: "lastDonate",
                        type: "date",
                        className: "",
                    }}
                />
                <div
                    className="flex justify-between items-center py-2"
                >
                    <label>
                        আপনি কি প্লাটিলেট ডোনেট করতে চান ?
                    </label>
                    <label
                        htmlFor="platelet"
                        className={`relative block w-8 h-4 ${checked ? 'bg-red-500' : ' bg-gray-400'} rounded-full`}
                    >

                        <span
                            className={`block h-4 w-4 bg-white rounded-full border ${checked ? 'float-right' : 'float-left'} transition-all duration-700`}
                        ></span>
                    </label>
                    <input
                        type="checkbox"
                        id="platelet"
                        name='platelet'
                        checked={checked}
                        onChange={()=>setChecked(!checked)}
                        className="hidden"
                    />
                </div>
                <button
                    onClick={() => handleUpdate({...value, platelet : checked}, addUser,activeLoading,cancelLoading)}
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

export default UpdateDonate;