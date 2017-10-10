var weatherCategoryScroll = null;
var weatherDetailsScroll = null;
var cities = new Array();
var currentCity = null;

var c_id = null;
var c_name = null;
var c_today= null;
var c_state= null;
var c_tmp= null;
var c_high= null;
var c_low= null;
var c_humidity= null;
var c_sunrise= null;
var c_sunset= null;
var c_icon= null;

function prepareWeather() {
    var tmp = null;
    var weather_by_lang = weather.split("||||");
    var weather_Eng = weather_by_lang[0].split("###")[0];
    var weather_cities = weather_Eng.split("!!!!");
    for (i = 0; i < weather_cities.length; i++) {
        tmp = weather_cities[i].split("*");
        cities.push({cityId: tmp[0], cityName: tmp[1], todayName: tmp[9], todayState: tmp[10], todayTemp: tmp[5], todayHumidity: tmp[6], todayHigh: tmp[12], todayLow: tmp[13], todayIcon: tmp[16], todaySunrise: tmp[7], todaySunset: tmp[8], tomorrowIcon: tmp[11], tomorrowName: tmp[14], tomorrowState: tmp[15], tomorrowHigh: tmp[17], tomorrowLow: tmp[18]});
    }
    createWeatherCategories();
}

function createWeatherCategories() {
    $("#content").append("<div class='col-lg-3 col-md-3 col-sm-3 col-xs-5 pr0' id='newCityListContainer'><ul id='newCityList'></ul></div>");
    for (i = 0; i < cities.length; i++) {
        $("#newCityList").append("<li id='CityCont_" + cities[i].cityId + "' onclick='showWeather(" + cities[i].cityId + ")'><a href='#' id='newsCat_" + cities[i].cityId + "' >" + cities[i].cityName + "</a></li>");
    }
    weatherOnScreenSize();
    $("#content").append("<div class='col-lg-9 col-md-9 col-sm-9 col-xs-7 pl0'  id='newCityListContainerDetails'><ul id='newCityListDetails'></ul></div>");
}

function weatherOnScreenSize() {
    if($("#newCityListContainer").length>0){
        $("#newCityListContainer").css("margin-top", $(".topHeader").height() + "px !important;");
        $("#newCityListContainer").height($(window).height() - $(".topHeader").height());

        if (weatherCategoryScroll == null) {
            setTimeout("weatherCategoryScroll = applyScroll('newCityListContainer')", 100);
        } else {
            setTimeout("weatherCategoryScroll.refresh()", 100);
        }
    }
}

