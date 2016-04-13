/*Version 0.0.01
Changelog:
========0.0.01======
Add auto scroll
fix fold effect
====================
*/
var ch_opt = 'fold';
var caption_speed = 1500;
var hide_caption_hover = false;
var go_from = 0;
var auto_scroll = true;
jQuery(document).ready(function() {
	goSlide();
	if( auto_scroll == true ){
		var active_slide_now = '';
		setInterval("active_slide_now = jQuery('.slider').find('figure.next').attr('rel');sliderJS(active_slide_now,jQuery(\'.slider\'),ch_opt);",5000);
	}	
});
function sliderStart(){
	setInterval(goSlide,5000);
}
function make_active(obj,sl){
	jQuery(".slider .nav span").removeAttr('disabled');
	jQuery(sl).find("span").removeClass("on"); 
	jQuery('span[rel='+obj+']').addClass("on");
	jQuery('span[rel='+obj+']').attr('disabled','disabled');	
}
function sliderJS (obj, sl,ch_opt) { // slider function
	var capt = jQuery(sl).find("figure.slider-"+obj+" figcaption").html();
	
	if(typeof capt == 'undefined')
		jQuery(sl).find('.figcaption').remove();
	switch(ch_opt){
		case 'fade':
			jQuery(sl).find('figure.slider-'+obj).fadeIn('slow');
			jQuery(sl).find('.for-clear-situation').height(jQuery(sl).find('figure.slider-'+obj+" img").height()); 
			if(typeof capt != 'undefined')
				jQuery(sl).find('.nav').before("<div class='figcaption' style='position:absolute;z-index:10000;bottom:7%;'>"+capt+"</div>");
			rm_nx_pr(sl);			
			set_first_last(obj,sl);
			if( auto_scroll == true ){
				make_active(obj,sl);						
			}
			jQuery(sl).find('figure.active').fadeOut('slow').removeClass('active');
			jQuery(sl).find('figure.slider-'+obj).addClass('active');
			add_nx_pr(obj,sl);
		break;
		case 'move': 
			var ofset = jQuery(sl).width();
			jQuery(sl).find(".slide-wrap").animate({
				left: -obj*ofset+"px"
			},{
				duration: 700,
				complete: function(){	
					if( auto_scroll == true ){
						make_active(obj,sl);	
						rm_nx_pr(sl);
						var ths = jQuery('figure.slider-'+obj);						
						jQuery(sl).find('figure.active').removeClass('active');			
						jQuery(sl).find('figure.slider-'+obj).addClass('active');
						add_nx_pr(obj,sl);
					}
					if(typeof capt != 'undefined')
						jQuery(sl).find('.nav').before("<div class='figcaption' style='position:absolute;z-index:10000;bottom:7%;'>"+capt+"</div>");

					//jQuery(sl).find('.figcaption').html(capt);
				}
			});
		break;
		case 'fold':
			
			jQuery(sl).find('figure.slider-'+obj).show('slow',function(){				
				//jQuery(sl).find('.figcaption').html(capt);
				if(typeof capt != 'undefined')
				jQuery(sl).find('.nav').before("<div class='figcaption' style='position:absolute;z-index:10000;bottom:7%;'>"+capt+"</div>");
				
			});
			jQuery(sl).find('.for-clear-situation').height(jQuery(sl).find('figure.slider-'+obj+" img").height()); 
			rm_nx_pr(sl);
		  	rm_activ_sl(sl);
		  	add_activ_sl(obj,sl);
		  	if( auto_scroll == true ){
				make_active(obj,sl);						
			}
			add_nx_pr(obj,sl);
		break;
	}	
}
function set_first_last(obj,sl){
	if( jQuery(sl).find('figure.slider-'+obj).is(":last-child") ){
		jQuery(sl).find('figure').first().addClass('next');
	}	
	if( jQuery(sl).find('figure.slider-'+obj).is(":first-child") ){
		jQuery(sl).find('figure').last().addClass('prev');
	}	
}
function rm_activ_sl(sl){
	jQuery(sl).find('figure').removeClass('active');
}
function add_activ_sl(obj,sl){
	jQuery(sl).find('figure.slider-'+obj).addClass('active');
}
function rm_nx_pr(sl){
	jQuery(sl).find('figure.next').removeClass('next');
	jQuery(sl).find('figure.prev').removeClass('prev');
}
function add_nx_pr(obj,sl){
	jQuery(sl).find('figure.slider-'+obj).prev().addClass('prev');
	jQuery(sl).find('figure.slider-'+obj).next().addClass('next');
	var nxt = jQuery(sl).find('figure.slider-'+obj).next();
	if( typeof nxt[0] == 'undefined' ){
		jQuery(sl).find('figure.slider-'+go_from).addClass('next');
	}
}

