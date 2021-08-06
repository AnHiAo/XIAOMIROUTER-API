const reqAjax = require("../../common/reqAjax");
module.exports = async function(token){
    const result = await reqAjax(`http://192.168.31.1/cgi-bin/luci/;stok=${token}/api/misystem/newstatus`,method="GET",headers={
        "Cookie":"psp=admin|||2|||0;",
        "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36`
    });
    return  result;
}