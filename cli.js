/**
 * Created by FahidRM on 09/06/2017.
 */
var minimist = require('minimist');
var meow = require('meow');
var shift_cipher = require('./');

var options = minimist(process.argv.slice(2), {
    boolean: ['verbose-decode'],
    string: ['text', 'symbol-set',  'smart-decode' ],
    integer: ['direct-decode', 'shift'],
    alias: {
        dd: 'direct-decode',
        s:  'shift',
        sd: 'smart-decode',
        ss: 'symbol-set',
        t:  'text',
        vd: 'verbose-decode'
    }

});


meow(`
        NAME
            shift_cipher    encodes or decodes a piece of string using the shift cipher algorithm.
            
        USAGE:
            node shift_cipher  [-direct-decode integer] [-s integer] [--smart-decode string] [-symbol-set string] [-t string] [--verbose-decode]
      
        OPTIONS: 

            -t  --text  The plain or cipher text to be used in the operation
            
            - Decoding a cipher text
            
                --direct-decode     Decodes the specified cipher text using the shift value provided.
                
                --smart-decode      Decoded the specified cipher text using the defaul or provided dictionary.
                                        To use the default dictionary, this option must be set to 'default' (without the quotes)
                                        
                --verbode-decode    Decodes the specified cipher text by checking all possible values of the shift key.
                
                Note:  -dd, -sd and -vd override each other.
                                    
             - Optional parameters
                
                -s  --shift          An integer that is used to perform the shift operation. Although it is an optional parameter, it is
                                     advisable to always provide this as a default value of 1 would be used when this is not provided
             
                 --symbol-set    Specifies a symbol set that would be used to perform the shift. Whatever symbol-set is used for 
                                     encryption is required for decryption. 
                                     This enables the module to move beyond the conventional shift-cipher algorithm than is based on the 26 alphabets.
                                     When this is not provided, this module defaults to the 26 english alphabets.
                
              -Othes (Misc)
                
                  -h    --help      Prints this help file
                  -v    --version   Prints the version number
        
        EXAMPLES:
        
            node shift_cipher -t Hello World 
             Encodes the text "Hello World" using the default symbol-set and shift
             
            node shift_cipher -s 15 -t "Hello World"
               Encodes the text "Hello World" using the default symbol-set and shift of 15
               
            node shift_cipher -t "ifmmp" --smart-decode default
                Decodes the cipher text "ifmmp" using the smart-decode approach with the default dictionary
                
            node shift_cipher -t "ifmmp" --direct-decode 1
                Decodes the cipher text "ifmmp" using the direct-decode approach with a shift key of 1
                
    `, {
    alias: {
        h: 'help'
    }
});



shift_cipher (options, function (error, response) {
    if (error) {
        return console.error(error);
    }
    else {
        return console.log(JSON.stringify(response))
    }
});

//  dictinary
//  encode
// decode
// string
// symbols
// shift
