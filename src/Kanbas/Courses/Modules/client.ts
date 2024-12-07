import axios from "axios" ; 
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER; 
const MODULES_API = `${ REMOTE_SERVER }/api/modules` ; 

interface Module {
    _id?: string;
    name: string;
    description: string;
    course: string;
}

export const deleteModule = async (moduleId: string) => { 
    const response = await axiosWithCredentials.delete( `${ MODULES_API }/${ moduleId }` ); 
    return response.data; 
};

// export const updateModule = async (module: any) => { 
//     const { data } = await axiosWithCredentials.put( `${ MODULES_API }/${ module._id }` , module); 
//     return data; 
// };

export const updateModule = async (moduleId: string, moduleData: Partial<Module>) => {
    try {
        if (!moduleId) {
            throw new Error("Module ID is required");
        }

        console.log("Updating module with ID:", moduleId);
        console.log("Module data:", moduleData);

        const response = await axiosWithCredentials.put(
            `${MODULES_API}/${moduleId}`,
            moduleData
        );
        
        return response.data;
    } catch (error: any) {
        console.error("Error in updateModule:", error);
        throw error;
    }
};