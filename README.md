# Health Declaration Form

### Deployed website (takes a while to wakeup!) : 
https://health-assessment-form.onrender.com/

### Instructions on how to run local instance: 

backend/.env file: 

DATABASE_URL='mysql://v6gkp6m3qkqxfuvuh3pk:pscale_pw_x7JLzwBc9CnLppwJqf4WF0SOMgn4CUNWnt4Q8eXANda@aws.connect.psdb.cloud/healthassessmentform?ssl={"rejectUnauthorized":true}'  
PORT = 3000  
DB_CONNECTION_LIMIT = 10  
SALT_ROUNDS = 10  
JWT_PRIVATE_KEY = 'dyseobk2870452683216jcxzm87653482@!%*#@$dsfbsdk'  


Step 1: 

Create a .env file in backend folder and insert above information into the .env file.

Step 2:

At the root directory, run **npm run postInstall**

Step 3:

To start the program, run **npm start** at the root directory.


### Unit Testing

1. Enter valid form information
2. Enter empty form information
3. Enter form information that is half-valid and half-empty.



