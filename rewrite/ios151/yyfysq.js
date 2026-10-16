/* 
 * 粤语翻译神器 会员优化
 *
 * 维护自: https://github.com/ios151/Rewrite/blob/main/yyfysq.js
 * 原理: 拦截 /apple_product/ 返回的会员查询,伪造 AppStore 订阅校验响应
 */
let fakeResponse = {
    "msg": "success",
    "code": 1,
    "data": [{
        "due_time": "2099-12-31 23:59:59",
        "vip_type": "vip_one_year_auto_1",
        "now_time": new Date().toISOString().replace("T"," ").split(".")[0],
        "isExpire": false,
        "isExist": true,
        "in_app": JSON.stringify([{
            "quantity": "1",
            "product_id": "vip_lifetime",
            "transaction_id": "990000000000001",
            "original_transaction_id": "990000000000001",
            "purchase_date": "2025-01-01 00:00:00 Etc/GMT",
            "purchase_date_ms": "1735689600000",
            "purchase_date_pst": "2024-12-31 16:00:00 America/Los_Angeles",
            "original_purchase_date": "2025-01-01 00:00:01 Etc/GMT",
            "original_purchase_date_ms": "1735689601000",
            "original_purchase_date_pst": "2024-12-31 16:00:01 America/Los_Angeles",
            "expires_date": "2099-12-31 23:59:59 Etc/GMT",
            "expires_date_ms": "4102444799000",
            "expires_date_pst": "2099-12-31 15:59:59 America/Los_Angeles",
            "is_trial_period": "false",
            "is_in_intro_offer_period": "false",
            "in_app_ownership_type": "PURCHASED"
        }])
    }]
};
$done({body: JSON.stringify(fakeResponse)});
