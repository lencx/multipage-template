import os from 'os'
import fs from 'fs-extra'
import localIP from 'l3x-ip'
import { findKey, findIndex } from 'lodash'

import { resolve } from './utils'

const OSUser = os.userInfo().username,
    OSUserDomain = process.env.LOGNAME || process.env.USERDOMAIN,
    OSPlatform = os.platform(),
    platform = OSPlatform === 'darwin' ? 'macOS' : OSPlatform

const writeJson = (filename, data) => {
    fs.writeFile(filename, JSON.stringify(data, null, 2), () => console.log(`\x1b[33m\`${filename}\` \x1b[35mwritten successfully!\x1b[0m`))
}

export default () => {
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
                        findIndex(o['localIP'], i => {
                            if(i!==localIP) {
                                if(findIndex(o['localIP'], i => i === localIP) === -1) {
                                    o['currentIP'] = localIP
                                    o['localIP'].push(localIP)
                                    writeJson(filename, data)
                                }
                            }
                        })
                        if(o['currentIP'] !== localIP) {
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