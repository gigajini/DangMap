import api from "../api";

export const externalApi = {
    getAllStation: (count, pageIdx, filterList={}) => {
        let filter = '';
        const params = {
            serviceKey: process.env.REACT_APP_STATION_API_KEY,
            type: 'json',
            numOfRows: count,
            pageNo: pageIdx,
        }
        if (JSON.stringify(filterList) !== '{}') {
            filter += '?'
            Object.entries(filterList)
            .filter(([key, value]) => value !== undefined && value !== null && value !== "")
            .forEach(([key, value]) => {
                filter += `filterKey=${key}&filterValues=${value.replaceAll('+','%2B')}&`;
            })
        }
        return api.get(`https://apis.data.go.kr/3740000/suwonEvChrstn/getdatalist${filter}`, {params})
    },
    getFavStation: (likeStations,pageIdx,count) => {
        const params = {
            serviceKey: process.env.REACT_APP_STATION_API_KEY,
            type: 'json',
            sortKey: 'chrstnType',
            filterKey: 'chrstn_id',
            filterValues: likeStations,
            numOfRows: count,
            pageNo: pageIdx
        }
        return api.get('https://apis.data.go.kr/3740000/suwonEvChrstn/getdatalist', {params})
    }
}