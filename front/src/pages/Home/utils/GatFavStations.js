import { externalApi } from "../../../api/services/external";

export const GetFavStations = async (favList, setFavStation) => {
    if (favList) {
        const pageIdx = 0;
        const count = 10;
        const likeStations = favList.map((obj) => obj.chrstn_id).join(";");
        console.log(likeStations);
        if (likeStations !== "") {
            try {
                const response = await externalApi.getFavStation(likeStations,pageIdx,count);
                if (response.status === 200) {
                    const results = [];
                    response.data.items.forEach((item) => {
                        const cur_lat = item.latitude;
                        const cur_lng = item.longtitude;
                        const ex_item = results.find((r) => r.latitude === cur_lat && r.longtitude === cur_lng);
                        if (!ex_item) {
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
                    setFavStation(results);
                }
            } catch (err) {
                console.error(err);
            }
        }else {
            setFavStation([]);
        }
    }
};