/*
  Copyright (c) 2016 Moin Uddin.
  png2icns: A module to convert a .png file to an .icns file.
*/

function png2icns(opts, convertCB) {

  if(!opts || !opts.in) {
    throw Error('png2icns expects an object as argument with "in" as required property.');
  }

  var fs   = require('fs-extra');
  var exec = require('child_process').exec;

  var img     = opts.in,
      icns    = opts.out || 'icon.icns',
      tempSet = __dirname + '/temp_' + Date.now() + '.iconset',
      sizes   = opts.sizes || [16, 32, 64, 128, 256, 512];

  fs.mkdirs(tempSet, function (err) {
    if(err) {
      throw Error('mkdirs: ' + err);
    }

    sizes.forEach(function (size, i) {
      exec('sips "' + img + '" -Z ' + size + ' --out ' + tempSet + '/icon_' + size + 'x' + size + '.png', function (err) {
        if(err) {
          fs.remove(tempSet);
          throw Error('sips1: ' + err);
        }
        exec('sips "' + img + '" -Z ' + (size * 2) + ' --out ' + tempSet + '/icon_' + size + 'x' + size + '@2x.png', function (err) {
          if(err) {
            fs.remove(tempSet);
            throw Error('sips2: ' + err);
          }
          if(i == sizes.length - 1) {
            exec('iconutil --convert icns --output "' + icns + '" ' + tempSet, function (err) {
              if(err) {
                fs.remove(tempSet);
                throw Error('iconutil: ' + err);
              }
              fs.remove(tempSet, convertCB); // clear the temp folder created and move control to callback.
            });
          }
        });
      });
    });
  });

}

module.exports = png2icns;
