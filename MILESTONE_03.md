Milestone 03
===

Repository Link
---
(https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011?tab=readme-ov-file)

URL for form 1 (from previous milestone) 
---
(https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/client/meUnsigned/pages/Submit.jsx)

Special Instructions for Form 1
---
- To submit a letter, the user needs to fill out information in all 3 fields: recipient, description, and name(of person sending)
    - I have not worked out the logic for these restrictions yet, but feel free to test it out and submit some letters.
- Users may view their submitted letters on the Signed page

URL for form 2 (for current milestone)
---
(https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/client/meUnsigned/pages/Signed.jsx)

- To filter for letters, a user may search a name, key term, or some query by typing in the input box and clicking "enter" on their keyboard
- The page will re-render with matching letters only displayed. If search query has no matches, nothing will be displayed.
    - I still need to add a message for no search results found
- Searching empty string, only spaces, or refreshing page will result in displaying all letters

URL(s) to github repository with commits that show progress on research
--- 
(TODO: add link to github url that shows line or lines of code that demonstrate continued progress on research topics)

References 
---

- https://api.reactrouter.com/v7/types/react_router.NavLinkRenderProps.html
    - React Router Dom <NavLink to="">
    - When using NavLink, NavLink has built in props
    - isActive(boolean) built in prop that can be passed into NavLink. Indicates if
    link's URL matches the current location. Helpful for styling header when name of page is "active"
- TailwindCSS: hover, active, focus https://stackoverflow.com/questions/1677990/what-is-the-difference-between-focus-and-active , https://tailwindcss.com/docs/hover-focus-and-other-states
    - hover: while hovering over an element, these styles apply
    - focus: when an element is selected/"focused" to recieve input, these styles will apply. Click "tab" on keyboard to apply focus. Focus is longterm.
        - After moment of activation, active is lost, but focus styles remain
        - Ex: When click on input field, after "moment of activation," we can apply focus:outline-none, so whenever user is typing in input field, outline from input field is gone--> smoother UI.
    - active: when an element is clicked/"activated" by a user, these styles will be applied. Active only temporary at moment of activation.
        - After release click, stop holding down key, active styles lost.
- React, Conditional Rendering https://clerk.com/blog/conditional-rendering-react https://profy.dev/article/react-conditional-render
- React Router Dom useLocation() https://medium.com/codingbeauty-tutorials/react-router-get-current-route-9c2e6bd8d689 
- MongoDB Aggregation. Instead of retrieving all documents in the database, we filter out documents with an input array of "aggregation stages"
    ModelName.aggregate([{$stage1: {}}, {$stage2: {}}, {$stage3: {}}])
    - https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/ 
    - https://www.geeksforgeeks.org/mongodb-query-with-case-insensitive-search/
    - https://www.geeksforgeeks.org/mongodb-query-with-case-insensitive-search/
    - Use $match:{} stage with {$or: [<expression>, <expression>]} operator on {fieldName: $regex{'pattern', options: ''}} to retrieve documents that contain pattern, options to specify if check case insensitive(i)
    - https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/
    - https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateToString/ 
    - Use $project:{} stage to include(1) fields or exclude(0) fields, and after decide if want to add new fields/computed fields
    - Use $dateToString:{format: "", date: $fieldName} to compute a new string field in format pattern from original fieldName of type dateObject
    - https://www.geeksforgeeks.org/how-to-sort-a-collection-by-date-in-mongodb/ 
    - Use $sort:{"fieldName": '-1'} stage to sort documents by descending(-1) or ascending(1) order based on a fieldName
- Axios GET request: https://apidog.com/blog/params-axios-get-request/
- React icons: https://www.npmjs.com/package/react-icons https://react-icons.github.io/react-icons/
- Search bar styling https://www.youtube.com/watch?v=sWVgMcz8Q44

    
