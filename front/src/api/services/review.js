import api from "../api";

export const reviewApi = {
    reviewPost: (data, token) =>
        api.post("/community/review", data, {
            headers: {
                Authorization: token,
            },
        }),
    getAll: (token, data=null) => {
        if (data) {
            return api.get("/community/review", {
                params: data,
                headers: {
                    Authorization: token,
                },
            })
        } else {
            return api.get("/community/review", {
                headers: {
                    Authorization: token,
                },
            })
        }
    }
};
