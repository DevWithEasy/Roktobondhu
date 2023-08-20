import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import districts from "../../../assets/data/bd-districts.json";
import divisions from "../../../assets/data/bd-divisions.json";
import upazilas from "../../../assets/data/bd-upazilas.json";
import bloodsGroups from "../../../assets/data/bloodGroups";
import InputUpdate from "../../../component/InputUpdate";
import Loading from "../../../component/Loading";
import useUserStore from "../../../store/userStore";
import apiUrl from "../../../utils/apiUrl";
import getBirthday from "../../../utils/getBirthday";
import handleChange from "../../../utils/handleChange";
import token from "../../../utils/token";

const UpdateUser = () => {
    const { isLoading, activeLoading, cancelLoading } = useUserStore()
    const { id } = useParams()
    const [value, setValue] = useState({})
    const navigate = useNavigate()

    const presentDivision = divisions.divisions.find(
        (division) => division.bn_name == value.presentDivision
    );

    const findPresentDisctricts = districts.districts.filter(
        (district) => district.division_id == presentDivision?.id
    );

    const presentDistrict = findPresentDisctricts.find(
        (district) => district.bn_name == value.presentDistrict
    );

    const findPresentUpazilas = upazilas.upazilas.filter(
        (upazila) => upazila.district_id == presentDistrict?.id
    );

    const parmanentDivision = divisions.divisions.find(
        (division) => division.bn_name == value.parmanentDivision
    );

    const findParmanentDisctricts = districts.districts.filter(
        (district) => district.division_id == parmanentDivision?.id
    );

    const parmanentDistrict = findParmanentDisctricts.find(
        (district) => district.bn_name == value.parmanentDistrict
    );

    const findParmanentUpazilas = upazilas.upazilas.filter(
        (upazila) => upazila.district_id == parmanentDistrict?.id
    );
    const getUser = async () => {
        activeLoading()
        try {
            const res = await axios.get(`${apiUrl}/api/auth/users/${id}`, {
                headers: {
                    'authorization': token()
                }
            })
            if (res.data.status === 200) {
                cancelLoading()
                setValue(res.data.data)
            }
        } catch (error) {
            cancelLoading()
            console.log(error)
        }
    }

    const handleUpdate = async(e) => {
        e.preventDefault()
        activeLoading()
        try {
            const  res = await axios.put(`${apiUrl}/api/auth/users/${id}`,value,{
                headers : {
                    'authorization' : token()
                }
            })
            if(res.data.status === 200){
                cancelLoading()
                navigate('/user/all/users')
                toast.success("আপডেট হয়েছে।")
            }
        } catch (error) {
            cancelLoading()
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
            <form
                onSubmit={(e) => handleUpdate(e)}
                className="space-y-2"
            >
                <h2
                    className='p-1 font-bold text-center text-xl bg-red-400 text-white'
                >
                    তথ্য আপডেট
                </h2>
                <div
                    className="grid md:grid-cols-2 md:gap-2 space-y-2 md:space-y-0"
                >
                    <InputUpdate
                        {...{
                            value,
                            setValue,
                            fieldValue: value?.name,
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
                            fieldValue: value?.email,
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
                            fieldValue: value?.phone,
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
                </div>
                <div className="flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0 md:space-x-2">
                    <fieldset className="md:w-1/2 p-4 space-y-2 border border-dashed border-red-400">
                        <legend className="px-4 text-lg font-bold text-red-400">
                            বর্তমান ঠিকানাঃ
                        </legend>
                        <div>
                            <label className="block">বিভাগ</label>
                            <select
                                name="presentDivision"
                                value={value?.presentDivision}
                                onChange={(e) => handleChange(e, value, setValue)}
                                className="w-full p-2 block  focus:outline-none border focus:border-red-500 rounded"
                            >
                                <option>নির্বাচন করুন </option>
                                {divisions &&
                                    divisions.divisions.map((division) => (
                                        <option key={division.id}>{division.bn_name}</option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <label className="block">জেলাঃ</label>
                            <select
                                name="presentDistrict"
                                value={value?.presentDistrict}
                                onChange={(e) => handleChange(e, value, setValue)}
                                className="w-full p-2 block  focus:outline-none border focus:border-red-500 rounded"
                            >
                                <option>নির্বাচন করুন </option>
                                {value.presentDivision &&
                                    findPresentDisctricts.map((district) => (
                                        <option key={district.id}>{district.bn_name}</option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <label className="block">উপজেলাঃ</label>
                            <select
                                name="presentUpazila"
                                value={value?.presentUpazila}
                                onChange={(e) => handleChange(e, value, setValue)}
                                className="w-full p-2 block  focus:outline-none border focus:border-red-500 rounded"
                            >
                                <option>নির্বাচন করুন </option>
                                {value.presentDistrict &&
                                    findPresentUpazilas.map((upazila) => (
                                        <option key={upazila.id}>{upazila.bn_name}</option>
                                    ))}
                            </select>
                        </div>

                        <InputUpdate
                            {...{
                                value,
                                setValue,
                                fieldValue: value?.presentAddress,
                                label: "ঠিকানাঃ (বাংলায় লিখুন)",
                                name: "presentAddress",
                                type: "text",
                                className: "",
                            }}
                        />
                    </fieldset>
                    <fieldset className="md:w-1/2 p-4 space-y-2 border border-dashed border-red-400">
                        <legend className="px-4 text-lg font-bold text-red-400">
                            স্থায়ী ঠিকানাঃ
                        </legend>
                        <div>
                            <label className="block">বিভাগঃ </label>
                            <select
                                name="parmanentDivision"
                                value={value?.parmanentDivision}
                                onChange={(e) => handleChange(e, value, setValue)}
                                className="w-full p-2 block  focus:outline-none border focus:border-red-500 rounded"
                            >
                                <option>নির্বাচন করুন </option>
                                {divisions &&
                                    divisions.divisions.map((division) => (
                                        <option key={division.id}>{division.bn_name}</option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <label className="block">জেলাঃ</label>
                            <select
                                name="parmanentDistrict"
                                value={value?.parmanentDistrict}
                                onChange={(e) => handleChange(e, value, setValue)}
                                className="w-full p-2 block  focus:outline-none border focus:border-red-500 rounded"
                            >
                                <option>নির্বাচন করুন </option>
                                {value.parmanentDivision &&
                                    findParmanentDisctricts.map((district) => (
                                        <option key={district.id}>{district.bn_name}</option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <label className="block">উপজেলাঃ</label>
                            <select
                                name="parmanentUpazila"
                                value={value?.parmanentUpazila}
                                onChange={(e) => handleChange(e, value, setValue)}
                                className="w-full p-2 block  focus:outline-none border focus:border-red-500 rounded"
                            >
                                <option>নির্বাচন করুন </option>
                                {value.parmanentDistrict &&
                                    findParmanentUpazilas.map((upazila) => (
                                        <option key={upazila.id}>{upazila.bn_name}</option>
                                    ))}
                            </select>
                        </div>

                        <InputUpdate
                            {...{
                                value,
                                setValue,
                                fieldValue: value?.parmanentAddress,
                                label: "ঠিকানাঃ (বাংলায় লিখুন)",
                                name: "parmanentAddress",
                                type: "text",
                                className: "",
                            }}
                        />
                    </fieldset>
                </div>
                <button
                    className='px-6 py-2 bg-red-500 text-white rounded'
                >
                    সাবমিট
                </button>
            </form>


            {isLoading &&
                <Loading />
            }
        </div>
    );
};

export default UpdateUser;