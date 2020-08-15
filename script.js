// Add event listener
const searchBox = document.querySelector(".input");
searchBox.addEventListener('keypress', getValue);

function getValue(press){
    if (press.keyCode == 13){
        getResults(searchBox.value);
    }
}

const btn = document.querySelector(".btn");
btn.addEventListener('click', function(){
    getResults(searchBox.value);
});
// fetch data
function getResults(value){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&APPID=53f5bcb9ee8e03a33c85f46690b4267c`)
    .then(response => response.json())
    .then (data => {
        showResult(data);
    })
}
// Show result
function showResult(data) {
    const flag = document.getElementById("img_flag");
    flag.innerHTML =`<img src="flag-img/${data.sys.country.toLowerCase()}.png" alt="...">`;

    const location = document.getElementById("location");
    location.innerHTML = ` <i class="fa fa-map-marker" style="font-size:36px;color:red"></i> ${data.name} ${data.sys.country}`;

    const temperature = document.getElementById("temp");
    temperature.innerHTML = `${Math.round(data.main.temp)} <span>°c</span>`;

    const real_feel = document.getElementById("real-feel");
    real_feel.innerHTML = `<span>Real_feel:</span> ${Math.round(data.main.feels_like)} <span>°c</span>`;

    const condition = document.getElementById("condition");
    condition.innerText = `${(data.weather[0].main)}`;
    
    const image = document.getElementById("img");
    image.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

    const temperature_min_max = document.getElementById("min_max");
    temperature_min_max.innerHTML = `${Math.round(data.main.temp_min)} <span>°c</span>/${Math.round(data.main.temp_max)} <span>°c</span>`;
}
