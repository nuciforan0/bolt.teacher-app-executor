# bolt teacher app executor 

This is how to run the applications which are made by the bolt.teacher application to test if it works in a proper LMS simulator (and hence if it could be deployed to blackboard and other popular educational platforms with LTI 1.0 compliance)

# Running bolt teacher apps
1. Download the code of the application that was made in bolt.teacher. Export -> Download code in the top right
<img width="263" height="156" alt="image" src="https://github.com/user-attachments/assets/65b7ef3f-acd8-4db2-a077-d836098bb79b" />


2. cd into the directory and pnpm install ( DOUBLE CHECK )
3. git clone this repo.
4. navigate to the lti-bouncer directory and type
5. rename the .env.example to .env & input your OpenAI API here. Feel free to modify the code to use other models but that was what I used just for basic functionality.
6. in the lti-bouncer directory, type
```bash
npm start
```
7. go to the code application you downloaded. Unzip it, go to the directory and run
```bash
pnpm install
```
and then
```bash
npm run dev
```

5. Go the lti 1.0 simulator file and open the launchurl.html in a **google chrome** browser
6. If it is compliant with the LMS, it should load. Hopefully, it should also not have an "LTI Simulator" entry page, or ways to log out in this deployed state. Any AI features should also work in this deployed state. However, AI isn't perfect and this functionality is not guaranteed.
 
