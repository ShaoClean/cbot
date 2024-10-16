import path from 'path';
import { BrowserWindow, app } from 'electron';
import { defineCbotMenue } from './menu.js';
import { createCbotTray } from './tray.js';
import { registerAll } from '../shortcut/index.js';

export const createCbotMainWindow = () => {
    const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
    const RENDERER_DIST = path.join(process.env.APP_ROOT, '..', 'dist');
    const indexHtml = path.join(RENDERER_DIST, 'index.html');
    console.log('process.env.APP_ROOT', process.env.APP_ROOT);

    const win = new BrowserWindow({
        width: 375,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
        },
        show: false,
    });

    const cbotMenue = defineCbotMenue(win);
    const cbotTray = createCbotTray();

    cbotTray.setContextMenu(cbotMenue);

    registerAll(win);

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL);
    } else {
        win.loadFile(indexHtml);
    }

    win.on('close', event => {
        if (!app.isQuitting) {
            event.preventDefault();
            win.hide();
        }
    });
};
