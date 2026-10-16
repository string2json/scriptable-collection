// Loon / Surge 兼容版 v2
// Loon 要求 plugin 里 http-response 必须配置 requires-body=true,否则 $response.body 是 undefined
let raw = $response.body;
let obj;
try {
  if (typeof raw === 'string') {
    obj = JSON.parse(raw);
  } else if (raw && typeof raw === 'object') {
    obj = raw;
  } else {
    // 兜底:尝试从 statusText 或其他位置获取
    console.log('[炫图] $response.body 类型:', typeof raw, '值:', raw);
    $done({});
    return;
  }
} catch (e) {
  console.log('[炫图] JSON 解析失败:', e.message, '原始 body:', typeof raw === 'string' ? raw.substring(0, 200) : 'non-string');
  $done({});
  return;
}

function setVip(o) {
  if (typeof o === 'object' && o !== null) {
    for (const k in o) {
      if (k === "wait_no") o[k] = 0;
      if (k === "totalNum") o[k] = 1;
      if (k === "isVip") o[k] = 1;
      if (k === "is_vip") o[k] = 1;
      if (k === "is_buyer") o[k] = 1;
      if (k === "productId") o[k] = "1Year";
      if (k === "vip_create_at") o[k] = "2025-02-18 20:06:47";
      if (k === "vip_expired_days") o[k] = "9999999";
      if (k === "vip_expired_at") o[k] = "2099-02-18 20:06:47";
      if (k === "vip_renewal_at") o[k] = "2099-02-18 20:06:47";
      if (k === "is_trial") o[k] = false;
      if (k === "is_trial_meal_purchased") o[k] = true;
      if (k === "is_discount_monthly_purchased") o[k] = true;
      if (k === "is_first_meal_purchased") o[k] = true;
      setVip(o[k]);
    }
  }
}

console.log('[炫图] 修改前 is_vip =', obj?.data?.is_vip);
setVip(obj);
console.log('[炫图] 修改后 is_vip =', obj?.data?.is_vip);
$done({ body: JSON.stringify(obj) });
