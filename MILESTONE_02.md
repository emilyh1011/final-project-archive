Milestone 02
===

https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011


Special Instructions for Using Form (or Login details if auth is part of your project)
---

- In my current iteration, I have not implemented the navigation in the header yet
- So, to access the Submit page with my form, please manually type in your browser's search bar: http://localhost:5173/submit
- There are 3 input boxes to represent 3 data fields: recipient, description, and name
    - Please type in the section next to "To:", white box, and section next to "Signed:" to find the input fields.
    - For styling purposes, I have hidden the border of these input fields.
- For my form, it is successfully submitting new letters to my MongoDB database MeSigned, but there is a problem that it keeps creating a new collection "letters" and a new collection "comments" to save my letter in this new collection.
- I am still trying to resolve this problem, and I hope it will be fixed by next iteration.
- My client folder structure also has an additionally level of depth. I accidentally created my react-vite app in my pre-created client directory. Then, when it asked me for package name, I named it meUnsigned, which resulted in the extra level of depth.


# IMPORTANT NOTE ON THE FRONTEND PROJECT STRUCTURE
- I accidentally made a previous client directory. 
- Then, to create my React-Vite app, I cd into client, before npm create vite@latest meUnsigned -- --template react
- Then, when it asked me for a "Package Name," I chose meunsigned to match my project name
- This, created a new level of unecessary depth into my project structure, so now my client(aka frontend) folder is client/meUnsigned
- So, when I finished setting up my project, I had to
    cd meUnsigned
    npm install
    npm run dev

# Start frontend terminal 
    cd client
    cd meUnsigned 
    npm run dev

# Start development server
    cd server
    npm start

URL for form 
---
http://localhost:5173/submit

URL for form result
---
https://cloud.mongodb.com/v2/67db55a6242a363f8646fd4f#/metrics/replicaSet/67db56404e70814697f83dba/explorer/MeSigned/letters/find

- I have whitelisted all IP Addresses, so there shouldn't be a problem for viewing the MeSigned Database
- If this link doesn't work, I have also created a separate "grader" user who can "readAnyDatabase"
    - Username: grader, Password: appliedIT2025
    - mongodb+srv://grader:appliedIT2025@cluster0.j46ih.mongodb.net/
--- 
- https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/client/meUnsigned/pages/Home.jsx 
    - Home page component, React Browser Routes research started
- https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-emilyh1011/blob/master/client/meUnsigned/pages/Submit.jsx 
    - Submit page component, form

---

- https://www.youtube.com/watch?v=sHnG8tIYMB4 : install new tailwindcss4 version as a plugin in my react-vite app
- https://www.youtube.com/watch?v=SbBSgy1HyBI : tailwindcss, add custom fonts with @theme
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox : tailwindcss flexbox research
- https://www.reddit.com/r/tailwindcss/comments/1jd4gxm/prevent_horizontal_scrolling/ : tailwindcss, trying to figure out how to hide scrolling and resizing of certain containers
- https://react.dev/reference/react-dom/components/textarea : React <textarea> research, allows for multiline input boxes
- https://www.w3schools.com/react/react_forms.asp : React input form research