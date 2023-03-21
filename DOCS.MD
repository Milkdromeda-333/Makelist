export default function Auth() {

return (
    <>

    </>
)
}

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
x update item
x deletes list items

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

#### Item route:

#### - POST url/api/lists/:listId/new-item : Adds new list item

Recieves a list id parameter, and a request body for the list item object. Returns updated list.

#### - PUT url/api/lists/list/:listId/item/:itemId/update : Updates a list item

Recieves list id and item id as parameters, and an object outlining what key to change, and what value to change it to. Like so

```
{
    "key": "title",
    "value": "new title alert"
}
```

#### - DELETE url/lists/list/:listId/item/:itemId : Deletes a list item

Recieves list id and item id as parameters. Returns the new list.


- find list that is already pinned, set it to false. Then, find th list that was rewueted and turn it to true.

    x findOneAndUpdate will be able to set it to false. 
    - find() get all of a users lists, find where one isPinned is true, set it to false. Then find the list that the user queried and set it to true if it is pinning something. If its just unpinning, no need to do the last step.
Models:
user: username, preferedTheme
list: user, items (30 max each list)

DEVNOTES:

- I was able to implement a modal after reading up a stackoverflow post here https://stackoverflow.com/a/45608572/18193299 . At first I was not willing to do it because I was up coding all night and I thought it was gonna be hard, but I took a well needed rest, and came back and decided to look into what it take to make a modal and discovered that it actually is not as difficult as I imagined. I definitely learned to take breaks and come back fresh minded before giving up, and to not give up. Exhaust those resources! This lesson came in handy again when I realized I had an issue with the name of a list item being long and going across the screen and stretching the element it was encased in. I took a break and came back with a fresh mind and entusism to fix it. I did it using overflow: break-word, and making the maximum length of the element look good. And it all fell in place thankfully (Item.jsx).
