import robot from 'robotjs';
import { clipboard } from 'electron';
export const getSelectContent = () => {
    return new Promise(resolve => {
        robot.keyToggle('control', 'down');
        setTimeout(() => {
            robot.keyTap('c');
            robot.keyToggle('control', 'up');
            const clipboardContent = clipboard.readText();
            console.log('clipboardContent:', clipboardContent);
            resolve(clipboardContent);
        }, 70);
    });
};
