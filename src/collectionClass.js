// Class Collection
class Collection {
  /**
   * Build Array Collection
   * ```javascript
   * const Collection = new Collection([], 'primaryKey')
   * ```
   * @param {[]} data
   * @param {'String'} primaryKey
   */
  constructor(data, primaryKey) {
    this.primaryKey = primaryKey ? primaryKey : 'id'
    this.firstData = data ? data : []
    this.data = data ? data : []
  }

  /**
   * Get Data to Array
   * @return {[]} data
   */
  toArray() {
    return this.data
  }

  /**
   * Get Field in Data Array
   * @param {string} field
   * @return {[]} data
   */
  get(field) {
    if(field) {
      let data = []
      this.data.forEach((item) => {
        data.push(item[field])
      })
      return data
    } 
    return this.toArray()
  }

  /**
   * Get Data to Object
   * @return {object} 
   */
  first() {
    return this.data[0]
  }

  /**
   * Get Data to Object
   * @return {object} 
   */
  firstOrFail() {
    return this.data[0]
  }

  /**
   * Select Field Data in Array
   * ```javascript
   * Collection.select(['id','name'])
   * ``` 
   * @param {[object]} fieldArray
   * @return {this} collection
   */
  select(fileldArray) {
    let oldArray = this.data
    let newArray = []
    let obj = {}
    oldArray.forEach((data) => {
      Object.keys(data).forEach((key) => {
        fileldArray.forEach((field) => {
          if (key === field) {
            obj = Object.assign({}, obj, { [field]: data[field] })
          }
        })
      })
      newArray.push(obj)
      obj = {}
    })

    this.data = newArray
    return this
  }

  /**
   * Find Data in Array
   * ```javascript
   * @condition [ === , !== , < , > , <= , >= ]
   * Collection.where('id','=','1')
   * ```
   * @param {'field'} field
   * @param {'condtion'} condition
   * @param {'key'} key
   * @return {this} collection
   */
  where(field, condition, key) {
    switch(condition) {
      case '!=':
      case '!==':
        this.data = this.data.filter((item) => item[field] !== key)
        break
      case '<':
        this.data = this.data.filter((item) => item[field] < key)
        break
      case '>':
        this.data = this.data.filter((item) => item[field] > key)
        break
      case '>=':
        this.data = this.data.filter((item) => item[field] >= key)
        break
      case '<=':
        this.data = this.data.filter((item) => item[field] <= key)
        break
      case '=':
      case '==':
      case '===':
      default:
        this.data = this.data.filter((item) => key === item[field])
        break
    }
    return this
  }

  /**
   * Find data by Primary Key
   * ```javascript
   * Collection.find(1)
   * ```
   * @param {stirng|number} key
   * @return {this} 
   */
  find(key) {
    this.data = this.where(this.primaryKey, '=', key).get()
    return this
  }

  /**
   * Find Data in Array by []
   * ```javascript
   * Collection.whereIn('id',[1,2])
   * ```
   * @param {'field'} field
   * @param {[*]} keyArray
   * @return {this} collection
   * 
   */
  whereIn(field, keyArray) {
    let collect = []
    let array
    keyArray.map((key) => {
      array = this.data.filter((item) => item[field] === key)
      array.map(obj => {
        collect.push(obj)
      })
    })
    this.data = collect
    return this
  }

  /**
   * Find Not Data in Array by []
   * ```javascript
   * Collection.whereNotIn('id',[1,2])
   * ```
   * @param {'field'} field
   * @param {[*]} keyArray
   * @return {this} collection
   * 
   */
  whereNotIn(field, keyArray) {
    let newArray = this.data
    const whereIn = this.whereIn(field, keyArray).toArray()
    whereIn.forEach((where) => {
      newArray =newArray.filter((item) => item[field] !== where[field])
    })
    this.data = newArray
    return this
  }

  /**
   * Find & Update Data in Array
   * ```javascript
   * Collection.update({
   *  id: 1,
   *  name: 'newString'
   * })
   * ```
   * @param {object} update
   * @return {[]} newArray
   */
  update(update) {
    const data = this.data
    const PK = this.primaryKey
    if(this.firstOrFail() === {}) return data
    const newData = Object.assign({}, this.first(), update)
    let newArray = data
    newArray.forEach((item,i) => {
      if(newData[PK] === item[PK]){
        newArray[i] = newData
      }
    })
    return newArray
  }

  /**
   * Push Data in Array
   * ```javascript
   * Collection.insert({
   *  id: 1,
   *  name: 'String'
   * })
   * ```
   * @param {object} insert
   * @return {[]} newArray
   */
  insert(insert) {
    return [
      ...this.data,
      insert
    ]
  }

  /**
   * Delete data by primaryKey
   * @param {string|number} key 
   * @return {[]} newArray
   */
  delete(key) {
    return this.where(this.primaryKey,'!=', key).toArray()
  }

  /**
   * Get Length of Array
   * @return {nuumber}
   */
  count() {
    return this.toArray().length
  }

  /**
   * Order By field in Array
   * @property orderBy - ['asc', 'desc']
   * @param {string} field
   * @param {string} orderBy
   * @return {[]} newArray
   */
  orderBy(field, orderBy) {
    const data = this.data[0]
    if(data) {
      const type = data[field] && typeof data[field]
      if(type === 'number') {
        // sort by value
        switch(orderBy) {
          case 'desc':
            this.data = this.data.sort((a, b) => b[field] - a[field])
            break
          case 'asc': 
          default:
            this.data = this.data.sort((a, b) => a[field] - b[field])
            break
        }
      } else if(type === 'string') {
        // sort by name
        switch(orderBy) {
          case 'desc':
            this.data.sort((a, b) => {
              const nameA = a[field].toUpperCase(); // ignore upper and lowercase
              const nameB = b[field].toUpperCase(); // ignore upper and lowercase
              if(nameB < nameA) return -1;
              if(nameB > nameA) return 1;
              return 0;
            })
            break
          case 'asc': 
          default:
            this.data.sort((a, b) => {
              const nameA = a[field].toUpperCase(); // ignore upper and lowercase
              const nameB = b[field].toUpperCase(); // ignore upper and lowercase
              if(nameA < nameB) return -1;
              if(nameA > nameB) return 1;
              return 0;
            })
            break
        }
      }
    }
    return this
  }

  /**
   * Sum Data in Array
   * @param {string} field 
   * @return {number}
   */
  sum(field) {
    return this.get(field).reduce((a, b) => a + b , 0)
  }

  /**
   * Max Data in Array
   * @param {string} field 
   * @return {number}
   */
  min(field) {
    return this.orderBy(field,'asc').get(field)[0]
  }

  /**
   * Max Data in Array
   * @param {string} field 
   * @return {number}
   */
  max(field) {
    return this.orderBy(field,'desc').get(field)[0]
  }

  /**
   * Max Data in Array
   * @param {string} field 
   * @return {number}
   */
  avg(field) {
    const count = this.count()
    return this.get(field).reduce((a, b) => a + b , 0) / count
  }

  /**
   * Merge Array as Array
   * ```javascript
   * Collection.merge([{ id: 1 name: 'String' }])
   * ```
   * @param {[]} array 
   * @return this
   */
  merge(array) {
    const dataPrimaryKey = new Collection(array, this.primaryKey).get(this.primaryKey)
    const oldData = this.whereNotIn(this.primaryKey,dataPrimaryKey).get()
    this.data = oldData.concat(array)
    return this    
  }
}

module.exports = Collection


