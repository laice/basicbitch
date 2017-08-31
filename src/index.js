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

    files.reverse();

    files.forEach(file => {
      if(file !== 'post_template.js') {
        console.log('pushing file', file);
        let postPath = path.join(postDir, file);
        posts.push(require(`${postPath}`));
      }
    });
    console.log(`${posts.length} posts`);

    res.setHeader('content-type', 'text/html');

    res.write(`
      <!DOCTYPE html5>
      <html>
      <head>
        <title>bad ideas today</title>
        <style>
            
            body {
                background: #1F0026;
                color: #1E7F00;
                
                
            }
        
            .post {
                border-bottom: solid 1pt;                
                
                max-width: 480px;
                padding-bottom: 10px;
                padding-top: 10px;
                
                
                
	
                left: 0;
                right: 0;
                
                margin: auto;
                 
            }
            
            .postcontainer {
              
            }
            
            .footer {
              
              width: 100%;
              bottom: 0;
              left:0;
              right: 0;
              margin: auto;
              
            }
            
            ul {
              list-style-type: none;
            }
        </style>
      </head>
      <body>    
      
        
    `);
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

    res.end(`
      
        <p class="footer"><small>(c) 2017 badideas.today | <div id="about">about this site</div></small></p>
    
        </body>
       
        
        <script>
          let about = document.getElementById('about');
          about.onclick = () => {
            
          }
        </script>
        </html>
    `);

  })
}).listen(1986);

console.log('server started');