function showWeather(cityID) {
    $(".catSelected").removeClass("catSelected");
    $("#CityCont_"+cityID).addClass("catSelected");
    
    weatherDetailsScroll = null;
    
    for (i = 0; i < cities.length; i++) {
        if (cityID == cities[i].cityId) {
            c_id        = cities[i].cityId;
            c_name      = cities[i].cityName;
            c_today     = cities[i].todayName;
            c_state     = cities[i].todayState;
            c_tmp       = cities[i].todayTemp;
            c_high      = cities[i].todayHigh;
            c_low       = cities[i].todayLow;
            c_humidity  = cities[i].todayHumidity;
            c_sunrise   = cities[i].todaySunrise;
            c_sunset    = cities[i].todaySunset;
            c_icon      = cities[i].todayIcon;
            
            $("#newCityListDetails").empty();
            //$("#newCityListDetails").append("<ul style='vertical-align: top !important;' id='#newCityListDetails'></ul>");

            //if (screenLimit()) {
               // $("#weatherDetailsList").append("<li data-icon='false' style='vertical-align: top !important;'><a href='#' data-rel='page' style='white-space:normal'><p class='weatherP' style='white-space:normal'><img id='icon_"+c_id+"' class='weatherIMG' src='images/weather-icons/" + c_icon + ".png' /><span>" + c_today + "</span>&nbsp;" + c_state + "<br/><span>Temp</span>&nbsp;" + c_tmp + "<br/><span>High</span>&nbsp;" + c_high + "&nbsp;&nbsp;<span>Low</span>&nbsp;" + c_low + "<br/><span>Humidity</span>&nbsp;" + c_humidity + "<br/><span>Sunrise</span>&nbsp;" + c_sunrise + "&nbsp;&nbsp;<span>Sunset</span>&nbsp;" + c_sunset + "</p></a></li>");
               // $("#weatherDetailsList").append("<li data-icon='false' style='vertical-align: top !important;'><a href='#' data-rel='page' style='white-space:normal'><p class='weatherP' style='white-space:normal'><img id='icon_t_"+c_id+"' class='weatherIMG' src='images/weather-icons/" + cities[i].tomorrowIcon + ".png' /><span>" + cities[i].tomorrowName + "</span>&nbsp;" + cities[i].tomorrowState + "<br/><span>High</span>&nbsp;" + cities[i].todayHigh + "&nbsp;&nbsp;<span>Low</span>&nbsp;" + c_low + "<br/><span>Humidity</span>&nbsp;" + c_humidity + "<br/><span>Sunrise</span>&nbsp;" + c_sunrise + "&nbsp;&nbsp;<span>Sunset</span>&nbsp;" + c_sunset + "</p></a></li>");
            //}else{
                $("#newCityListDetails").append("<li data-icon='false'><a href='#' data-rel='page' style='white-space:normal'><p class='weatherP' style='white-space:normal'><img id='icon_"+c_id+"' class='weatherIMG' src='img/weather-icons/" + c_icon + ".png' /><span>" + c_today + "</span>&nbsp;" + c_state + "<br/><span>Temp</span>&nbsp;" + c_tmp + "&nbsp;&nbsp;<span>High</span>&nbsp;" + c_high + "&nbsp;&nbsp;<span>Low</span>&nbsp;" + c_low + "<br/><span>Humidity</span>&nbsp;" + c_humidity + "<br/><span>Sunrise</span>&nbsp;" + c_sunrise + "&nbsp;&nbsp;<span>Sunset</span>&nbsp;" + c_sunset + "</p></a></li>");
                $("#newCityListDetails").append("<li data-icon='false'><a href='#' data-rel='page' style='white-space:normal'><p class='weatherP' style='white-space:normal'><img id='icon_t_"+c_id+"' class='weatherIMG' src='img/weather-icons/" + cities[i].tomorrowIcon + ".png' /><span>" + cities[i].tomorrowName + "</span>&nbsp;" + cities[i].tomorrowState + "<br/><span>High</span>&nbsp;" + cities[i].todayHigh + "&nbsp;&nbsp;<span>Low</span>&nbsp;" + c_low + "<br/><span>Humidity</span>&nbsp;" + c_humidity + "<br/><span>Sunrise</span>&nbsp;" + c_sunrise + "&nbsp;&nbsp;<span>Sunset</span>&nbsp;" + c_sunset + "</p></a></li>"); 
            //}
            //$("#weatherDetailsList").listview();
            //$("#newCityListDetails").append("<li>dfdsf</li>");

        }
    }
    weatherDetailsOnScreenSize();
}

function weatherDetailsOnScreenSize() {
        
    if ($("#newCityListContainerDetails li").length > 0) {
        $("#newCityListContainerDetails").css("margin-top", $(".topHeader").height() + "px !important;");
        $("#newCityListContainerDetails").height($(window).height() - $(".topHeader").height());
        if (weatherDetailsScroll == null) {
            setTimeout("weatherDetailsScroll = applyScroll('newCityListContainerDetails')", 100);
            //newsScroll.scrollTo(0, 0);
        } else {
            setTimeout("weatherDetailsScroll.refresh()", 100);
             //newsScroll.scrollTo(0, 0);
        }
    }

}


