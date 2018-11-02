import { app, BrowserWindow } from 'electron';
import * as url from 'url';
import * as path from 'path';

// Declare mainWindow variable
let mainWindow;

// Listen for app to be ready
app.on('ready', () => {
    // Create new Window
    mainWindow = new BrowserWindow({});

    // Load html into the window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
})