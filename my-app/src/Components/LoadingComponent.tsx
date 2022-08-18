import { SpinnerRoundOutlined } from 'spinners-react';
import React from 'react';

const LoadingComponent = () => {
    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center',height:'100vh'}}>
            <SpinnerRoundOutlined size={50} thickness={100} speed={100} color="#36ad47" />
        </div>
    );
};

export default LoadingComponent;