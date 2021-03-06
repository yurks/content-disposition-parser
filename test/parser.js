const test = require('ava')
const fs = require('fs')
const { resolve } = require('path')
const parser = require('../')

fs
  .readFileSync(resolve(__dirname, './headers.txt'), 'utf-8')
  .split(/[\r\n]+/)
  .filter(line => line.trim())
  .forEach((line, i) => {
    test((`1.${i + 1} Parse custom header`), t => {
      t.snapshot(parser(line), `\`parser(${JSON.stringify(line)})\``)
    })
  })

const someString1 = 'Any string will be parsed as Content-Disposition type'
test(('2.1 Parse any string'), t => {
  t.snapshot(parser(someString1), `\`parse(${JSON.stringify(someString1)})\``)
})

const someString2 = 'String will semicolons; will be parsed as properties; like; it=is a valid; content=disposition ; sic!;'
test(('2.2 Parse any string with semicolons'), t => {
  t.snapshot(parser(someString2), `\`parse(${JSON.stringify(someString2)})\``)
});

['', ';', '; string with leading semicolon', null, undefined, false, true, 0, 1, -1, NaN, Infinity, [], {}, function () {}, Date]
  .forEach((line, i) => {
    const reportValue = ((line && typeof line === 'object') || typeof line === 'string') ? JSON.stringify(line) : line
    test((`3.${i + 1} Handle \`${reportValue}\` as input`), t => {
      t.snapshot(parser(line), `\`parse(${reportValue})\``)
    })
  })
