function prepareWorldRadio(){
    for (i = 0; i < world_radio.length; i++) {
        $("#content").append("<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'><div class='row'><div class='col-lg-6 col-md-6 col-sm-12 col-xs-12 radio_title'>"+world_radio[i].title+"</div><div class='col-lg-6 col-md-6 col-sm-12 col-xs-12'><audio id='r_"+world_radio[i].id+"' controls><source src='"+world_radio[i].path+"' type='audio/ogg;codecs=\"opus\"'>Your browser does not support the audio tag.</audio></div></div></div>");
    }
    setTimeout(function(){
        var vid = document.getElementById("r_1"); 
        vid.play(); 
    },1000);
    
    //var player = new rPlayer();
    //alert(world_radio[0].path);
   // player.play(world_radio[0].path);
    
    //console.log('Playing : ' + player.playing);
    //console.log('Volume : ' + player.volume);
    //console.log('Mute : ' + player.muted);
}


