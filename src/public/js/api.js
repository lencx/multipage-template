const PROJ_API = process.env.NODE_ENV === 'DEV'
    ? require('./api.dev')
    : require('./api.prod')