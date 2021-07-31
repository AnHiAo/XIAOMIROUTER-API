const login = require("./src/login/login");
(async ()=>{
  const loginResult = await login("yuan+@a@a@a")
  console.log(loginResult)
})()  
