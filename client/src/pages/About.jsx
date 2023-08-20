import abouts from "../assets/data/about";
import {FaHandPointRight} from 'react-icons/fa'
import Head from "../component/Head";

const About = () => {
    return (
        <div
            className="m-2 md:w-1/2 md:mx-auto"
        >
            <Head {...{
                title : `রক্তবন্ধু - আমাদের সম্পর্কে`
            }}/>
            <h2
                className="p-2 bg-red-400 font-bold text-white text-xl text-center rounded"
            >
                RoktoBondhu স্বেচ্ছায় রক্তদাতাদের একটি ওয়েবসাইট
            </h2>
            <div
                className="mt-4 space-y-5"
            >
            {
                abouts.map((about,i)=>
                <div 
                    key={i}
                    className="text-justify"
                >
                    <FaHandPointRight className="inline-block text-red-500 mr-2"/>
                    {about.text}
                </div>
                )
            }
            </div>
        </div>
    );
};

export default About;