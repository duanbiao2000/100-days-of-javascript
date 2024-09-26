//获取电影名称的引用
let movieNameRef = document.getElementById("movie-name");
//获取搜索按钮的引用
let searchBtn = document.getElementById("search-btn");
//获取结果的引用
let result = document.getElementById("result");

//从api获取数据的函数
let getMovie = () => {
    //获取输入的电影名称
    let movieName = movieNameRef.value;
    //构造api的url
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    //如果输入字段为空
    if (movieName.length <= 0) {
        //显示提示信息
        result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
    }
    //如果输入字段不为空
    else {
        //发送请求
        fetch(url).then((resp) => resp.json()).then((data) => {
            //如果电影存在于数据库中
            if (data.Response == "True") {
                //显示电影信息
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
            }
            //如果电影不存在于数据库中
            else {
                //显示错误信息
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
            //如果发生错误
            .catch(() => {
                //显示错误信息
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
    }
};

//为搜索按钮添加点击事件监听器
searchBtn.addEventListener("click", getMovie);
//为窗口添加加载事件监听器
window.addEventListener("load", getMovie);