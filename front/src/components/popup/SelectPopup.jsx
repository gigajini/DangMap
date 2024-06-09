import Swal from "sweetalert2";
import ReactDOMServer from "react-dom/server";
import { Button, useTheme } from "@mui/material";
import "../../App.css";

const SelectPopup = ({ title, width = 500, children }) => {
    const theme = useTheme();
    const popup = () =>
        Swal.fire({
            title,
            width,
            html: ReactDOMServer.renderToString(children),
            // icon: "warning",
            showCancelButton: true,
            cancelButtonText: "취소",
            confirmButtonText: "완료",
            confirmButtonColor: theme.palette.primary.main,
            customClass: {
                cancelButton: "swal_cancel",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "완료되었습니다!",
                    icon: "success",
                    confirmButtonText: "확인",
                    confirmButtonColor: theme.palette.primary.main,
                });
            }
        });
    return (
        <>
            <Button variant="contained" onClick={() => popup()}>
                버튼
            </Button>
        </>
    );
};

export default SelectPopup;
