function prepareWorldRadio(){
    for (i = 0; i < 1; i++) {
        $("#content").append("<div class='row'><div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'><button id='play'>Play</button></div></div>");
    }
    var player = new rPlayer();

    player.play(world_radio[0].path);
    
    //console.log('Playing : ' + player.playing);
    //console.log('Volume : ' + player.volume);
    //console.log('Mute : ' + player.muted);
}


