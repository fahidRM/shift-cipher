/**
 * Created by FahidRM on 09/06/2017.
 */
var fs =  require('fs');
var csv = require('fast-csv');

module.exports = function (dictionary, callback)  {
    if (dictionary.toLowerCase() === 'default') { dictionary = null; }
    var dictionaryPath = dictionary || './dictionary/en.csv';
    var rows = [];
    try {
        fs.createReadStream(dictionaryPath)
            .pipe(csv())
            .on("data", function (data) {
                rows.push((data + "").toLowerCase());
            })
            .on("end", function () {
                return callback(null, rows);
            });
    }
    catch (e) {
        return callback(e);
    }
};