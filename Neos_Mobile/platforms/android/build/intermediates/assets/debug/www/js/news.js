var MainNewCat = new Array();
var ChildNewCat = new Array();
var NewsFeed = new Array();
var NewsCategories = new Array();
var NewsContent = new Array();
var newsCategoryScroll = null;
var newsScroll = null;
var currentNewsCat = null;


$( window ).resize(function() {
    newsOnScreenSize();
    newsDetailsOnScreenSize();
});

function newsCategories() {
    //var langId 		= language.langToID(stbMemory.language);
    var langId = 1;
    var providers = MainNewCat[langId].split('###')[0];
    providers = providers.split('!!!!');
    var categories = '';

    for (var i = 0; i < providers.length; i++) {
        var providerID = providers[i].split('*')[1];
        var startSep = (i == 0) ? '' : '!!!!';
        var hasSub = providers[i].split('*')[3];
        if (hasSub == '0')
            categories += startSep + providers[i];
        else { // fetch sub cat first
            categories += startSep + ChildNewCat[providerID].split('###')[0];
        }
    }
    // getting all ids

    var allIds = categories.split('!!!!');
    for (i = 0; i < allIds.length; i++) {
        NewsCategories.push({id: allIds[i].split("*")[1], title: allIds[i].split("*")[0]});
    }

    var tmp1 = null;
    var tmp2 = null;
    for (i = 0; i < allIds.length; i++) {
        tmp1 = NewsFeed[(allIds[i].split('*')[1])].split("###")[0];
        tmp2 = tmp1.split("!!!!");
        for (j = 0; j < tmp2.length; j++) {
            NewsContent.push({id: allIds[i].split("*")[1], title: tmp2[j].split("*")[1], text: tmp2[j].split("*")[2], date: tmp2[j].split("*")[3]});
        }
    }
}

function createNewsCategories() {
    $("#content").append("<div class='col-lg-3 col-md-3 col-sm-3 col-xs-5 pr0' id='newCatListContainer'><ul id='newCatList'></ul></div>");
    for (i = 0; i < NewsCategories.length; i++) {
        $("#newCatList").append("<li id='newsCatCont_" + NewsCategories[i].id + "' onclick='showNews(" + NewsCategories[i].id + ")'><a href='#' id='newsCat_" + NewsCategories[i].id + "' >" + NewsCategories[i].title + "</a></li>");
    }
    //setTimeout("newsCategoryScroll = applyScroll('newCatListContainer')", 100);
    newsOnScreenSize();
    $("#content").append("<div class='col-lg-9 col-md-9 col-sm-9 col-xs-7 pl0'  id='newCatListContainerDetails'><ul id='newCatListDetails'></ul></div>");

    /*
    $("#newsListContainer").empty();
    $("#newsListContainer").append("<ul id='newsList' data-role='listview' data-inset='true' class='leftList'></ul>");

    for (i = 0; i < NewsCategories.length; i++) {
        $("#newsList").append("<li data-icon='false'><a href='#' data-role='button' data-rel='page' data-transition='slide' id='newsCat_" + NewsCategories[i].id + "' onclick='showNews(" + NewsCategories[i].id + ")'>" + NewsCategories[i].title + "</a></li>");
    }
    $("#newsList").listview();
    newsOnScreenSize();
    */
}

function applyScroll(id) {
    return new iScroll("" + id, {
        snap: false,
        momentum: true,
        hScrollbar: true,
        vScrollbar: true,
        hideScrollbar: true,
        fadeScrollbar: true,
        onScrollEnd: function() {
        }
    });
}


function newsOnScreenSize() {
    if($("#newCatListContainer").length>0){
        $("#newCatListContainer").css("margin-top", $(".topHeader").height() + "px !important;");
        $("#newCatListContainer").height($(window).height() - $(".topHeader").height());

        if (newsCategoryScroll == null) {
            setTimeout("newsCategoryScroll = applyScroll('newCatListContainer')", 100);
        } else {
            setTimeout("newsCategoryScroll.refresh()", 100);
        }
    }
}


function showNews(newsCat) {
    $("#newCatListDetails").empty();
    $(".catSelected").removeClass("catSelected");
    $("#newsCatCont_"+newsCat).addClass("catSelected");
    for (i = 0; i < NewsContent.length; i++) {
        if (newsCat == NewsContent[i].id) {
            $("#newCatListDetails").append("<li><a href='#' style='white-space:normal;'><span class='newsTitle'>" + NewsContent[i].title + "</span><br/>" + NewsContent[i].text + "</a></li>");
        }
    }
    newsDetailsOnScreenSize();
    
    /*
    if (currentNewsCat != null) {
        $("#newsCat_" + currentNewsCat).removeClass("selectedOptionLight");
        $("#newsCat_" + currentNewsCat).addClass("unSelectedOptionLight");
    }
    currentNewsCat = newsCat;
    $("#newsCat_" + currentNewsCat).removeClass("unSelectedOptionLight");
    $("#newsCat_" + currentNewsCat).addClass("selectedOptionLight");


    if (currentShow == 1 && screenLimit()) {
        showPage(false);
    }

    $("#newsContainer").empty();
    newsScroll = null;
    $("#newsContainer").append("<ul id='newList' data-role='listview' data-inset='true' class='leftList'></ul>");

    for (i = 0; i < NewsContent.length; i++) {
        if (newsCat == NewsContent[i].id) {
            $("#newList").append("<li data-icon='false'><a href='#' data-rel='page' style='white-space:normal;'><span class='newsTitle'>" + NewsContent[i].title + "</span><br/>" + NewsContent[i].text + "</a></li>");
        }
    }
    $("#newList").listview();
    newsDetailsOnScreenSize();
    */
}

function newsDetailsOnScreenSize() {
    if ($("#newCatListContainerDetails li").length > 0) {
        $("#newCatListContainerDetails").css("margin-top", $(".topHeader").height() + "px !important;");
        $("#newCatListContainerDetails").height($(window).height() - $(".topHeader").height());
        if (newsScroll == null) {
            setTimeout("newsScroll = applyScroll('newCatListContainerDetails')", 100);
            newsScroll.scrollTo(0, 0);
        } else {
            setTimeout("newsScroll.refresh()", 100);
             newsScroll.scrollTo(0, 0);
        }
    }
}
