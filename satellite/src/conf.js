var now = (new Date()).getFullYear(); //时间轴上显示的最大年份
var degtorad = Math.PI / 180;

var minRot = Math.PI / 180 * 90; //初始的转到的最小弧度  时间轴是从2度 开始有数字的

var maxRot = minRot + Math.PI / 180 * ((now - 1950) * 4 + 3); //时间轴向右侧旋转的最大刻度

// var targetRotationX = Math.PI / 180 * -365; //这货是什么
var targetRotationX = -maxRot; //这货是什么
// console.log(targetRotationX)

var fdbackUrl = "10.1.64.154/idata/web/feed/dpzsFeedBack";

/**
 *左侧添加菜单栏
 * @param {*} url
 */

function addLeftBar(url1, selector) {
    // console.log("进入了吗")
    var $left = $(selector).empty();
    $.ajax({
        url: url1,
        type: 'GET',
        dataType: 'xml',
        success: function(xml) {
            // console.log($(xml)); 这里的xml是全局的document对象，第一个子对象是 顶层div
            $(xml).children()
                .children('div')
                .each(function(index, element) {
                    var $element = $(element);
                    // console.log($element);
                    var name = $element.attr("name");
                    var cname = $element.attr("cname");
                    var html = '<div class="itemContaner hideitem">';
                    html += '<div class="' + name + '">';
                    html += '<img class="topBorder" src="./img/boxBorder.png">';
                    html += '<b class="leftBorder"></b>';
                    html += '<span class="text">' + cname + '</span>';
                    html += '<span class="icon1" value="1"></span>';
                    html += '<img class="bottomBorder" src="./img/boxBorder.png">';
                    html += '</div>';
                    html += ' <ul class="' + name + 'List">';
                    $element
                        .children('div')
                        .each(function(index, element) {
                            var $element = $(element);
                            var name = $element.attr("name");
                            var cname = $element.attr("cname");
                            var href = $element.attr("href");
                            if (!!name) {
                                //    有数据的项
                                if (name == "AreaStation" || name == "HYDROLOGY_STATION") {
                                    html += '<li type="' + name + '" name="' + cname + '" class="zileixing">';
                                } else {
                                    html += '<li type="' + name + '" name="' + cname + '" class="leixing">';
                                }

                                //二级菜单
                                /* html += '<span class="click"></span><span class="nav_list">' + cname + '</span>'; */
                                html += '<span class="click_second"></span><span class="nav_list">' + cname + '</span>';


                                html += '</li>';

                                //三级菜单
                                if ($element.children("div").length != 0) {
                                    html += '<li  style="display:none;" class="' + name + '_list">';

                                    html += '<ul class="level3">';
                                    $element
                                        .children("div")
                                        .each(function(i, element) {
                                            var $element = $(element);
                                            var name = $element.attr("name");
                                            var cname = $element.attr("cname");

                                            //三级菜单
                                            if (name == "jiangshui" || name == "turang" || name == "hedaoshuiqing" || name == "AreaStation_kh" || name == "AreaStation_fkh") {

                                                html += '  <li type="' + name + '" name="' + cname + '" class="leixing"><span class="click_third"></span><span class="nav_list">' + cname + '</span></li>';

                                            } else {
                                                html += '  <li type="' + name + '" name="' + cname + '" class="zileixing"><span class="click_third"></span><span class="nav_list">' + cname + '</span></li>';

                                            }
                                        })
                                    html += "</ul>";
                                    html += "</li>";
                                }
                            } else {
                                //没数据的选框
                                if (!href) {
                                    html += '<li  style="color: #b2b3b3;">';
                                    html += '<span class="unclick"></span>';
                                    html += '<span>' + cname + '</span>';
                                    html += '</li>';
                                } else {
                                    html += '<li  style="color: #b2b3b3;">';
                                    html += `<span class="click"></span><a  toiframe=${href}  href="javascript:void(0);">${cname}</a>`;
                                    html += '</li>';
                                }

                            }

                        })
                    html += '</ul></div>';
                    // console.log(html)
                    // console.log("\n")
                    $(html).appendTo($left);

                })


            /**
             * 数据产品展示 内容定义 弹出iframe
             */


            $(".left li a").click(function(e) {


                e.stopPropagation();
                if ($(this).parent("li").siblings().hasClass("active1")) {
                    !$(this).parent("li").siblings().removeClass("active1")
                }
                if (!$(this).parent("li").hasClass("active1")) {
                    $(this).parent("li").addClass("active1");
                } else {
                    $(this).parent("li").removeClass("active1");
                    if (isInIframe) {
                        $(".iframe").eq(0).animate({
                            bottom: "-32rem"
                        }, 2000);
                        $(".stop").show();
                        $("#home").show();
                        $("#tucengBox").show();
                        $(".tucengListBox").attr("style", "")
                        $("#planeGlobe").show();
                        $(".leftLogo").show();
                        $(".rightLogo").show();
                        $(".recommendBox").show();
                        $(".filterTime").show();
                        // $(".tab").show();



                        timeline.position.set(timeLinePosition.x, timeLinePosition.y, timeLinePosition.z)

                        if (mapMode != 2) {
                            var tween2 = new TWEEN.Tween(earth.position) // Create a new tween that modifies 'coords'.
                                .to({
                                    x: 0,
                                    y: 0,
                                    z: 0
                                }, 2000) // Move to (300, 200) in 1 second.
                                .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                                .onUpdate(function() { // Called after tween.js updates 'coords'.
                                    // Move 'box' to the position described by 'coords' with a CSS translation.
                                    // box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)');
                                })
                                .start(); // Start the tween immediately.
                            var tween6 = new TWEEN.Tween(shanderball.position) // Create a new tween that modifies 'coords'.
                                .to({
                                    x: 0,
                                    y: 0,
                                    z: 0
                                }, 2000) // Move to (300, 200) in 1 second.
                                .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                                .onUpdate(function() { // Called after tween.js updates 'coords'.
                                    // Move 'box' to the position described by 'coords' with a CSS translation.
                                    // box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)');
                                })
                                .start(); // Start the tween immediately.

                            var tween3 = new TWEEN.Tween({
                                    scale: scaleN
                                }) // Create a new tween that modifies 'coords'.
                                .to({
                                    scale: 1
                                }, 2000) // Move to (300, 200) in 1 second.
                                .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                                .onUpdate(function() { // Called after tween.js updates 'coords'.
                                    scaleN = this.scale;
                                    // group.scale.set(scaleN, scaleN, scaleN)
                                })
                                .start(); // Start the tween immediately.

                        } else {
                            var tween3 = new TWEEN.Tween({
                                    scale: scaleM
                                }) // Create a new tween that modifies 'coords'.
                                .to({
                                    scale: 2.1
                                }, 2000) // Move to (300, 200) in 1 second.
                                .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                                .onUpdate(function() { // Called after tween.js updates 'coords'.
                                    scaleM = this.scale;
                                    // earth.scale.set(scaleN, scaleN, scaleN)
                                })
                                .start(); // Start the tween immediately.
                        }
                        $("#iframeBox iframe").attr("src", "");
                        isInIframe = false;
                    }
                    return;

                }
                //显示iframe
                if ($(this).attr("toiframe")) {
                    e.preventDefault();
                    var url = $(this).attr("toiframe");
                    //    console.log("iframe");
                    isInIframe = true;


                    $("#iframeBox iframe").attr("src", url);

                    $(".container .left").siblings().hide();
                    $(".leftLogo").show();
                    $(".rightLogo").show();
                    $("#home").hide();
                    $("#tucengBox").hide();
                    timeline.position.set(0, 0, 2000);


                    if (mapMode != 2) {

                        var tween2 = new TWEEN.Tween(earth.position) // Create a new tween that modifies 'coords'.
                            .to({
                                x: 0,
                                y: 850,
                                z: 0
                            }, 2000) // Move to (300, 200) in 1 second.
                            .easing(TWEEN.Easing.Quadratic.Out)
                            .onUpdate(function() {})
                            .start(); // Start the tween immediately.
                        var tween6 = new TWEEN.Tween(shanderball.position) // Create a new tween that modifies 'coords'.
                            .to({
                                x: 0,
                                y: 850,
                                z: 0
                            }, 2000) // Move to (300, 200) in 1 second.
                            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                            .onUpdate(function() { // Called after tween.js updates 'coords'.
                                // Move 'box' to the position described by 'coords' with a CSS translation.
                                // box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)');
                            })
                            .start(); // Start the tween immediately.

                        var tween3 = new TWEEN.Tween({
                                scale: scaleN
                            }) // Create a new tween that modifies 'coords'.
                            .to({
                                scale: 0.25
                            }, 2000) // Move to (300, 200) in 1 second.
                            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                            .onUpdate(function() { // Called after tween.js updates 'coords'.
                                scaleN = this.scale;
                                // earth.scale.set(scaleN, scaleN, scaleN)
                            })
                            .start(); // Start the tween immediately.



                    } else {
                        var tween3 = new TWEEN.Tween({
                                scale: scaleM
                            }) // Create a new tween that modifies 'coords'.
                            .to({
                                scale: 0.25
                            }, 2000) // Move to (300, 200) in 1 second.
                            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                            .onUpdate(function() { // Called after tween.js updates 'coords'.
                                scaleM = this.scale;
                                // earth.scale.set(scaleN, scaleN, scaleN)
                            })
                            .start(); // Start the tween immediately.
                    }


                    $(".iframe").eq(0).animate({
                        bottom: "0.5rem"
                    }, 2000);


                }

            })
            addLeftEvent2();


        },
        error: function(e) {
            // console.log("没有找到想要的配置数据");
        }

    });
}
addLeftBar("./index.xml", ".left");


function getCurrentStyle(node) {
    var style = null;

    if (window.getComputedStyle) {
        style = window.getComputedStyle(node, null);
    } else {
        style = node.currentStyle;
    }

    return style;
}


function addLeftEvent2() {
    $(".itemContaner").click(function(e) {
        $(this).toggleClass("hideitem");
        if ($(".left").height() / $("body").height() > 0.9) {

            $(this).siblings().addClass("hideitem");

        }
    })

}