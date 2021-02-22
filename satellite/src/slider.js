var timer;

/**
 * 十大事件的轮播图场景
 * @param year
 * @param index
 * @param type
 * @param data
 */
function showSlider(year, index, type,data) {
   
    if(mapMode!=3){
        mapMode =3;
        stationContainer = earth;
        toggleEarthMapForHot();  // 换成球体坐标的十大事件
    }
   
    $(".event_list_container").eq(0).unbind();
    

        /**
         * 地球位置巷巷调整
         */
        var tween2 = new TWEEN.Tween(earth.position) // Create a new tween that modifies 'coords'.
            .to({
                x: 0,
                y: 150,
                z: 0
            }, 2000) // 这里是调整地球的位置
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            .onUpdate(function () { // Called after tween.js updates 'coords'.
                // Move 'box' to the position described by 'coords' with a CSS translation.
                // box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)');
            })
            .start(); // Start the tween immediately.
        //外层光圈位置调整
        var tween4 = new TWEEN.Tween(shanderball.position) // Create a new tween that modifies 'coords'.
            .to({
                x: 0,
                y: 150,
                z: 0
            }, 2000) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            .onUpdate(function () { // Called after tween.js updates 'coords'.
                // Move 'box' to the position described by 'coords' with a CSS translation.
                // box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)');
            })
            .start(); // Start the tween immediately.
       // 球体大小调整
        var tween3 = new TWEEN.Tween({
                scale: scaleN
            }) // Create a new tween that modifies 'coords'.
            .to({
                scale: 0.6
            }, 2000) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            .onUpdate(function () { // Called after tween.js updates 'coords'.
                scaleN = this.scale;
                // earth.scale.set(scaleN, scaleN, scaleN)
            })
            .start(); // 调整地球的大小






        /**
         * 创建左侧列表
         */

        var eventList = $(".event_list_container").eq(0);
        var eventListHtml =
        '    <div class="listTitle">      ' ;

             eventListHtml+='  <span class="eventTitle"><span>'+year+'年</span>';

         if(type=="FRHotEvent"){

             eventListHtml+='  <span class="yellow">国外</span><span>十大天气气候事件</span></div>';
            }else{
                eventListHtml+='  <span class="yellow">国内</span><span>十大天气气候事件</span></div>';

         }



        eventListHtml+='    <div class="eventlist">'+
        '        <ul>';
        
        for(var j=0,len=data.length;j<len;j++){
            eventListHtml+=
            '            <li index = "'+j+'">'+
            ' <div class="date">'+
            '                    <span class="event_index">'+(j+1)+'</span>'+
            '                    <span class="talkbubble">'+data[j].date+'</span>'+
            '                </div>'+
            '                <h3>'+data[j].title+'</h3>'+
            '            </li>';
        }
        

        eventListHtml+='        </ul>'+'    </div>';
        eventList.html(eventListHtml).show();


       var lis =  $('.event_list_container li')
       lis.eq(0).addClass('important');
       lis.eq(1).addClass('important');
       lis.eq(2).addClass('important');



        /**
         * 滚动元素
         */
      
        var html = '<ul class="slider">';
        for (var i = 0; i < data.length; i++) {
            html += '<li class="" id=' + i + '>';
            // html += '<img src="' + data[i].img + '">';
            html += '<img src="' + './assets/images/hotevent/'+type+year+'/'+data[i].index+'.png' + '">';
            html += '</li>';
        }

        html += "</ul>";
        // console.log(html);
        $("#hotEventSlider").html(html);
        $(".hotEvent").eq(0).animate({
            bottom: "1.8rem"
        }, 2000);

        $('#closeHotEvent').animate({
            bottom: "0.4rem"
        }, 2000);

        var slider_li = $("ul.slider li");

        var slider_ul = $("ul.slider").eq(0);

        //后面的东西
        for (var i = 3; i < slider_li.length; i++) {
            slider_li.eq(i).stop().animate({

                width: "2.56rem",

                height: "1.28rem",

                top: "-2.18rem",

                left: "7.50rem",
                opacity: 0

            }, 2000).css("z-index", 10);

        }
        //初始化前三个

        slider_li.eq(0).stop().animate({

            width: "6.0rem",

            height: "3.72rem",

            top: 0,

            left: "0.43rem",
            "opacity": 1

        }, 17).css("z-index", 50);
        // $("")

        // updataHotEventDetail(data, 0)




        slider_li.eq(1).stop().animate({

            width: "4rem",

            height: "2.1rem",

            top: "-1.16rem",
            opacity: 0.6,

            left: "4.94rem"

        }, 17).css("z-index", 30);

        slider_li.eq(2).stop().animate({ //中间最大

            width: "2.56rem",

            height: "1.28rem",

            top: "-2.18rem",

            left: "7.50rem",
            opacity: 0.3

        }, 17).css("z-index", 20);





        //列表的点击事件
        $(".event_list_container").eq(0).on('click',"li",listClick);
         function listClick(event){
        
          lis.removeClass('active');
        //   rotateToLatlon(0,0,0);
           
    
           var index = $(this).attr("index");
        //    rotateToEvent(data[index].lat,data[index].lon);
           rotateToLatLng(data[index].lat-5,data[index].lon);
        //    rotateToLatLng2(data[index].lat,data[index].lon+90);
        // rotateToLatLngNormal(data[index].lat - 10, data[index].lon + 30, 0, THREE.Math.degToRad(23.4));
           console.log(type);
           S3Hotsport(index,type,data);


           $(this).addClass('active');
           var slider_lis = $("ul.slider li");
        //    console.log(index+"存在吗")
           var slider_li_c = $("ul.slider li[id="+index+"]");
           var forIndex = slider_lis.index(slider_li_c);
        //    console.log(forIndex+"为什么只有一次")
           turnToIndex(forIndex,data);
          
     
         }






        $("ul.slider").click(nextOne)
   
        // 下一个
        function nextOne(times,j) {
            // turnToIndex(1,data);
           var index3= +$("ul.slider li").eq(0).attr("id")+1;
            if(index3>9){index3=0}
           $(".event_list_container li[index="+index3+"]").eq(0).click();
                      
        }
        // 转到对应的热点事件
        function turnToIndex(times,data){
            // console.log(j)
            var during = 1000;
            // var slider_li = 
           
            console.log(data)
            for(var i =0;i<times;i++){
                   
                    $("ul.slider li").eq(0).css("width", "2.56rem").css("height", "1.28rem").css('top', "-2.18rem").css('left', "7.50rem").css("z-index", 20).appendTo($("ul.slider").eq(0));
            }


            $("ul.slider li").eq(0).stop(false, true).animate({

                width: "7.2rem",

                height: "4rem",

                top: 0,
                opacity: 1,

                left: "0.0rem"

            }, during).css("z-index", 50);

            $("ul.slider li").eq(1).stop(false, true).animate({

                width: "4rem",
                opacity: 0.6,
                height: "2.1rem",

                top: "-1.16rem",

                left: "4.94rem"

            }, during).css("z-index", 30);

            $("ul.slider li").eq(2).stop(false, true).animate({

                width: "2.56rem",

                height: "1.28rem",
                opacity: 0.3,
                top: "-2.18rem",

                left: "7.50rem"

            }
            ,during).css("z-index", 20);


            updataHotEventDetail(data, $("ul.slider li").eq(0).attr("id"));
             
        }
        






        $(".event_list_container li[index="+(index-1)+"]").eq(0).click();
 


}

