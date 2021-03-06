var liveChannels = new Array();
var hls = null;

$(document).ready(function () {
    $(".loader,.loaderText").center();
    for (i = 0; i < mainMenu.length; i++) {
        for (j = 0; j < mainMenu.length; j++) {
            if (mainMenu[j].order === i) {
                if (mainMenu[j].enabled) {
                    $("#sidebar-nav").append("<li id="+mainMenu[j].id+" onclick='chooseMenu("+mainMenu[j].id+")'><span class='"+mainMenu[j].icon+"' aria-hidden='true'></span><a href='#'>"+mainMenu[j].title+"</a></li>");                
                }
            }
        }
    }
    
    $("#tog_menu").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    
    newsCategories();
    prepareData();
    
    resizePlayer();
    
});

function prepareData(){
    $(".loader,.loaderText,.loaderBlocker").show();
    $.getJSON(LIVETV_URL, function (data) {
        liveChannels = new Array();
        $.each(data._channels, function (key, val) {
            liveChannels.push({id:val.id,title:val.name,ip:val.ip});
        });
    }).done(function () {
        $(".loader,.loaderText,.loaderBlocker").hide();
    })
    .success(function() { $(".loader,.loaderText,.loaderBlocker").hide(); })
    .error(function() { $(".loader,.loaderText,.loaderBlocker").hide();bootbox.alert("Check you network connection"); })
    .complete(function() {$(".loader,.loaderText,.loaderBlocker").hide();});;
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
    $("#content").empty();
}

function selectMenu(menuId){
    $(".menuSelected").removeClass("menuSelected");
    $("#"+menuId).addClass("menuSelected");
}

function liveTv(){
    var firstCh = null;
    $("#content").append("<div class='col-lg-9 col-md-9 col-sm-12 col-xs-12 pr0' id='player_area'></div>");
    $("#content").append("<div class='col-lg-3 col-md-3 col-sm-12 col-xs-12' id='channelList'><ul id='channelListLi'></ul></div>");//
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
        $("#content").append("<div class='col-lg-4 col-md-4 col-sm-12 col-xs-12 vodItems' id='m_"+movies[i].id+"'><div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 vodItems_'><table class='vod_info'><tr><td class='vod_info_img' onclick='playMovie("+movies[i].id+")'><img src='vod/"+movies[i].title+".jpg' /></td><td class='vod_info_desc'><b> Movie name:</b>"+movies[i].title+"<br/><b>Description:</b>"+movies[i].description+"<br/><b>Stars:</b>"+movies[i].stars+"</td></tr></table></div></div>");
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
            $("#player_area").empty();
            $("#player_area").append(JSPlayer());
            resizePlayer();
             playURL(getURL(id));
        }else if(type== "iOS"){
            $("#player_area").empty();
            $("#player_area").append(iosPlayer(getURL(id)));
            resizePlayer();
            var video = document.getElementById('iosplayer');
            video.play();
        }
    }else{
        $("#player_area").empty();
        $("#player_area").append(JSPlayer());
        resizePlayer();
         playURL(getURL(id));
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
        case 7: //Live TV
            liveTv();
            $("#wrapper").toggleClass("toggled");
            break;
        case 2: //Live TV
            vodList();
            $("#wrapper").toggleClass("toggled");
            break;  
        case 3: //Live TV
            createNewsCategories();
            $("#wrapper").toggleClass("toggled");
            break;  
    }
}

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}
