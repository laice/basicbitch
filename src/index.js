const config = require('../config.json');
const fs = require('fs');
const https = require('https');


const opt = {
  key: fs.readFileSync(config.key, 'utf8'),
  cert: fs.readFileSync(config.cert, 'utf8')
};

https.createServer(opt, (req, res) => {
  fs.readdir('./public/posts', (err, files) => {
    let posts = [];
    files.forEach(file => {
      if(file !== 'post_template.json') {
        posts.push(require(file));
      }
    });
    
  })
});



