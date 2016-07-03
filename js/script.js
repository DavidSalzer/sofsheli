//var isMobile = {
//    Android: function () {
//        return navigator.userAgent.match(/Android/i);
//    },
//    BlackBerry: function () {
//        return navigator.userAgent.match(/BlackBerry/i);
//    },
//    iOS: function () {
//        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
//    },
//    Opera: function () {
//        return navigator.userAgent.match(/Opera Mini/i);
//    },
//    Windows: function () {
//        return navigator.userAgent.match(/IEMobile/i);
//    },
//    any: function () {
//        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
//    }
//};

//if (isMobile.any()) {
//    $('.desktop').css('display', 'none');
//    $('.mobile').css('display', 'block');
//} else {
//    $('.desktop').css('display', 'block');
//    $('.mobile').css('display', 'none');
//}

//detect if its smartphone: redirect to old site
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    if (screen.width < 768) {
        $('.desktop').css('display', 'none');
        $('.mobile').css('display', 'block');
    }

    else if (screen.width > 768 && screen.width < 1200) {
        $('.desktop').css('display', 'none');
        $('.mobile').css('display', 'block');
    }

    else {
        $('.desktop').css('display', 'block');
        $('.mobile').css('display', 'none');
    }

}
else {
    $('.desktop').css('display', 'block');
    $('.mobile').css('display', 'none');

}