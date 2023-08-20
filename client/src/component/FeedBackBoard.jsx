import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from '../assets/images/user.png';

const FeedBackBoard = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <Slider
            {...settings}
            className="border rounded"
        >
            <div
                className="p-4 bg-white rounded space-y-3"
            >
                <img
                    src={img}
                    className="h-40 w-40 pt-2 border rounded-full "
                />
                <div>
                    <p
                        className="font-bold"
                    >
                        রবিউল আওয়াল (A+)
                    </p>
                    <p>
                        ঠাকুরগাঁও সদর ঠাকুরগাঁও
                    </p>
                </div>
                <p
                    className="text-gray-600"
                >
                    আমি বলছি এক রক্ত যোদ্ধার কথা। নিয়মিত রক্তদাতা। রক্ত প্রয়োজন, এমন কথা শুনলে সে অস্থির হয়ে যায় রক্ত যোগাড় করে দিতে। চার ভাই বোনের মধ্যে দ্বিতীয় আরিফ। ছোট বেলায় বন্ধুদের নিয়ে সাইকেল নিয়ে ঘুরতে ভালোবাসতেন। সে পরিবারের খুব পরিশ্রমী ছেলে। বিভিন্নভাবে দক্ষতা ও সফলতা দেখিয়েছেন। মিষ্টভাষী ও ভদ্র। নিজ এলাকায় তাকে সবাই খুব পছন্দ করে। অন্যকে সাহায্য করতে কখনো দ্বিতীয়বার চিন্তা করেন না।
                </p>
            </div>
            <div
                className="p-4 bg-white rounded space-y-3"
            >
                <img
                    src={img}
                    className="h-40 w-40 pt-2 border rounded-full "
                />
                <div>
                    <p
                        className="font-bold"
                    >
                        নিরঞ্জন সরকার (B+)
                    </p>
                    <p>
                        পীরগঞ্জ লোহাগাড়া
                    </p>
                </div>
                <p
                    className="text-gray-600"
                >
                    আমি বলছি এক রক্ত যোদ্ধার কথা। নিয়মিত রক্তদাতা। রক্ত প্রয়োজন, এমন কথা শুনলে সে অস্থির হয়ে যায় রক্ত যোগাড় করে দিতে। চার ভাই বোনের মধ্যে দ্বিতীয় আরিফ। ছোট বেলায় বন্ধুদের নিয়ে সাইকেল নিয়ে ঘুরতে ভালোবাসতেন। সে পরিবারের খুব পরিশ্রমী ছেলে। বিভিন্নভাবে দক্ষতা ও সফলতা দেখিয়েছেন। মিষ্টভাষী ও ভদ্র। নিজ এলাকায় তাকে সবাই খুব পছন্দ করে। অন্যকে সাহায্য করতে কখনো দ্বিতীয়বার চিন্তা করেন না।
                </p>
            </div>
            <div
                className="p-4 bg-white rounded space-y-3"
            >
                <img
                    src={img}
                    className="h-40 w-40 pt-2 border rounded-full "
                />
                <div>
                    <p
                        className="font-bold"
                    >
                        জাকির হোসেন (AB+)
                    </p>
                    <p>
                        দিনাজপুর,কাহারোল
                    </p>
                </div>
                <p
                    className="text-gray-600"
                >
                    আমি বলছি এক রক্ত যোদ্ধার কথা। নিয়মিত রক্তদাতা। রক্ত প্রয়োজন, এমন কথা শুনলে সে অস্থির হয়ে যায় রক্ত যোগাড় করে দিতে। চার ভাই বোনের মধ্যে দ্বিতীয় আরিফ। ছোট বেলায় বন্ধুদের নিয়ে সাইকেল নিয়ে ঘুরতে ভালোবাসতেন। সে পরিবারের খুব পরিশ্রমী ছেলে। বিভিন্নভাবে দক্ষতা ও সফলতা দেখিয়েছেন। মিষ্টভাষী ও ভদ্র। নিজ এলাকায় তাকে সবাই খুব পছন্দ করে। অন্যকে সাহায্য করতে কখনো দ্বিতীয়বার চিন্তা করেন না।
                </p>
            </div>
        </Slider>
    );
};

export default FeedBackBoard;