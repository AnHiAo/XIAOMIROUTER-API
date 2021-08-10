## 开始
``` js
const login = require("./src/login/login");
const getNewStatus = require("./src/misystem/GET/newstatus");
const getDevicelist = require("./src/misystem/GET/devicelist");
const setMacFilter = require("./src/misystem/SET/mac_filter");
(async ()=>{
  const loginResult = await login("password") // 你的wifi密码
  const {token} = loginResult;
  console.log(await getNewStatus(token)) // 获取2.4G和5G频段设备数量
  console.log(await getDevicelist(token)) // 获取当前局域网下面的所有连接过的设备 
  console.log(await setMacFilter(token,`EA:57:2F:17:18:8F`,false))
  // 进行断网联网的设置 参数:token,设备MAC地址,(false 为断网 true 联网)
})() 
```
目前可用功能:
* [x] 获取当前路由连接过的设备
* [x] 获取5G和2.4G频段设备数量
* [x] 通过mac设定指定设备的断/连网   
