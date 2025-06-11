Milestone 04 - Final Project Documentation
===

NetID
---
(eh3244)

Name
---
(Emily Han)

Repository Link
---
(https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011)

URL for deployed site: this is my Codespace
---
(https://verbose-guacamole-v6659jxv6jgphw4gp-3000.app.github.dev/home)
- IMPORTANT NOTE: clicking the deployment link and my 1st links for each of the 3 below forms don't work. But opening your own codespace and navigating to the pages, app works as expected.
- I'm not sure why clicking on my codespace links don't work, but going directly through the codespace in the repository works.

URL for form 1 (from previous milestone) 
---
- https://verbose-guacamole-v6659jxv6jgphw4gp-3000.app.github.dev/signed
- (https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/client/meUnsigned/pages/Signed.jsx)

Special Instructions for Form 1
---
- This is the GET form for Search Bar on Signed.jsx
    - In my codespace attached above(1st link), I sent you to the Signed page. Please click on the search bar.
- Please type in a query and click enter
- A query of empty string "" or just spaces "     " will result in the "falsy" search
    - Falsy search will result in all letters in database displaying
- Otherwise, a "truthy" search will result in either:
    - Only letters that match the search query will be displayed
    - Or, no letters displayed if the query generates no matching results

URL for form 2 (for current milestone)
---
- (https://verbose-guacamole-v6659jxv6jgphw4gp-3000.app.github.dev/letter-details/6811663189bdaf23c047118d)
- (https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/client/meUnsigned/pages/LetterDetails.jsx)
    - In LetterDetails.jsx, lines 116-172 for the markup for form, and in app.mjs lines 153-175 to see how I wrote the API Post Request

Special Instructions for Form 2
---
- Once on the LetterDetails page of a letter, this is the POST form for adding a comment to a Letter Post
    - In my codespace attached above(1st link), I sent you to one of the Letters that I wrote for my friend "Allie."
    - You may create your own letter to test out the comment functionality, or go to any already posted letter to add a comment.
- Click the "+" button to see a new letter form dropdown.
- Fill in First Name, Last Initial, and a Comment Description.
- Click the submit button when ready, and React will re-render so that your comment is in the posted comments chain, and the number of comments will update

URL for form 3 (from previous milestone) 
---
- (https://verbose-guacamole-v6659jxv6jgphw4gp-3000.app.github.dev/submit)
- (https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/client/meUnsigned/pages/Submit.jsx)

Special Instructions for Form 3
---
- This is the POST form for a user to submit a letter to the database
    - In my codespace attached above(1st link). 2nd link is a link to my Submit.jsx file where I wrote the markup for this page.
- In order to submit a letter, a user must fill in all blanks: recipient, description, and name before clicking the blue "Submit" button
- If the letter is sucessfully submitted to database, a success message will appear on screen, and the user can check their submitted letter on the Signed page

Link to github line number(s) for schemas (db.js or models folder)
---
(https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/server/db.mjs)

Description of research topics above with points
---
- Vite(3 points)
    - In my vite.config.js file, I updated my target link so that all my API endpoints written in my app.mjs file will work in the Vite Development Server when using the standard prefix format of "/api/v1". I also followed Professor's specific deployment instruction to codespace for a Vite-React app.
    (https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/client/meUnsigned/vite.config.js)
- Use a front-end framework: I chose React (6 points)
    - I formatted my code into a /client/meUnsigned directory and a /server directory. 
    - In my /client folder, I created a folder /pages for the 4 different pages on my web-application
    - I researched react-router-dom where I initially defined all my routes to these pages in the App.jsx file(https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/client/meUnsigned/src/App.jsx)
    - I also learned how to pass in route parameters by prefixing with a colon into my route path. This allowed me to reuse the same React JSX markup for LetterDetails.jsx page(https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/client/meUnsigned/pages/LetterDetails.jsx) for each individual Letter document in my database.
    - I just had to extract my "id" route parameter with the hook useParams and destructure it in LetterDetails.jsx.
    This allowed me to make requests to my backend with my passed in id(referencing a _id for a Letter Document) to get the whole Letter Document and all the comments in Comment collection for this Letter as well. See line 10 in LetterDetails.jsx.
    - My favorite hook to use throughout my whole project was useState(), this easily helped me manage input fields for posting to the database(ex: creating a new letter in Submit.jsx, creating a new comment in LetterDetails.jsx) and for retrieving data from the database(ex: comments state, allLetters state, displayedLetters state, letter state). This made it very easy to automatically trigger re-renders whenenver the state changed.
    - useEffect() was also very useful to use when I just wanted to make requests to my database on initial page load(ex: get all letters for Signed.jsx, get all comments for LetterDetails.jsx, get Letter for LetterDetails.jsx)
- Use a CSS framework or UI toolkit: I chose taiwind.css(2 points)
    - tailwind.css recently updated to version 4
    - tailwind.css was very useful when I was trying to stack all my containers for a "Letter" in Submit.jsx(https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/client/meUnsigned/pages/Submit.jsx)
    - The ability to add styling directly on the element in the code helped me visualize how I wanted to stack my containers precisely(Ex: stack pink container for border, recipient section, input field for recipient, white box, text section for white box, and name section, and input field for name)
    - I was also able to add custom fonts and custom colors by adding them in the theme element of index.css(https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/client/meUnsigned/src/index.css)

Links to github line number(s) for research topics described above (one link per line)
---
- vite.config.js((https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/client/meUnsigned/vite.config.js))
- react-router-dom in App.jsx(https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/client/meUnsigned/src/App.jsx)
- Example of managing letters state in Signed.jsx(https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/client/meUnsigned/pages/Signed.jsx)
- Example of calling useEffect at beginning of page load to retrieve Letter Document and matching comments in comments collection: LetterDetails.jsx(https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/client/meUnsigned/pages/LetterDetails.jsx)
- Example of using tailwind.css to stack Letter container and using custom colors and google fonts: Submit.jsx(https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/client/meUnsigned/pages/Submit.jsx)

Optional project notes 
--- 
For each milestone, I just put attributions to my research for what was implemented in current milestone. To see attributions for my past 2 forms, please refer to MILESTONE_02.md and MILESTONE_03.md.

Attributions
---
- React Router: route parameters tutorial
    - For each individual letter page, I need to pass in the letter's _id attribute into the route,
    so each Letter will have a uniquer url, but also this allows my app to know which Letter document to retrieve from the database to generate JSX: the added colon after a slash signifies a route parameter
    - Letter route: /letter-details/:id
    - To access this id field in my route parameter, I use the const {id} = useParams() hook to destructure the field from the route
    - https://www.youtube.com/watch?v=T8ZhepmbP4s 
- MongoDB aggregate, $match:{} stage by matching an _id field
    - From my  axios.get("/api/v1/letter-details", { params: { id } }) in LetterDetails.jsx, I use the built-in params object to pass an id field to my api GET request
    - In order to correctly filter out the Letter document with this id field in my $match:{} stage, I first convert the id into a String field before turning it into the ObjectId type
    - new mongoose.Types.ObjectId(numberValue) is deprecated, and our id passed in query object is a number, so must convert to string first
    - But, new mongoose.Types.ObjectId(strValue) is not deprecated
        - $match: { _id: new mongoose.Types.ObjectId(`${letterId}`) }
    - https://github.com/Automattic/mongoose/issues/14608
- textarea autosize for comment description box
    - https://www.npmjs.com/package/react-textarea-autosize
    - Controlled mode demo: https://andarist.github.io/react-textarea-autosize/ 
