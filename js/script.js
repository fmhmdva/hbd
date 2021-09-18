var browser = navigator.userAgent.toLowerCase().indexOf('safari'); 
console.log(browser)
var cake_click = 0;
var envelope_click = 0;
var myTimeout
showPopUp(700)
// console.log(ua.indexOf('safari'))

$('body').on('click', '.door', function(e) {
    e.preventDefault();
    var timed = false;
    $(this).addClass('open');
    setTimeout(function(){
        $(".house").addClass('scale')
        setTimeout(function(){
            if(window.location.href.search("index")){
                var current = window.location.href.substring(0,window.location.href.indexOf("index"))
                location.href=current+"interior.html"
            }
            else{
                location.href=window.location.href+"/interior.html"
            }
            
        },2100)
    },500)
  
});


document.querySelector("body").addEventListener('mousemove', eyeball);
function eyeball(){
    var eye = document.querySelectorAll(".eye i");
    eye.forEach(function (eye) {
        let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
        let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
        let radian = Math.atan2(event.pageX - x, event.pageY - y);
        let rot = (radian * (180 / Math.PI) * -1) + 270;
        eye.style.transform = "rotate(" + rot + "deg)";
    });
}

$("#close_dialogue").click(function(){
    closePopUp()
})

$('#cake').click(function(){
    if(!$(this).hasClass('piece') && cake_click==0){
        $(this).addClass('piece')
        $('.one_piece').removeClass('d-none')
        $('.piece_plate').removeClass('d-none')
        cake_click+=1
        console.log(envelope_click)
        if(envelope_click==0){
            showPopUp(1500,"Stolun qarşısındakı məktuba oxşayır.<br> Bəlkə içində maraqlı nəsə yazılıb?<br> Aç və birlikdə oxuyaq ")
            return
        }

    }
    else if($(this).hasClass('piece') && cake_click>0){
        showPopUp(200,"Hey axı sənə çoxlu şirniyat yemək olmaz.<br> Bu qədər bəsdir.")
        return
    }
})

$('body').on('click', '.chandelier', function() {
    var el     = $(this),  
    newone = el.clone(true);
          
    el.before(newone);
        
    el.hide();
    console.log("." + el.attr("class"))
  
});

$('.wrapper-envelope, .lid, .envelope, .letter').click(function(e){
    clearTimeout(myTimeout);
    e.preventDefault()
    envelope_click+=1
    $(".background-black").slideDown()
    $("#notebook-paper").slideDown()
    if(browser !=-1){
        $("#living_room").fadeOut()
        $(".wrapper").fadeOut()
    }

})

$("#close_envelope").click(function(){
    $(".background-black").slideUp()
    $("#notebook-paper").slideUp()
    $("#notebook-paper").slideUp()
    $("#container-gift").fadeIn()
    if(browser !=-1){
        $("#living_room").fadeIn()
        $(".wrapper").fadeIn()
    }
})



function showPopUp(time,text){
    myTimeout = setTimeout(function(){
        if(browser !=-1){
            $("#living_room").fadeOut()
            $(".wrapper").fadeOut()
        }
        $(".background-black").slideDown()
        $(".bubble").fadeIn().css({'display':'flex'})
        $(".box").slideDown()
        if(text){
            $(".bubble .text").html(text)
        }
    },time)
}

function closePopUp(){
    $(".bubble").fadeOut()
    $(".box").slideUp()
    $(".background-black").slideUp()
    if(browser !=-1){
        $("#living_room").fadeIn()
        $(".wrapper").fadeIn()
    }
}