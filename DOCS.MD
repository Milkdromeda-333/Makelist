ToDo

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
x create a list
x gets a list by id
x get all lists of a user by userId
x delete list by userId
x updates list
x adds list items
x resets list so that repeatables are set to incomplete
- toggling list pinning
- update item description
- updates list items to complete
- updates list items text
- deletes list items

user
- change theme(extra)

## Notes:

- I learned that node has a native module that hs cryptographic functionality, including generating cryptographic strings of random text, a sign and verify function, and hashing, called crypto. Here is an example of how to use it to generate a secret key.

`node -e console.log(require('crypto').randomBytes(20).toString('hex'))`

- If a document/model isnt defined correctly, make sure that you are using the correct query. ie model.find() return an array of matched objects, .findOne() returns a user object.

- I noticed about myself that I tend to try to finish projects as quickly as possible, and because of that I tend to lean away from learning on the spot. I was able to conciously tell myself it's okay to spend time learning something new on the spot in order to implement it in my code and was able to successfully implement populating the user object after the user logs in.

## Endpoint Docs:

### List route:

#### - POST url/api/lists/new : Create new list

Creates a new list. Takes a request body with a list name and wether it is pinned ot not. isPinned could be defined ass true or not defined at all.

#### - GET url/api/lists/:listId : Returns a list

Recieves a parameter with list id.

#### - GET url/api/lists/ : Returns all lists created by the user.

#### - DELETE url/api/lists/:listId - Deletes a list.

Takes the list id as a parameter. Returns a status 404 if no list is found, and code 200 and "List deleted" if a list is found.

#### - PUT url/api/lists/list - Updates a list

Takes a complete list object to replace the last object. Returns the object before it was updated.

#### - PUT url/api/lists/:listId/reset : Resets all repeated list items of a certain list.

Recieves a list id as a parameter.

### Item route:

#### - POST url/api/lists/:listId/new-item : Adds new list item

Recieves a list id parameter, and a request body for the list item object. Returns updated list.
