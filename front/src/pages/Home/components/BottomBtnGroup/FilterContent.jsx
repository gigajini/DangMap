import { Stack, Typography, Box, Button, Grid } from "@mui/material";
import { FilterValue } from "../FilterGroup/FilterValue";
import { useEffect, useState } from "react";

export const FilterContent = ({setOpen}) => {

    const [filterButtons, setFilterButtons] = useState(); //모든 버튼의 정보들을 객체배열로 저장
    const [queryList, setQueryList] = useState();

    //버튼 초기값 지정 : 키,값,클릭여부
    const initButtons = () => {
        let multiButton = [];
        let singleButton = [];
    
        FilterValue.forEach(f => {
            if (f.needPopup) {
                f.filterValue.forEach(value => {
                    multiButton.push({
                        filterKey: f.filterKey,
                        filterValue: value,
                        isClick: false
                    });
                });
            } else {
                singleButton.push({
                    filterKey: f.filterKey,
                    filterValue: f.filterValue.active,
                    isClick: false
                });
            }
        });
        const result = multiButton.concat(singleButton);
        return result;
    };

    const toggleButtonClick = (key, value) => {
        //filterButtons배열 속 객체 중 전달받은 키와 값이 동일한 객체는 isClick값 수정
        const updatedButtons = filterButtons.map(item => 
            item.filterKey === key && item.filterValue === value 
                ? { ...item, isClick: !item.isClick } 
                : item
        );
        setFilterButtons(updatedButtons);
    };

    console.log(filterButtons);

    useEffect(()=>{
        setFilterButtons(initButtons());
    },[])

    return ( 
        <Stack spacing={2}>
            {
                FilterValue.map((f,idx) => {
                    return (
                        <Box key={idx}>
                            <Box sx={{display:'flex', gap:'4px', color:"grey.700"}}>
                                {f.icon}
                                <Typography variant="subtitle1" gutterBottom sx={{fontWeight:'bold'}}>{f.label}</Typography>
                            </Box>
                            <Grid container sx={{gap:'8px'}}>
                                {
                                    filterButtons && (
                                        f.needPopup ?
                                        f.filterValue.map((value,idx) => {
                                            //
                                            const btn = filterButtons.find(item => item.filterKey === f.filterKey && item.filterValue === value);
                                            return (
                                                <Button 
                                                    key={idx} 
                                                    variant={btn && btn.isClick ? 'contained' : 'outlined'} 
                                                    onClick={() => toggleButtonClick(f.filterKey, value)}
                                                >
                                                    {value}
                                                </Button>
                                            )
                                        })
                                        :                                       
                                        <Button 
                                            key={idx} 
                                            variant={filterButtons.find(item => item.filterKey === f.filterKey).isClick ? 'contained' : 'outlined'}
                                            onClick={() => toggleButtonClick(f.filterKey, f.filterValue.active)}
                                        >
                                            {f.label}
                                        </Button>
                                    )
                                }
                            </Grid>
                        </Box>
                    )
                })
            }
            <Button variant="contained" onClick={()=>setOpen(false)}>적용</Button>
        </Stack>
     );
}
 