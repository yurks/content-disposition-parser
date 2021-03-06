# content-disposition-parser

[![GitHub release](https://img.shields.io/github/release/yurks/content-disposition-parser.svg)](https://github.com/yurks/content-disposition-parser/releases/)
[![Build Status](https://travis-ci.org/yurks/content-disposition-parser.svg?branch=main)](https://travis-ci.org/yurks/content-disposition-parser)
[![Coverage Status](https://coveralls.io/repos/github/yurks/content-disposition-parser/badge.svg)](https://coveralls.io/github/yurks/content-disposition-parser)
[![GitHub license](https://img.shields.io/github/license/yurks/content-disposition-parser.svg)](https://github.com/yurks/content-disposition-parser/blob/master/LICENSE)

Tiny and fully-tested JS parser for Content-Disposition HTTP header with zero dependencies for nodejs and browser environments.

This library parses a header string, constructing the object with properties it could extract.
No validations, no conversions (except decodeURIComponent()) just an attempt to extract data as it is and as lot as possible.

## Installation

```sh
$ npm install content-disposition-parser
```

## Usage

```js
const parser = require('content-disposition-parser')

parser('content-disposition: inline; filename=example.pdf')
//-> { filename: 'example.pdf', type: 'inline' }

parser('content-disposition: form-data; name="field2"; filename="example.txt"')
//-> { filename: 'example.txt', name: 'field2', type: 'form-data' }

parser("Inline; filename=example.txt; FileName*=ISO-8859-1'en'%C3%A9xampl%C3%A9.txt")
//-> { encoding: 'iso-8859-1', filename: 'éxamplé.txt', type: 'inline' }
```

For more examples check [detailed test cases](test/snapshots/parser.js.md).

## License

[MIT](LICENSE)
