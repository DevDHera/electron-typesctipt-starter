import { app, BrowserWindow, Menu } from 'electron';
import * as url from 'url';
import * as path from 'path';

// Declare mainWindow variable
let mainWindow;
let addWindow;

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

    // Quit App when close
    mainWindow.on('closed', () => {
        app.quit();
    })

    // Build Menu from Template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Insert the Menu
    Menu.setApplicationMenu(mainMenu);
})

// Handle create add window
const createAddWindow = () => {
    // Create new Window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item'
    });

    // Load html into the window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
}


// Create Menu Template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click() {
                    createAddWindow();
                }
            },
            {
                label: 'Clear Item'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
]