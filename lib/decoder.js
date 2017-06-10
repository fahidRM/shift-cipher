module.exports =  function (callback, cipherText , symbols, decodeParam ) {

    var paramType =  typeof decodeParam;

    switch (paramType) {
        case 'boolean' :
            return plainDecode(callback, cipherText, symbols);
        case 'number':
            return directDecode(callback, cipherText, decodeParam, symbols);
        case 'string':
            return smartDecode(callback, cipherText, symbols, decodeParam);
    }

};


function smartDecode (callback, cipherText, symbols, dictionary) {

    var dictionaryReader = require('./dictionary-reader');
    dictionaryReader(dictionary, function (error, words) {
        if (error) {
            callback(error);
        }
        else {


                var possibleIndices = [];
                var tempPossibleIndices = [];
                var cipherTextWordIndex = 0;

                while (cipherTextWordIndex < cipherText.split(' ').length) {

                    tempPossibleIndices = [];

                    if (cipherTextWordIndex === 0) {
                        for (var i = 1; i < symbols.length; i++) {
                            var plainText = decode(cipherText.split(' ')[cipherTextWordIndex], i, symbols);
                            if (words.indexOf(plainText) >= 0) {
                                possibleIndices.push(i);
                            }
                        }
                    }
                    else {
                        for (var i in possibleIndices) {
                            var plainText = decode(cipherText.split(' ')[cipherTextWordIndex], possibleIndices[i], symbols);
                            if (words.indexOf(plainText) >= 0) {
                                tempPossibleIndices.push(possibleIndices[i]);
                            }
                        }
                        possibleIndices = tempPossibleIndices;
                    }

                    cipherTextWordIndex ++;

                }

                if (possibleIndices.length > 0) {
                    var response = [];
                    for (var i in possibleIndices) {
                        response.push(decode(cipherText, possibleIndices[i], symbols));
                    }
                    return callback(null, response);
                }
                else {
                    return callback(null, "Smart decode was unable to decode the file. Try decoding with the mode set to all");
                }
        }
    });



}

function plainDecode (callback, cipherText, symbols) {

    var plainTextList = [];
    for (var i = 1; i < symbols.length; i++) {
        plainTextList.push({shift: i , text: decode (cipherText, i , symbols )});
    }
    callback(null, plainTextList);
}

function directDecode (callback, cipherText, shift, symbols) {
    return callback(null, decode(cipherText, shift, symbols));
}


function decode (cipherText, shift, symbols) {
    var plainText = "";
    for (var j = 0; j < cipherText.length; j++) {
        var charIndex =  symbols.indexOf(cipherText[j]);
        if (charIndex < 0) {
            plainText += cipherText[j];
        }
        else {
            var newIndex =  (charIndex - shift) % symbols.length;
            if (newIndex < 0) { newIndex =  newIndex +  symbols.length; }
            plainText += symbols[newIndex];
        }
    }
    return plainText;
}