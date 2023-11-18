
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

- I had an issue with my create list route, when it was created with isPinned being true

- I was implementing a fix t oauto focus on inputs when the ymount, and implemented a way using a utility i called useAutoFocus, here is the component below. You would import this into the component where it is needed, pass the ref proprty to the node that you want to be the ref with the value of the util instantiated like so below the util example. Then, youd create a useeffect that will check if the ref's current value is truthy, and if it is, focus on it. [Here is the article i used to get this solution](https://blog.logrocket.com/how-to-autofocus-using-react-hooks/). I still do not have a firm understanding of how this works.

```
import { useRef, useEffect } from "react";

const useAutoFocus = () => {

    // instantiates useRef hook
    const inputRef = useRef(null);

    useEffect(() => {
        // on mount, if there is a ref, focus it.
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return inputRef;
};

export default useAutoFocus;
```

```
const inputRef = useAutoFocus();

useEffect(()=>{
    if(inputRef.current){
        input.current.focus()
    }
}, [])

// node to be referenced
<input ref={inputRef}>
```

- Loader code is from here https://uiverse.io/AbanoubMagdy1/evil-bullfrog-30

ISSUES:

- When checking an item for the first time after page loads, it buffers. I seen a vanilla JS solution, but am unsure about how to do it in react.

REMEMBER:
- BEFORE REVISING LOCALLY: set `isEnvDev` to true in src/utils/axios and comment out `disableReactDevTools();` in src/main

HOW TO DEPLOY:
Build project then push to main.