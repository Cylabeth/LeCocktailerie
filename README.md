# Cocktails Web

A Cocktails Web using the CocktailDB API

 https://le-cocktailerie.herokuapp.com
 
CAPTURES:

![CAPTURE TWO](http://cylabeth.com/ironhack/img/2B.jpg) 
![CAPTURE THREE](http://cylabeth.com/ironhack/img/3.jpg)
![CAPTURE FOUR](http://cylabeth.com/ironhack/img/4.jpg)
![CAPTURE FIVE](http://cylabeth.com/ironhack/img/5.jpg) 
![CAPTURE ONE](http://cylabeth.com/ironhack/img/1.jpg)


 
 

ENDPOINTS TABLE


| Id        | Method        | Path                               | Description                |
| :---      |     :---      |    :---                            |  :---                      |
| 1         | Get           | /login                             |    Login                   |
| 2         | Get           |  /signup                           |    Signup                  |
| 3         | Get           |  /cocktails                        |  All cocktails             |
| 4         | Get           |  /cocktails/profile                |  User profile              |
| 5         | Get/post      | /cocktails/new-cocktail            |   Create a new cocktail    |
| 6         |Get/post       |  /cocktails/edit-cocktail/:id      |   Edit a cocktail          |
| 8         |  Get          |   /cocktails/:id                   |  Cocktail details          |
| 9         |  Get          |   /random                          |  Get a random cocktail     |
| 10        |  Get          |  /ingredients                      |  Search cocktails by ingredient |
```bash
the-cocktail-app/
├── .gitignore
├── app.js
├── bin
│   └── www
│   └──seed.js
├── models
│   ├── cocktail-model.js
│   ├── user.model.js
│   ├── value.model.js
│   └── picture.model.js
│    
├── package.json
├── package-lock.json
├── public
│   └── stylesheets
│   │   └── style.css
│   ├──javascripts
│   │   └── APIHandler.js
│   │   └── index.js
│   │   └── script.js
│   └── images
│       └── favicon.ico
├── routes
│   ├── auth.routes.js
│   ├── index.js
│   ├── cocktail.routes.js
│   └── base.routes.js
└── views
    ├── auth
    │   ├── login.hbs
    │   └── signup.hbs
    ├── error.hbs
    ├── not-found.hbs
    ├── index.hbs
    ├── ingredients.hbs
    ├── random-cocktail.hbs
    ├── layout.hbs
    │
    ├── cocktails
    │   ├── user-profile.hbs
    │   ├──new-cocktail.hbs
    │   ├── edit-cocktail.hbs
    │   ├── search.hbs
    │   └── details.hbs                      
    └── 
```
