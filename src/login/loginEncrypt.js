const CryptoJS = require("crypto-js");
const Encrypt = {
    key: "a2ffa5c9be07488bbb04a3a47d3c5f6a",
    iv: "64175472480004614961023454661220",
    nonce: null,
    init: function () {
      const nonce = this.nonceCreat();
      this.nonce = nonce;
      return this.nonce;
    },
    nonceCreat: function () {
      const type = 0;
      const deviceId = "a4:b1:c1:af:12:5c";
      const time = Math.floor(new Date().getTime() / 1000);
      const random = Math.floor(Math.random() * 10000);
      return [type, deviceId, time, random].join("_");
    },
    oldPwd: function (pwd) {
      return CryptoJS.SHA1(
        this.nonce + CryptoJS.SHA1(pwd + this.key).toString()
      ).toString();
    },
    newPwd: function (pwd, newpwd) {
      let key = CryptoJS.SHA1(pwd + this.key).toString();
      key = CryptoJS.enc.Hex.parse(key).toString();
      key = key.substr(0, 32);
      key = CryptoJS.enc.Hex.parse(key);
      const password = CryptoJS.SHA1(newpwd + this.key).toString();
      const iv = CryptoJS.enc.Hex.parse(this.iv);
      const aes = CryptoJS.AES.encrypt(password, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString();
      return aes;
    },
  };

  module.exports = function(pwd){
    const nonce = Encrypt.init();
    const oldPwd = Encrypt.oldPwd("yuan+@a@a@a");
    return {
        oldPwd,nonce
    }
  }