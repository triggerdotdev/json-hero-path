# JSON Hero Path
A TypeScript/JavaScript library that provides a simple way of accessing objects inside JSON using paths

## How to install
`npm install @jsonhero/path`

## Getting started
### Importing
You can require
```js
const { JSONHeroPath } = require('@jsonhero/path');
```

Or if you're using TypeScript:
```js
import { JSONHeroPath } from '@jsonhero/path';
```

### Sample object
Given the following JSON variable called `employees`
```js
let employees = {
    people: [
        {
            name: 'Matt',
            age: 36,
            favouriteThings: ['Monzo', 'The Wirecutter', 'Jurassic Park'],
        },
        {
          name: 'James',
          age: 39,
          favouriteThings: ['Far Cry 1', 'Far Cry 2', 'Far Cry 3'],
        },
        {
          name: 'Eric',
          age: 38,
          favouriteThings: ['Bitcoin'],
        },
        {
          name: 'Dan',
          age: 34,
          favouriteThings: ['Frasier'],
        },
    ],
    count: 4
}
```

### Simple queries
A simple query to get the 2nd person's name. Note that you can just include index numbers to access array items (0 = first item)
```js
let path = new JSONHeroPath('$.people.1.name');
let name = path.first(employees)
//name = 'James'

let names = path.all(employees)
//names = ['James']
```

Let's get all the people
```js
let path = new JSONHeroPath('$.people');
let allPeople = path.all(employees)
//allPeople is set to the array of people
```

There are only two methods you can perform with a path:
- `first()` returns the first matching result
- `all()` returns all the matching results in an array

A `$` is placed at the start of a path. If you don't add this, it will just do it automatically for you.

### Wildcard queries
Let's get all the names
```js
let path = new JSONHeroPath('$.people.*.name');
let allNames = path.all(employees)
//allNames = ['Matt', 'James', 'Eric', 'Dan']
```
Now everyone's favourite things 
```js
let path = new JSONHeroPath('$.people.*.favouriteThings.*');
let allFavouriteThings = path.all(employees)
//allFavouriteThings = ['Monzo', 'The Wirecutter', 'Jurassic Park', 'Far Cry 1', 'Far Cry 2', 'Far Cry 3', 'Bitcoin', 'Frasier']
```

### Getting the result value as well as the paths
```js
let path = new JSONHeroPath('$.people.*.favouriteThings.*');

// pass this optional object with `includePath` set to true
let results = path.all(testObject1, { includePath: true });

let firstResult = results[0]
//this variable will be an object like this
//{
//  value: 'Monzo',
//   path: a JSONHeroPath for this element 
//}
```

### Getting parent, root and children paths from a path
```js
let path = new JSONHeroPath('$.people.*.favouriteThings');

let parent = path.parent
// will be a new path: '$.people.*'

let root = path.root
// will be a new path: '$'

let child = path.child('2')
//will be a new path: '$.people.*.favouriteThings.2'
```

### Accessing components from a path
A path is an array of path components. You can access them directly if you'd like.

You can check if a component is an array type, which is true for wildcards and indexes (e.g. 0)

```js
let path = new JSONHeroPath('$.people.2.favouriteThings.*');

let rootComponent = path.components[0]
let rootComponentIsArray = rootComponent.isArray
//is false

let personIndexComponent = path.components[2]
let personIndexComponentIsArray = personIndexComponent.isArray
//is true

let wildcardComponent = path.components[4]
let wildcardComponentIsArray = wildcardComponent.isArray
//is true
```