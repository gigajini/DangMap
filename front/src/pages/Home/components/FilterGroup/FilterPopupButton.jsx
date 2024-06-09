import * as React from "react";
import { useState } from "react"; 
import {Button, Grid} from "@mui/material";
import { MapContext } from "../../../../contexts/MapContext";
import FilterPopup from "./FilterPopup";

export function FilterPopupButton({label, filterKey, filterValue, Separator}) {

    const [open, setOpen] = React.useState(false);

    const { filterList, setFilterList, setStationIdx} = React.useContext(MapContext);
    const [activeButtons, setActiveButtons] = React.useState([]);
    const [currentFilter, setCurrentFilter] = React.useState("");
    const [btnClicked, setBtnClicked] = useState(false);
    const [btnText, setBtnText] = useState(label);

    // 버튼 스타일 변경
    const changeStyle = () => {
        if(activeButtons.length === 0) {
            setBtnClicked(false);
            setBtnText(label);
        }else if(activeButtons.length === 1){
            setBtnText(activeButtons[0]);
            setBtnClicked(true);
        }else {
            setBtnText( activeButtons.length > 1 ? `${activeButtons[0]}\u00A0외\u00A0${activeButtons.length-1}개` : activeButtons[0] );
            setBtnClicked(true);
        }
    }
    
    // 중복 선택 가능 버튼
    const handleMultipleSelete = (type) => {
        setActiveButtons((prev) => {
            const updatedList = prev.includes(type)
                ? prev.filter(item => item !== type)
                : [...prev, type];
            setCurrentFilter(updatedList.join(Separator))
            return updatedList;
        });
    };


    // 단일 선택 버튼
    const handleSingleSelete = (type) => {
        setActiveButtons((prev) => {
            const updateList = prev.includes(type) ? [] : [type]
            setCurrentFilter(updateList.toString());
            return updateList;
        });
    }

    // 필터 데이터 전송
    const getFilterVal = () => {
        if (currentFilter) {
            setFilterList(prev => ({...filterList,[filterKey] :currentFilter}));
        } else {
            setFilterList(prev => {
                const flist = Object.assign({}, prev);
                delete flist[filterKey]
                return flist
            });
        }

        setOpen(false);
        changeStyle();
        setStationIdx(0);
    }

    return(
        <>
            <Button 
                variant="contained"
                sx = {{bgcolor :btnClicked ? 'primary' : '#fff', color: !btnClicked && 'primary.main'}}
                onClick={()=>setOpen(true)}
            >
                {btnText}
            </Button>
            {
                open &&
                <FilterPopup title={label} open={open} setOpen={setOpen}>
                    <Grid container spacing={1}>
                        {filterValue.map((type,idx) => (
                            <Grid item key={idx}>
                                <Button
                                    onClick={() => Separator ? handleMultipleSelete(type) : handleSingleSelete(type)}
                                    variant={activeButtons.includes(type) ? "contained" : "outlined"}
                                >
                                    {type}
                                </Button>
                            </Grid>
                        ))}
                        <Grid item xs={12} mt={3}>
                            <Button variant="contained" fullWidth onClick={getFilterVal}>적용</Button>
                        </Grid>
                    </Grid>
                </FilterPopup>
            }
        </>
    )
}