import { useState } from "react";
import districts from "../../assets/data/bd-districts.json";
import divisions from "../../assets/data/bd-divisions.json";
import upazilas from "../../assets/data/bd-upazilas.json";
import InputUpdate from "../../component/InputUpdate";
import useUserStore from "../../store/userStore";
import { handleUpdate } from "../../utils/apiRequestUtils";
import handleChange from "../../utils/handleChange";
import Loading from "../../component/Loading";

const UpdateAddress = () => {
    const { user,addUser,isLoading,activeLoading,cancelLoading  } = useUserStore()
    const [value, setValue] = useState(user);


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
    return (
        <div className="space-y-2">
            <h2 className="p-1 font-bold text-center text-xl bg-red-400 text-white">
                ঠিকানা পরিবর্তন
            </h2>
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
                            fieldValue : value?.presentAddress,
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
                            fieldValue : value?.parmanentAddress,
                            label: "ঠিকানাঃ (বাংলায় লিখুন)",
                            name: "parmanentAddress",
                            type: "text",
                            className: "",
                        }}
                    />
                </fieldset>
            </div>
            <button 
                onClick={()=>handleUpdate(value,addUser,activeLoading,cancelLoading)}
            className="px-6 py-2 bg-red-500 text-white rounded">
                সাবমিট
            </button>
            {isLoading &&
                <Loading/>
            }
        </div>
    );
};

export default UpdateAddress;
