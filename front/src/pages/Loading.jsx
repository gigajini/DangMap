// 라이브러리 설치 yarn add react-spinners
import React from "react";
import { PulseLoader } from "react-spinners";

const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
};

const Loading = () => {
    return (
        <>
            <div style={loadingStyle}>
                <PulseLoader size="18px" color="#ffcf32" margin={30} speedMultiplier={0.5} />
            </div>
            <h2 style = {{textAlign : 'center', marginTop : '-30vh'}}>로딩중입니다</h2>
            <p style = {{ textAlign : 'center'}}>잠시만 기다려주세요</p>
        </>
    );
};

export default Loading;
