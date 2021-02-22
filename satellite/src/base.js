// var htmlFont =parseInt($("html").eq(0).css("font-size"));
// var htmlFont = parseInt(document.documentElement.style.fontSize);
function getCurrentStyle(node) {
    var style = null;

    if (window.getComputedStyle) {
        style = window.getComputedStyle(node, null);
    } else {
        style = node.currentStyle;
    }

    return style;
}

// function addLeftEvent(){

//     $("ducument").ready(function () {
//         var styles = getCurrentStyle(document.documentElement);
//         console.log(styles["font-size"] + "htmlfont");
//         htmlFont = parseInt(styles["font-size"]);
//         console.log($("html").css("fontSize"));
    
//         var limit = 0.1 * htmlFont;        //我也不知道为什么他们用了一个10，没任何说明，点击toggle竟然用width来计算，也是没谁了；下个人重构把
//     // var limit =10;
//         $('.space').click(function () {
//             // 	            alert(JSON.stringify(jieshao.tianji));
    
//             $('.spaceList').toggle();
//             $('.spaceBorder').toggle();
//             $('#introduce').removeClass('show');
//             //$('.spaceList').css('border-bottom','1px solid #5D9992');
//             var icon = $('.icon1').width();
//             console.log(icon + " ----" + limit)
    
//             //    $(this).attr("show",true)
    
//             if (!$(this).attr("show")) {
//                 //				$('#introduce').css('display','none');
//                 $('.icon1').css({
//                     background: 'url(./img/icon_0005.png) no-repeat',
//                     width: '0.06rem',
//                     height: '0.11rem',
//                     backgroundPosition: "center",
//                     backgroundSize: "cover"
//                 });
//                 $(this).attr("show", "true");
    
//             } else {
//                 dataSelMap.type = "tianji";
//                 dataSelMap.name = "天基";
//                 IntroduceBox();
//                 $('.icon1').css({
//                     background: 'url(./img/icon4.png) no-repeat',
//                     width: '0.11rem',
//                     height: '0.06rem',
//                     backgroundPosition: "center",
//                     backgroundSize: "cover"
//                 });
//                 $(this).removeAttr("show")
//             }
//             $('.spaceList').toggleClass('show');
//             $('.spaceBorder').toggleClass('show');
    
//         });
//         $('.high').click(function () {
//             console.log("why no high")
//             $('.highList').toggle();
//             $('.highBorder').toggle();
//             $('#introduce').removeClass('show');
//             //var kongji = JSON.stringify(jieshao.kongji).replace(/\"/g, "");
          
//             if (!$(this).attr("show")) {
//                 $('.high .icon1').css({
//                     background: 'url(./img/icon_0005.png) no-repeat',
//                     width: '0.06rem',
//                     height: '0.11rem',
//                     backgroundPosition: "center",
//                     backgroundSize: "cover"
//                 });
//                 $(this).attr("show", "true");
//             } else {
//                 dataSelMap.type = "kongji";
//                 dataSelMap.name = "空基";
//                 IntroduceBox();
//                 /*$('.close').css('display', 'block');
//                  $('#introduce').css('display', 'block');
//                  $('#introduce').addClass('show');
//                  $('#content').html(kongji);
//                  $('#titles').html('空基');*/
//                 $('.high .icon1').css({
//                     background: 'url(./img/icon4.png) no-repeat',
//                     width: '0.11rem',
//                     height: '0.06rem',
//                     backgroundPosition: "center",
//                     backgroundSize: "cover"
//                 });
//                 $(this).removeAttr("show")
//             }
//             $('.highList').toggleClass('show');
//             $('.highBorder').toggleClass('show');
//         });
//         $('.ground').click(function () {
//             $('.groundList').toggle();
//             $('.groundBorder').toggle();
//             $('#introduce').removeClass('show');
//             //var diji = JSON.stringify(jieshao.diji).replace(/\"/g, "");
//             var icon = $('.icon3').width();
//             if (!$(this).attr("show")) {
//                 $('.ground .icon1').css({
//                     background: 'url(./img/icon_0005.png) no-repeat',
//                     width: '0.06rem',
//                     height: '0.11rem',
//                     backgroundPosition: "center",
//                     backgroundSize: "cover"
//                 });
//                 $(this).attr("show", "true");
//             } else {
//                 dataSelMap.type = "diji";
//                 dataSelMap.name = "地基";
//                 IntroduceBox();
//                 /*  $('#introduce').css('display', 'block');
//                  $('#introduce').addClass('show');
//                  $('#content').html(diji);
//                  $('#titles').html('地基');*/
//                 $('.ground .icon1').css({
//                     background: 'url(./img/icon4.png) no-repeat',
//                     width: '0.11rem',
//                     height: '0.06rem',
//                     backgroundPosition: "center",
//                     backgroundSize: "cover"
//                 });
//                 $(this).removeAttr("show")
//             }
//             $('.groundList').toggleClass('show');
//             $('.groundBorder').toggleClass('show');
//         }).click().click();
//         $('.trades').click(function () {
//             $('.tradesList').toggle();
//             $('.tradesBorder').toggle();
//             $('#introduce').removeClass('show');
//             //var hangyeshuju = JSON.stringify(jieshao.hangyeshuju).replace(/\"/g, "");
//             var icon = $('.icon4').width();
//             if (!$(this).attr("show")) {
//                 $('.trades .icon1').css({
//                     background: 'url(./img/icon_0005.png) no-repeat',
//                     width: '0.06rem',
//                     height: '0.11rem',
//                     backgroundPosition: "center",
//                     backgroundSize: "cover"
//                 });
//                 $(this).attr("show", "true");
//             } else {
//                 dataSelMap.type = "hangye";
//                 dataSelMap.name = "行业数据";
//                 IntroduceBox();
//                 /* $('#introduce').css('display', 'block');
//                  $('#introduce').addClass('show');
//                  $('#content').html(hangyeshuju);
//                  $('#titles').html('行业数据');*/
//                 $('.trades .icon1').css({
//                     background: 'url(./img/icon4.png) no-repeat',
//                     width: '0.11rem',
//                     height: '0.06rem',
//                     backgroundPosition: "center",
//                     backgroundSize: "cover"
//                 });
//                 $(this).removeAttr("show")
//             }
//             $('.tradesList').toggleClass('show');
//             $('.tradesBorder').toggleClass('show');
//         });
//         $('.radiation').click(function () {
//             $('.radiationList').toggle();
//             $('.radiationBorder').toggle();
//             $('#introduce').removeClass('show');
//             //var zhutishuju = JSON.stringify(jieshao.zhutishuju).replace(/\"/g, "");
    
