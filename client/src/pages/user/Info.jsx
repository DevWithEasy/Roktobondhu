import { toBengaliNumber } from 'bengali-number';
import useUserStore from '../../store/userStore';
import apiUrl from '../../utils/apiUrl';
const Info = () => {
    const { user } = useUserStore();
    return (
        <div
            className='flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5'
        >
            <div
                className='w-[155px] h-[155px] mx-auto flex justify-center items-center ring-2 border-white rounded-full'
            >
                <img
                    src={`${apiUrl}${user?.image}`}
                    alt="user"
                    className='w-[150px] h-[150px] shrink-0 rounded-full'
                />
            </div>
            <div
                className='md:w-9/12 p-2 space-y-2 md:space-y-0 bg-white rounded-md'
            >
                <table className='hidden md:block'>
                    <tbody>
                        <tr>
                            <td className='p-2'>নাম</td>
                            <td className='p-2'>:</td>
                            <td className='px-4 py-2'>{user?.name}</td>
                        </tr>
                        <tr>
                            <td className='p-2'>ই-মেইল</td>
                            <td className='p-2'>:</td>
                            <td className='px-4 py-2'>{user?.email}</td>
                        </tr>
                        <tr>
                            <td className='p-2'>মোবাইল নম্বর</td>
                            <td className='p-2'>:</td>
                            <td className='px-4 py-2'>
                                {
                                    toBengaliNumber(user?.phone)
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2'>জন্ম তারিখ</td>
                            <td className='p-2'>:</td>
                            <td className='px-4 py-2'>
                                {
                                    toBengaliNumber(new Date(user?.dob).toLocaleDateString())
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2'>লিঙ্গ </td>
                            <td className='p-2'>:</td>
                            <td className='px-4 py-2'>{user?.gender}</td>
                        </tr>
                        <tr>
                            <td className='p-2'>রক্তের গ্রুপ </td>
                            <td className='p-2'>:</td>
                            <td className='px-4 py-2'>{user?.bloodGroup}</td>
                        </tr>
                        <tr>
                            <td className='p-2'>সর্বশেষ রক্ত দান  </td>
                            <td className='p-2'>:</td>
                            <td className='px-4 py-2'>
                                {user?.lastDonate ?
                                    toBengaliNumber(new Date(user?.lastDonate).toLocaleDateString())
                                    :
                                    <span
                                        className='text-red-500'
                                    >
                                        এখনো পর্যন্ত ব্লাড দেননি অথবা তারিখ আপডেট করেন নি।
                                    </span>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2'>বর্তমান ঠিকানাঃ</td>
                            <td className='p-2'>:</td>
                            <td className='px-4 py-2'>
                                গ্রামঃ {user?.presentAddress},
                                উপজেলাঃ {user?.presentUpazila},
                                জেলাঃ {user?.presentDistrict},
                                বিভাগঃ {user?.presentDivision}
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2'>স্থায়ী ঠিকানাঃ</td>
                            <td className='p-2'>:</td>
                            <td className='px-4 py-2'>
                                গ্রামঃ {user?.parmanentAddress},
                                উপজেলাঃ {user?.parmanentUpazila},
                                জেলাঃ {user?.parmanentDistrict},
                                বিভাগঃ {user?.parmanentDivision}
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div
                    className='p-4 space-y-2 md:hidden bg-white rounded-md'
                >
                    <p>
                        <span className='block font-bold'>
                            নামঃ
                        </span>
                        <span className='block'>
                            {user?.name}
                        </span>
                    </p>
                    <p>
                        <span className='block font-bold'>
                            ই-মেইলঃ
                        </span>
                        <span className='block'>
                            {user?.email}
                        </span>
                    </p>
                    <p>
                        <span className='block font-bold'>
                            মোবাইল নম্বরঃ
                        </span>
                        <span className='block'>
                            {user?.phone}
                        </span>
                    </p>
                    <p>
                        <span className='block font-bold'>
                            জন্ম তারিখঃ
                        </span>
                        <span className='block'>
                            {
                                toBengaliNumber(new Date(user?.dob).toLocaleDateString())
                            }
                        </span>
                    </p>
                    <p>
                        <span className='block font-bold'>
                            লিঙ্গঃ
                        </span>
                        <span className='block'>
                            {user?.gender}
                        </span>
                    </p>
                    <p>
                        <span className='block font-bold'>
                            রক্তের গ্রুপঃ
                        </span>
                        <span className='block'>
                            {user?.bloodGroup}
                        </span>
                    </p>
                    <p>
                        <span className='block font-bold'>
                            সর্বশেষ রক্ত দানঃ
                        </span>
                        <span className='block'>
                            {user?.lastDonate ?
                                toBengaliNumber(new Date(user?.lastDonate).toLocaleDateString())
                                :
                                <span
                                    className='text-red-500'
                                >
                                    এখনো পর্যন্ত ব্লাড দেননি অথবা তারিখ আপডেট করেন নি।
                                </span>
                            }
                        </span>
                    </p>
                    <p>
                        <span className='block font-bold'>
                            বর্তমান ঠিকানাঃ
                        </span>
                        <span className='block'>
                            গ্রামঃ {user?.presentAddress},
                            উপজেলাঃ {user?.presentUpazila},
                            জেলাঃ {user?.presentDistrict},
                            বিভাগঃ {user?.presentDivision}
                        </span>
                    </p>
                    <p>
                        <span className='block font-bold'>
                            স্থায়ী ঠিকানাঃ
                        </span>
                        <span className='block'>
                            গ্রামঃ {user?.parmanentAddress},
                            উপজেলাঃ {user?.parmanentUpazila},
                            জেলাঃ {user?.parmanentDistrict},
                            বিভাগঃ {user?.parmanentDivision}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Info;