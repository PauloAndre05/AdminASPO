import nookies from "nookies";
import { getUserInfo } from "../pages/Authentication/services";


const usePartner = () => {
    const token = getUserInfo();
    const options = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }


    return {
        options
    }
}

export { usePartner }