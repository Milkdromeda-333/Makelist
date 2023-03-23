export default function Auth() {

return (
    <>

    </>
)
}

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

#### - PUT url/api/list/:listId/pin : toggles a pinned list

Recieves a list id. Returns a confirmation string if successful. Toggles to false other lists that are pinned.

#### Item route:

#### - POST url/api/lists/:listId/new-item : Adds new list item

Recieves a list id parameter, and a request body for the list item object. Returns updated list.

#### - PUT url/api/lists/list/:listId/item/:itemId/update : Updates a list item

Recieves list id and item id as parameters, and a relacement object ofr the item.

#### - DELETE url/lists/list/:listId/item/:itemId : Deletes a list item

Recieves list id and item id as parameters. Returns the new list.


## DEV Notes:

- I learned that node has a native module that hs cryptographic functionality, including generating cryptographic strings of random text, a sign and verify function, and hashing, called crypto. Here is an example of how to use it to generate a secret key.

`node -e console.log(require('crypto').randomBytes(20).toString('hex'))`

- If a document/model isnt defined correctly, make sure that you are using the correct query. ie model.find() return an array of matched objects, .findOne() returns a user object.

- I noticed about myself that I tend to try to finish projects as quickly as possible, and because of that I tend to lean away from learning on the spot. I was able to conciously tell myself it's okay to spend time learning something new on the spot in order to implement it in my code and was able to successfully implement populating the user object after the user logs in.

- I was able to implement a modal after reading up a stackoverflow post here https://stackoverflow.com/a/45608572/18193299 . At first I was not willing to do it because I was up coding all night and I thought it was gonna be hard, but I took a well needed rest, and came back and decided to look into what it take to make a modal and discovered that it actually is not as difficult as I imagined. I definitely learned to take breaks and come back fresh minded before giving up, and to not give up. Exhaust those resources! This lesson came in handy again when I realized I had an issue with the name of a list item being long and going across the screen and stretching the element it was encased in. I took a break and came back with a fresh mind and entusism to fix it. I did it using overflow: break-word, and making the maximum length of the element look good. And it all fell in place thankfully (Item.jsx).

- SO, I have a route that has some complex logic that I have never donr before. I spent time trying to fi it until I decided to enlist help from a TA. SHe helped me to get a solution by using a mongoose playground, but after the call, I found another bug while testing it. I was able to solve the bug by doing a lot of reading and trying things out with my figers crosed.

- I learned to use the all positional operator, and to incorporate arrayFilters. Here is how I implemented it before having to delete it to etend functonality.

```
List.findOneAndUpdate(
        { _id: req.params.listId },
        { "listItems.$[q].isCompleted": false },
        { arrayFilters: [{ "q.isRepeated": true }] }
    )
        .then(list => {
            res.status(201);
            res.send(list);
        }).catch(err => {
            res.status(500);
            return next(err);
        });
```

- The way that the app updates the home screen is a little disorganized, and definitely not optimized. I'd like to fix that. 

- Light color scheme from https://www.happyhues.co/palettes/15 , Icons from react icons

- I had an issue with my create list route, when it was created with isPinned being true, 

TWEAKS TO ADD:
    x add more emojis?
    x make pinned lists stay at the top
    x if no lists or items, add a notification for that
    x change light mode primary color?
    - hover effect for the items
    x make reset repeats
    x make the completing items functional lmfaooo
    - add list item completion ding
    - if list is deleted, remove from user list as well.