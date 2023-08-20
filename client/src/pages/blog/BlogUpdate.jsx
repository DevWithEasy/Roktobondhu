import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import InputUpdate from '../../component/InputUpdate';
import apiUrl from '../../utils/apiUrl';
import token from '../../utils/token';
import useUserStore from '../../store/userStore';
import Loading from '../../component/Loading';
import Head from '../../component/Head';

const BlogUpdate = () => {
    const { isLoading, activeLoading, cancelLoading } = useUserStore()
    const { id } = useParams()
    const navigate = useNavigate()
    const [description, setDescription] = useState('')
    const [value, setValue] = useState({
        title: ''
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
    const getBlog = async (id) => {
        activeLoading()
        try {
            const res = await axios.get(`${apiUrl}/api/blog/${id}`)
            if (res.data.status === 200) {
                cancelLoading()
                setValue({
                    ...value,
                    title: res.data.data.title
                })
                setDescription(res.data.data.description)
            }
        } catch (error) {
            cancelLoading()
            toast.error(error?.response?.data?.message)
        }
    }

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
            const res = await axios.put(`${apiUrl}/api/blog/${id}`, formData,
                {
                    headers: {
                        'authorization': token()
                    }
                })
            if (res.data.status === 200) {
                cancelLoading()
                navigate(`/blog/${id}`)
                toast.success('সফলভাবে হয়েছে।')
            }
        } catch (error) {
            cancelLoading()
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getBlog(id)
    }, [id])

    return (
        <div
            className='m-2 md:w-10/12 md:mx-auto p-2 bg-red-50/50 rounded shadow'
        >
            <Head {...{
                title: `রক্তবন্ধু - ব্লগ আপডেট`
            }} />
            <h2
                className='p-2 bg-red-400 text-center text-xl text-white rounded'
            >
                নতুন ব্লগ লিখুন
            </h2>
            <div
                className='pt-5 space-y-2'
            >
                <InputUpdate {...{
                    name: 'title',
                    label: 'টাইটেল লিখুনঃ',
                    type: 'text',
                    fieldValue: value?.title,
                    value,
                    setValue,
                }} />
                <div
                    className='pb-16 md:pb-12 bg-white'
                >
                    <ReactQuill
                        className='h-[300px]'
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
                    onClick={() => handleSubmit()}
                    className='px-4 py-2 bg-red-400 text-white rounded'
                >
                    সাবমিট করুন
                </button>
            </div>
            {isLoading &&
                <Loading />
            }
        </div>
    );
};

export default BlogUpdate;