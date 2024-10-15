import { Menu } from 'electron';

export const defineCbotMenue = win => {
    Menu.setApplicationMenu(null);
    const menu = Menu.buildFromTemplate([
        {
            label: '显示主窗口',
            click: () => {
                win.show();
            },
        },
    ]);

    return menu;
};