//             var icon = $('.icon5').width();
//             if (!$(this).attr("show")) {
    
//                 $('.radiation .icon1').css({
//                     background: 'url(./img/icon_0005.png) no-repeat',
//                     width: '0.06rem',
//                     height: '0.11rem',
//                     backgroundPosition: "center",
//                     backgroundSize: "cover"
//                 });
//                 $(this).attr("show", "true");
//             } else {
//                 dataSelMap.type = "zhuti";
//                 dataSelMap.name = "主题数据";
//                 IntroduceBox();
//                 /*   $('#introduce').css('display', 'block');
//                  $('#introduce').addClass('show');
//                  $('#titles').html('主题数据');
//                  $('#content').html(zhutishuju);*/
//                 $('.radiation .icon1').css({
//                     background: 'url(./img/icon4.png) no-repeat',
//                     width: '0.11rem',
//                     height: '0.06rem',
//                     backgroundPosition: "center",
//                     backgroundSize: "cover"
//                 });
//                 $(this).removeAttr("show")
//             }
//             $('.radiationList').toggleClass('show');
//             $('.radiationBorder').toggleClass('show');
//         });
//         $('.product').click(function () {
//             $('.productList').toggle();
//             $('.productBorder').toggle();
//             $('#introduce').removeClass('show');
//             //var shujuchanpin = JSON.stringify(jieshao.shujuchanpin).replace(/\"/g, "");
    
