import { externalApi } from "../../../api/services/external";

export const GetStations = async (filterList, setPositionArr, setStations, stationIdx) => {
    try {
        const pageIdx = stationIdx;
        const count = 30;
        const response = await externalApi.getAllStation(count, pageIdx, filterList)
        if (response.status === 200) {
            const results = [];
            if (typeof(response.data) === 'object') {
                response.data.items.forEach((item) => {
                    const cur_lat = item.latitude;
                    const cur_lng = item.longtitude;
                    const ex_item = results.find((r) => r.latitude === cur_lat && r.longtitude === cur_lng);
                    if (!ex_item) {
                        //충전소 상태 체크(2는 사용중)
                        if (item.charger_status === "2") {
                            item.avail_count = 1;
                        } else {
                            item.avail_count = 0;
                        }
                        item.tot_count = 1;
                        results.push(item);
                    } else {
                        if (item.charger_status === "2") {
                            ex_item.avail_count += 1;
                        }
                        ex_item.tot_count += 1;
                    }
                });
                const arr = [];
                results.forEach((r) => {
                    const p = { title: r.chrstnNm, latlng: { lat: r.latitude, lng: r.longitude }, available: r.tot_count > r.avail_count };
                    arr.push(p);
                });
                setPositionArr(arr);
                setStations(results);
            }
        }
    } catch (err) {
        console.error(err);
    }
};