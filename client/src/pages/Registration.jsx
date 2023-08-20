import { useState } from "react";
import divisions from "../assets/data/bd-divisions.json";
import districts from "../assets/data/bd-districts.json";
import upazilas from "../assets/data/bd-upazilas.json";
import Input from "../component/Input";
import handleChange from "../utils/handleChange";
import bloodsGroups from "../assets/data/bloodGroups";
import axios from 'axios';
import apiUrl from "../utils/apiUrl";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { toast } from "react-hot-toast";
import Loading from "../component/Loading";
import Head from "../component/Head";

const Registration = () => {
    const {isLoading,activeLoading,cancelLoading} = useUserStore()
    const navigate = useNavigate()
    const [value, setValue] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        gender: "",
        dob: "",
        bloodGroup: "",
        platelet : false,
        lastDonate: "",
        presentDivision: "",
        presentDistrict: "",
        presentUpazila: "",
        presentAddress: "",
        parmanentDivision: "",
        parmanentDistrict: "",
        parmanentUpazila: "",
        parmanentAddress: "",
    });

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

    const handleRegistration =async(e)=>{
        e.preventDefault()
        activeLoading()
        try {
            const res = await axios.post(`${apiUrl}/api/auth/signup`,value)
            if(res.data.status === 200){
                cancelLoading()
                localStorage.setItem('token',res.data.token)
                navigate('/verification')
            }
        } catch (error) {
            cancelLoading()
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className="mx-2 md:w-10/12 md:mx-auto my-5 border shadow-lg rounded bg-red-50/50">
            <Head {...{
                title : `রক্তবন্ধু - নতুন একাউন্ট রেজিস্ট্রেশন`
            }}/>
            <h2 className="text-red-500 font-bold p-2 text-xl text-center mx-2 py-2 border-b-2">
                রেজিস্ট্রেশন করুন
            </h2>
            <form
                onSubmit={(e)=>handleRegistration(e)}
                className="p-4 space-y-2"
            >
                <div
                    className="grid md:grid-cols-2  gap-y-2 md:gap-4"
                >
                    <Input
                        {...{
                            value,
                            setValue,
                            label: "নামঃ",
                            name: "name",
                            type: "text",
                            className: "",
                        }}
                    />
                    <Input
                        {...{
                            value,
                            setValue,
                            label: "ই-মেইলঃ",
                            name: "email",
                            type: "email",
                            className: "",
                        }}
                    />
                    <Input
                        {...{
                            value,
                            setValue,
                            label: "মোবাইল নম্বরঃ (ইংরেজিতে - ১১ সংখ্যা)",
                            name: "phone",
                            type: "phone",
                            className: "",
                        }}
                    />
                    <Input
                        {...{
                            value,
                            setValue,
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

                    <fieldset className="p-4 space-y-2 border border-dashed border-red-400 rounded">
                        <legend className="px-4 text-lg font-bold text-red-400">
                            বর্তমান ঠিকানাঃ
                        </legend>
                        <div>
                            <label className="block">বিভাগ</label>
                            <select
                                name="presentDivision"
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


                        <Input
                            {...{
                                value,
                                setValue,
                                label: "ঠিকানাঃ (বাংলায় লিখুন)",
                                name: "presentAddress",
                                type: "text",
                                className: "",
                            }}
                        />
                    </fieldset>
                    <fieldset className="p-4 space-y-2 border border-dashed border-red-400 rounded">
                        <legend className="px-4 text-lg font-bold text-red-400">
                            স্থায়ী ঠিকানাঃ
                        </legend>
                        <div>
                            <label className="block">বিভাগ</label>
                            <select
                                name="parmanentDivision"
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


                        <Input
                            {...{
                                value,
                                setValue,
                                label: "ঠিকানাঃ (বাংলায় লিখুন)",
                                name: "parmanentAddress",
                                type: "text",
                                className: "",
                            }}
                        />
                    </fieldset>
                    <Input
                        {...{
                            value,
                            setValue,
                            label: "পাসওয়ার্ডঃ ",
                            name: "password",
                            type: "",
                            className: "",
                        }}
                    />
                    <Input
                        {...{
                            value,
                            setValue,
                            label: "কনফার্ম পাসওয়ার্ডঃ ",
                            name: "confirmPassword",
                            type: "",
                            className: "",
                        }}
                    />
                </div>
                <div>
                <p
                    className="text-red-500"
                >
                    {
                        value.password && value.password != value.confirmPassword && 'আপনার পাসওয়ার্ড মিল নাই। '
                    }
                </p>

                <button
                    type="submit"
                    className="px-6 pt-2 pb-1 bg-red-400 text-white rounded"
                >
                    রেজিস্ট্রেশন
                </button>
                </div>
                
            </form>
            {isLoading &&
                <Loading/>
            }
        </div>
    );
};

export default Registration;
