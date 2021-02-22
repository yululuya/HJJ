// var fdbackUrl = "/idata/web/feed/dpzsFeedBack"; // 反馈收集的url
var fdbackUrl = "http://10.1.64.154/idata/web/feed/dpzsFeedBack";

// var fdbackUrl = "http://localhost:3008";  // 反馈收集的url



$(".feedbacks input").on('click', function (e) {
    $(this).focus()
    e.stopPropagation();
    return false;
})

$(".feedbacks input").eq(0).on("blur", function (e) {
    if ($(this).val().trim() == "") {
        this.value = '';
        $(this).css("border-color", "#ff0000");
    } else {
        $(this).css("border-color", "#97fffe");
    }
})
$(".feedbacks textarea").eq(0).on("blur", function (e) {
    if ($(this).val().trim() == "") {
        this.value = '';
        $(this).css("border-color", "#ff0000");
    } else {
        $(this).css("border-color", "#97fffe");
    }
})





/* document.querySelectorAll(".feedbacks input").forEach(function(element,index){
    element.addEventListener('click',function(e){
        this.focus();
        e.stopPropagation();  
    },false)
}) */

$(".feedbacks textarea").on('click', function (e) {
    $(this).focus();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
})

$("#feedbackcommit").click(function (e) {
    console.log("触发了吗")
    var title = $("input[name='title']").val();
    var content = $(".masker [name='content'").val();
    if (title.trim() == "") {
        $(".feedbacks input").eq(0).val("").css("border-color", "#ff0000");
        return;
    }
    if (content.trim() == "") {
        $(".masker [name='content'").val("").css("border-color", "#ff0000");
        return;
    }
    var name = $("input[name='name']").val();
    var phone = $("input[name='phone']").val();
    var email = $("input[name='email']").val();
    $(".masker input").val('');

    $(".masker textarea").val('');
    console.log(title + content + name + phone + email)
    var fdt = title + "_;_" + name + "_;_" + phone + "_;_" + email;
    var data = {
        "fdTitle": fdt,
        "fdContext": content
    }
    console.log(data)
    $.ajax({
        type: 'POST',
        url: fdbackUrl,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (data) {
            console.log(data)
        },
        error: function (e) {
            console.log(e)
        }
    })
    // console.log($('.masker').html())
    $("#feedback").click();
    $(".masker").hide();
    // console.log("提交");

})


$("#feedbackcancel").on("click", function () {
    $(".masker input").val('');
    $(".masker textarea").val('');
    $("#feedback").click();
    $(".masker").hide();
})