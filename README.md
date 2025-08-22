# bolt teacher app executor 

This is how to run the applications which are made by the bolt.teacher application to test if it works in a proper LMS simulator (and hence if it could be deployed to blackboard and other popular educational platforms with LTI 1.0 compliance)

# Running bolt teacher apps

  1. git clone this repo
  ``` bash
  git clone https://github.com/nuciforan0/bolt.teacher-app-executor.git
  ```
  2. Modify the .env.example in lti-bouncer to .env and add your OpenAI API here which will be used for AI features
  3. navigate to the lti-bouncer in a terminal and type
  ```bash
 npm start
 ```
  4. Download the code of the application that was made in bolt.teacher. Export -> Download code in the top right
  <img width="263" height="156" alt="image" src="https://github.com/user-attachments/assets/65b7ef3f-acd8-4db2-a077-d836098bb79b" />
  
  5. Go to the code application you have downloaded. Unzip it, go to the directory and run
  ```bash
  pnpm install
  ```
  and then
  ```bash
  npm run dev
  ```
  
  6. Open the LMS LTI 1.0 sim/launchurl.html and open that in a **google chrome** browser
  7. If it is compliant with the LMS, it should load.
 
 It should also act as it would in an LMS environment, so it should not show the "LTI Simulator" which was present in the preview page, have ways to log out either, and AI features should be compatible with this.
     However, AI isn't perfect and this functionality which wasn't present in the preview is not always guaranteed. As model capabilities increase and it better follows instructions it should get better at this. 
   
