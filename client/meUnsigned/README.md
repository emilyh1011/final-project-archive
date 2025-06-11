# IMPORTANT NOTE ON THE FRONTEND PROJECT STRUCTURE
- I accidentally made a previous client directory. 
- Then, to create my React-Vite app, I cd into client, before 
    npm create vite@latest meUnsigned -- --template react
- Then, when it asked me for a "Package Name," I chose meunsigned to match my project name
- This, created a new level of unecessary depth into my project structure, so now my client(aka frontend) folder is client/meUnsigned
- So, when I finished setting up my project, I had to
    cd meUnsigned
    npm install
    npm run dev
- Now, anytime you want to start frontend, must cd into client and then cd into meUnsigned before running "npm run dev" in command line
