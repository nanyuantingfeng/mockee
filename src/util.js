/**************************************************
 * Created by nanyuantingfeng on 08/07/2017 13:30.
 **************************************************/
const glob = require('glob')

function findMockFilesList (path) {
  return new Promise((resolve, reject) => {
    glob(path, (e, files) => {
      e ? reject(e) : resolve(files)
    })
  })
}

exports.findMockFilesList = findMockFilesList
