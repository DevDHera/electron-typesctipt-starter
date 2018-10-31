import { app, BrowserWindow } from 'electron';
import * as url from 'url';
import * as path from 'path';
// const electron = require('electron');
// const url = require('url');
// const path = require('path');

// const { app, BrowserWindow } = electron;

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