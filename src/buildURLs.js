/**************************************************
 * Created by nanyuantingfeng on 13/03/2018 20:07.
 **************************************************/
const helpers = require('./helpers')

const {
  globMock, isFunction, isJSONFile,
  isTextFile, readFileAsText, replacePath
} = helpers

module.exports = async function (mock) {
  const routeURLs = []
  const files = await globMock(mock)

  let i = -1
  while (++i < files.length) {
    const line = files[i]
    const rp = replacePath(mock, line)

    if (isJSONFile(line)) {
      routeURLs.push(`${rp}.json`)
      routeURLs.push(rp)

      continue
    }

    if (isTextFile(line)) {
      routeURLs.push(rp)

      continue
    }

    routeURLs.push(rp)
  }

  return routeURLs
}
