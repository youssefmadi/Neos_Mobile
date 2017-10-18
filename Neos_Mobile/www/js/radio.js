function prepareWorldRadio(){
    for (i = 0; i < 1; i++) {
        //$("#content").append("<div class='row'><div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'><button id='play'>Play</button></div></div>");
    }
    $("#content").append("<audio controls autoplay><source src='http://radio90live.go.ro:8000/listen.opus' type='audio/ogg;codecs=\"opus\"'>Your browser does not support the audio tag.</audio>");
    

    //var player = new rPlayer();
    //alert(world_radio[0].path);
   // player.play(world_radio[0].path);
    
    //console.log('Playing : ' + player.playing);
    //console.log('Volume : ' + player.volume);
    //console.log('Mute : ' + player.muted);
}


