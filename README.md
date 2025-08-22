# bolt teacher app executor 

This is how to run the applications which are made by the bolt.teacher application to test if it works in a proper LMS simulator (and hence if it could be deployed to blackboard and other popular educational platforms with LTI 1.0 compliance)

# Running bolt teacher apps
1. Download the code of the application that was made in bolt.teacher
2. <img width="2005" height="166" alt="image" src="https://github.com/user-attachments/assets/2bd7ed3e-9f6e-41a6-b496-613f8de43a12" />

3. cd into the directory and npm install ( DOUBLE CHECK )
4. git clone this repo.
5. navigate to the lti-bouncer directory and type
6. rename the .env.example to .env & input your OpenAI API here. Feel free to modify the code to use other models but that was what I used just for basic functionality.
7. in the lti-bouncer directory, type
```bash
pnpm start
```
5. go the lti 1.0 simulator file and open the launchurl.html in your browser of choice.
6. It should work :)
 
