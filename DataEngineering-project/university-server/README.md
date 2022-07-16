# university-server
university-server


install package
--> npm install

start server
--> npm start


heroku develoyment
----------------
npm install
heroku local web
git add .
git commit -m "Added a Procfile."
heroku login
    Enter your Heroku credentials.
    ...
heroku create
    Creating arcane-lowlands-8408... done, stack is cedar
    http://arcane-lowlands-8408.herokuapp.com/ | git@heroku.com:arcane-lowlands-8408.git
    Git remote heroku added
git push heroku master
    ...
    -----> Node.js app detected
    ...
    -----> Launching... done
           http://arcane-lowlands-8408.herokuapp.com deployed to Heroku

heroku open