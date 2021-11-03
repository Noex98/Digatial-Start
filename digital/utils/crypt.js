// Crypt
function crypt(input) {

    //Text to binary
    let binOutput = ""
    for (let i = 0; i < input.length; i++) {
        binOutput += input[i].charCodeAt(0).toString(2) + ' ';
    }
    
    //XOR gate
    let cryptOutput = binOutput.split(' ')
    for (let i = 0; i < cryptOutput.length; i++){
        cryptOutput[i] = cryptOutput[i] ^ 1
    }

    cryptOutput.pop(); //Remove the extra array item
    
    //Binary to text
    let output = cryptOutput.map(b => parseInt(b, 2))
        .map(num => String.fromCharCode(num))
        .join('');

    return output;
}

module.exports = crypt;