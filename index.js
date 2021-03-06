const reParamSplit = /\s*;\s*/
const reHeaderSplit = /\s*:\s*/
const rePropertySplit = /\s*=\s*(.+)/
const reEncodingSplit = /\s*'[^']*'\s*(.*)/
const reQuotesTrim = /(?:^["'\s]*)|(?:["'\s]*$)/g

const parser = (data) => {
  if (!(data && typeof data === 'string')) {
    return
  }
  const headerSplit = data.split(reParamSplit)
    .map(item => item.trim())
    .filter(item => !!item)

  let type = headerSplit.shift()
  if (!type) {
    return
  }
  type = type.toLowerCase().split(reHeaderSplit)
  type = type[1] || type[0]

  return headerSplit
    .map(prop => prop.split(rePropertySplit))
    .reduce((o, [key, value]) => {
      if (!value) {
        o[key] = true
      } else if (key.slice(-1) === '*') {
        let encoding
        [encoding, value] = value.split(reEncodingSplit)
        if (value) {
          try {
            value = decodeURIComponent(value)
          } catch (e) { }
          o[key.slice(0, -1).toLowerCase()] = value
        }
        o.encoding = encoding.toLowerCase()
      } else if (!(key in o)) {
        o[key.toLowerCase()] = value.replace(reQuotesTrim, '')
      }
      return o
    }, { type })
}

module.exports = parser
