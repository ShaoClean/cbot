import robot from 'robotjs';
import { clipboard } from 'electron';
export const getSelectContent = () => {
    robot.keyToggle('control', 'down');
    robot.keyTap('c');
    robot.keyToggle('control', 'up');
    const clipboardContent = clipboard.readText();
    console.log('clipboardContent:', clipboardContent);
    return clipboardContent;
};
