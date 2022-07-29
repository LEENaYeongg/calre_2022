// express 모듈 호출
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

//db 연동
var pgDBConn = require('./conn');
pgDBConn.getUserList();

app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
});