import { app, BrowserWindow, Menu, ipcMain } from 'electron';
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

    // Garbage Collection
    addWindow.on('close', () => {
        addWindow = null;
    })
}

// Catch item:add
ipcMain.on('item:add', (e, item) => {
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
});


// Create Menu Template
const mainMenuTemplate: any = [
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
                label: 'Clear Item',
                click() {
                    mainWindow.webContents.send('item:clear');
                }
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

// If Mac, add empty object to menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

// Add developer tools
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}