//             var icon = $('.icon6').width();
//             if (!$(this).attr("show")) {
//                 $('.product .icon1').css({
//                     background: 'url(./img/icon_0005.png) no-repeat',
//                     backgroundPosition: "center",
//                     backgroundSize: "cover",
//                     width: '0.06rem',
//                     height: '0.11rem'
//                 });
//                 $(this).attr("show", "true");
//             } else {
//                 /*    $('#introduce').css('display', 'block');
//                  $('#introduce').addClass('show');
//                  $('#content').html(shujuchanpin);
//                  $('#titles').html('数据产品');*/
//                 $('.product .icon1').css({
//                     background: 'url(./img/icon4.png) no-repeat',
//                     width: '0.11rem',
//                     height: '0.06rem',
//                     backgroundPosition: "center",
//                     backgroundSize: "cover"
//                 });
//                 $(this).removeAttr("show")
//             }
//             $('.productList').toggleClass('show');
//             $('.productBorder').toggleClass('show');
//         });
//         $('.others').click(function () {
//             $('.othersList').toggle();
//             $('.othersBorder').toggle();
//             $('#introduce').removeClass('show');
//             //var qita = JSON.stringify(jieshao.qita).replace(/\"/g, "");
//             var icon = $('.icon7').width();
//             if (!$(this).attr("show")) {
//                 $('.others .icon1').css({
//                     background: 'url(./img/icon_0005.png) no-repeat',
//                     width: '0.06rem',
//                     height: '0.11rem',
//                     backgroundPosition: "center",
//                     backgroundSize: "cover"
//                 });
//                 $(this).attr("show", "true");
//             } else {
//                 /*  $('#introduce').css('display', 'block');
//                  $('#introduce').addClass('show');
//                  $('#content').html(qita);
//                  $('#titles').html('其他');*/
//                 $('.others .icon1').css({
//                     background: 'url(./img/icon4.png) no-repeat',
//                     width: '0.11rem',
//                     height: '0.06rem',
//                     backgroundPosition: "center",
//                     backgroundSize: "cover"
//                 });
//                 $(this).removeAttr("show")
//             }
//             $('.othersList').toggleClass('show');
//             $('.othersBorder').toggleClass('show');
//         });
//     })
// }
$(".rightLine .close").on("click", function () {
    $(".rightLine").hide();
    $(".recommendBox").css("width", "0.22rem");
});
$(".IntroduceBox .close").on("click", function () {
    //$(".IntroduceBox").addClass("off");
    $(".IntroduceBox").removeClass("show");
})
/*$("#line1").on("click", function () {
    if ($(this).hasClass("down")) {
        var height = $(".digestBox .contentBox").height();
        gundongmap.top1 = gundongmap.top1 - height;
        if (gundongmap.height1 - (-gundongmap.top1) > height) {
            $(".digestBox #content").css("top", gundongmap.top1 + "px");
        } else {
            $(this).removeClass("down");
            $(this).addClass("up");
            $(".digestBox #content").css("top", gundongmap.top1 + "px");
        }
    } else {
        var height = $(".contentBox").height();
        gundongmap.top1 = gundongmap.top1 + height;
        if (gundongmap.top1 < 0) {
            $(".digestBox #content").css("top", gundongmap.top1 + "px");
        } else {
            $(this).removeClass("up");
            $(this).addClass("down");
            $(".digestBox #content").css("top", "0px");
        }
    }

});*/
$("#line1 .down").on("click", function () {
    $(".digestBox .infos").hide();
    var height = $(".digestBox .contentBox").height();
    gundongmap.top1 = gundongmap.top1 - height;
    var chazhi=gundongmap.height1 - (-gundongmap.top1);
    $("#line1 .up").show();
    if ( chazhi>=height) {
        $("#line1 .down").show();
        $(".digestBox #content").css("top", gundongmap.top1 + "px");
    } else {
        //gundongmap.top1=gundongmap.top1+height;
        $(".digestBox #content").css("top", gundongmap.top1 + "px");
        $("#line1 .down").hide();
        //$(".digestBox .infos").html("已到底部");
        //$(".digestBox .infos").show();

    }
});
$("#line1 .up").on("click", function () {
    $(".digestBox .infos").hide();
    var height = $(".digestBox .contentBox").height();
    gundongmap.top1 = gundongmap.top1 + height;
    $("#line1 .down").show();
    if(gundongmap.top1==0){
        $(".digestBox #content").css("top", gundongmap.top1 + "px");
        $("#line1 .up").hide();
    }else{
        $("#line1 .up").show();
        $(".digestBox #content").css("top", gundongmap.top1 + "px");
    }
});
$(".digestBox .infos").on("mouseover",function(){
    $(this).hide();
});
/*$("#line2").on("click", function () {
    if ($(this).hasClass("down")) {
        var height = $(".detailBox .contentBox").height();
        gundongmap.top2 = gundongmap.top2 - height;
        if (gundongmap.height2 - (-gundongmap.top2) > height) {
            $(".detailBox #content").css("top", gundongmap.top2 + "px");
        } else {
            $(this).removeClass("down");
            $(this).addClass("up");
            $(".detailBox #content").css("top", gundongmap.top2 + "px");
        }
    } else {
        var height = $(".detailBox .contentBox").height();
        gundongmap.top2 = gundongmap.top2 + height;
        if (gundongmap.top2 < 0) {
            $(".detailBox #content").css("top", gundongmap.top2 + "px");
        } else {
            $(this).removeClass("up");
            $(this).addClass("down");
            $(".detailBox #content").css("top", "0px");
        }
    }

});*/
$("#line2 .down").on("click", function () {
    $(".detailBox .infos").hide();
    var height = $(".detailBox .contentBox").height();
    gundongmap.top2 = gundongmap.top2 - height;
    var chazhi=gundongmap.height2 - (-gundongmap.top2);
    $("#line2 .up").show();
    if ( chazhi>=height) {
        $(".detailBox #content").css("top", gundongmap.top2 + "px");
        $("#line2 .down").show();
    } else {
        //gundongmap.top2=gundongmap.top2+height;
        $(".detailBox #content").css("top", gundongmap.top2 + "px");
        $("#line2 .down").hide();
        

    }
});
$("#line2 .up").on("click", function () {
    $(".detailBox .infos").hide();
    var height = $(".detailBox .contentBox").height();
    gundongmap.top2 = gundongmap.top2 + height;
   /* if (gundongmap.top2 > 0) {
        $("#line2 .down").show();
        $(".detailBox #content").css("top", gundongmap.top2 + "px");
    } else {
        gundongmap.top2=0;
        $(".detailBox #content").css("top", gundongmap.top2 + "px");
        $("#line2 .up").show();
        //$(".detailBox .infos").html("已到顶部");
        //$(".detailBox .infos").show();
    }*/
    $("#line2 .down").show();
    if(gundongmap.top2==0){
        $(".detailBox #content").css("top", gundongmap.top2 + "px");
        $("#line2 .up").show();
    }else{
        $("#line2 .up").hide();
        $(".detailBox #content").css("top", gundongmap.top2 + "px");
    }
});
$(".rightLine li").on("click", function () {
    $(this).toggleClass("uncheck");
    var id = $(this).attr("id");
    if ($(this).hasClass("uncheck")) {
        $("#" + id + "_Icon").hide();
    } else {
        $("#" + id + "_Icon").show();
    }
})
$(".leftLine div").on("mouseover", function () {
    var child = $(this).children();
    var className = $(this).attr("class");
    /*var names=className.split("_");
     if(!child.hasClass("cel")){
     child.show();
     }*/
    if (className != dataSelMap.clickDiv && !child.hasClass("cel")) {
        child.show();
    }
});
$(".leftLine div").on("mouseout", function () {
    var child = $(this).children();
    var className = $(this).attr("class");
    /*if(!child.hasClass("cel")){
     child.hide();
     }*/
    if (className != dataSelMap.clickDiv && !child.hasClass("cel")) {
        child.hide();
    }
});

