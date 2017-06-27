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
