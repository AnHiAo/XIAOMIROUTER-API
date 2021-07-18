const CryptoJS = require("crypto-js");
const fetch = require("node-fetch");
const formurlencoded = require("form-urlencoded");
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
(async () => {
  const nonce = Encrypt.init();
  const oldPwd = Encrypt.oldPwd("yuan+@a@a@a");
  const param = formurlencoded({
    username: "admin",
    password: oldPwd,
    logtype: 2,
    nonce: nonce,
  });

  const LoginJson = await fetch(
    "http://192.168.31.1/cgi-bin/luci/api/xqsystem/login",
    {
      body: param,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    }
  );
  const resLoginJson = await LoginJson.json();
  if (+(resLoginJson["code"])) return console.log("login error");
  // 请求当前路由器连接的设备
  fetch(
    `http://192.168.31.1/cgi-bin/luci/;stok=${resLoginJson[
      "token"
    ]}/api/misystem/devicelist`,
    {
      method:"GET",
      headers: {
        Cookie: "psp=admin|||2|||0;",
      },
    }
  ).then(async (res) => (await res.json())['list'].forEach(v=>console.log(`${v.mac}\n${v.name}\n\n`)));
})();
