const config = require('../config.json');
const fs = require('fs');
const https = require('https');
const path = require('path');


const opt = {
  key: fs.readFileSync(config.key, 'utf8'),
  cert: fs.readFileSync(config.cert, 'utf8')
};

const head = `
          <DOCTYPE html>
          <html>
          <head>
            <title>bad ideas today</title>
            <style>
                
                body {
                    background: #1F0026;
                    color: #1E7F00;
                    font-family: "Lucida Console", "Lucida Sans Typewriter", monaco, "Bitstream Vera Sans Mono";
                    
                    
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
                
                .btn {
                  border: solid 1pt; 
                  padding: 2px;
                  margin-top: 5px;
                }
                
                .footer {
                  
                  width: 100%;
                  bottom: 0;
                  left:0;
                  right: 0;
                  margin: auto;
                  padding: 10px;
                  
                }
                
                ul {
                  list-style-type: none;
                }
                
                a {
                 color: inherit;
                }
                
                
            </style>
          </head>
          <body>    
          
            
        `;

const foot = `      
          <p class="footer">
            <small>
              <sub>
                (c) 2017 <a href="https://badideas.today">badideas.today</a> | 
                <a href="https://badideas.today/about">about this site</a> | 
                <a href="https://goon.pub">https://goon.pub</a>
              </sub>
            </small>
          </p>      
          </body> 
          </html>
        `;
https.createServer(opt, (req, res) => {
  const postDir = path.join(__dirname, "public", "posts");
  res.setHeader('content-type', 'text/html');
  switch(req.url) {
    case "/": {
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



        res.write(head);
        posts.forEach((post, i) => {
          console.log(`${(i/posts.length)*100}%`);
          res.write(`
        
            <div class="post">
              <div class="title"><strong>${post.title}</strong></div>
              <div class="date"><small>${post.date}</small></div>
              <div class="author"><<small><i>${post.author}</i></small></div>
              <p class="text">${post.text}</p>
              <div class="tags"></div><small>${post.tags}</small></div>
            </div>
        
          `);

        });

        console.log('100%');

        res.end(foot);

      })
      break;
    }
    case "/about": {
      res.write(head);
      res.write(`
        <p class="post">
          This site is written in pure node.js 8.4, and is an exercise for me in writing as well as web development.
            If you would like to discuss either of these topics, or anything covered in this blog, feel free to
            email me at <a href="mailto:jynn@badideas.today">jynn@badideas.today</a>
        </p>
      `);
      res.end(foot);
    }
  }



}).listen(1986);

console.log('server started');



