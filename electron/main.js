const { app, BrowserWindow } = require('electron')

// Храните глобальную ссылку на объект окна, если вы этого не сделаете, окно будет
// автоматически закрываться, когда объект JavaScript собирает мусор.
let win
let tornadoAppUrl = 'http://localhost:8888';

function createWindow () {
  // Создаём окно браузера.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // и загрузить index.html приложения.
  win.loadFile('index.html')

  
  win.webContents.openDevTools()

  // Будет вызвано, когда окно будет закрыто.
  win.on('closed', () => {
    // Разбирает объект окна, обычно вы можете хранить окна     
    // в массиве, если ваше приложение поддерживает несколько окон в это время,
    // тогда вы должны удалить соответствующий элемент.
    win = null
  })
}
/*
global.getNumbers = function() {
  const { net } = require('electron');
  const request = net.request(tornadoAppUrl + '/random');
  console.log("something happen");
  request.on('response', (response) => {
    response.on('data', (chunk) => {
     global.sharedObj = chunk;
    })
    response.on('error', (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
    })
  })
}
*/
const { ipcMain } = require('electron')
const fetch = require('electron-fetch').default

ipcMain.on('asynchronous-message', (event, arg) => {
  resNumbers = "";
  fetch(tornadoAppUrl + '/random')
    .then(res => res.json())
    .then(json => {
      event.reply('asynchronous-reply', json);
    })
  })




// Этот метод будет вызываться, когда Electron закончит 
// инициализацию и готов к созданию окон браузера.
// Некоторые API могут использоваться только после возникновения этого события.
app.on('ready',  createWindow)



// Выходим, когда все окна будут закрыты.
app.on('window-all-closed', () => {
  // Для приложений и строки меню в macOS является обычным делом оставаться
  // активными до тех пор, пока пользователь не выйдет окончательно используя Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
   // На MacOS обычно пересоздают окно в приложении,
   // после того, как на иконку в доке нажали и других открытых окон нету.
  if (win === null) {
    createWindow()
  }
})

// В этом файле вы можете включить код другого основного процесса 
// вашего приложения. Можно также поместить их в отдельные файлы и применить к ним require.