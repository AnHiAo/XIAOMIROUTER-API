const fetch = require("node-fetch");
function reqAjax(url="",method="get",headers={},body=null,resType="json"){
    return new Promise(resolve=>{
         fetch(encodeURI( url),{
             method,
             headers,
             body
         }).then(async res=>{
             switch (resType) {
                 case 'json':
                     resolve(await res.json())
                     break;
                 case 'text':
                     resolve(await res.text())
                 default:
                     resolve("your resType is not find,please check")
                     break;
             }
         }).catch(async err=>{
            console.log(err)
            resolve("reqAjaxError")
            })
     
    })
 }
 module.exports = reqAjax;