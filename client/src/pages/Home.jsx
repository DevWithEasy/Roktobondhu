import { AiOutlineArrowRight } from 'react-icons/ai'
import donar from '../assets/images/blood-donation-2.png';
import { useNavigate } from "react-router-dom";
import HomeSearch from '../component/HomeSearch';
import FeedBackBoard from '../component/FeedBackBoard';
import Footer from '../component/Footer';
import Head from '../component/Head';

const Home = () => {
    const navigate = useNavigate()
    return (
        <div
            className=""
        >
                        <Head {...{
                title : `রক্তবন্ধু - একটি সামাজিক সহযোগী সংগঠন`
            }}/>
            <div
                className="p-4 pb-10 bg-gradient-to-r from-red-100 to-transparent"
            >
                <HomeSearch/>
            </div>
            <div
                className="flex py-10 md:py-0 bg-gradient-to-l from-red-100 to-transparent"
            >
                <div
                    className="hidden w-1/2 md:block p-10"
                >
                    <img 
                        src={donar}
                        className=""
                    />
                </div>
                <div
                    className="w-full md:w-1/2 mx-auto p-4 md:flex flex-col justify-center space-y-2 "
                >
                    <h2
                        className="text-2xl text-center text-red-500 font-bold "
                    >
                        আপনিও হতে পারেন রক্তবন্ধু
                    </h2>
                    <p
                        className="font-bold text-center"
                    >
                        মানবতার সেবায় আপনিও দান করুন আপনার রক্ত ও প্লাটিলেট
                    </p>
                    <p>
                        রক্তবন্ধু কোন একক সংগঠনের জন্য নয়, বরং সকল ব্যক্তির, সংগঠনের সুবিধার জন্যই। যাঁরা রক্তদেন তাঁদেরকে এবং রক্তদান সম্পর্কিত বিভিন্ন সংগঠনগুলোকে এক প্লাটফর্মে নিয়ে এসে রক্ত দেওয়া-পাওয়ার কাজটা সহজ করাই এর উদ্দেশ্য। আপনিও রক্তদাতা হলে website এ রেজিস্ট্রেশন করুন।
                    </p>
                    <button
                        onClick={() => navigate('/registration')}
                        className="w-36 mx-auto flex items-center space-x-2 p-2 bg-red-500 text-white rounded"
                    >
                        <span>
                            রেজিস্ট্রেশন করুন
                        </span>
                        <AiOutlineArrowRight />
                    </button>
                </div>
            </div>
            <div
                className='flex flex-col md:flex-row justify-between p-2 md:p-4 bg-gradient-to-r from-red-100 to-transparent'
            >
                <div
                    className='w-full md:w-1/2 py-4 flex flex-col justify-center items-center'
                >
                    <p
                        className='text-red-500 text-2xl font-bold'
                    >
                    রক্তবন্ধুদের মতামতঃ
                    </p>
                    <p
                        className=''
                    >
                    রক্তবন্ধু সম্পর্কে আপনার মতামত দিন
                    </p>
                </div>
                <div
                    className='w-full md:w-1/2 overflow-hidden object-contain'
                >
                    <FeedBackBoard/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;