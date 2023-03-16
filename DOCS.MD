- First build out server.
    X set up server with cors.
        x install cors, express package
    x set up database in server
        x get a database established.
        x install mongoose
        x connect server to database.
    - set up models and routes
        models
        x auth model: [username, userId, preferedTheme]
        x list model: [title, userId, items: [title, description, isRepeated]]
        routes
        x auth route
        - list route
- Then build out client

endpoints i will need

auth
x sign up and sign in with jwts token and user object

list
- create a list
- get all lists of a user by userId
- delete list by userId
- update list description
- adds list items
- updates list items to complete
- updates list items text
- deletes list items
- resets list so that repeatables are set to incomplete

user
- change theme(extra)


Models:
user: username, preferedTheme
list: user, items (30 max each list)

Notes:

- I learned that node has a native module that hs cryptographic functionality, including generating cryptographic strings of random text, a sign and verify function, and hashing, called crypto. Here is an example of how to use it to generate a secret key.

`node -e console.log(require('crypto').randomBytes(20).toString('hex'))`

- If a document/model isnt defined correctly, make sure that you are using the correct query. ie model.find() return an array of matched objects, .findOne() returns a user object.