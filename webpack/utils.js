import path from 'path'

const resolve = (...dir) => path.resolve(__dirname, '..', ...dir)

// env
const isDEV = process.env.NODE_ENV === 'production'
    ? false : true

// username
const OSUSER = process.env.USER || process.env.USERDOMAIN

export {
    resolve,
    isDEV,
    OSUSER,
}