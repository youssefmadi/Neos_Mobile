var liveChannels = new Array();
var hls = null;
var logged = 0;
var firstCh = null;

$(document).ready(function () {
    //$(".loader,.loaderText").center();
    for (i = 0; i < mainMenu.length; i++) {
        for (j = 0; j < mainMenu.length; j++) {
            if (mainMenu[j].order === i) {
                if (mainMenu[j].deleted === 0) {
                    if (mainMenu[j].enabled) {
                        $("#sidebar-nav").append("<li id="+mainMenu[j].id+" onclick='chooseMenu("+mainMenu[j].id+")'><span class='"+mainMenu[j].icon+"' aria-hidden='true'></span><a href='#'>"+mainMenu[j].title+"</a></li>");                
                    }else{
                        $("#sidebar-nav").append("<li id="+mainMenu[j].id+"><span class='"+mainMenu[j].icon+"' aria-hidden='true'></span><a href='#'>"+mainMenu[j].title+" <b class='locked' aria-hidden='true'>&nbsp;Locked</b></a></li>");                
                    }
                }
            }
        }
    }
    
    $("#tog_menu").click(function (e) {
        e.preventDefault();
        if(logged){
            $("#wrapper").toggleClass("toggled");
        }
    });
    
    newsCategories();
    prepareData();
    
    resizePlayer();
    
});

function checkIfLoggedIn(){
    alert(logged);
    if(logged==1){
        return true;
    }else{
        showLoginBox();
        return false;
    }
}

function showLoginBox(){
    $('#login_form').remove();
    $("body").append('<div class="row" id="login_form" method="post">\n\
        <form>\n\
            <div class="form-group">\n\
                <label for="username">Username</label>\n\
                <input class="form-control input-sm" name="username" id="username" type="text" autocomplete="off">\n\
            </div>\n\
            <div class="form-group">\n\
                <label for="password">Password</label>\n\
                <input class="form-control input-sm" name="password" id="password" type="password">\n\
            </div>\n\
            <input type="submit" class="btn btn-info" value="Login">\n\
        </form>\n\
    </div>');
    $('form').on('submit', function (e) {
        $.ajax({
            type: 'post',
            url: LOGIN_POST,
            data: $(this).serialize(),
            success: function (data) {
                if(data[0]==1){
                    logged = 1;
                    $('#login_form').remove();
                    playChannel(firstCh);
                }else{
                    alert("Wrong Username or Password");
                }
            }
        });
        e.preventDefault();
    });
    $('#login_form').css({
        'position' : 'absolute',
        'left' : '50%',
        'top' : '50%',
        'margin-left' : -$('#login_form').outerWidth()/2,
        'margin-top' : -$('#login_form').outerHeight()/2
    });
}

function prepareData(){
    $(".loader,.loaderText,.loaderBlocker").show();
    $.getJSON(LIVETV_URL, function (data) {
        liveChannels = new Array();
        $.each(data._channels, function (key, val) {
            liveChannels.push({id:val.id,title:val.name,ip:val.ip});
        });
    }).done(function () {
        //$(".loader,.loaderText,.loaderBlocker").hide();
        setTimeout(function(){chooseMenu(7);$(".splash").hide();$("#wrapper").toggleClass("toggled");},1000);
    })
    .success(function() { $(".loader,.loaderText,.loaderBlocker").hide(); })
    .error(function() { $(".loader,.loaderText,.loaderBlocker").hide();bootbox.alert("Check you network connection"); })
    .complete(function() {$(".loader,.loaderText,.loaderBlocker").hide();});
}

function getURL(id){
    for (i = 0; i < liveChannels.length; i++) {
        if(liveChannels[i].id == id){
            return liveChannels[i].ip;
        }
    }
}

function clean(){
    if(hls != null){
        hls.destroy();
        hls =null;
    }
    newsCategoryScroll=null;
    newsScroll = null;
    weatherCategoryScroll=null;
    weatherDetailsScroll = null;
    $("#content").empty();
}

function selectMenu(menuId){
    $(".menuSelected").removeClass("menuSelected");
    $("#"+menuId).addClass("menuSelected");
}

