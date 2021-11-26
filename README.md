# JSON Hero Path
A TypeScript/JavaScript library that provides a simple way of accessing objects inside JSON using paths

## How to install
`npm install @jsonhero/path`

## Getting started
Given the following JSON variable called `employees`
```
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
```
let path = JSONHeroPath.fromString('$.people.1.name');
let name = path.first(employees)
//name = 'James'

let names = path.all(employees)
//names = ['James']
```

Let's get all the people
```
let path = JSONHeroPath.fromString('$.people');
let allPeople = path.all(employees)
//allPeople is set to the array of people
```

There are only two methods you can perform with a path:
- `first()` returns the first matching result
- `all()` returns all the matching results in an array

A `$` is placed at the start of a path. If you don't add this, it will just do it automatically for you.

### Wildcard queries
Let's get all the names
```
let path = JSONHeroPath.fromString('$.people.*.name');
let allNames = path.all(employees)
//allNames = ['Matt', 'James', 'Eric', 'Dan']
```
Now everyone's favourite things 
```
let path = JSONHeroPath.fromString('$.people.*.favouriteThings.*');
let allFavouriteThings = path.all(employees)
//allFavouriteThings = ['Monzo', 'The Wirecutter', 'Jurassic Park', 'Far Cry 1', 'Far Cry 2', 'Far Cry 3', 'Bitcoin', 'Frasier']
```