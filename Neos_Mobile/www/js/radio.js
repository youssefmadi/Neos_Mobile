var audio_current_id = 1;

function prepareWorldRadio(){
    for (i = 0; i < world_radio.length; i++) {
        $("#content").append("<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'><div class='row'><div class='col-lg-6 col-md-6 col-sm-12 col-xs-12 radio_title'>"+world_radio[i].title+"</div><div class='col-lg-6 col-md-6 col-sm-12 col-xs-12'><audio onplay='start_playing("+world_radio[i].id+")' id='r_"+world_radio[i].id+"' controls class='audtag'><source src='"+world_radio[i].path+"' type='audio/ogg;codecs=\"opus\"'>Your browser does not support the audio tag.</audio></div></div></div>");
    }
    setTimeout(function(){
        var aud = document.getElementById("r_"+audio_current_id);
        aud.play();
    },1000);
}

function start_playing(id){
    if(audio_current_id!=id){
        var aud_tmp = document.getElementById("r_"+audio_current_id);
        aud_tmp.pause();

        aud_tmp = document.getElementById("r_"+id);
        aud_tmp.play();
        
        audio_current_id = id;
    }
    //$(".audtag" ).each(function() {
         //alert($(this).attr("id"));
    //});
}


