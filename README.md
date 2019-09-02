# Local Development API Server

## Authors

- [Djo Kenmeni Claude - mobile web specialist and computer science student](mailto:denverclaude99@gmail.com)

## Getting Started

Let's start with running commands in your terminal, known as command line interface (CLI)

## create a project directory for this api
```Create a project directory and clone the project on your local computer
# mkdir project_name
# cd project_name
# clone https://github.com/Denver995/yoscou-messenger-backend/
```

### Install project dependancies
```Install project dependancies
# npm i
```

```
###### Start the server
```Start server
# nodemon
```
### You should now have access to your API server environment
debug: Environment : development
debug: Port        : 3000


## Endpoints

### GET Endpoints

#### Get all blog
```
http://localhost:3000/api/blog/
```

#### Get a blog by id
```
http://localhost:3000/api/blog/<blog_id>
```


#### Get a blog by author
```
http://localhost:3000/api/blog/?author=<author_name>
```

#### Get all reviews for a blog
```
http://localhost:3000/reviews/?id=<blog_id>
```

### POST Endpoints

#### Create a new blog
```
http://localhost:3000/api/blog
```

###### Parameters
```
{
    "title": <reviewer_name>,
    "author": <rating>,
    "body": <body>,
    "type": <type>,
}
```
### DELETE Endpoints

#### Delete a blog
```
http://localhost:3000/blog/<blog_id>
```
