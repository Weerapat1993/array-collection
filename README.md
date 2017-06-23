# Array Collection

`Build Collection`
```javascript
const Data = new Collection([], 'primaryKey')

// Select Data => Collection
Data.where('id', '=', 1)
Data.whereIn('id', [1,2])
Data.orderBy('name','asc') => [1,2,3] && [A - Z]
Data.orderBy('name','desc') => [3,2,1] && [Z - A]

// Insert Data => []
Data.insert({
  id: 1
  name: 'Update String'
})

// Update Data => []
Data.where('id', '=', 1).update({
  name: 'Update String'
})

// Compact Data
Data.get() => []
Data.firstOrFail() => {}
```
