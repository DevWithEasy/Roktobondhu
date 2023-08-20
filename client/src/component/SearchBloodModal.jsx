import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsFillSearchHeartFill } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';
import districts from "../assets/data/bd-districts.json";
import divisions from "../assets/data/bd-divisions.json";
import upazilas from "../assets/data/bd-upazilas.json";
import bloodsGroups from "../assets/data/bloodGroups";
import useUserStore from '../store/userStore';
import apiUrl from '../utils/apiUrl';
import handleChange from "../utils/handleChange";
import Loading from './Loading';

// eslint-disable-next-line react/prop-types
const SearchModal = ({ open, setOpen }) => {
    const {search,addUsers,isLoading,activeLoading,cancelLoading} = useUserStore()
    const [value, setValue] = useState(search)

    const division = divisions.divisions.find(
        (division) => division.bn_name == value.division
    );

    const findDisctricts = districts.districts.filter(
        (district) => district.division_id == division?.id
    );

    const district = findDisctricts.find(
        (district) => district.bn_name == value.district
    );

    const findUpazilas = upazilas.upazilas.filter(
        (upazila) => upazila.district_id == district?.id
    );
    const handleFind = async(e) => {
        e.preventDefault()
        if (!value.division) {
            return toast.error('বিভাগ নির্বাচন করে নি ।')
        }else if(!value.district){
            return toast.error('জেলা নির্বাচন করে নি ।')
        }else if (!value.upazila){
            return toast.error('উপজেলা নির্বাচন করে নি ।')
        }else if(!value.category){
            return toast.error('রক্ত/প্লাটিলেট নির্বাচন করে নি ।')
        }else if(!value.bloodGroup){
            return toast.error('রক্তের গ্রুপ নির্বাচন করে নি ।')
        }
        activeLoading()
        try {
            const res = await axios.post(`${apiUrl}/api/auth/find/donar`,value)
            if (res.data.status == 200) {
                cancelLoading()
                addUsers(res.data.data,value)
                setOpen(!open)
            }
        } catch (error) {
            cancelLoading()
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <div
            className="fixed -top-2 left-0 h-screen w-full z-10 flex justify-center items-center bg-gray-500/70"
        >
            <form
                onSubmit={(e) => handleFind(e)}
                className="relative w-full mx-2 md:w-4/12 md:mx-auto space-y-2 p-4 bg-white rounded-md shadow-lg"
            >
                <RxCrossCircled
                    size={25}
                    onClick={() => setOpen(!open)}
                    className='absolute right-4 cursor-pointer hover:text-red-500'
                />
                <h2
                    className="py-2 text-center font-bold text-xl text-red-500 border-b-2 border-dashed border-red-500"
                >
                    রক্ত খুজুন
                </h2>
                <div>
                    <label className="block">বিভাগ</label>
                    <select
                        name="division"
                        value = {value?.division}
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
                        name="district"
                        value = {value?.district}
                        onChange={(e) => handleChange(e, value, setValue)}
                        className="w-full p-2 block  focus:outline-none border focus:border-red-500 rounded"
                    >
                        <option>নির্বাচন করুন </option>
                        {value.division &&
                            findDisctricts.map((district) => (
                                <option key={district.id}>{district.bn_name}</option>
                            ))}
                    </select>
                </div>
                <div>
                    <label className="block">উপজেলাঃ</label>
                    <select
                        name="upazila"
                        value = {value?.upazila}
                        onChange={(e) => handleChange(e, value, setValue)}
                        className="w-full p-2 block  focus:outline-none border focus:border-red-500 rounded"
                    >
                        <option>নির্বাচন করুন </option>
                        {value.district &&
                            findUpazilas.map((upazila) => (
                                <option key={upazila.id}>{upazila.bn_name}</option>
                            ))}
                    </select>
                </div>
                <div>
                <label className="block">কোনটি খুজতেছেনঃ (রক্ত/প্লাটিলেট) </label>
                <select
                    name="category"
                    value = {value?.category}
                    onChange={(e) => handleChange(e, value, setValue)}
                    className="w-full p-2 block  focus:outline-none border focus:border-red-500 rounded"
                >
                    <option>নির্বাচন করুন </option>
                    <option value='Blood'> রক্ত </option>
                    <option value='Platelet'> প্লাটিলেট </option>
                </select>
            </div>
                <div>
                    <label className="block">রক্তের গ্রুপঃ </label>
                    <select
                        name="bloodGroup"
                        value = {value?.bloodGroup}
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
                <div
                    className='flex space-x-2'
                >
                    <button
                        type="submit"
                        className="flex justify-center items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded"
                    >
                        <BsFillSearchHeartFill />
                        <span>খুজুন</span>
                    </button>
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex justify-center items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded"
                    >
                        <span>বাতিল</span>
                    </button>
                </div>
            </form>
            {isLoading &&
                <Loading/>
            }
        </div>
    );
};

export default SearchModal;