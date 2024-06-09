import { Typography } from "@mui/material";
import Station from "../StationField/Station";
import { MapContext } from "../../../../contexts/MapContext";
import React, { useContext, useEffect, useState } from "react";

const FavContent = ({setOpen}) => {

    const { favStation, favList } = useContext(MapContext)

    const token = localStorage.getItem("token");

    return ( 
        <>
        {token ? 
            (favStation && favStation.length !== 0 && favList.length !== 0  ? (
                favStation.map((fav, idx) => {
                    return (
                        <Station
                            key={idx}
                            station={fav}
                            tab={'fav'}
                            token={token}
                            setOpen={setOpen}
                        />
                    );
                })
            ) : (
                <Typography>즐겨찾기가 존재하지 않습니다.</Typography>
            ))
            : 
            <Typography>로그인 후 이용해주세요.</Typography>
        }
        </>
     );
}
 
export default FavContent;