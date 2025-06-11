 #!/bin/sh
 set -e  # Exit if any command fails

 echo "Setting up frontend..."
 cd client/meUnsigned
 npm install
 npm run build
 cd ..
 cd ..

 echo "Setting up backend..."
 cd server
 npm install
 cd ..

 echo "Starting server..."
 cd server
 npm run start