import { Button, useTheme } from "@mui/material";
import Swal from "sweetalert2";
// <BasicPopup>삭제</BasicPopup>라고 쓰면 버튼엔 (삭제)하기 내용엔 (삭제) 되었습니다 라고 뜨는 형태
// <BasicPopup width=500></BasicPopup> 쓰면 width 설정 가능

const BasicPopup = ({ children = "", width = 400 }) => {
    const theme = useTheme();

    const popup = () =>
        Swal.fire({
            title: `${children} 되었습니다`,
            icon: "success",
            width: width,
            confirmButtonText: "확인",
            confirmButtonColor: theme.palette.primary.main,
        });

    return (
        <Button variant="contained" color="primary" onClick={() => popup()}>
            {children}하기
        </Button>
    );
};

export default BasicPopup;
