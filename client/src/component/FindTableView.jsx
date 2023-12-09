import { toBengaliNumber } from 'bengali-number';
import { AiOutlineEye } from 'react-icons/ai';
import useUserStore from '../store/userStore';
import dateDiffInDays from '../utils/dateDiffDays';
import enableDonate from '../utils/enableDonate';

// eslint-disable-next-line react/prop-types
const FindTableView = ({ users, access, setAccess }) => {
    const { isAccess } = useUserStore()
    return (
        <div className="hidden md:block relative overflow-x-auto">
            <table className="w-full">
                <thead className="text-white bg-red-500">
                    <tr>
                        <td className="p-2 text-center border">
                            নং
                        </td>
                        <td className="p-2 text-center border">
                            নাম
                        </td>
                        <td className="p-2 text-center border">
                            ঠিকানা
                        </td>
                        <td className="p-2 text-center border">
                            যোগাযোগ
                        </td>
                        <td className="p-2 text-center border">
                            সর্বশেষ রক্তদান
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        // eslint-disable-next-line react/prop-types
                        users.map((user, i) =>
                            <tr
                                key={i}
                                className={`bg-white hover:bg-red-50 ${enableDonate(user?.lastDonate) ? '' : 'line-through decoration-red-500'}`}>
                                <td className="px-2 text-center border">
                                    {toBengaliNumber(i + 1)}
                                </td>
                                <td className="px-4 py-2 border">
                                    {user?.name}
                                </td>
                                <td className="px-4 py-2 border">
                                    গ্রামঃ {user?.presentAddress},
                                    উপজেলাঃ {user?.presentUpazila},
                                    জেলাঃ {user?.presentDistrict},
                                    নিজ জেলাঃ {user?.parmanentDistrict}
                                </td>
                                <td className="px-4 py-2 border text-center">
                                    {
                                        user?.gender == 'পুরুষ' ?
                                            <a
                                                href={`tel:${user?.phone}`}
                                                className="text-red-500"
                                            >
                                                {toBengaliNumber(user?.phone)}
                                            </a>
                                            :
                                            user?.gender == 'মহিলা' && isAccess ?
                                                <a
                                                    href={`tel:${user?.phone}`}
                                                    className="text-red-500"
                                                >
                                                    {toBengaliNumber(user?.phone)}
                                                </a>
                                                :
                                                <button
                                                    onClick={() => setAccess(!access)}
                                                    className="w-full flex justify-center items-center text-red-500 text-center"
                                                >
                                                    {toBengaliNumber('01xxxxxxxx')}
                                                    <AiOutlineEye />
                                                </button>
                                    }
                                </td>
                                <td className="px-4 py-2 border">
                                    {
                                        user?.lastDonate ?
                                            `${toBengaliNumber(new Date(user?.lastDonate).toLocaleDateString())} - ${toBengaliNumber(dateDiffInDays(user?.lastDonate))} দিন আগে`
                                            :
                                            'এখনো রক্ত দেননি'
                                    }
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>

    );
};

export default FindTableView;