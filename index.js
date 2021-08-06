const login = require("./src/login/login");
const getNewStatus = require("./src/misystem/GET/newstatus");
const getDevicelist = require("./src/misystem/GET/devicelist");
const setMacFilter = require("./src/misystem/SET/mac_filter");
(async ()=>{
  const loginResult = await login("yuan+@a@a@a") // your wifi password
  const {token} = loginResult;
  console.log(await getNewStatus(token))
  // console.log(await setMacFilter(token,`EA:57:2F:17:18:8F`,false))
})() 