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
            preload: path.join(__dirname, 'preload.js'),
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

    // ipcMain.on('show-translate-result', async (event, pathList) => {
    //     console.log('path:', pathList);

    // });

    const icoPath = path.join(__dirname, 'icon.png');
    const tray = new Tray(icoPath);
    tray.setContextMenu(menu);

    win?.webContents?.openDevTools();
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
                win.loadFile('./result.html');

                setTimeout(() => {
                    win.webContents.send('show-translate-result', res.TargetText);
                    win.show();
                }, 1000);
            });
        }, 100); // 按下 C 键后延迟 100ms

        console.log('Alt+Shift+q is trigger');
    });
});
