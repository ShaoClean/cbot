import Input from 'antd/es/input/Input';
import { useEffect, useState } from 'react';
const App = () => {
    const { ipcRenderer } = window.electron;
    const [translateRes, setTranslateRes] = useState();

    useEffect(() => {
        ipcRenderer.on('showTranslateResult', (event, message) => {
            console.log('Received from main:', message);
            setTranslateRes(message);
        });
    }, []);

    return (
        <div>
            <Input value={translateRes?.origin}></Input>
            <Input value={translateRes?.result}></Input>
        </div>
    );
};

export default App;
