var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
var browser = false

if(navigator.userAgent.toLowerCase().includes('safari') && !navigator.userAgent.toLowerCase().includes('chrome')){
    browser=true
}

var cake_click = 0;
var envelope_click = 0;
let gift_appear_status = false;
let violin_appear_status = false;
var myTimeout

const music = new Audio("music/music.m4a")
showPopUp(700)
// 

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
        
        if(envelope_click==0){
            showPopUp(1500,"Stolun qarşısındakı məktuba oxşayır.<br> Bəlkə içində maraqlı nəsə yazılıb?<br> Aç və birlikdə oxuyaq ")
            return
        }

    }
    else if($(this).hasClass('piece') && cake_click>0){
        
    
        clearTimeout(myTimeout);
        showPopUp(200,"Hey axı sənə çoxlu şirniyat yemək olmaz.<br> Bu qədər bəsdir.")
        return
    }
})

$('body').on('click', '.chandelier', function() {
    var el = $(this),  
    newone = el.clone(true);
          
    el.before(newone);
        
    el.hide();
    
  
});

$('.wrapper-envelope, .lid, .envelope, .letter').click(function(e){
    gift_appear_status = true;
    e.preventDefault()
    envelope_click+=1
    $(".background-black").slideDown()
    $("#notebook-paper").slideDown()
    if(browser){
        $("#living_room").fadeOut()
        $(".wrapper").fadeOut()
        $("#container-gift").fadeOut()
        $(".violin").fadeOut()
    }

})

$("#close_envelope").click(function(){
    $(".background-black").slideUp()
    $("#notebook-paper").slideUp()
    $("#notebook-paper").slideUp()
    $("#container-gift").css({"display":"flex"})
    if(browser){
        $("#living_room").fadeIn()
        $(".wrapper").fadeIn()
        if(gift_appear_status){
            $("#container-gift").fadeIn()
        }
        if(violin_appear_status){
            $("#container-gift").fadeIn()
            $(".violin").fadeIn()
        }
    }
})


$("#lid-gift, #box ").click(function(){
    violin_appear_status = true;
    $("#lid-gift").addClass('open-gift-box')
    setTimeout(()=>{
        $("#lid-gift").css({'display':'none'})
        if(browser){
            setTimeout(()=>{
                $(".violin").addClass('violin-tranform-safari')
                $(".violin").slideDown(1500)
                music.play();
            },500)
        }
        else{
            
            setTimeout(()=>{
                $(".violin").addClass('violin-tranform')
                $(".violin").slideDown(1500)
                music.play();
            },500)
        }
    },1000)
})



function showPopUp(time,text){
    
    
    myTimeout = setTimeout(function(){
        if(browser){
            $("#living_room").fadeOut()
            $(".wrapper").fadeOut()
            $("#container-gift").fadeOut()
            $(".violin").fadeOut()
            
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
    if(browser){
        $("#living_room").fadeIn()
        $(".wrapper").fadeIn()
        if(gift_appear_status){
            $("#container-gift").fadeIn()
        }
        if(violin_appear_status){
            $("#container-gift").fadeIn()
            $(".violin").fadeIn()
        }
    }
}