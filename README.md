**Installation and Running the Client**
To install dependencies and run the client, follow these steps:

1.**Navigate to the client directory**:

cd client

2.**Install dependencies**:

npm install

3.**Install webpack-cli as a dev dependency**:

npm install -D webpack-cli

4.**Run the client**:

npm run start

Installation and Running the Server
To install dependencies, run database migrations, and start the server, follow these steps:

1.**Navigate to the server directory**:
cd server

2.**Install dependencies**:

npm install

3.**Run database migrations**:

npx sequelize-cli db:migrate

4.**Run seeds**:

npx sequelize-cli db:seed:all

5.**Start the server**:

npm run start
