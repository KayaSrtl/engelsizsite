const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  // Kullanıcı adı ve şifre doğrulaması yapılacak kod burada olacak
  res.send('Giriş başarılı!');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Sunucu çalışıyor...');
});
