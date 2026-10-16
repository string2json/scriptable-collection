// 修复 Loon 兼容:Surge 的 $response.body 是 string,需要 JSON.parse
// Loon 的 $response.body 已经是 object,直接用
let obj = typeof $response.body === 'string' ? JSON.parse($response.body) : $response.body;

function e(obj) {
  if (typeof obj === "object" && obj !== null) {
    for (let i in obj) {
      if (i === "wait_no") obj[i] = 0;
      if (i === "totalNum") obj[i] = 1;
      if (i === "isVip") obj[i] = 1;
      if (i === "vip_create_at") obj[i] = "2025-02-18 20:06:47";
      if (i === "vip_expired_days") obj[i] = "9999999";
      if (i === "vip_expired_at") obj[i] = "2099-02-18 20:06:47";
      if (i === "vip_renewal_at") obj[i] = "2099-02-18 20:06:47";
      if (i === "is_vip") obj[i] = 1;
      if (i === "is_buyer") obj[i] = 1;
      if (i === "productId") obj[i] = "1Year";
      e(obj[i]);
    }
  } else {
    return obj;
  }
}

e(obj);
$done({ body: JSON.stringify(obj) });