function liveTv(){
    
    $("#content").append("<div class='col-lg-9 col-md-9 col-sm-12 col-xs-12 pr0' id='player_area'></div>");
    $("#content").append("<div class='col-lg-3 col-md-3 col-sm-12 col-xs-12' id='channelList'><ul id='channelListLi'></ul></div>");
    for (i = 0; i < liveChannels.length; i++) {
        if(firstCh == null) firstCh = liveChannels[i].id;
        $("#channelListLi").append("<li class='channel plr2' onClick='playChannel("+liveChannels[i].id+")'><span class='icon-television' aria-hidden='true'></span>&nbsp;&nbsp;"+liveChannels[i].title+"</li>");
    }
    
    playChannel(firstCh);
}

function getRandomInt(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function vodList(){
    for (i = 0; i < movies.length; i++) {
        $("#content").append("<div class='col-lg-4 col-md-4 col-sm-12 col-xs-12 vodItems' id='m_"+movies[i].id+"'><div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 vodItems_'><table class='vod_info'><tr><td class='vod_info_img' onclick='playMovie("+movies[i].id+")'><img src='"+movies[i].poster+"' /></td><td class='vod_info_desc'><b> Movie name:</b>"+movies[i].title+"<br/><b>Description:</b>"+movies[i].description+"<br/><b>Stars:</b>"+movies[i].stars+"</td></tr></table></div></div>");
    }
    resizePlayer();
}


function iosPlayer(path){
    return '<video controls autoplay id="iosplayer" style="height:306px;background-color:#000;margin:auto;" width="100%"><source src="'+path+'"></video>';
}


function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "WP";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

function playMovie(id){
    for (i = 0; i < movies.length; i++) {
        if(movies[i].id == id){
            clean();
           
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                 
                var type = getMobileOperatingSystem();
                if(type == "Android"){
                    $("#content").prepend("<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 pr0 vod_player_stage'>"+JSPlayer()+"</div>");
                    //alert(movies[i].path);
                    playURL(movies[i].path);
                }else if(type== "iOS"){
                    $("#content").prepend("<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 pr0 vod_player_stage'>"+iosPlayer(movies[i].path)+"</div>");
                    var video = document.getElementById('iosplayer');
                    video.play();
                    
                }
            }else{
                $("#content").prepend("<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 pr0 vod_player_stage'>"+JSPlayer()+"</div>");
                playURL(movies[i].path);
            }
        }
    }
}

$( window ).resize(function() {
    $(".loader,.loaderText").center();
});



function resizePlayer(){
    
    var h = parseInt($(window).height())-50;
    var w = $(window).width();

    //$("#page-content-wrapper").width(w-15);
    
   // $("#video").width(w);
    //$("#iosplayer").width(w);
    
    if(window.innerHeight > window.innerWidth){
       
    }else{
         $("#video").height(h);
         $("#iosplayer").height(h);
         //$("#video").width(w);
    }
   
}


function JSPlayer(){
    var pl = '<video width="100%" style="height:306px;background-color:#000;" id="video" class="video-js vjs-default-skin" controls="" autoplay="true" src=""></video>';
    return pl;
}

function playChannel(id){

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        var type = getMobileOperatingSystem();
        if(type == "Android"){
            if($("#video").length>0){
                //var video = document.getElementById('video');
                //video.pause();
                hls.destroy();
                $("#video").remove();
            }

            $("#player_area").empty();

            $("#player_area").append(JSPlayer());
            resizePlayer();
            if(checkIfLoggedIn()){
                playURL(getURL(id));
            }
        }else if(type== "iOS"){
            $("#player_area").empty();
            $("#player_area").append(iosPlayer(getURL(id)));
            resizePlayer();
            var video = document.getElementById('iosplayer');
            
            if(checkIfLoggedIn()){
                video.play();
            }
        }
    }else{
        $("#player_area").empty();
        $("#player_area").append(JSPlayer());
        resizePlayer();
        
        if(checkIfLoggedIn()){
             playURL(getURL(id));
        }
    }
}

function playURL(url){
    var video = document.getElementById('video');

    if(Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
            
            video.play();

        });
    }
}


function chooseMenu(menuId){
    clean();
    selectMenu(menuId);
    switch (menuId) {
        case 7:
            liveTv();
            $("#wrapper").toggleClass("toggled");
            break;
        case 2:
            vodList();
            $("#wrapper").toggleClass("toggled");
            break;  
        case 3:
            createNewsCategories();
            $("#wrapper").toggleClass("toggled");
            break;
        case 4:
            prepareWeather();
            $("#wrapper").toggleClass("toggled");
            break;
        case 8:
            prepareWorldRadio();
            $("#wrapper").toggleClass("toggled");
            break;    
    }
    checkIfLoggedIn();
}

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}
