/**************************************************
 * Created by nanyuantingfeng on 2018/4/8 18:59.
 **************************************************/
const fs = require('fs')
const glob = require('glob')
const path = require('path')

function globPath(pathString) {
  return new Promise((resolve, reject) =>
    glob(pathString, (e, filePaths) =>
      e ? reject(e) : resolve(filePaths)))
}

function replacePath(mock, line) {
  return line
    .replace(mock, '/')
    .replace('//', '/')
    .replace('.json', '')
    .replace('.js', '')
}

function readFileAsText(line) {
  return String(fs.readFileSync(line))
}

function isJSONFile(line) {
  const exn = path.extname(line)
  return exn === '.json'
}

function isTextFile(line) {
  const exn = path.extname(line)
  return !(exn === '.json' || exn === '.js')
}

function isFunction(ff) {
  return typeof ff === 'function'
}

function globMock(mock) {
  return globPath(path.join(mock, '**/*.*'))
}

exports.replacePath = replacePath
exports.isJSONFile = isJSONFile
exports.isTextFile = isTextFile
exports.isFunction = isFunction
exports.readFileAsText = readFileAsText
exports.globMock = globMock

exports.asJSON = (line) => async (ctx) => {
  ctx.body = require(line)
}
exports.asText = (line) => async (ctx) => {
  ctx.body = readFileAsText(line)
}
exports.asFunc = (line) => async (ctx, ...args) => {
  const oo = require(line)
  ctx.body = isFunction(oo) ? await oo(ctx, ...args) : oo
}
