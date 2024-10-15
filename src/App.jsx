import { SwapOutlined } from '@ant-design/icons';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
const App = () => {
    const [translateRes, setTranslateRes] = useState();

    useEffect(() => {
        const { ipcRenderer } = window.electron;
        ipcRenderer.on('showTranslateResult', (event, message) => {
            console.log('Received from main:', message);
            setTranslateRes(message);
        });
    }, []);

    return (
        <div>
            <TextArea value={translateRes?.origin} placeholder="翻译内容..." style={{ height: 120, resize: 'none', backgroundColor: 'rgb(238,238,238)', border: 'none', fontSize: 18 }} />

            <div
                style={{
                    height: 50,
                    backgroundColor: 'rgb(238,238,238)',
                    border: 'none',
                    borderRadius: 6,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 20,
                    padding: '0 10px',
                }}
            >
                <span>自动检测</span>
                <SwapOutlined />
                <span>简体中文</span>
            </div>

            <TextArea
                value={translateRes?.result}
                placeholder="翻译结果..."
                style={{ height: 120, resize: 'none', backgroundColor: 'rgb(238,238,238)', border: 'none', marginTop: 20, fontSize: 18 }}
            />
        </div>
    );
};

export default App;
