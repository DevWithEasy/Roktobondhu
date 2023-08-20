import { BsFacebook, BsTelegram } from 'react-icons/bs'
import { FaLocationArrow, FaWhatsappSquare } from 'react-icons/fa'
import { BiSolidPhoneCall } from 'react-icons/bi'
import { TfiWorld } from 'react-icons/tfi'
import Input from '../component/Input';
import { useState } from 'react';
import Head from '../component/Head';
const Contact = () => {
    const [value, setValue] = useState({
        name: '',
        email: '',

    })
    return (
        <div className="m-2 md:w-8/12 md:mx-auto bg-white h-auto flex flex-col sm:flex-col md:flex-row justify-between border rounded-xl shadow-lg">
            <Head {...{
                title : `রক্তবন্ধু - যোগাযোগ`
            }}/>
            <div
                className="md:w-4/12 p-4 bg-red-400 rounded-xl"
            >
                <div className="text-white m-6 font-medium "> যোগাযোগের মাধ্যমঃ </div>
                <div className="text-white m-6 text-sm flex items-center space-x-2">
                    <FaLocationArrow />
                    <span> 4329 Travis Street, Red Fort L.A., 34950 </span>
                </div>
                <div className="text-white m-6 text-sm flex items-center space-x-2">
                    <BiSolidPhoneCall />
                    <a href='tel:+8801717642515'>
                        +8801717642515
                    </a>
                </div>
                <div className="text-white m-6 text-sm flex items-center space-x-2">
                    <TfiWorld />
                    <a href="www.roktobondhu.com">www.roktobondhu.com</a>
                </div>
                <div className="flex justify-center m-2 space-x-2">
                    <BsFacebook
                        size={25}
                        className='p-0.5 bg-white text-blue-500 rounded-full'
                    />
                    <FaWhatsappSquare
                        size={25}
                        className='p-0.5 bg-white text-green-500 rounded-full'
                    />
                    <BsTelegram
                        size={25}
                        className='p-0.5 bg-white text-blue-400 rounded-full'
                    />
                </div>
            </div>
            <div
                className="md:w-8/12 p-4 space-y-2"
            >
                <h2
                    className='font-bold text-xl text-red-500'
                >
                    বার্তা পাঠান
                </h2>
                <form
                    className='space-y-2'
                >
                    <Input
                        {...{
                            value,
                            setValue,
                            label: "আপনার নামঃ",
                            name: "name",
                            type: "name",
                            className: "",
                        }}
                    />
                    <Input
                        {...{
                            value,
                            setValue,
                            label: "আপনার ই-মেইলঃ ",
                            name: "email",
                            type: "email",
                            className: "",
                        }}
                    />
                    <label
                        className='block'
                    >
                        আপনার বার্তাঃ 
                    </label>
                    <textarea
                        rows='6'
                        placeholder='এখানে আপনার বার্তা লিখুন...'
                        className='w-full p-2 block  focus:outline-none border focus:border-red-500 rounded'
                    >
                        
                    </textarea>
                    <button
                        type="submit"
                        className="flex justify-center items-center space-x-2 px-6 py-2 bg-red-400 hover:bg-red-500 text-white rounded"
                    >
                        পাঠিয়ে দিন
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;