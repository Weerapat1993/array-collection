const Collection = require('../index')

const chatID = 1
const data = [
  {
    chat_id: chatID,
    message: 'Hello Chat',
    timestamp: new Date().getTime()
  }
]

const data2 = [
  {
    chat_id: 1,
    message: 'Hello Chat',
    timestamp: new Date().getTime()
  },
  {
    chat_id: 2,
    message: 'Hello',
    timestamp: new Date().getTime()
  }
]

const newData = {
  chat_id: 2,
  message: 'Hello Chat',
  timestamp: new Date().getTime()
}

const updateDataField = {
  chat_id: 2,
  message: 'Hello Chat2'
}

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

describe ('Array Collection Utility', () => {
  const primaryKey = 'chat_id'
  const field = primaryKey
  it(`should be Array Collection Function : select`, () => {
    const collectsSelect = new Collection(fruits, primaryKey)
    const recieved = collectsSelect.select(['id','name']).get()
    const expected = [
      {
        id: 1,
        name: 'Mango',
      },
      {
        id: 2,
        name: 'Banana',
      },
      {
        id: 3,
        name: 'Apple',
      },
      {
        id: 4,
        name: 'Orange',
      },
    ]
    expect(recieved).toEqual(expected)
  });
  it(`should be Array Collection Function : update : find data`, () => {
    const collects = new Collection(data2, primaryKey)
    const recieved = collects.where(field, '=', 2).update(updateDataField)
    const findData = collects.where(field, '=', 2).firstOrFail()
    const expected = [
      ...data,
      Object.assign({}, findData, updateDataField)
    ]
    expect(recieved).toEqual(expected)
  });
  it(`should be Array Collection Function : update : not find data`, () => {
    const collects = new Collection([], primaryKey)
    const recieved = collects.where(field, '=', 2).update(updateDataField)
    const expected = []
    expect(recieved).toEqual(expected)
  });
  it(`should be Array Collection Function : where : condition ===`, () => {
    const collects = new Collection(data, primaryKey)
    const recieved = collects.where(field, '=', chatID).get()
    const expected = data
    expect(recieved).toEqual(expected)
  });
  it(`should be Array Collection Function : where : condition !==`, () => {
    const collects = new Collection(data, primaryKey)
    const recieved = collects.where(field, '!=', chatID).get()
    const expected = []
    expect(recieved).toEqual(expected)
  });

  it(`should be Array Collection Function : where : condition <`, () => {
    const collects = new Collection(fruits, primaryKey)
    const recieved = collects.where('id', '<', 4).get()
    const expected = [
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
    ]
    expect(recieved).toEqual(expected)
  });
  it(`should be Array Collection Function : where : condition >`, () => {
    const collects = new Collection(fruits, primaryKey)
    const recieved = collects.where('id', '>', 1).get()
    const expected = [
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
    expect(recieved).toEqual(expected)
  });

  it(`should be Array Collection Function : where : condition >=`, () => {
    const collects = new Collection(fruits, primaryKey)
    const recieved = collects.where('id', '>=', 1).get()
    const expected = fruits
    expect(recieved).toEqual(expected)
  });
  it(`should be Array Collection Function : where : condition <=`, () => {
    const collects = new Collection(fruits, primaryKey)
    const recieved = collects.where('id', '<=', 0).get()
    const expected = []
    expect(recieved).toEqual(expected)
  });

  it(`should be Array Collection Function : whereIn`, () => {
    const collects = new Collection(fruits, 'id')
    const recieved = collects.whereIn('id', [1, 2]).get()
    const expected = [
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
    ]
    expect(recieved).toEqual(expected)
  });

  it(`should be Array Collection Function : whereNotIn`, () => {
    const collects = new Collection(fruits, 'id')
    const recieved = collects.whereNotIn('id', [1, 2]).get()
    const expected = [
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
    expect(recieved).toEqual(expected)
  });

  it(`should be Array Collection Function : where : catch Error!`, () => {
    const collects = new Collection(undefined, 'id')
    const recieved = collects.get()
    const expected = []
    expect(recieved).toEqual(expected)
  });
  it(`should be Array Collection Function : firstOrFail`, () => {
    const collects = new Collection(data, primaryKey)
    const recieved = collects.where(field, '=', chatID).firstOrFail()
    const expected = data[0]
    expect(recieved).toEqual(expected)
  });
  it(`should be Array Collection Function : firstOrFail is catch Error!`, () => {
    const collects = new Collection(undefined, primaryKey)
    const recieved = collects.firstOrFail()
    const expected = undefined
    expect(recieved).toEqual(expected)
  });

  it(`should be Array Collection Function : insert`, () => {
    const collects = new Collection([], primaryKey)
    const recieved = collects.insert(newData)
    const expected = [
      newData
    ]
    expect(recieved).toEqual(expected)
  });

  it(`should be Array Collection Function : delete data has been taken`, () => {
    const collects = new Collection(fruits, 'id')
    const recieved = collects.delete(4)
    const expected = [
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
    ]
    expect(recieved).toEqual(expected)
  });

  it(`should be Array Collection Function : orderBy('name','desc') data is null`, () => {
    const collects = new Collection([])
    const recieved = collects.orderBy('name','desc').get()
    const expected = []
    expect(recieved).toEqual(expected)
  });

  it(`should be Array Collection Function : orderBy('name','desc') `, () => {
    const collects = new Collection(fruits)
    const recieved = collects.orderBy('name','desc').get()
    const expected = [
      {
        id: 4,
        name: 'Orange',
        price: 40,
      },
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
    ]
    expect(recieved).toEqual(expected)
  });

  it(`should be Array Collection Function : orderBy('name','asc') `, () => {
    const collects = new Collection(fruits)
    const recieved = collects.orderBy('name','asc').get()
    const expected = [
      {
        id: 3,
        name: 'Apple',
        price: 50,
      },
      {
        id: 2,
        name: 'Banana',
        price: 100,
      },
      {
        id: 1,
        name: 'Mango',
        price: 20,
      },
      {
        id: 4,
        name: 'Orange',
        price: 40,
      },
    ]
    expect(recieved).toEqual(expected)
  });
  it(`should be Array Collection Function : orderBy('price','asc') `, () => {
    const collects = new Collection(fruits)
    const recieved = collects.orderBy('price','asc').get()
    const expected = [
      {
        id: 1,
        name: 'Mango',
        price: 20,
      },
      {
        id: 4,
        name: 'Orange',
        price: 40,
      },
      {
        id: 3,
        name: 'Apple',
        price: 50,
      },
      {
        id: 2,
        name: 'Banana',
        price: 100,
      },
    ]
    expect(recieved).toEqual(expected)
  });
  it(`should be Array Collection Function : orderBy('price','desc') `, () => {
    const collects = new Collection(fruits, primaryKey)
    const recieved = collects.orderBy('price','desc').get()
    const expected = [
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
      {
        id: 1,
        name: 'Mango',
        price: 20,
      },
    ]
    expect(recieved).toEqual(expected)
  });

  it(`should be Array Collection Function : find`, () => {
    const collects = new Collection(fruits, 'id')
    const recieved = collects.find(2).get()
    const expected = [
      {
        id: 2,
        name: 'Banana',
        price: 100,
      },
    ]
    expect(recieved).toEqual(expected)
  });

  it(`should be Array Collection Function : get (no field)`, () => {
    const collects = new Collection(fruits, 'id')
    const recieved = collects.find(2).get()
    const expected = [
      {
        id: 2,
        name: 'Banana',
        price: 100,
      },
    ]
    expect(recieved).toEqual(expected)
  });

  it(`should be Array Collection Function : get`, () => {
    const collects = new Collection(fruits, 'id')
    const recieved = collects.orderBy('id','asc').get('id')
    const expected = [1,2,3,4]
    expect(recieved).toEqual(expected)
  });

  it(`should be Array Collection Function : sum`, () => {
    const collects = new Collection(fruits, 'id')
    const recieved = collects.sum('price')
    const expected = 210
    expect(recieved).toEqual(expected)
  });

  it(`should be Array Collection Function : min`, () => {
    const collects = new Collection(fruits, 'id')
    const recieved = collects.min('price')
    const expected = 20
    expect(recieved).toEqual(expected)
  });

  it(`should be Array Collection Function : max`, () => {
    const collects = new Collection(fruits, 'id')
    const recieved = collects.max('price')
    const expected = 100
    expect(recieved).toEqual(expected)
  });

  it(`should be Array Collection Function : avg`, () => {
    const collects = new Collection(fruits, 'id')
    const recieved = collects.avg('price')
    const expected = 52.5
    expect(recieved).toEqual(expected)
  });

   it(`should be Array Collection Function : merge`, () => {
    const fruits2 = [
      {
        id: 4,
        name: 'Orange2',
        price: 70,
      },
      {
        id: 5,
        name: 'Pine Apple',
        price: 120,
      },
    ]
    
    const collects = new Collection(fruits, 'id')
    const recieved = collects.merge(fruits2).orderBy('id','asc').toArray()
    const expected = [
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
        name: 'Orange2',
        price: 70,
      },
      {
        id: 5,
        name: 'Pine Apple',
        price: 120,
      },
    ]
    expect(recieved).toEqual(expected)
  });
});