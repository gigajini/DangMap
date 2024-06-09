import React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button"; // Material-UI 버튼 컴포넌트 추가

const Local2 = () => {
    const [anchor, setAnchor] = React.useState(null);

    const handleClick = (event) => { // 버튼 클릭 시 앵커 업데이트
      setAnchor(anchor ? null : event.currentTarget); // 앵커를 열려면 클릭된 요소가 앵커여야 하고, 닫으려면 앵커를 null로 설정
    };

    const open = Boolean(anchor); // 팝업이 열려 있는지 여부를 나타내는 변수
    const id = open ? 'simple-popper' : undefined; // 팝업의 id

    return ( 
        <div>
            <Button aria-describedby={id} type="button" onClick={handleClick}>
              지역
            </Button>
            <BasePopup id={id} open={open} anchor={anchor}>
              <PopupBody>
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }} id="customized-dialog-title">지역 검색하기</DialogTitle> {/* 다이얼로그 제목 */}
                    <IconButton
                        aria-label="close"
                        onClick={handleClick} // 닫기 버튼 클릭 시 handleClose 함수 실행
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: 'grey.500'
                        }}
                    >
                        <CloseIcon /> {/* 닫기 아이콘 */}
                    </IconButton>
                    <Box display={"flex"}>
                        <StyledInput type="text" className="underline-input" placeholder="예) 판교역166" /> {/* 입력 필드 */}
                        <SearchIcon type='submit'
                            sx={{
                                fontSize: 40,
                                color: 'primary.main'
                            }}>검색 {/* 검색 아이콘 */}
                        </SearchIcon>
                    </Box>
                    <DialogContent>
                        <div>
                            <Typography variant="h3" gutterBottom>tip</Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                아래와 같은 조합으로 검색을 하시면 <br />
                                더욱 정확한 결과가 검색됩니다.
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                도로명 + 건물 번호
                            </Typography>
                            <Typography variant="body1" gutterBottom color='primary.main'>
                                예) 판교역로 166, 제주 첨단로242
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                지역명(동/리) + 번지
                            </Typography>
                            <Typography variant="body1" gutterBottom color='primary.main'>
                                예) 백현동 532, 제주 영평동 2181
                            </Typography>
                        </div>
                    </DialogContent>
              </PopupBody>
            </BasePopup>
        </div>
    );
}

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
  };
  
  const PopupBody = styled('div')(
    ({ theme }) => `
    width: max-content;
    padding: 12px 16px;
    margin: 8px;
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    box-shadow: ${
      theme.palette.mode === 'dark'
        ? `0px 4px 8px rgb(0 0 0 / 0.7)`
        : `0px 4px 8px rgb(0 0 0 / 0.1)`
    };
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    z-index: 1;
  `,
  );
  
  const StyledInput = styled('input')`
    border: none;
    border-bottom: 2px solid black;
    outline: none;
    padding: 5px 10px;
    margin-top: 10px;
    margin-left: 10px;
    width: 80%
`;

export default Local2;
