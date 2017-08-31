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
        console.log('pushing file', file);
        posts.push(require(file));
      }
    });
    console.log(`${posts.length} posts`);
    posts.forEach((post, i) => {
      console.log(`${(i/posts.length)*100}%`);
      res.write(post.title);
      res.write(post.date);
      res.write(post.author);
      res.write(post.text);
      res.write(post.tags);
    });

    res.end();

  })
}).listen(1986);

console.log('server started');



