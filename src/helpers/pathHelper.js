import { Config } from '@/conf/config';

const _check = (targetPath, targetPathList) => targetPathList.find(path => targetPath.indexOf(path)!==-1);

export const isUnAuthorizePath = targetPath => _check(targetPath, Config.UNAUTHORITHED_PATH);
export const isErrorPath = targetPath => _check(targetPath, Config.ERROR_PATH);