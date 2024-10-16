import { Menu, app } from 'electron';

export const defineCbotMenue = win => {
    Menu.setApplicationMenu(null);
    const menu = Menu.buildFromTemplate([
        {
            label: '显示主窗口',
            click: () => {
                win.show();
            },
        },
        {
            label: '退出',
            click: () => {
                win.destroy();
                app.quit();
            },
        },
    ]);

    return menu;
};