// showSlider(2017)
var j = 1;
var timerDetial;

/**
 * 更新热点事件的内容
 * @param data
 * @param id
 */
function updataHotEventDetail(data, id) {
   
    // console.log("受理单" + j++)
    
    var cdata = data[+id];
    // console.log(cdata)
    var title = $(".eventTitle").eq(0);
    var detail = $(".eventDetail").eq(0);
  
    detail.stop().animate({
        width: 0,
        height: 0
    }, 17)
    var titleHTML =
        "<span>事件</span>" +
        "<h2> " + cdata.title + "</h2>" +
        "<span>日期</span>" +
        "<h3>" + cdata.date + "</h3>";
    // title.html(titleHTML);

    var detailHTML =
        "<h3>事件详情</h3>" +
        "<div class = 'detailWrapper'>" +
        "<div class = 'detail'>" + cdata.description + "</div></div>";
    detail.html(detailHTML);

    detail.stop().animate({
        width: "3rem",
        height: "3.8rem"
    }, 2000);

    var dt = $(".eventDetail .detail");
    var dtHeight = $(".eventDetail .detail").eq(0).height();
    var wrHeight = $(".eventDetail .detailWrapper").eq(0).height();
    if (dtHeight > wrHeight) {
        console.log(dtHeight + " " + wrHeight)
        var marginTop = 0;
        var diff = dtHeight - wrHeight + 10;
        timerDetial = setInterval(function () {
            if (marginTop < diff) {
                marginTop++;
            } else {
                marginTop = 0;
            }
            dt.css("margin-top", -marginTop + "px")
        }, 100)
    }

}

function rotateToEvent(lng,lat){
  
    targetEarthRotationY = THREE.Math.degToRad(lng);
    targetEarthRotationX = THREE.Math.degToRad(lat);
}


// 将前两个十大事件的图标放大
function  S3Hotsport(index,type1,data){
    if(!State.hotEventTypes.length){
        return;
    };
    
    var objs2 = earth.getObjectByName(type1);
    objs2.children.forEach(function(obj,index1){
        if(index1<2){
            obj.getObjectByName("hotspot").scale.set(0.6,0.6,0.6);
            return;
        }else{
            obj.getObjectByName("hotspot").scale.set(0.3,0.3,0.3);
        }
    })
    objs2.getObjectByName(data[index].name).getObjectByName("hotspot").scale.set(0.6,0.6,0.6);

}