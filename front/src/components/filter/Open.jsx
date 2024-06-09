import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react"; 
import { MapContext } from "../../contexts/MapContext";


export default function Open() {

    const { filterList, setFilterList} = React.useContext(MapContext);

    //필터 데이터 전송
    const [btnClicked, setBtnClicked] = useState(false);
    const getFilterVal = () => {
        if(btnClicked){
            setFilterList(prev => {
                const {user_restrict, ...rest} = prev;
                return rest
            });
            setBtnClicked(false);
        }else{
            setFilterList({...filterList,user_restrict : '이용자 제한 없음'});
            setBtnClicked(true);
        }
    }

    return (
        <Button
            variant={btnClicked ? 'contained' : 'outlined'}
            size="large"
            color="primary"
            onClick={getFilterVal}
        >
            외부인개방
        </Button>
    )
}
