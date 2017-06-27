/**
 * Set Collection for Manage Data
 * @param {array} data 
 */
const collection = (data) => ({
  /**
   * Set First Data & Primary Key 
   * @param {string} primaryKey
   */
  set: (primaryKey) => {
    this.primaryKey = primaryKey ? primaryKey : 'id'
    this.data = data ? data : []
    return collection(data)
  },
  /**
   * Get Data to Array
   * @return {array}
   */
  get: () => {
    this.log = data ? data : []
    return this.log
  },

  /**
   * Get Data to Object
   * @return {object} 
   */
  firstOrFail: () => {
    try {
      this.log = data
      return this.log[0]
    } catch (error) {
      return {}
    }
  },

  /**
   * Find Data in Array
   * @param {string} field
   * @param {string} condition
   * @param {string} key
   * @return {function} collection
   */
  where: (field, condition, key) => {
    switch(condition) {
      case '!=':
      case '!==':
        this.log = data.filter((item) => key !== item[field])
        break
      case '=':
      case '==':
      case '===':
      default:
        this.log = data.filter((item) => key === item[field])
        break
    }
    return collection(this.log)
  },

  /**
   * Find & Update Data in Array
   * @param {object} update
   * @return {array} newArray
   */
  update: (update) => {
    const newData = Object.assign({}, collection(data).firstOrFail(), update)
    let newArray = this.data
    newArray.forEach((item,i) => {
      if(newData[this.primaryKey] === item[this.primaryKey]){
        newArray[i] = newData
      }
    })
    return newArray
  },

  /**
   * Push Data in Array
   * @param {object} insert
   * @return {array} newArray
   */
  insert: (insert) => {
    return [
      ...this.data,
      insert
    ]
  },

  /**
   * Delete data by primaryKey
   * @param {string|number} key 
   * @return {[]} newArray
   */
  delete: (key) => {
    const Data = collection(this.data)
    return Data.where(this.primaryKey,'!=', key).get()
  },

  /**
   * Get Length of Array
   * @return {nuumber}
   */
  count: () => {
    return this.data.length
  },
})

module.exports = collection