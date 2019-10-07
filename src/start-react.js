const net = require('net');
const childProcess = require('child_process');

const port = process.env.PORT ? process.env.PORT - 100 : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => {
  client.connect({ port }, () => {
    client.end();
    if (!startedElectron) {
      startedElectron = true;
      const { exec } = childProcess;
      const mainProcess = exec('npm run electron');

      mainProcess.stdout.on('data', data => {
        console.log(`stdout: ${data}`);
      });

      mainProcess.stderr.on('data', data => {
        console.error(`stderr: ${data}`);
      });
    }
  });
};

tryConnection();

client.on('error', () => {
  setTimeout(tryConnection, 1000);
});
