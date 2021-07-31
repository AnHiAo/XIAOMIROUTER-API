const reqAjax = require("../common/reqAjax");
const formurlencoded = require("form-urlencoded");
const loginEncrypt = require("./loginEncrypt");
module.exports = async function(psw){
  const lgEcptedObj= loginEncrypt(psw);
  const params = formurlencoded({
    username: "admin",
    password: lgEcptedObj.oldPwd,
    logtype: 2,
    nonce: lgEcptedObj.nonce,
  });
    return await reqAjax(
        "http://192.168.31.1/cgi-bin/luci/api/xqsystem/login",method="POST",headers={
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },body=params);
}
