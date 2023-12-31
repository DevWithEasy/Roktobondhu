import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Input from '../../component/Input';
import apiUrl from '../../utils/apiUrl';
import axios from 'axios';
import token from '../../utils/token';
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import useUserStore from '../../store/userStore';
import Loading from '../../component/Loading';
import Head from '../../component/Head';

const BlogCreate = () => {
    const { isLoading,activeLoading,cancelLoading } = useUserStore()
    const navigate = useNavigate()
    const [description, setDescription] = useState('')
    const [value,setValue] = useState({
        title : ''
    })
    const [file, setFile] = useState('')
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    const handleSubmit = async () => {
        if (!value.title || value.title.length < 20) {
            return toast.error('ব্লগ টাইটেল কমপক্ষে ২০ অক্ষরের লিখুন')
        }
        if (description.length < 500) {
            return toast.error('কমপক্ষে ৫০০ টি অক্ষরের ব্লগ লিখতে হবে।')
        }
        let formData = new FormData()
        formData.append('file', file)
        formData.append('title', value.title)
        formData.append('description', description)
        activeLoading()
        try {
            const res = await axios.post(`${apiUrl}/api/blog/`, formData, 
            {
                headers: {
                    'authorization': token()
                }
            })
            if(res.data.status === 200){
                cancelLoading()
                navigate('/blog')
                toast.success('সফলভাবে হয়েছে।')
            }
        } catch (error) {
            cancelLoading()
            toast.error(error?.response?.data?.message)
        }
    }


    return (
        <div
            className='m-2 md:w-10/12 md:mx-auto p-2 bg-red-50/50 rounded shadow'
        >
            <Head {...{
                title : `রক্তবন্ধু - নতুন ব্লগ লিখুন`
            }}/>
            <h2
                className='p-2 bg-red-400 text-center text-xl text-white rounded'
            >
                নতুন ব্লগ লিখুন
            </h2>
            <div
                className='pt-5 space-y-2'
            >
                <Input {...{
                    name: 'title',
                    label: 'টাইটেল লিখুনঃ',
                    type: 'text',
                    value,
                    setValue,
                }}/>
                <div
                    className='pb-16 md:pb-12 bg-white'
                >
                    <ReactQuill
                        className='h-[300px] font-bangla'
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        modules={modules}
                        formats={formats}
                    />
                </div>
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
                    onClick={()=>handleSubmit()}
                    className='px-4 py-2 bg-red-400 text-white rounded'
                >
                    সাবমিট করুন
                </button>
            </div>
            {isLoading &&
                <Loading/>
            }
        </div>
    );
};

export default BlogCreate;