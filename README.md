# basicbitch
a lightweight sqlite based node blog

I got tired of dealing with bloated overhead apis when trying to spin up simple projects, so this is a blog that only requires the sqlite3 database module.



# Setup
1) Clone
2) Copy or rename config.temaplate.json to config.json, and fill in your SSL credential paths (this is SSL only, fork it if you want to get insecure). no trailing slash at the end of config.host. the passphrase is for security between the cordova client, or any REPL request, and this server 

3) ```node src/index.js```

# Use
You can make and update posts by going to ```https://yourdomain.com:config.port/update?key=config.key&title=title&author=author&text=text&tags=tags```

updates are done by optionally specifying ```&id=postid```

You can delete posts by going to https://yourdomain.com:config.port/delete?key=config.key&id=postid

There's also a cordova client at https://github.com/laice/basicbastard

Enjoy!
