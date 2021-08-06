module.exports = async function(token,macId,state){
    const reqAjax = require("../../common/reqAjax");
    const result = await reqAjax(`http://192.168.31.1/cgi-bin/luci/;stok=${token}/api/xqsystem/set_mac_filter?mac=${macId}&wan=${state?1:0}`,method="GET",headers={
        "Cookie":"psp=admin|||2|||0;",
        "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36`
    });
    return  result;
}