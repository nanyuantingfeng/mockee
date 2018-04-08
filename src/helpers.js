/**************************************************
 * Created by nanyuantingfeng on 2018/4/8 18:59.
 **************************************************/
const fs = require('fs')
const glob = require('glob')

exports.globPath = function globPath(pathString) {
  return new Promise((resolve, reject) =>
    glob(pathString, (e, filePaths) => e ? reject(e) : resolve(filePaths)))
}

exports.replacePath = function replacePath(mock, line) {
  return line
    .replace(mock, '/')
    .replace('//', '/')
    .replace('.json', '')
    .replace('.js', '')
}

exports.isJSONFile = function isJSONFile(line) {
  return line.endsWith('.json')
}

exports.isTextFile = function isTextFile(line) {
  return !(line.endsWith('.json') || line.endsWith('.js'))
}

exports.isFunction = function isFunction(ff) {
  return typeof ff === 'function'
}

exports.readFileAsText = function readFileAsText(line) {
  return String(fs.readFileSync(line))
}

 
