# basicbitch
a lightweight sqlite based node blog

I got tired of dealing with bloated overhead apis when trying to spin up simple projects, so this is a blog that only requires the sqlite3 database module.



# Setup
1) Clone
2) Copy or rename config.temaplate.json to config.json, and fill in your SSL credential paths (this is SSL only, fork it if you want to get insecure)
3) Insert blog posts into directory /src/public/posts in the format of post_template.js
4) ```node src/index.js```

# Use
You can make and update posts by going to ```https://yourdomain.com:config.port/update?key=config.key&title=title&author=author&text=text&tags=tags```

updates are done by optionally specifying ```&id=postid```

You can delete posts by going to https://yourdomain.com:config.port/delete?key=config.key&id=postid

I've also written a basic cordova front end (only android tested) meant to integrate with this @ https://github.com/laice/basicbastard

There's no real indexing of posts, but maybe I'll add this in the future.

Enjoy!
