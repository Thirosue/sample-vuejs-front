import _ from 'lodash'
import moment from 'moment'
import { logApi } from '@/module/api'
import { Config } from '@/conf/config'

const _getAccessLog = () => JSON.parse(sessionStorage.getItem('accesslog')) || [];
const _setAccessLog = accesslog => sessionStorage.setItem('accesslog', JSON.stringify(accesslog));

const _sendServer = async () => {
  let accesslog = _getAccessLog();
  for(let i=0; i<accesslog.length; i++) {
    await logApi.access({path: accesslog[i].path})
                    .then(()=> { 
                      accesslog[i].pushed = true;
                      console.log('push success! path=(' + accesslog[i].path + ')');
                    })
                    .catch(err => {
                      accesslog[i].retry++;
                    });
  }
  accesslog = accesslog.filter(log=>!log.pushed && log.retry < Config.LOG_RETRY_MAX);
  _setAccessLog(accesslog);
}

window.setInterval(_sendServer, 5000);

export const setAccessLog = path => {
  const accesslog = _getAccessLog();
  accesslog.push(({timestamp: moment().format(), path: path, retry: 0}));
  _setAccessLog(accesslog);
}