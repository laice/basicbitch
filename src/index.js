const config = require('../config.json');
const fs = require('fs');
const https = require('https');
const path = require('path');


const opt = {
  key: fs.readFileSync(config.key, 'utf8'),
  cert: fs.readFileSync(config.cert, 'utf8')
};

https.createServer(opt, (req, res) => {

  const postDir = path.join(__dirname, "public", "posts");

  fs.readdir(postDir, (err, files) => {
    if(err) console.log(err);
    let posts = [];


    files.forEach(file => {
      if(file !== 'post_template.js') {
        console.log('pushing file', file);
        let postPath = path.join(postDir, file);
        posts.push(require(`${postPath}`));
      }
    });
    console.log(`${posts.length} posts`);

    res.setHeader('content-type', 'text/html');
    posts.forEach((post, i) => {
      console.log(`${(i/posts.length)*100}%`);
      res.write(`
      <div class="post">
        <div class="title">${post.title}</div>
        <div class="date"><small>${post.date}</small></div>
        <div class="author"><small>${post.author}</small></div>
        <p class="text">${post.text}</p>
        <div class="tags"></div><small>${post.tags}</small></div>
      </div>
      `);

    });

    console.log('100%');

    res.write(`<p><small>written 100% pure node - some might say a bad idea in itself ;) (c) 2017 badideas.today</small></p>`);
    res.end();

  })
}).listen(1986);

console.log('server started');



