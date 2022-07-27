// express 모듈 호출
const express = require('express');

//router 설정
const path = require('path');
const router = require('./routes/router');

const app = express();
const PORT = process.env.PORT || 3002;
var pgDBConn = require('./conn.js');
pgDBConn.getUserList();
 
// http://localhost:PORT/ 으로 접속 시 응답메시지 출력
// app.get('/', (req,res) => {
//     res.send('Server Response Success:'+PORT);
//     // res.sendFile(__dirname +'/index.html')
// })
 
app.use(express.static(path.join(__dirname, '..', 'public/')));
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})

