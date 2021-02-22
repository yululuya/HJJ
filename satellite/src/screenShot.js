var jcrop_api;
var cPosition = undefined;
var masker;
function screenShot() {
    var height = document.body.clientHeight;
    var body = document.body;
    html2canvas(document.body, {
            'allowTraint': true,
            height: height
        }).then(function (canvas) {
        $.mask_fullscreen(-1, "正在启动截图工具...");
        var url = getUrl(canvas)

        var height = document.body.clientHeight;
        var width = document.body.clientWidth;
        masker = document.createElement('img');
        masker.onload = function () {
            $.mask_close_all();
            maskerstyle = `position:absolute;width:${width};height:${height}`;
            console.log(maskerstyle)
            masker.setAttribute('style', maskerstyle);
            masker.id = "selector"
            masker.setAttribute('id', 'selector')
            body.appendChild(masker);

            jQuery(function ($) {

                $('#selector')
                    .Jcrop({
                        onChange: showCoords,
                        onSelect: showCoords,
                        onRelease: clearCoords
                    }, function () {
                        jcrop_api = this;
                    });

                $('#coords').on('change', 'input', function (e) {
                    var x1 = $('#x1').val(),
                        x2 = $('#x2').val(),
                        y1 = $('#y1').val(),
                        y2 = $('#y2').val();
                    jcrop_api.setSelect([x1, y1, x2, y2]);
                });

            });
            $('.jcrop-holder').css('z-index', '9999');
            $('.jcrop-holder').css('position', 'absolute');
            $('.jcrop-holder').css('top', '0');

            var shotBoxStyle = "position:absolute;top:0;right:0px;z-index:9999;"
            var button = `<div id="selector" style=${shotBoxStyle}>
               <button id="shotConf" style="background:transparent;border: 1px solid #0a9df1; color:#0a9df1 ">确定</button><button id="shotCanc" style="background:transparent;border: 1px solid #0a9df1; color:#0a9df1 ">取消</button>
            </div>
           `
            $("#selector").css('background', '#fff')

            $(button).appendTo($('.jcrop-holder>div').eq(0))
            $('#shotCanc').on('click', closeShot);

            $('#shotConf').on('click', confirmShot);

            function confirmShot(e) {
                console.log(cPosition)
                $('#shotConf').off('click');

                var winWidth = $(document).width();
                var winHeight = $(document).height();

                var downUrl = getUrl(canvas);

                var canvas2 = $('<canvas width="' + cPosition.w + '" height="' + cPosition.h + '"></canvas>')[0],
                    ctx = canvas2.getContext('2d');
                console.log(ctx)
                // ctx.drawImage(canvas, 0, 0, winWidth, winHeight, 0, 0, cPosition.w,
                // cPosition.h); ctx.drawImage(canvas, 0,0, winWidth,
                // winHeight,cPosition.x1,cPosition.y1,cPosition.w,cPosition.h);
                console.log(cPosition.w + "   " + cPosition.h)
                ctx.drawImage(canvas, cPosition.x, cPosition.y, cPosition.w, cPosition.h, 0, 0, cPosition.w, cPosition.h);

                var urlEnd = getUrl(canvas2);

                download(urlEnd);
                // download(downUrl)

                $(masker).remove()

                jcrop_api.destroy();

            }

            function closeShot(e) {
                $('#selectClose').off('click');
                $(masker).remove()
                jcrop_api.destroy();

            }
        }

        masker.src = url;

    })

}

/**
 * download the image
 * @param {*string} url
 */
function download(url) {
    var a = document.createElement('a'); //这里建一个a标签，用于下面下载图片
    a.href = url;
    // var time = Date.now().valueOf();

    var date = new Date();

    var name = location.hostname + formatDate(new Date(),"yyyy-MM-dd-hh-mm-ss");
    a.download = name; //fileName是下载的图片名称
    var e = document.createEvent('MouseEvents');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e); //触发点击事件，开始下载
}

function formatDate(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) 
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        
        if (new RegExp("(" + k + ")").test(fmt)) {

            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)? (o[k]): (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
/**
 * canvas to url;   chrome  has  bug if only  use   canvas.toDataUrl()
 * @param {*dom} canvas
 */
function getUrl(canvas) {
    //底图
    var url = canvas.toDataURL();
    var bytes = window.atob(url.split(",")[1]); //base64Str是base64编码的字符串
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    var image = new Blob([ab], {type: 'image/png'});
    var url = URL.createObjectURL(image);
    return url;
}

/**
 * remember the  information
 * @param {*obj} c
 */
function showCoords(c) {
    cPosition = c;
};

/**
 * destory the  screenAction
 */
function clearCoords() {
    if (masker) {

        $(masker).remove()
    }
    jcrop_api.destroy()
};

$('#screenshot').click(function (e) {
    // console.log(e.target.id)
    $(e.target)
        .children("div")
        .hide();
    screenShot();
})

$("#screenshot").hover(function (e) {
    $(e.target)
        .children("div")
        .show();
}, function (e) {
    $(e.target)
        .children("div")
        .hide();
})