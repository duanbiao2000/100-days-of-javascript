// 使用fetch函数从CoinGecko API获取比特币、泰达币、以太坊、莱特币、卡尔达诺和狗狗币的实时价格和24小时变化
fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Ctether%2Cethereum%2Clitecoin%2Ccardano%2Cdogecoin&vs_currencies=usd&include_24hr_change=true')
    .then(res => res.json())
    .then(json => {
        // 获取页面中class为container的元素
        const container = document.querySelector('.container');
        // 获取json对象中的所有属性名，即货币名称
        const coins = Object.getOwnPropertyNames(json);

        // 遍历所有货币
        for (let coin of coins) {
            // 获取当前货币的信息
            const coinInfo = json[`${coin}`];
            // 获取当前货币的价格
            const price = coinInfo.usd;
            // 获取当前货币的24小时变化，并保留五位小数
            const change = coinInfo.usd_24h_change.toFixed(5);

            // 将货币信息添加到页面中
            container.innerHTML += `
                <div class="coin ${change < 0 ? 'falling' : 'rising'}">
                    <div class="coin-logo">
                        <img src="images/${coin}.png">
                    </div>
                    <div class="coin-name">
                        <h3>${coin}</h3>
                        <span>/USD</span>
                    </div>
                    <div class="coin-price">
                        <span class="price">$${price}</span>
                        <span class="change">${change}</span>
                    </div>
                </div>
        `;
        }
    });