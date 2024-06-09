import { Box, Stack, Typography, Button } from "@mui/material";
import Swal from "sweetalert2";
import React, { useEffect, useState } from 'react';
import '../../../../App.css';

const ReserveBox = ({chrstnNm, avail_count, tot_count}) => {

    function getDateTime() {
        const now = new Date();
        const Weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const weekday = Weekdays[now.getDay()];
        const hour = now.getHours();
        const minute = now.getMinutes();
    
        return `${year}년 ${month}월 ${day}일 ${weekday} ${hour}시 ${minute}분`;
    }

    const currentTime = getDateTime();

    const reserve = () => {
        const popup = Swal.fire({
          title: "예약하시겠습니까?",
          html: `
            <p>${currentTime}</p>
            <h4 style="font-size: 20px;">${chrstnNm}</h4>
          `,
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "예약하기",
          cancelButtonText: "취소",
        });
        popup.then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "예약 성공",
              text: "예약이 완료되었습니다.",
              icon: "success"
            });
          }
        });
      };

    return ( 
        <Box sx={{bgcolor:'grey.100',p:1, mt:1, display:'flex', display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <Stack direction="row" spacing={2}>
                <Stack direction="row">
                    {
                        tot_count > avail_count ?
                        <>
                            <Typography>{tot_count}대 중&nbsp;</Typography>
                            <Typography color="primary" sx={{fontWeight:'bold'}}>&nbsp;{tot_count - avail_count}대 사용가능</Typography>
                        </>
                        :
                        <Typography>지금은 사용할 수 없어요</Typography>
                    }
                </Stack>
            </Stack>
            {avail_count === tot_count ?
                <></>
                :
                <Button variant="contained" color="secondary" onClick={reserve}>예약하기</Button>
            }
        </Box>
     );
}
 
export default ReserveBox;