import os from 'os'
import fs from 'fs-extra'
import { map, filter, flatten, findKey } from 'lodash'

import { resolve } from './utils'

const local = os.networkInterfaces(),
    OSUSER = os.userInfo().username,
    OSUSERDOMAIN = process.env.LOGNAME || process.env.USERDOMAIN,
    OSPlatform = os.platform(),
    platform = OSPlatform === 'darwin' ? 'macOS' : OSPlatform

let localIP = flatten(map(Object.keys(local), ifname => {
    // console.log(ifname)
    let ipv4 = filter(local[ifname], {
        family: 'IPv4',
        internal: false,
    })
    let v4 = map(ipv4, 'address')
    return v4
}))[0]

const writeJson = (filename, data) => {
    fs.writeFile(filename, JSON.stringify(data, null, 2), () => console.log(`\x1b[33m\`${filename}\` \x1b[35mwritten successfully!\x1b[0m`))
}

const userInfo = () => {
    const filename = `${resolve('config')}/userInfo.json`
    let info = {
        username: OSUSER,
        'Local IP': localIP,
        platform,
        'User Domain': OSUSERDOMAIN,
    }

    fs.exists(filename, exist => {
        if(!exist) {
            writeJson(filename, [info])
        } else {
            fs.readJSON(filename, (err, data) => {
                if(findKey(data, o => o.username === OSUSER) === undefined) {
                    data.push(info)
                    writeJson(filename, data)
                }
            })
        }
    })
}

export {
    OSUSER,
    localIP,
    userInfo,
}