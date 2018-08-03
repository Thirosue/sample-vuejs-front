import Config from '@/conf/config'

const check = (targetPath, targetPathList) => {
  return targetPathList.find(path => targetPath.indexOf(path)!==-1)
}

const isUnAuthorizePath = (targetPath) => check(targetPath, Config.UNAUTHORITHED_PATH)
const isErrorPath = (targetPath) => check(targetPath, Config.ERROR_PATH)

export default {
  isUnAuthorizePath,
  isErrorPath,
}