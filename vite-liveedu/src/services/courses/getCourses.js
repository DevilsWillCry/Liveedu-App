
import axios from "axios";

export const getCourses = async (userURL) => {
    try {
        const response = await axios.get(userURL)
        return response.data;
    } catch (error) {
        alert(error.message);
        console.error(error);
        return null
    }
};

export default getCourses;