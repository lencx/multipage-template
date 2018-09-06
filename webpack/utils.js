import path from 'path'

const resolve = (...dir) => path.resolve(__dirname, '..', ...dir)

// env
const devMode = process.env.NODE_ENV === 'production'
    ? false : true

/**
 * object assign
 * @param object o - target object
 * @param string key - target object key
 * @param string i - sources object key 
 * @param string val - sources object value
 */
const objAssign = (o, key, i, val) => {
    if(o[key] === undefined) o[key] = {}
    Object.assign(o[key], {[i]: val})
}

/**
 * Object length
 * @param string key
 * @return number
 */
const objLen = obj => Object.keys(obj).length

export {
    resolve,
    devMode,
    objAssign,
    objLen,
}