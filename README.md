# whomes-realty
MERN real-estate site. Allows creation/editing/deletion of listings.

# Project Description:
Application consists of a simple two page front end application that will allow a user to view Listings of homes and query for different listings based on 
price/rooms etc. An Admin Panel with login and user verificaiton using jswebtoken that allows an admin to create/edit/delete listings and attach photos hosted by Firebase.
Each listing has an indivual firebase folder created to hold all photos associated with the listing. Deletion of the listing will delete the folder from firebase
as to prevent cluttering of the free Firebase host. State is managed by Context API.

# Built With:
-Typescript
-Node/Express
-Mongoose
-Firebase
-Mantine
-Context API

# Why was application created?
The application was built purely for learning purposes. The application was the first I've written using Typescript and was used as a learning playground.
I also wanted to learn simple quering of my mongoose database per a users interactions on the front end, then presenting the retrieved data with pagination.
Futher learning of firebase image storage, Mantine and Context API for state management. 

# Links:
Site is hosted freely on Render and intial startup can take a few seconds due to the free host. Images are all hosted on firebase and can quickly hit
its daily data transfer limit:
(many of the images/descriptions used for listings are for mock purposes and not true to the sites original intentions) 
https://whomes-realty.onrender.com
