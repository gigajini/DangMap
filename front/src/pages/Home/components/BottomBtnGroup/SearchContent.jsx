import { useContext, useRef, useState, useEffect } from "react";
import SearchBox from "../StationField/SearchBox";
import { MapContext } from "../../../../contexts/MapContext";
// import { TabPanel } from "@mui/lab";
import Station from "../StationField/Station";
import { Box, Grid, Typography } from "@mui/material";
import { externalApi } from "../../../../api/services/external";
import zIndex from "@mui/material/styles/zIndex";

export const SearchContent = ({isScroll, setOpen}) => {
    const { stations, setStations, filterList } = useContext(MapContext);
    const [searchWord, setSearchWord] = useState("");

    const token = localStorage.getItem("token");

    const handleSearchChange = (event) => {
        setSearchWord(event.target.value);
    };

    const handleSearch = async () => {
        const pageIdx = 0;
        const count = 1580;
        try {
            const response = await externalApi.getAllStation(count, pageIdx, filterList);
            const datas = response.data.items;
            if (response.status === 200) {
                const filteredStations = datas.filter((station) => station.chrstnNm.includes(searchWord.toUpperCase()));
                setStations(filteredStations);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const searchStyle = {
        position:'sticky', 
        top:0, 
        zIndex: 999,
        backgroundColor:'white', 
        border:'1px solid #bdbdbd', 
    }

    const searchActive = {
        position:'sticky', 
        top:0,
        zIndex: 999,
        backgroundColor:'white', 
        border:'1px solid #707273', 
        boxShadow:'0px 8px 16px rgb(70 102 183 / 60%)'
    }

    return (
        <Box component="section">
            <Box sx={isScroll ? searchActive : searchStyle}>
            {/* <Box> */}
                <SearchBox onClick={handleSearch} handleSearchChange={handleSearchChange}/>
            </Box>
            <Grid container mt={2}>
                <Grid value="1">
                    {stations ? (
                        stations.map((station, idx) => {
                            return <Station key={idx} station={station} tab={"all"} token={token} setOpen={setOpen}/>;
                        })
                    ) : (
                        <Typography>데이터 로딩중</Typography>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};
