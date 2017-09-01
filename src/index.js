const config = require('../config.json');
const fs = require('fs');
const https = require('https');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bitch.db');
const { URL } = require('url');
db.run('CREATE TABLE IF NOT EXISTS posts (title TEXT, date TEXT, author TEXT, text TEXT, tags TEXT, updated TEXT, id INTEGER PRIMARY KEY )');


const opt = {
  key: fs.readFileSync(config.key, 'utf8'),
  cert: fs.readFileSync(config.cert, 'utf8')
};

const head = `
          
            <title>bad ideas today</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                
                body {
                    background: #1F0026;
                    color: #1E7F00;
                    font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif
                    
                    
                }
                
                ul {
                  list-style-type: none;
                }
                
                a {
                 color: inherit;
                }
                
                p {
                  max-width: 480px;
                }
            
                .post {
                    border-bottom: solid 1pt;                
                    
                    max-width: 480px;
                    padding-bottom: 10px;
                    padding-top: 10px;
                    
                    
                    
                  
                    left: 5px;
                    /* right: 0; 
                    
                    margin: auto; */
                     
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
                
                
                
                
            </style>
          
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
         
        `;

const dateMilliToString = (new_date) => {
  let date = new Date(1970,0,1);
  date.setMilliseconds(new_date);
  return `${(date.getMonth()+1)}/${date.getDate()}/${date.getFullYear()}`
};
https.createServer(opt, (req, res) => {
  const postDir = path.join(__dirname, "public", "posts");
  res.setHeader('content-type', 'text/html');

  if(req.url === "/") {
    // fs.readdir(postDir, (err, files) => {
    //   if(err) console.log(err);
    //   let posts = [];
    //
    //   files.reverse();
    //
    //   files.forEach(file => {
    //     if(file !== 'post_template.js') {
    //       console.log('pushing file', file);
    //       let postPath = path.join(postDir, file);
    //       posts.push(require(`${postPath}`));
    //     }
    //   });
    //   console.log(`${posts.length} posts`);
    //console.log(`${(i/posts.length)*100}%`);


    res.write(head);

    //posts.forEach((post, i) => {
    db.each("select * from (select * from posts order by id ASC limit 10) order by id DESC", (err, post) => {

      let date = dateMilliToString(post.date);


      res.write(`
        
            <div class="post">
              <div class="title"><strong>${post.title}</strong> - #${post.id}</div>
              <div class="date"><small>${date}</small></div>
              <div class="author">><small><i>${post.author}</i></small></div>
              <p class="text">${post.text}</p>
              <div class="tags"></div><small>${post.tags}</small></div>
            </div>
        
          `);



    }, () => {
      console.log('100%');

      res.write(`
          <script>
            
          </script>
        `);

      res.end(foot);
    });



    // });
  } else {
    let urlr = req.url.split('/');
    urlr = urlr[1].split('?')
    console.log(urlr[0]);


    switch(urlr[0]) {
      case "about": {
        let sourcePath = path.join(__dirname, "index.js");
        fs.readFile(sourcePath, 'utf8', (err, data) => {
          if(err) console.log(err);
          data = data.replace(/</g,"&lt;");
          data = data.replace(/>/g,"&gt;");
          res.write(head);
          res.write(`
          <p class="post">
            <p>This site is written almost entirely in pure node, with the exception being the sqlite3 module, and
              it's dependencies.
              The reason I created the codebase behind this blog was because I was tired of having to learn bloated APIs to make
              a simple site with a REPL, and decided I just wanted to learn the barebones node way of doing this, which despite
              what most bloated APIs would have you believe, is actually not that hard or complicated.</p>
              
              <p>I believe I've achieved an admittedly minimal but also reasonably extensible baseline from which to build my
              future web applications.
               </p>
               
               <p>I've also wanted an easy way to get my thoughts recorded for a long time. I also have a companion
                cordova app for this site, available at https://github.com/laice/basicbastard - I use it to make posts
                 from my phone. It should be fine is iOS as it isn't doing much complicated, 
                 but I've only tested Android thus far.
               </p>
              
              <p>If you would like to discuss these topics, or anything covered in this blog, feel free to
              email me at <a href="mailto:jynn@badideas.today">jynn@badideas.today</a></p>
          </p>
          <p class="post">
            <h3>Source:</h3>
            <p><a href="https://github.com/laice/basicbitch">https://github.com/laice/basicbitch</a> </p>
            <code>${data}</code>
          </p>
        `);
          res.end(foot);
        });


        break;
      }
      case "update": {
        // let urlq = req.url.split("?");
        // console.log('url to qs: ', urlq);
        // urlq.shift();
        // console.log('after shift', urlq);
        // let params2 = qs.parse(urlq);
        // console.log(params2);

        let urlq = new URL(req.url, "https://badideas.today");

        let params = urlq.searchParams;

        console.log(params);

        let title = params.get('title');
        let date = new Date();
        let author = params.get('author');
        let text = params.get('text');
        let tags = params.get('tags');
        let id = params.get('id');
        let key = params.get('key');

        if(key === config.passphrase) {
          if(id) {
            db.get('SELECT * FROM posts WHERE id=(?)', [id], (err, row) => {
              if(err) {
                console.log(err);
                return;
              }

              if(row) {

                title = title || row.title;
                author = author || row.author;
                text = text || row.text;
                tags = tags || row.tags;

                db.run("UPDATE posts SET title=(?), updated=(?), author=(?), text=(?), tags=(?) WHERE id=(?)",
                        [title, date, author, text, tags, id]);

                res.write(head);
                console.log(config.host);
                res.write(head);
                res.write(`
                  <h3>Post Updated. Returning..</h3>
                  
                  <script>
                  let timer = setTimeout(() => {
                    console.log('redirecting to ${config.host}');
                    window.location.replace("${config.host}");
                  }, 2000);
                  </script>
                `);
                res.end(foot);
              }

            })
          } else {
           db.run("INSERT INTO posts (title, date, author, text, tags) VALUES (?, ?, ?, ?, ?)", [title, date, author, text, tags]);

            res.write(head);
            res.write(`
                  <h3>Post Created. Returning..</h3>
                  
                  <script>
                  let timer = setTimeout(() => {
                    console.log('redirecting to ${config.host}');
                    window.location.replace("${config.host}");
                  }, 2000);
                  </script>
                `);
            res.end(foot);
          }

        } else {
          console.log(`update attempted with invalid key from ${req.ip}`);
        }

        break;
      }

      case "delete": {
        let urlq = new URL(req.url, config.host);

        let params = urlq.searchParams;

        let ids = params.get('id');

        if(Array.isArray(ids)) {
          ids.forEach(id => {
            db.run('DELETE FROM posts WHERE id=(?)', [id])
          })
        } else {
          db.run('DELETE FROM posts WHERE id=(?)', [ids])
        }

        res.write(head);
        res.write(`
          <h3>Post Deleted. Returning..</h3>
          
          <script>
          let timer = setTimeout(() => {
            console.log('redirecting to ${config.host}');
            window.location.replace("${config.host}");
          }, 2000);
          </script>
        `);
        res.end(foot);

        break;
      }

      default: {
        res.writeHead(404);
        res.write(head);
        res.write(`
          <div class=post>
            <h3>404 Not Found</h3>
          </div>
        `);
        res.end();

      }
    }
  }


}).listen(config.port);

console.log('server started');