const dotenv = require('dotenv');
dotenv.config();
const { BrowserWindow, app, globalShortcut, clipboard, Menu, Tray, ipcMain } = require('electron');
const robot = require('robotjs');
const tencentcloud = require('tencentcloud-sdk-nodejs');
const path = require('path');

const TranslateClient = tencentcloud.tmt.v20180321.Client;
const client = new TranslateClient({
    credential: {
        secretId: process.env.SECRET_ID,
        secretKey: process.env.SECRET_KEY,
    },
    region: 'ap-shanghai',
});

// 主窗口
let win;
app.whenReady().then(() => {
    win = new BrowserWindow({
        width: 600,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
        },
        show: false,
    });

    const menu = Menu.buildFromTemplate([
        {
            label: '显示主窗口',
            click: () => {
                win.show();
            },
        },
    ]);

    const icoPath = path.join(__dirname, 'icon.png');
    const tray = new Tray(icoPath);
    tray.setContextMenu(menu);

    win.loadURL('http://localhost:9090');

    globalShortcut.register('Alt+Shift+q', () => {
        // 按下 Ctrl 键
        robot.keyToggle('control', 'down');

        // 模拟短暂延迟
        setTimeout(() => {
            // 按下 C 键
            robot.keyTap('c');

            robot.keyToggle('control', 'up');
            const clipboardContent = clipboard.readText();

            console.log('clipboardContent:', clipboardContent);

            client.TextTranslate({ SourceText: clipboardContent, Source: 'auto', Target: 'en', ProjectId: 0 }, (err, res) => {
                console.log('translate err', err);
                console.log('translate res', res);
                win.webContents.send('showTranslateResult', {
                    origin: clipboardContent,
                    result: res.TargetText,
                });
                if (!win.isVisible()) {
                    win.show();
                    win?.webContents?.openDevTools();
                }
            });
        }, 100); // 按下 C 键后延迟 100ms

        console.log('Alt+Shift+q is trigger');
    });
});
