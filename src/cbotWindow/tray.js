import { Tray } from 'electron';
import path from 'path';

export const createCbotTray = () => {
    const icoPath = path.join(process.env.APP_ROOT, '..', 'public', 'icon.png');

    return new Tray(icoPath);
};
