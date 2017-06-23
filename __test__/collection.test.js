import Collection from '../index'

const chatID = 1
const data = [
  {
    chat_id: chatID,
    message: 'Hello Chat',
    timestamp: new Date().getTime()
  }
]

const newData = {
  chat_id: 2,
  message: 'Hello Chat',
  timestamp: new Date().getTime()
}

const updateDataField = {
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
  it(`should be Array Collection Function : update : find data`, () => {
    const collects = new Collection(data, primaryKey)
    const recieved = collects.where(field, '=', chatID).update(updateDataField)
    const findData = collects.where(field, '=', chatID).firstOrFail()
    const expected = [
      {
        ...findData,
        ...updateDataField,
      }
    ]
    expect(recieved).toEqual(expected)
  });
  it(`should be Array Collection Function : update : not find data`, () => {
    const collects = new Collection([], primaryKey)
    const recieved = collects.where(field, '=', chatID).update(updateDataField)
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
});