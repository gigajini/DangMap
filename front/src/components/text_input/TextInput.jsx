import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

export const TextInput = ({ label, children }) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 680);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 680);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return ( 
        <Box
            component="div"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '80%' },
                position: 'relative',
                margin: '20px',
                ...(isDesktop ? { // 데스크탑 화면일 때 추가 디자인요소
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                } : {}),
            }}
            noValidate
            autoComplete="off"
        >
            {isDesktop ? ( // 데스크탑 화면일 때
                <>
                    <InputLabel htmlFor="outlined-size-small" sx={{ mr: '20px' }}>{label}</InputLabel>
                    {children}
                </>
            ) : ( // 모바일 화면일 때
                <>
                    <InputLabel sx={{ position: 'absolute', top: '-20px', left: '20px' }}>{label}</InputLabel>
                    <div>
                        {children}
                    </div>
                </>
            )}
        </Box>
    );
}
