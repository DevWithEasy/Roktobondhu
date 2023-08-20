import { useEffect } from 'react';
import ContributerCard from '../component/contributer/ContributerCard';
import useUserStore from '../store/userStore';
import { getContributors } from '../utils/apiRequestUtils';
import Loading from '../component/Loading';
import Head from '../component/Head';

const Partners = () => {
    const {contributers,addContributers,isLoading,activeLoading,cancelLoading} = useUserStore()

    useEffect(()=>{
        getContributors('partner',addContributers,activeLoading,cancelLoading)
    },[addContributers,activeLoading,cancelLoading])
    return (
        <div
            className='m-2 space-y-2'
        >
            <Head {...{
                title : `রক্তবন্ধু - সহযোগী সংগঠনের তালিকা`
            }}/>
            <h2
                className="py-2 text-center text-2xl text-white md:text-black bg-red-400 md:bg-transparent rounded"
            >
                আমাদের সহযোগী সংগঠনের তালিকা
            </h2>
            <div
                className='grid  md:grid-cols-4 gap-y-2 md:gap-4'
            >
                {
                    contributers.map((contributer) =>
                        <ContributerCard
                            key={contributer?._id}
                            {...{contributer}}
                        />
                    )
                }
            </div>
            {isLoading &&
                <Loading/>
            }
        </div>
    );
};

export default Partners;