$(".bottomBox li").on("mouseover", function () {
    var child = $(this).children();
    if (!child.hasClass("bsel")) {
        child.addClass("bsel");
    }
});
$(".bottomBox li").on("mouseout", function () {
    var child = $(this).children();
    if (child.hasClass("bsel")) {
        child.removeClass("bsel");
    }
});
$(".leftLine #more").on("click", function () {
    $(".rightLine").toggleClass("show");
    if ($(".rightLine").hasClass("show")) {
        //$(".rightLogo").css("right","0.1rem");
        $(".recommendBox").css("width", "1.8rem");
    } else {
        //$(".rightLogo").css("right","0.5rem");
        $(".recommendBox").css("width", "0.22rem");
    }

});
$(".leftLine .icon").on("click", function () {
    var id = $(this).attr("id");
    var child = $(this).children();
    if (!child.hasClass("cel")) {
        $(".leftLine .child").removeClass("cel");
        $(".leftLine .child").hide();
        var names = id.split("_");
        for (var key in dataSelMap) {
            if (key != "type" && key != "name") {
                if (key == names[0]) {
                    dataSelMap[key] = 1
                    dataSelMap.clickDiv = key + "_Icon";
                } else {
                    dataSelMap[key] = 0;
                }
            }
        }
        //$("."+className+" .child").addClass("cel");
        //$("."+className+" .child").show();
        child.addClass("cel");
        child.show();
        //$(".IntroduceBox").addClass("show");
        var dataObj = mapList[dataSelMap.type];
        if (dataObj != undefined) {
            changeothers(dataObj);
        }
    } else {
        $(this).children().removeClass("cel");
        //$(".IntroduceBox").removeClass("show");
    }
    var cel = $(".cel");
    if (cel.length > 0) {

    } else {
        $(".detailBox").hide();
    }
});
$("#tucengBox").on("click", function () {
    //$(".tucengListBox").toggleClass("show");
    var array = $(".active1");
    if (array.length > 0) {
        $(".tucengListBox").toggleClass("show");
    }
    else {
        $(".tucengListBox").removeClass("show");
    }
})
/*
 function initLunbo() {
 window.clearInterval(lunbo.sss);
 var fixedHeight = $(".contentBox").height();
 lunbo.top = fixedHeight - 20;
 lunbo.index = 0;
 $('#content').css('top', '0px');
 var height = $('#content').height();
 if (height > fixedHeight) {
 lunbo.lines = Math.ceil(height / 20);
 //lunbo.top=236;
 lunbo.chazhi = -height;
 $('#content').css('top', lunbo.top + 'px');
 initgundong();
 }
 }*/
/* $(function () {
    $('.space').click();
    $('.high').click();
    $('.trades').click();
    $('.radiation').click();
    $('.product').click();
    $('.others').click();
    // $(".groundList li:nth-child(2)").click();
});
 */

