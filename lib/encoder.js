module.exports =  function (callback, plainText ,symbols, shift) {
    var cipherText = "";
    for (var i in plainText) {
        var currentIndex = symbols.indexOf(plainText[i]);
        if (currentIndex < 0) {
            cipherText += plainText[i];
        }
        else {
            var newIndex = currentIndex +  shift;
            if (newIndex >= symbols.length ) {
                newIndex -= symbols.length;
            }

            cipherText += symbols[newIndex];
        }
    }
    callback(null, cipherText);
};
