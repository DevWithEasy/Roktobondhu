import { toBengaliNumber } from "bengali-number";
import { AiOutlineEye } from "react-icons/ai";
import useUserStore from "../store/userStore";
import dateDiffInDays from "../utils/dateDiffDays";
import enableDonate from "../utils/enableDonate";

// eslint-disable-next-line react/prop-types
const FindCardView = ({ users, access, setAccess }) => {
    const { isAccess } = useUserStore()

    return (
        <div
            className="md:hidden space-y-2"
        >
            {users &&
                // eslint-disable-next-line react/prop-types
                users.map((user, i) =>
                    <div
                        key={i}
                        className="bg-red-50 border border-red-400 sha rounded"
                    >
                        <div
                            className="p-2"
                        >
                            <p>{user?.name}</p>
                            <p>
                                গ্রামঃ {user?.presentAddress},
                                উপজেলাঃ {user?.presentUpazila},
                                জেলাঃ {user?.presentDistrict},
                            </p>
                            <p>
                                নিজ জেলাঃ {user?.parmanentDistrict}
                            </p>
                            <p
                                className="flex"
                            >
                                যোগযোগঃ &nbsp;
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
                            </p>
                        </div>
                        <p
                            className="p-2 bg-red-400 text-white rounded-b"
                        >
                            {
                                        user?.lastDonate ?
                                            enableDonate(user?.lastDonate) ? 
                                            `${toBengaliNumber(new Date(user?.lastDonate).toLocaleDateString())} - ${toBengaliNumber(dateDiffInDays(user?.lastDonate))} দিন আগে`
                                            :
                                            `রক্ত দেওয়ার জন্য প্রস্তুত নন। (${toBengaliNumber(dateDiffInDays(user?.lastDonate))} দিন আগে রক্তদান করেছেন। )`
                                            :
                                            'এখনো রক্ত দেননি'
                                    }
                        </p>
                    </div>
                )
            }
        </div>
    );
};

export default FindCardView;