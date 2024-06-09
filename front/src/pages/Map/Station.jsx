import { Box, Stack, Chip, Typography, Button, IconButton, TextField } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { MapContext } from "../../contexts/MapContext";

const Station = ({station, favList, getFav}) => {
    const { mapPos, setMapPos } = useContext(MapContext);
    const token = localStorage.getItem('token');

    const [clicked, setClicked] = useState(false);
    const [write, setWrite] = useState(false);
    const [words, setWords] = useState('');
    const [memo, setMemo] = useState('');
    
    useEffect(() => {
        if(favList){
            favList.forEach(f => {
                station.chrstn_id === f.chrstn_id && setClicked(true);
            })
        }
    }, []);

    useEffect(()=>{getMeMmo()},[favList])
    
    const addStation = async () => {

        if (clicked === false) {
            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_SERVER_URL}/stations/add`,
                    { chrstn_id: station.chrstn_id },
                    {
                        headers: {
                            'Authorization': `${token}`
                        }
                    }
                );
    
                if (res.data.code === 200) {
                    setClicked(true);
                    getFav();
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const deleteStation = async () => {
        if (clicked === true) {
            try {
                const res = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/stations/remove`, {
                    data: { chrstn_id: station.chrstn_id },
                    headers: {
                        'Authorization': `${token}`
                    }
                });
    
                if (res.data.code === 200) {
                    console.log(res);
                    setClicked(false);
                    getFav();
                }
    
            } catch (err) {
                console.error(err);
            }
        }
    };
    
    const postMemo = async()=>{
        try{
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/stations/memo`,
                {
                    chrstn_id : station.chrstn_id,
                    memo:words
                },
                {
                    headers: {
                        'Authorization': `${token}`
                    }
                }
            )
            .then(() => {
                console.log('작성완료');
                setWrite(false);
                getFav();
            });

        }catch(err){
            console.error(err);
        }
    }

   const getMeMmo = () => {
        if(favList){
            favList.forEach(f => {
                if(f.chrstn_id === station.chrstn_id){
                    setMemo(f.memo)
                }
            })
        }
   }

   const changeStationLocation = () => {
    setMapPos({lat: station.latitude, lng: station.longitude})
   }
   
   
    return ( 
        <Box sx={{borderBottom:'1px solid #bdbdbd', py:2}} onClick={changeStationLocation}>
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <Chip label={station.manage_entrps_nm} color="primary" variant="outlined" />
                {
                    token && 

                    <>
                        {clicked ?
                            <IconButton aria-label="like" onClick={deleteStation}>
                                <StarIcon color="secondary" fontSize="large"/>
                            </IconButton>
                            :
                            <IconButton aria-label="unlike" onClick={addStation}>
                                <StarBorderIcon fontSize="large"/>
                            </IconButton>
                        }
                    </>
                }
                
            </Box>
            {
                clicked && (
                    write ?
                    <Box mb={1}>
                        <TextField 
                            size="small"
                            onChange={(e) => { setWords(e.target.value); }} 
                            value={words} 
                        />
                        <Button onClick={postMemo}>완료</Button>
                    </Box>
                    :
                    memo === '' || memo === null?
                    <Button 
                        aria-label="memo" 
                        size="small" 
                        sx={{color:'primary.main',bgcolor:'#E9EFFF',my:1}}
                        onClick={() => setWrite(true)}
                    >
                        <Typography sx={{fontSize:"14px",marginRight:"2px"}}>메모추가</Typography>
                        <RateReviewIcon fontSize="small"/>
                    </Button>
                    :
                    <Box sx={{display:'flex',gap:'4px',alignItems:"center"}}>
                        <Typography color="primary" sx={{fontWeight:'bold'}}>{memo}</Typography>
                        <IconButton color="primary" onClick={() => setWrite(true)}>
                            <RateReviewIcon color="primary" fontSize="small"/>
                        </IconButton>
                    </Box>
                )
            }
            <Typography variant="h5" gutterBottom>{station.chrstnNm}</Typography>
            <Stack direction="row" >
                <Typography gutterBottom sx={{width:'100px'}}>충전타입</Typography>
                <Typography gutterBottom >{station.chrstnType}</Typography>
            </Stack>
            <Stack direction="row" >
                <Typography gutterBottom sx={{width:'100px'}}>용량</Typography>
                <Typography gutterBottom>{station.charger_capacity}</Typography>
            </Stack>
            <Stack direction="row" >
                <Typography gutterBottom sx={{width:'100px'}}>이용시간</Typography>
                <Typography gutterBottom>{station.useOpenTime}</Typography>
            </Stack>
            <Stack direction="row" >
                <Typography gutterBottom sx={{width:'100px'}}>전용주차장</Typography>
                <Typography gutterBottom>{station.privateCarPark}</Typography>
            </Stack>
            <Stack direction="row" >
                <Typography gutterBottom sx={{width:'100px'}}>이용자제한</Typography>
                <Typography gutterBottom>{station.user_restrict}</Typography>
            </Stack>
            <Stack direction="row" >
                <Typography gutterBottom sx={{width:'100px'}}>상세주소</Typography>
                <Typography gutterBottom>{station.rdnmadr}</Typography>
            </Stack>
            <Box sx={{bgcolor:'grey.100',p:2, mt:2, display:'flex', display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <Typography>충전원할<span>{station.avail_count}</span>/<span>{station.tot_count}</span></Typography>
                <Button variant="contained" color="secondary">예약하기</Button>
            </Box>
        </Box>
     );
}

 
export default Station;