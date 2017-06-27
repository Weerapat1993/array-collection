# Array Collection

## How to Install

1. Add Dependency in package.json
```json
  "dependencies": {
    "array-collection": "git+https://github.com/Weerapat1993/array-collection.git",
  }
```

2. install NPM
```linux
$ npm install
```

3. import file in Project
```javascript
import Collection from 'array-collection'
```

## Table of Contents

### SQL Query

|Functions|Parameters|Types
|---|---|---|
|[delete](#delete)|`primaryKey`|`any`|
|[insert](#insert)|`newData`|`object`|
|[orderBy](#orderBy)|`field` , `sort`|`asc desc`|
|[select](#select)|`field`|`string`|
|[update](#update)|`updateData`|`object`|
|[where](#where)|`field` , `condition` , `key`|`string` , `condition` , `string number`|
|[whereIn](#whereIn)|`field` , `keyArray`|`[string number]`|
|[whereNotIn](#whereNotIn)|`field` , `keyArray`|`[string number]`|

### Return Data 


|Functions|Parameters|Types|Return|
|---|---|---|---|
|[avg](#avg)                |`field`|`string number`|`number`|
|[count](#count)            |   ||`number`|
|[first](#first)            |   ||`{}`|
|[firstOrFail](#firstOrFail)|   ||`{}`|
|[get](#get)                |`field`|`string number`|`[]`|
|[max](#max)                |`field`|`string number`|`number`|
|[min](#min)                |`field`|`string number`|`number`|
|[toArray](#toArray)        |   ||`[]`|

## Data Example
```javascript
const fruits = [
  {
    id: 1,
    name: 'Mango',
    price: 20,
  },
  {
    id: 2,
    name: 'Banana',
    price: 100,
  },
  {
    id: 3,
    name: 'Apple',
    price: 50,
  },
  {
    id: 4,
    name: 'Orange',
    price: 40,
  },
]

// Create Array Collection
const Data = new Collection(fruits, 'id')
```


## avg
```javascript
Data.avg('price') // result = 52.5
```

## count
```javascript
Data.count() // result = 4
```

## delete
```javascript
Data.delete(2)

/*
fruits = [
  {
    id: 1,
    name: 'Mango',
    price: 20,
  },
  {
    id: 3,
    name: 'Apple',
    price: 50,
  },
  {
    id: 4,
    name: 'Orange',
    price: 40,
  }
]
*/
```

## find
```javascript
Data.find(2)

/*
fruits = [
  {
    id: 2,
    name: 'Banana',
    price: 100,
  }
]
*/
```


## Example
```javascript
const Data = new Collection([1,2,3,4], 'primaryKey')

// Select Data => Collection
Data.select(['id','name'])
Data.where('id', '=', 1).get() => [1]
Data.whereIn('id', [1,2]).get() => [1,2]
Data.whereNotIn('id', [1,2]).get() => [3,4]
Data.orderBy('name','asc').get() => [1,2,3,4] && [A - Z]
Data.orderBy('name','desc').get() => [4,3,2,1] && [Z - A]

// Insert Data => []
Data.insert({
  id: 1
  name: 'Update String'
})

// Update Data => []
Data.where('id', '=', 1).update({
  name: 'Update String'
})

// Delete Data => []
Data.delete(1)

// Compact Data
Data.get() => []
Data.firstOrFail() => {} || Array[0]
Data.count() => number
```
