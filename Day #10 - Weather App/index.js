// 获取容器元素
const container = document.querySelector('.container');
// 获取搜索按钮元素
const search = document.querySelector('.search-box button');
// 获取天气盒子元素
const weatherBox = document.querySelector('.weather-box');
// 获取天气详情元素
const weatherDetails = document.querySelector('.weather-details');
// 获取404错误元素
const error404 = document.querySelector('.not-found');

// 给搜索按钮添加点击事件
search.addEventListener('click', () => {

    // 获取API密钥
    const APIKey = 'Your Api Key';
    // 获取搜索框中的城市名
    const city = document.querySelector('.search-box input').value;

    // 如果搜索框为空，则返回
    if (city === '')
        return;

    // 发送请求获取天气数据
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            // 如果返回404错误，则显示错误信息
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            // 隐藏错误信息
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            // 获取天气图片、温度、描述、湿度、风速元素
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // 根据天气情况设置天气图片
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            // 设置温度、描述、湿度、风速
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // 显示天气盒子、天气详情
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});