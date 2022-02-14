This readMe file has Two parts.
- [About](#about) - A little about the project
- [Running the projects](#running-the-project) - Instructions of how to run the project
# About

**I am the sole Contributor of all the code written in this repo**

I worked with Sarvh for a duration of 6 months. I implemented and reviewed a lot of features essential for an ecommerce website that gives a social media platform experience to the user. All the code I wrote for sarvh is private and I signed an NDA specifying I can mention my work as a theory but cannot share any part of code without proper permission. I could have shown any of my personal projects but I feel that the work I did for Sarvh can truely illustrate the kind of coder I am. I cannot share all the features I implemented but I took permission for showing you two features that I Implemented which potentally saved money for that start up.

Sarvh had an initial plan of using elasticsearch for searchig products with full text search on Product Names. It does sound reasonable to use elasticsearch but Sarvh being a startup running on personal funds does need ways of reducing the costs. After Finishing my internship and joining as a web lead I proposed not to use ElasticSearch rather improve on the composite key and the concept complex string in DynamoDB along with string search on server which reduces the costs on AWS drastically.

Elastic search is a much better solution than a string search algorithm on server and DynamoDB composite key search. But when it comes to an ecommerce website that sells only clothes and accessories. The words that a user can search for becomes very guessable. and also when a seller uploads a product they mention category,subcategory, colors,sizes of that product which when combined as keywords consists of pretty much every keyword that a user can search for. Other than reducing costs, Sarvh being a startup it won't have a lot of proper data on products for a long time that coud help them sort the results, this way a user can scam a full text search algorithm to make there product list on top. Presently For sorting I implemted another way whose code I can't share.

This repo contains code for Client and server Side- 
Client Side - '/' page has an upload product page to upload products.
              '/search' has code for searching products
Server Side - Using express and nodejs implemented a server that upload a product and a search route that searches products and returns results.

For the sake of Running a Demo of this Project i'll be making few edits in the code for storing the product data in a json file and will be implemeting a basic scan for that json data like DynamoDB would do. You'll have to run this server on different port to mimic DynamoDB.

# Running the Project

There are three parts of this project-
- FrontEnd React Server 
  - navigate to `/Client` in a terminal ad run `npm run start`
  - This will run a React server on port `3000`
- BackEnd Nodejs Server 
  - navigate to `/server` in a terminal ad run `npm run start`
  - This will run a Backend Server on port `8000`
- BackEnd Nodejs Server for DataBase 
  - navigate to `/dynamoDB` in a terminal ad run `npm run start`
  - This will run a Backend DataBase Server on port `9200`