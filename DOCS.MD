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