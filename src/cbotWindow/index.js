import { createCbotMainWindow } from './mainWindow.js';
import { app } from 'electron';

export const startApp = () => {
    app.whenReady().then(createCbotMainWindow);
};
