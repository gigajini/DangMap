import api from "../api";

export const communityApi = {
    getReport: (userId, token) =>
        api.get(`/community/report?userId=${userId}`, {
            headers: {
                Authorization: token,
            },
        }),
    postReport: (data, token) =>
        api.post("/community/report", data, {
            headers: {
                Authorization: token,
            },
        }),
};
