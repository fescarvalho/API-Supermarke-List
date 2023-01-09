## Supermarket List API

API in Node.js using express and mongoose to connect to a MongoDB Database.
The main goal is to make life easier for application users who go to the supermarket and forget the items they went to buy.
So this API aims to organize this shopping list.

### Technologies used

- Node.js
- Express
- MongoDB
- Mongoose
- Nodemon

### Requirements Ttchnologies

- Node.js installed (<https://nodejs.org>)
- MongoDB instance running:
  EX: Running with docker

```
docker run --name supermarket-list -p 27017:27017 -d mongo
```

### Steps to run the project

1. Clone the repo:

```
git clone https://github.com/fescarvalho/API-Supermarke-List
```

2. Navigate to the repo:

```
cd supermarke-list-api
```

3. Install the dependencies:

```
npm install
```

4. Run th API::

```
npm run dev
```

### Avilables endpoints

- [GET]/list-items
- [POST]/list-items
- [DELETE]/list-items/:id
- [PUT]/list-items:/id
