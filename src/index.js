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


    posts.forEach((post, i) => {
      console.log(`${(i/posts.length)*100}%`);
      res.write(`
      ${post.title}
      <small>${post.date}</small>
      <small>${post.author}</small>
      ${post.text}
      <small>${post.tags}</small>
      `);

    });

    console.log('100%');

    res.write(`<p><small>written 100% pure node - a bad idea in itself ;) (c) 2017 badideas.today</small></p>`);
    res.end();

  })
}).listen(1986);

console.log('server started');



