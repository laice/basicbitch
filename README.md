# basicbitch
a lightweight sqlite based node blog

I got tired of dealing with bloated overhead apis when trying to spin up simple projects, so this is a blog that only requires the sqlite3 database module.



# Setup
1) Clone
2) Copy or rename config.temaplate.json to config.json, and fill in your SSL credential paths (this is SSL only, fork it if you want to get insecure). no trailing slash at the end of config.host. the passphrase is for security between the cordova client, or any REPL request, and this server 
3) blog posts are added, editted and removed thru the cordova client https://github.com/laice/basicbastard or thru REPL calls
  ```/update?key=YOUR_PASSPHRASE&title=YOUR_TITLE&author=YOU&text=BLOG_POST&tags=POST_TAGS[&id=POST_ID]``` id is optional, and if supplied, will edit the post with the matching id
  ```/delete?key=YOUR_PASSPHRASE&id=POST_ID``` this deletes the specified post
4) ```node src/index.js```

# Use
You can make and update posts by going to ```https://yourdomain.com:config.port/update?key=config.key&title=title&author=author&text=text&tags=tags```

updates are done by optionally specifying ```&id=postid```

You can delete posts by going to https://yourdomain.com:config.port/delete?key=config.key&id=postid


There's no real indexing of posts, but maybe I'll add this in the future.

Enjoy!
