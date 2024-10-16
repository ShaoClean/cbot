import { globalShortcut } from 'electron';
import { textTranslate } from '../service/tencent/textTranslate/index.js';

export const registerAll = win => {
    globalShortcut.register('Alt+Shift+q', () => {
        setTimeout(async () => {
            const res = await textTranslate();
            win.webContents.send('showTranslateResult', res);
            if (!win?.isVisible()) {
                win.show();
            }
            if (!win.isFocused()) {
                win.setAlwaysOnTop(true);
                win.focus();
            }
        }, 20);
    });

    globalShortcut.register('Ctrl+Shift+q', async () => {
        win?.webContents?.openDevTools();
    });
};
