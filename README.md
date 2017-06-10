Shift-cipher
============

A module which enables one to encode and decode text using shift-cipher.

Don't know what Shift cipher is?
Check out this link: https://www.khanacademy.org/computing/computer-science/cryptography/ciphers/a/shift-cipher


Rather than sticking to the basic of having the encryption done on mod 26 as explained in the link above, this module
goes futhe to allow users define their own bases by providing a "symbol set".
So instead of encrypting just a - z, a symbol set can be updated to contain alphabets, numbers, punctuation and other symbols.
It is worth noting that this module is case insensitive as all contents of the plain text, cipher text and dictionay are converted into
lower case during encryption and decryption.

The basic dictionary included in this project (@see: ./dictionary/en.csv) contains a list of English words published on the
repository:    https://github.com/dwyl/english-words
This content retains its original license and still belongs to its original owners as stated in the reposiory above.



After installation,
run: node cli.js --help

For more information on how to use the module.
NB: this module was created for fun and educational purpose ....



fytc dsl
