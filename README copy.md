## Running the project
Strapi backend:
-cd server
-npm install
-npm run develop

After the first run, permissions needs to be configured once for you local DB (sqlite by default - no need to provision it):
open the admin panel from the console link, register an admin account, open Settings - Roles (UNDER USERS & PERMISSIONS PLUGIN ) - Authencicated, click "select all" under Author and Book sections, click "save"

React frontend:
-cd client
-npm install
-nmp start