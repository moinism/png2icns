
[![npm version](https://badge.fury.io/js/png2icns.svg)](https://badge.fury.io/js/png2icns)
[![License](https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat)](https://github.com/moinism/png2icns/blob/master/LICENSE)


# png2icns

> A command line and nodejs module to convert a .png file to an .icns file.

It expects a `1024*1024` png file to convert. If your files is less in size then skip the maximum size in `options`.

For example, if your file is `512*512`:

Command line:
```bash
$ png2icns file.png -s 16,32,64,128,256
```

In JavaScript:
```javascript
png2icns({
  in: 'file.png',
  sizes: [16, 32, 64, 128, 256]
}, function () {
  console.log('Successfully converted.');
});
```



## Installation


For command line usage:

````bash
npm install png2icns -g
````

To use programmatically (in NodeJS).

````bash
npm install png2icns --save
````


## Usage


### Command line

Simply give it path of png file you want to convert.

````bash
$ png2icns file_to_convert.png
````

````bash
$ png2icns file.png
$ png2icns file.png -o file.icns // file to output as
$ png2icns file.png -o file.icns -s 16,32,64,128,256,512 // sizes you want in your .icns file
````

### JavaScript


```javascript
var png2icns = require('png2icns');

png2icns({
  in: 'file.png', // required
  out: 'output.icns' // optional. .icns file name to save the file as. Default: icon.icns
  sizes: [16, 32, 64, 128, 256, 512] // optional.
}, function () {
  console.log('Successfully converted.');
});
```
