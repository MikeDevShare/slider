;(function($){
	
	"use strict";
	
    $(document).ready(function(){
        
        /* Twitter
		================================================== */
        var utsharetwitter = function() {
            window.open( 'http://twitter.com/intent/tweet?text='+$(".page-title").text() +' '+window.location,
            "Twitter",
            "width=650,height=350" );
            return false;
        }
        
        /* Facebook
		================================================== */
        var utsharefacebook = function(){
            window.open( 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),
            'facebook',
            'width=650,height=350');
            return false;
        }
        
        /* Google Plus
		================================================== */
        var utsharegoogle = function(){
            window.open( 'https://plus.google.com/share?url='+encodeURIComponent(location.href),
            'googleWindow',
            'width=500,height=500');
            return false;
        }
        
        /* Linkedin
		================================================== */
        var utsharelinkedin = function(){
            window.open( 'http://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(location.href)+'$title='+$(".page-title").text(),
            'linkedinWindow',
            'width=650,height=450, resizable=1');
            return false;
        }
        
        /* Pinterest
		================================================== */
        var utsharepinterest = function(){
            window.open( 'http://pinterest.com/pin/create/bookmarklet/?media='+ $('.entry-content img').first().attr('src') + '&description='+jQuery('.page-title').text()+' '+encodeURIComponent(location.href),
            'pinterestWindow',
            'width=750,height=430, resizable=1');
            return false;
        }
        
        /* Xing
		================================================== */
        var utsharexing = function(){
            window.open( 'https://www.xing-share.com/app/user?op=share;sc_p=xing-share;url='+encodeURIComponent(location.href),
            'deliciousWindow',
            'width=550,height=550, resizable=1');
            return false;
        }
        
        /* Button Script
		================================================== */
        $(".ut-share-link").click( function( event ) {
            
            var social = $(this).data("social"),
                fn = window[social];
            
            if (typeof fn === "function") fn();
            
            event.preventDefault();
            
        });

    });
	
})(jQuery);
 /* ]]> */