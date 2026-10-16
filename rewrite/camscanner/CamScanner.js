/*
CamScanner 扫描全能王 解锁部分高级特权
***************************
维护自: https://github.com/NobyDa/Script/blob/master/Surge/JS/CamScanner.js

原理:拦截查询会员属性接口,把 VIP 过期时间改成极远未来
**************************/
let obj = JSON.parse($response.body);
obj = {"data":{"psnl_vip_property":{"expiry":"2013017600"}}};
$done({body: JSON.stringify(obj)});
