var chars = "abcdefghijklmnopqrstuvwxyz";
function handleEncrypt() {
    var plaintext = normalize(getById("plaintext").value);
    if (validate(plaintext, 'Please enter some plaintext.')) return;
    var key = normalize(getById("keyword").value);
    var pc = normalize(getById("padchar").value);
    getById("ciphertext").value = Encrypt(plaintext, key, pc);
}
function handleDecrypt() {
    var ciphertext = normalize(getById("ciphertext").value);
    if (validate(ciphertext, 'Please enter some ciphertext (letters only).')) return;
    var key = normalize(getById("keyword").value);
    //tidak perlu mengambil padchar karna sudah ada di ciphertextnya
    getById("plaintext").value = Decrypt(ciphertext, key);
}
function validate(text, message) {//menampilkan popup jika text kosong
    if (text.length < 1) {
        alert(message);
    }
}
function getById(id) {//mengambil id
    return document.getElementById(id);
}
function normalize(value) {//mengubah string menjadi huruf kecil dan mengubah karakter selain a-z secara global menjadi ""
    return value.toLowerCase().replace(/[^a-z]/g, "");
}
function Encrypt(plaintext, key, pc) {
    var klen = key.length;
    if (pc == "") pc = "x";
    while (plaintext.length % klen != 0) {//pertambahan padchar
        plaintext += pc.charAt(0);
    }
    var colLength = plaintext.length / klen;
    var ciphertext = "";
    k = 0;
    for (i = 0; i < klen; i++) {
        while (k < 26) {
            t = key.indexOf(chars.charAt(k));//indexOf("a") --> indexOf("z")
            arrkw = key.split("");//membelah k,e,y
            arrkw[t] = "_";
            key = arrkw.join("");//menyatukan string tanpa spasi
            if (t >= 0) break;
            else k++;
        }
        for (j = 0; j < colLength; j++) {
            ciphertext += plaintext.charAt(j * klen + t);
        }
    }
    return ciphertext;
}

function Decrypt(ciphertext, keyword) {
    var klen = keyword.length;
    if (klen <= 1) {
        alert("keyword should be at least 2 characters long");
        return;
    }
    if (ciphertext.length % klen != 0) {
        alert("ciphertext has not been padded, the result may be incorrect (incorrect keyword?).");
    }
    
    var cols = new Array(klen);
    var colLength = ciphertext.length / klen;
    for (i = 0; i < klen; i++) cols[i] = ciphertext.substr(i * colLength, colLength);

    var newcols = new Array(klen);
    j = 0;
    i = 0;
    while (j < klen) {
        t = keyword.indexOf(chars.charAt(i));
        if (t >= 0) {
            newcols[t] = cols[j++];
            arrkw = keyword.split("");
            arrkw[t] = "_";
            keyword = arrkw.join("");
        } else i++;
    }

    var plaintext = "";
    for (i = 0; i < colLength; i++) {
        for (j = 0; j < klen; j++) {
            plaintext += newcols[j].charAt(i);
        }
    }
    return plaintext;
}
