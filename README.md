# basicbitch
a lightweight sqlite based node blog

I got tired of dealing with bloated overhead apis when trying to spin up simple projects, so this is a blog that only requires the sqlite3 database module.

# Setup
1) Clone
2) Copy or rename config.temaplate.json to config.json, and fill in your SSL credential paths (this is SSL only, fork it if you want to get insecure)
3) Insert blog posts into directory /src/public/posts in the format of post_template.js
4) ```node src/index.js```



There's no real indexing of posts, but maybe I'll add this in the future.

Enjoy!
