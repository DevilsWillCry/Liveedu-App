import axios from "axios";

export const postUsers = (async (url, obj) => {
    try {
        await axios.post(url, obj);
    } catch (error) {
        alert(error.message);
    }
});

export default postUsers;