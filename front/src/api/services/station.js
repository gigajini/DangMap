import api from "../api";

export const stationApi = {
    addLikeStation: (data, token) =>
        api.post("/stations/add", data, {
            headers: {
                Authorization: token,
            },
        }),
    deleteLikeStation: (data, token) =>
        api.delete("/stations/remove", {
            data: data,
            headers: {
                'Authorization': `${token}`
            }
        }),
    postMemo: (data, token) => 
        api.put("/stations/memo", data, {
            headers: {
                Authorization: token,
            },
        }),
    getFav: (token) => 
        api.get("/stations/list", {
            headers: {
                Authorization: token,
            },
        })
};