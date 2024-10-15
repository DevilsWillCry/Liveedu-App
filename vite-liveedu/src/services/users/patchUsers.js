import axios from "axios";

export const patchUsers = (async (url, obj) => {
    try {
        await axios.patch(url, obj);
    } catch (error) {
        alert(error.message);
    }
});

export default patchUsers;