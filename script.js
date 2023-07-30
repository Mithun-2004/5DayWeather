const APIKey = '34fb6151dda2ff8f7c1394d4f88a8907';

const getWeatherDetails = (cityName, latitude, longitude) => {
    const url2 = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=metric`;
    
    fetch(url2).then(response => response.json())
    .then(data => {
        var dateCount = 2;
        var dataLength = data.list.length;
        var dateTime = data.list[0].dt_txt.split(" ");
        var dayStamp = dateTime[0];
        document.querySelector("#date1").innerText = dateTime[0];
        document.querySelector("#place1").innerText = cityName;
        document.querySelector("#temp1").innerText = data.list[0].main.temp;
        document.querySelector("#wind1").innerText = data.list[0].wind.speed;
        document.querySelector("#humdity1").innerText = data.list[0].main.humidity;
        document.querySelector("#description1").innerText = data.list[0].weather[0].description;

        var imageURL = ` https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
        document.querySelector('.image img').setAttribute("src", imageURL);

        for (var i=0 ; i<dataLength; i++){
            var dateTime = data.list[i].dt_txt.split(" ");
            if (dayStamp != dateTime[0]){
                // console.log(dateTime[0]);
                // console.log(data.list[i].main.temp);
                // console.log(data.list[i].wind.speed);
                // console.log(data.list[i].main.humidity);
                // console.log(data.list[i].weather[0].description);

                document.querySelector(`#date${dateCount}`).innerText = dateTime[0];
                document.querySelector(`#temp${dateCount}`).innerText = data.list[i].main.temp;
                document.querySelector(`#wind${dateCount}`).innerText = data.list[i].wind.speed;
                document.querySelector(`#humdity${dateCount}`).innerText = data.list[i].main.humidity;
                var imageURL = ` https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
                document.querySelector(`#image${dateCount}`).setAttribute("src", imageURL);
                document.querySelector(`#description${dateCount}`).innerText = data.list[i].weather[0].description;
                dayStamp = dateTime[0];
                dateCount = dateCount + 1;
            }
            
        }
}).catch(() => alert('Some error occured while fetching weather details.'));
}



const getCityCoordinates = () => {
    const cityName = document.querySelector('#cityInput').value.trim();
    const url1 = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${APIKey}`;
    fetch(url1).then(response => response.json())
    .then(data => {
        if (data.length == 0){
            alert('No coordinates found for given city.');
            return;
        }else{
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            getWeatherDetails(cityName, latitude, longitude);
        }
        document.querySelector('#cityInput').value = "";
    }).catch(() => alert('Some error happened while fetching coordinates.'));
}


const searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', getCityCoordinates);

const next = document.querySelectorAll(".next");

for (var j=0; j<5; j++){
    next[j].addEventListener('mouseover', function(){
        document.querySelector(`#${this.id}ul`).classList.remove("notActive");
        document.querySelector(`#${this.id}h2`).classList.add("notActive");
        document.querySelector(`#${this.id}h3`).classList.add("notActive");
    })

    next[j].addEventListener('mouseout', function(){
        document.querySelector(`#${this.id}ul`).classList.add("notActive");
        document.querySelector(`#${this.id}h2`).classList.remove("notActive");
        document.querySelector(`#${this.id}h3`).classList.remove("notActive");
    })
   
}
