/**
 * Created by FahidRM on 09/06/2017.
 */

module.exports = function (options, callback) {

    if (! options.t) {
        return callback({name: 'IncompleteConfigException', desciption: 'A plain or cipher text has not been provided'});
    }
    else if (typeof options.t !== 'string') {
        return callback({name: 'InvalidOptionException', desciption: 'There is an eror with the options passed'});
    }


    var text =          options.t.toLowerCase();
    var shift =         options.s || 1;
    var symbols =       options['symbol-set'] || 'abcdefghijklmnopqrstuvwxyz';
    var action = null;

    if (options['direct-decode'] || options['smart-decode'] || options['verbose-decode']) {
        action = require('./lib/decoder');
        shift = false;
    }
    else {
        action = require('./lib/encoder');
    }


    action (callback, text, symbols, (shift || options['direct-decode'] || options['smart-decode'] || options['verbose-decode']));

};