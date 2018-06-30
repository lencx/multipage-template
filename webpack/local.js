import os from 'os'
import fs from 'fs-extra'
import { map, filter, flatten, findKey, findIndex } from 'lodash'

import { resolve } from './utils'

const OSInterfaces = os.networkInterfaces(),
    OSUser = os.userInfo().username,
    OSUserDomain = process.env.LOGNAME || process.env.USERDOMAIN,
    OSPlatform = os.platform(),
    platform = OSPlatform === 'darwin' ? 'macOS' : OSPlatform

const localIP = flatten(map(Object.keys(OSInterfaces), ifname => {
    let ipv4 = filter(OSInterfaces[ifname], {
        family: 'IPv4',
        internal: false,
    })
    return map(ipv4, 'address')
}))[0]

const writeJson = (filename, data) => {
    fs.writeFile(filename, JSON.stringify(data, null, 2), () => console.log(`\x1b[33m\`${filename}\` \x1b[35mwritten successfully!\x1b[0m`))
}

const userInfo = () => {
    const filename = `${resolve('config')}/userInfo.json`
    let info = {
        username: OSUser,
        localIP: [localIP],
        platform,
        userDomain: OSUserDomain,
    }

    fs.exists(filename, exist => {
        if(!exist) {
            writeJson(filename, [info])
        } else {
            fs.readJSON(filename, (err, data) => {
                let userExist = findKey(data, o => {
                    if(o['userDomain'] === OSUserDomain) {
                        if(findIndex(o['localIP'], i => i === localIP) === -1) {
                            o['currentIP'] = localIP
                            o['localIP'].push(localIP)
                            writeJson(filename, data)
                        } else if(o['currentIP'] !== localIP && o['localIP'][0] !== localIP) {
                            o['currentIP'] = localIP
                            writeJson(filename, data)
                        }
                    }
                    return o['userDomain'] === OSUserDomain
                })
                if( userExist === undefined) {
                    data.push(info)
                    writeJson(filename, data)
                }
            })
        }
    })
}

export {
    localIP,
    userInfo,
}