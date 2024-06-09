import { useState, useEffect, useContext } from "react";
import axios from "axios";
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Box, Typography, Button, IconButton, TextField } from "@mui/material";
import { MapContext } from "../../../../contexts/MapContext";
import { stationApi } from "../../../../api/services/station";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";

const MemoButton = ({ token, station, clicked }) => {

    const { favList } = useContext(MapContext);
    const [write, setWrite] = useState(false);
    const [complete, setComplete] = useState(false);
    const [text, setText] = useState('');

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleMemoBtnClick = (e) => {
        e.stopPropagation();
        setWrite(true);
        setComplete(false);
    };

    const handleTextEdit = (e) => {
        e.stopPropagation();
        setWrite(true);
        setComplete(false);
    };

    const postMemo = async(e)=>{
        e.stopPropagation();
        const data = { chrstn_id : station.chrstn_id, memo:text }
        try{
            stationApi.postMemo(data,token)
            .then(() => {
                if (text === '' && text !== null) {
                    setWrite(false);
                    setComplete(false);
                    console.log(text);
                } else {
                    setWrite(false);
                    setComplete(true);
                }
            });

        }catch(err){
            if (err.response === 500) {
                logout(() => {
                    console.error(err);
                    navigate('/');
                });
            }
        }
    }

    const getMeMmo = () => {
        if(favList){
            favList.forEach(f => {
                if(f.chrstn_id === station.chrstn_id){
                    if(f.memo !== null && f.memo !== ''){
                        setComplete(true);
                        setText(f.memo);
                    }else{
                        setComplete(false);
                    }
                }
            })
        }
   }
   
   // 즐겨찾기가 변경될 때 실행
    useEffect(() => {
        getMeMmo();
    }, [favList]);

    //즐겨찾기 해제 시 초기화
    useEffect(() => {
        getMeMmo();
    },[clicked]);

    return ( 
        <>
        {clicked ?
            <>
                {!complete && !write && (
                    <Button 
                        aria-label="memo" 
                        size="small" 
                        sx={{color:'primary.main',bgcolor:'#E9EFFF'}}
                        onClick={(e) => handleMemoBtnClick(e)}
                    >
                        <Typography sx={{fontSize:"14px",marginRight:"2px"}}>메모추가</Typography>
                        <RateReviewIcon fontSize="small"/>
                    </Button>  
                )}
                {!complete && write && (
                    <Box>
                        <TextField 
                            size="small"
                            onChange={(e)=>{
                                e.preventDefault();
                                setText(e.target.value);
                            }}
                            onClick={(e) => {e.stopPropagation()}}
                            value={text}
                        />
                        <Button onClick={(e)=>{postMemo(e)}}>완료</Button>
                    </Box> 
                )}
                {complete && !write && (
                    <Box sx={{display:'flex',gap:'4px',alignItems:"center"}}>
                        <Typography color="primary" sx={{fontWeight:'bold'}}>{text}</Typography>
                        <IconButton color="primary" onClick={(e) => handleTextEdit(e)}>
                            <RateReviewIcon color="primary" fontSize="small"/>
                        </IconButton>
                    </Box>
                )}
            </>
        : null}
        </>
    );
}
 
export default MemoButton;

 
