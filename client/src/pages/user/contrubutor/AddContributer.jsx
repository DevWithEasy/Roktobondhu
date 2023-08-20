import axios from 'axios';
import { useState } from "react";
import { toast } from 'react-hot-toast';
import InputUpdate from "../../../component/InputUpdate";
import apiUrl from "../../../utils/apiUrl";
import handleChange from "../../../utils/handleChange";
import token from "../../../utils/token";
import useUserStore from '../../../store/userStore';
import Loading from '../../../component/Loading';

const AddContributer = () => {
    const { isLoading, activeLoading, cancelLoading } = useUserStore()
    const [value, setValue] = useState({
        contributerType: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        designation: '',
        facebook: '',
        facebookGroup: '',
    })

    const [file, setFile] = useState('')
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!value.name || !value.phone || !value.email) {
            return toast.error('Please enter')
        }
        let formData = new FormData()
        formData.append('file', file)
        formData.append('contributerType', value.contributerType)
        formData.append('name', value.name)
        formData.append('phone', value.phone)
        formData.append('email', value.email)
        formData.append('address', value.address)
        formData.append('designation', value.designation)
        formData.append('facebook', value.facebook)
        formData.append('facebookGroup', value.facebookGroup)
        activeLoading()
        try {
            const res = await axios.post(`${apiUrl}/api/contributer/`, formData, {
                headers: {
                    'authorization': token()
                }
            })
            if (res.data.status === 200) {
                cancelLoading()
                setValue({
                    contributerType: '',
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    designation: '',
                    facebook: '',
                    facebookGroup: '',
                })
                setFile('')
                toast.success('সফলভাবে হয়েছে।')
            }
        } catch (error) {
            cancelLoading()
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className="space-y-2"
        >
            <h2 className="p-2 font-bold text-center text-xl bg-red-400 text-white rounded">
                নতুন কন্ট্রিবিউট্রর যোগ করুন
            </h2>
            <div>
                <label className="block">কন্ট্রিবিউট্ররের ধরণঃ</label>
                <select
                    name="contributerType"
                    value={value?.contributerType}
                    onChange={(e) => handleChange(e, value, setValue)}
                    className="w-full p-2 block  focus:outline-none border focus:border-red-500 rounded"
                >
                    <option>নির্বাচন করুন </option>
                    <option value='volantear'>ভলান্টিয়ার্স </option>
                    <option value='partner'>সহযোগী সংগঠন </option>
                </select>
            </div>
            <InputUpdate
                {...{
                    value,
                    setValue,
                    fieldValue: value?.name,
                    label: "নামঃ ",
                    name: "name",
                    type: "name",
                    className: "",
                }}
            />
            <InputUpdate
                {...{
                    value,
                    setValue,
                    fieldValue: value?.phone,
                    label: "ফোন নম্বরঃ ",
                    name: "phone",
                    type: "phone",
                    className: "",
                }}
            />
            <InputUpdate
                {...{
                    value,
                    setValue,
                    fieldValue: value?.email,
                    label: "ইমেইলঃ",
                    name: "email",
                    type: "email",
                    className: "",
                }}
            />
            {value.contributerType === 'volantear' &&
                <InputUpdate
                    {...{
                        value,
                        setValue,
                        fieldValue: value?.designation,
                        label: "পদবীঃ ",
                        name: "designation",
                        type: "text",
                        className: "",
                    }}
                />
            }
            <InputUpdate
                {...{
                    value,
                    setValue,
                    fieldValue: value?.address,
                    label: "বর্তমান ঠিকানাঃ ",
                    name: "address",
                    type: "text",
                    className: "",
                }}
            />
            <InputUpdate
                {...{
                    value,
                    setValue,
                    fieldValue: value?.facebook,
                    label: "ফেইসবুক পেজ আইডিঃ (যদি থাকে)",
                    name: "facebook",
                    type: "text",
                    className: "",
                }}
            />
            {value.contributerType === 'partner' &&
                <InputUpdate
                    {...{
                        value,
                        setValue,
                        fieldValue: value?.facebookGroup,
                        label: "ফেইসবুক গ্রুপ আইডিঃ (যদি থাকে)",
                        name: "facebookGroup",
                        type: "text",
                        className: "",
                    }}
                />
            }
            <div>
                <label>
                    ছবি আপলোড করুনঃ
                </label>
                <input
                    type="file"
                    onChange={(e) => handleFile(e)}
                    className="w-full p-2 block bg-white focus:outline-none border focus:border-red-500 rounded"
                />
            </div>
            <button
                type='submit'
                className="px-6 py-2 bg-red-400 text-white rounded"
            >
                সাবমিট
            </button>
            {isLoading &&
                <Loading />
            }
        </form>
    );
};

export default AddContributer;