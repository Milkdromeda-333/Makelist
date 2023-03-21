export default function Auth() {
    
    return (
        <>

        </>
    )
}

- First build out server.
    X set up server with cors.
        x install cors, express package
    x set up database in server
        x get a database established.
        x install mongoose
        x connect server to database.
    - set up models and routes
        models
        - auth model: [username, userId, preferedTheme]
        - list model: [title, userId, items: [title, description, isRepeated]]
        routes
        - auth route
        - list route
- Then build out client

endpoints i will need

auth
- sign up and sign in with jwts token and user object
- change theme of website (extra)
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


Models:
user: username, preferedTheme
list: user, items (30 max each list)

- I was able to implement a modal after reading up a stackoverflow post here https://stackoverflow.com/a/45608572/18193299 . At first I was not willing to do it because I was up coding all night and I thought it was gonna be hard, but I took a well needed rest, and came back and decided to look into what it take to make a modal and discovered that it actually is not as difficult as I imagined. I definitely learned to take breaks and come back fresh minded before giving up, and to not give up. Exhaust those resources!