const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('./dist/'));

app.get('/*.html', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(PORT, function () {
  console.log(`Привет, Паша! Сервер слушает порт ${PORT}, fyi :)`);
});
