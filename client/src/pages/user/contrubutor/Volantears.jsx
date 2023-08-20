import { useEffect } from "react";
import ContributerCardView from "../../../component/contributer/ContributerCardView";
import ContributerTableView from "../../../component/contributer/ContributerTableView";
import useUserStore from "../../../store/userStore";
import { getContributors } from "../../../utils/apiRequestUtils";
import Loading from "../../../component/Loading";

const AllVolantears = () => {
    const {contributers,addContributers,isLoading,activeLoading,cancelLoading} = useUserStore()

    useEffect(()=>{
        getContributors('volantear', addContributers,activeLoading,cancelLoading)
    },[addContributers,activeLoading,cancelLoading])
    return (
        <div>
            <ContributerTableView {...{
                contributers
            }}/>

            <ContributerCardView {...{
                contributers
            }}/>
            {isLoading &&
                <Loading/>
            }
        </div>
    );
};

export default AllVolantears;