function goSlide(){
	jQuery(".slider").each(function () { 
		var obj = jQuery(this);
		jQuery(obj).append("<div class='figcaption' style='position:absolute;z-index:10000;bottom:7%;'></div>");
		jQuery(obj).append("<div class='nav'></div>");

		var block_width = 0;
		var sl_cnt = jQuery(obj).find("figure").length;/*Slide count*/
		jQuery(obj).find('.slide-wrap').width(jQuery(obj).width()*sl_cnt);

		jQuery(obj).find("figure").each(function () {
			jQuery(this).addClass("slider-"+jQuery(this).index());
			jQuery(this).find("figcaption").hide();
			
			jQuery(this).attr('rel',jQuery(this).index());
			jQuery(obj).find(".nav").append("<span rel='"+jQuery(this).index()+"'></span>"); /*add nav block*/
		//	jQuery(this).width(jQuery(this).find('img').width());
		});
		jQuery(obj).find(".nav").append('<div class="clearfix"></div>');
		if( go_from == 0 ){
			jQuery(obj).find("figure").first().addClass("active");
			var capt = jQuery(obj).find("figure figcaption").html();
			jQuery(obj).find("span").first().addClass("on").attr('disabled','disabled'); 
			jQuery(obj).find('.figcaption').html(capt);
			if( jQuery(obj).find('figure').is(":first-child") ){
				jQuery(obj).find('figure').last().addClass('prev');
			}	
		}else{
			var capt = jQuery(obj).find("figure.slider-"+go_from+" figcaption").html();
			jQuery(obj).find('.figcaption').html(capt);

			if( jQuery(obj).find("figure.slider-"+go_from).is(":last-child") ){
				jQuery(obj).find('figure').first().addClass('next');
			}
			jQuery(obj).find("figure.slider-"+go_from).addClass("active");
			jQuery(obj).find("span[rel="+go_from+"]").addClass("on");
			jQuery(obj).find("span[rel="+go_from+"]").attr('disabled','disabled');			
		}
		jQuery(obj).find("figure.active").prev().addClass('prev');
		jQuery(obj).find("figure.active").next().addClass('next');
		jQuery(obj).find('.for-clear-situation').height(jQuery(obj).find("figure.active img").height()); 
		
		
	 	
	 	jQuery(window).resize(function(){
			jQuery(obj).find('.for-clear-situation').height(jQuery(obj).find("figure.active img").height()); 

		});
		if(hide_caption_hover){
			jQuery(".slider figure").hover(function(){
				jQuery(this).find('figcaption').animate({
					bottom: "4px",
					height: ["swing"]
				},caption_speed);
			},function(){
				jQuery(this).find('figcaption').animate({
					bottom: "-120px"
				},"slow");
			});
		}else{
			jQuery(".slider figure").find('figcaption').css('bottom',4);
		}

		switch(ch_opt){
			case 'move': 		
				if( go_from == 0 ){
					//	console.log(jQuery(obj),go_from,jQuery(obj).find(".slide-wrap"));
					jQuery(obj).find(".slide-wrap").css("left","0px");
				}
				else{
					jQuery(obj).find(".slide-wrap").css("left",-go_from*jQuery(obj).width());
				}
			break;
			case 'fade':
				 jQuery(obj).find(".slide-wrap").width('100%');	
				 jQuery(obj).find("figure").addClass('withFade');
			break;	
			case 'fold':
				 jQuery(obj).find(".slide-wrap").width('100%');	
				 jQuery(obj).find("figure").addClass('withFade');
			break;	
		}	
	});
	jQuery(document).on("click", ".slider .nav span", function() { // slider click navigate
		if( jQuery(this).attr('disabled') != "disabled" ){
			jQuery(".slider .nav span").removeAttr('disabled');
			var sl = jQuery(this).parent().parent();
			jQuery(sl).find("span").removeClass("on"); 

			jQuery(this).addClass("on");
			jQuery(this).attr('disabled','disabled');
			var slide_num = jQuery(this).attr("rel");	
			sliderJS(slide_num, sl,ch_opt);
		}
		return false;
	});
	
}

