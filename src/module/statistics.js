import _ from 'lodash'
import moment from 'moment'
import api from '@/module/api'

const getAccessLog = () => JSON.parse(sessionStorage.getItem('accesslog')) || []
const setAccessLog = accesslog => sessionStorage.setItem('accesslog', JSON.stringify(accesslog))

const store = (path) => {
  const accesslog = getAccessLog()
  accesslog.push(({timestamp: moment().format(), path: path}))
  setAccessLog(accesslog)
}

const push = async () => {
  let accesslog = getAccessLog()
  for(let i=0; i<accesslog.length; i++) {
    await api.log.access({path: accesslog[i].path})
                    .then(()=> accesslog[i].pushed = true, console.log('push success! path=(' + accesslog[i].path + ')'))
                    .catch(err => console.error(err))
  }
  accesslog = accesslog.filter(log=>!log.pushed)
  setAccessLog(accesslog)
}

window.setInterval(push, 5000)

export default {
  store
}