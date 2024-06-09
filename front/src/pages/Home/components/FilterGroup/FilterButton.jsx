import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react"; 
import { MapContext } from "../../../../contexts/MapContext";

export function FilterButton({label, filterKey, filterValue}) {

    const { filterList, setFilterList, setStationIdx} = React.useContext(MapContext);

    //필터 데이터 전송
    const [btnClicked, setBtnClicked] = useState(false);
    const getFilterVal = () => {
        if(btnClicked){
            setFilterList(prev => {
                const flist = Object.assign({}, prev);
                delete flist[filterKey]
                return flist
            });
            setBtnClicked(false);
        }else{
            setFilterList({...filterList,[filterKey] : filterValue.active}); 
            setBtnClicked(true);
        }
        setStationIdx(0);
    }

    return (
        <Button
            variant="contained"
            size="large"
            sx = {{bgcolor :btnClicked ? 'primary' : '#fff', color: !btnClicked && 'primary.main'}}
            onClick={getFilterVal}
        >
            {label}
        </Button>
    )
}

