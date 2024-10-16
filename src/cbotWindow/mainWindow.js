import { BrowserWindow, app } from 'electron';
import { defineCbotMenue } from './menu.js';
import { createCbotTray } from './tray.js';
import { registerAll } from '../shortcut/index.js';

export const createCbotMainWindow = () => {
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

    win.loadURL('http://localhost:9090');

    win.on('close', event => {
        if (!app.isQuitting) {
            event.preventDefault();
            win.hide();
        }
    });
};
