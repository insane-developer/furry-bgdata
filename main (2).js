var fs = require('fs'),
    path = require('path'),
    colors = require('colors');

var func = module.exports = function(filename) {
    var filename = path.resolve(filename),
        data = fs.readFileSync(filename);

    console.log(filename);
    var head = data.slice(2048, 4096 + 2048);
    console.log(formatStr(head));
}

if (process.argv.length < 3) {
    console.log('!file');
    return;
}
function formatStr(data) {
    var length = data.length,
        lineWidth = 32,
        res = '';
    console.log(lineWidth, length, length / lineWidth)
    for(var lineStart = 0; lineStart < length / lineWidth; lineStart++){
        var start = lineStart * lineWidth,
        end = start + lineWidth - 1;
        res += formatNum(start.toString('16')) + ' | ';
        res += data.toString('hex', start, end).replace(/(\w{4})/g, '$1 ');
        res += ' | ';
        for(var i = start; i <= end; i++) {
            var int32 = data.readUInt8(i);
            if (int32 === 0) {
                res += '0'.blue;
            } else {
                res += data.toString('utf-8', i, i + 1).replace(/[^\w-_+=.,<>\|/?:;'"@#$%^&*()[]{}`]/g, function(match){
                    return 'x'.red;
                });
            }

        }

        res += '\n';
    }
    return res;
}

function formatNum(num) {
    var str = num.toString(16);
    return Array(5 - str.length).join('0') + str;
}
func(process.argv.pop());