function initShowNum() {
    $yearDom = $("<div></div>");
    $yearDom.addClass("year");
    var $yearNum = $("<div></div>").addClass("num");
    var $yearNian = $("<div>年</div>").addClass("nian");

    $yearDom.append($yearNum);
    $yearDom.append($yearNian);
    $stations = $("<div></div>").addClass("station");

    groundSNum = $("<div></div>").addClass("singleType").addClass("NationalGroundStation");
    var htmlg = '<div class="year"></div>';
    htmlg += '<div class="type">' + '站（地面<span></span>）' + '</div>';
    groundSNum.html(htmlg);

    gaokongNum = $("<div></div>").addClass("singleType").addClass("NationalWelkinStation");
    var htmlgk = '<div class="year">' + 2000 + '</div>';
    htmlgk += '<div class="type">' + '站（高空<span></span>）' + '</div>';
    gaokongNum.html(htmlgk);


    leidaNum = $("<div></div>").addClass("singleType").addClass("NationalRadiationStation");
    var htmll = '<div class="year"></div>';
    htmll += '<div class="type">' + '站（辐射<span></span>）' + '</div>';
    leidaNum.html(htmll);
    
    $(".stationNumber").append($yearDom);
    $(".stationNumber").append($stations);

}


function initNum() {
    var $station1 = $(".station").eq(0).empty();
    var length1 = State.types.length;
    console.log(length1 + "length1")
    if (length1 == 0) {
        return;
    }else if(length1==1){
        gaokongNum.css("height", "1.1rem").css("font-size", "0.4rem").css("lineHeight", "1.1rem");
        groundSNum.css("height","1.1rem").css("font-size", "0.4rem").css("lineHeight", "1.1rem");
        leidaNum.css("height", "1.1rem").css("font-size", "0.4rem").css("lineHeight", "1.1rem");
    }else if(length1==2){
        gaokongNum.css("height", "0.6rem").css("font-size", "0.3rem").css("lineHeight", "0.6rem");
        groundSNum.css("height", "0.6rem").css("font-size", "0.3rem").css("lineHeight", "0.6rem");
        leidaNum.css("height", "0.6rem").css("font-size",   "0.3rem").css("lineHeight", "0.6rem");
    }else{
        gaokongNum.css("height","0.45rem").css("font-size", "0.25rem").css("lineHeight", "0.45rem");
        groundSNum.css("height","0.45rem").css("font-size", "0.25rem").css("lineHeight", "0.45rem");
        leidaNum.css("height","0.45rem").css("font-size", "0.25rem").css("lineHeight", "0.45rem");
    }

   


    State.types.forEach(function (type) {
        switch (type) {
            case "NationalWelkinStation":
                $station1.append(gaokongNum);
                break;
            case "NationalGroundStation":
                $station1.append(groundSNum);
                break;
            case "NationalRadiationStation":
                $station1.append(leidaNum);
                break;
        }
    })
}