window.init = function(){

	if (/*@cc_on !@*/false && ( document.documentMode === 9 ) ) { $("body").addClass('ie9'); IDR.isIE=true;}
	if (/*@cc_on !@*/false && ( document.documentMode === 10 ) ) { $("body").addClass('ie10'); IDR.isIE=true;}


	function get_browser_info(){
	    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
	    if(/trident/i.test(M[1])){
	        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
	        return {name:'IE',version:(tem[1]||'')};
	        }   
	    if(M[1]==='Chrome'){
	        tem=ua.match(/\bOPR\/(\d+)/)
	        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
	        }   
	    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
	    return {
	      name: M[0],
	      version: M[1]
	    };
	 }


	 IDR.showingLanding = false;

	
	/* for  old ie */
	
	//if(IDR.isIE){
		//window.attachEvent('onblur', window.myApp.onBlur);
		//$(document).focus();
		//$(document).bind('focusout', function(){
		//	alert("sure you wnat leave?");
			//window.lastKnownVolume = IDR.audio.masterGain.gain.value;
		    //try { IDR.audio.masterGain.gain.value=0; } catch(e) { }
		//});
	//}

	

	// handle incoming vars
	var queryParams = $.getQueryParameters();
	//console.log(queryParams)
	
	// check for deep link
	if(window.slug) {
  		console.log(slug);
  		for(i=0;i<IDR.events.length;i++){
  			console.log(IDR.events[i].slug,slug);
  			if(IDR.events[i].slug==slug){ IDR.deepLinkID=IDR.events[i].id }
  		}

  		if(!IDR.deepLinkID){
  			// try for big ben
	  		for(i=0;i<IDR.alt_events.length;i++){
	  			console.log(IDR.alt_events[i].slug,slug);
	  			if(IDR.alt_events[i].slug==slug){ IDR.deepLinkID=IDR.alt_events[i].id }
	  		}
  		}

	} 

	if(IDR.deepLinkID ==21) { IDR.deepLinkID =2;}

	console.log("IDR Version " + IDR.version + " " + IDR.langauge_code);

	// test for webgl support
	if (window.WebGLRenderingContext) { IDR.webGLEnabled = true;} else { IDR.webGLEnabled = false; }
	if(queryParams.webGLEnabled=="false"){IDR.webGLEnabled = false;}
	
	/* override brwosers here */
	 IDR.browser=get_browser_info();
	 console.log("BROWSER", IDR.browser);
	 if(IDR.browser.name=="Safari" && IDR.browser.version<8.4){IDR.webGLEnabled = false;}

	 if(IDR.browser.name=="IE" && IDR.browser.version==11) { IDR.isIE11 = true;} else {  IDR.isIE11 = false; }
	 console.log("is ie11", IDR.isIE11 );

	 console.log("WebGL Enabled: " + IDR.webGLEnabled);


	// test for mobile and tablet
	IDR.isMobile = isMobile();
	console.log("Is Mobile: " + IDR.isMobile);

	// test for portrait view
	if (window.innerWidth < window.innerHeight) { IDR.isPortrait = true;} else { IDR.isPortrait = false; }
	console.log("Portrait enabled: " + IDR.isPortrait);

	// test for touch screen
	if ('ontouchstart' in window) { IDR.isTouch = true; } else { IDR.isTouch = false; }
	console.log("Touch Enabled: " + IDR.isTouch);

	// test for HTML5 download support
	IDR.isDownloadSupported =  ("download" in document.createElement("a"));
	
	// test if smallscreen mobile
	//console.log(screen.width);
	IDR.isSmallScreenMobile = (screen.width <= 375);
	console.log("Is Small Screen Mobile: " + IDR.isSmallScreenMobile);

	// set up audio engine
	IDR.audio = audio;
	if(queryParams.webAudioEnabled=="false"){ override = "disable"; } else {override=null;}
	IDR.audio.init(override);
	console.log("WebAudio API Enabled:" + IDR.audio.webAudioAPIEnabled);


	$(window).blur(function () {
	    // do some stuff after tab was changed e.g.
	    try { window.lastKnownVolume = IDR.audio.masterGain.gain.value;} catch(e){ window.lastKnownVolume=IDR.audio.legacySoundLevel;}
	    try { IDR.audio.masterGain.gain.value=0; } catch(e) { }
	    if(IDR.mode=="play") { $("#explore-button").click();}
	});

	$(window).focus(function () {
		if(window.lastKnownVolume){
			
			try { IDR.audio.masterGain.gain.value=window.lastKnownVolume; } catch(e) { IDR.audio.legacySoundLevel = window.lastKnownVolume; }

		}
	});




	//trackEvent({'page':{'name':'IDR','path':'/IDR'},'event':'vpv'})
	//dataLayer.push({'page':{'name':'IDR','path':'/IDR'},'event':'vpv'});

	// add traile in background
	addTrailer();

	// debug
	//console.log(IDR);

	// populate the content into the correct html elements
	for(i=0; i<IDR.landingSlides.length;i++){
		$("#landing .slides").append("<li class='slide show' id='slide_"+i+"'></li>");
		$("#slide_"+i).css({"background":"url("+ IDR.landingSlides[i].image + ")", "background-repeat":"no-repeat", "background-size":"cover", "background-position":"center center fixed"});
	}

	function chunk(str, n) {
	    var ret = [];
	    var i;
	    var len;

	    for(i = 0, len = str.length; i < len; i += n) {
	       ret.push(str.substr(i, n))
	    }

	    return ret
	};

	$(".landing-content").html(IDR.landing_content);
	$(".landing-title").html(IDR.landing_title);
	$(".landing-subtitle").html(IDR.landing_subtitle);
	$(".landing-tagline").html(IDR.landing_tagline);
	


	document.querySelector(".standard-header .title").innerHTML = IDR.title;
	document.querySelector(".standard-header .sub-title").innerHTML = chunk(IDR.subTitle,1).join("&nbsp;");
	document.querySelector(".mobile-header .title").innerHTML = IDR.mobileTitle;
	$(".event-title").html(IDR.event_title);
	$(".date-title").html(IDR.date_title);
	$(".share-title").html(IDR.share_title);
	$(".synopsis-title").html(IDR.synopsis_title);
	$(".download-title").html(IDR.download_title);
	$(".preview-text").html(IDR.view_more_title);
	$(".video-title").html(IDR.watch_video_title);
	$("#view-synopsis").html(IDR.full_synopsis_title);
	$("#hide-synopsis").html(IDR.hide_synopsis_title);
	$("#play-button span").html(IDR.play_button_text);
	$("#explore-button span").html(IDR.explore_button_text);

	$("#gallery-back-button span").html(IDR.gallery_back_button_text);
	$("#gallery-next-button span").html(IDR.gallery_next_button_text);
	
	$(".twitter-share-button").attr("data-text",IDR.social_twiiter_text);

	$("#mobile-overlay-title").html(IDR.title);
	$("#mobile-overlay-sub-title").html(IDR.subTitle);

	$("#instructions_text").html(IDR.instructions_text);
	$("#instructions_thumb1_text").html(IDR.instructions_thumb1_text);
	$("#instructions_thumb2_text").html(IDR.instructions_thumb2_text);
	$("#instructions_thumb3_text").html(IDR.instructions_thumb3_text);
	$("#instructions_thumb1_title").html(IDR.instructions_thumb1_title);
	$("#instructions_thumb2_title").html(IDR.instructions_thumb2_title);
	$("#instructions_thumb3_title").html(IDR.instructions_thumb3_title);

	// standard nav
	var nc = '<ul>';
	for (i=0;i<IDR.nav.length;i++){
		var n = IDR.nav[i];
		nc+='<li id="'+n.id+'"">';
		if(n.image){nc+='<img src="'+n.image+'" />';} else {nc+=n.text;}
		nc+='</li>';
	}

	// add sound button
	nc+='<li id="sound">';
		nc+='<span id="bar-1" class="bar"></span>';
		nc+='<span id="bar-2" class="bar"></span>';
		nc+='<span id="bar-3" class="bar"></span>';
		nc+='<span id="bar-4" class="bar"></span>';
	nc+='</li>';
	nc+='</ul>';
	document.querySelector(".standard-header nav").innerHTML = nc;

	// mobile nav
	var mc = '<ul>';
	for (i=4;i<IDR.nav.length;i++){
		var m = IDR.nav[i];
		mc+='<li id="'+m.id+'"">';
		if(m.image){mc+='<img src="'+m.image+'" />';} else {mc+=m.text;}
		mc+='</li>';
	}
	mc+='</ul>';

	$("nav", "#mobile-overlay").html( mc );
	$("#trailer", "#mobile-overlay").html(IDR.nav[2].text);
	$("#signup", "#mobile-overlay").html(IDR.nav[1].text);
	$("#tickets", "#mobile-overlay").html(IDR.nav[3].text);
	$("#join", "#mobile-overlay").html('<img src="'+IDR.nav[0].image+'" />');

	// Add in any videos we need to pre-set for content sections
	for(i=0;i<IDR.events.length;i++){
		var e =IDR.events[i];
		if(e.video){
			$("#video_holder").append(
		    '<video id="video_'+e.id+'"width="1024" height="512" preload="auto" loop ><source src="'+e.video+'" type="video/mp4"></source></video>');
		}
	}


	// add listeners to html elements
	document.querySelector("#enter-button").addEventListener("click",enterButtonClicked);
	document.querySelector("#trailer-close-button").addEventListener("click",closeTrailerClicked);

	document.querySelector(".standard-header #join").addEventListener("click",joinClicked);
	document.querySelector(".standard-header #tickets").addEventListener("click",ticketsClicked);

	document.querySelector(".standard-header #signup").addEventListener("click",signupClicked);
	document.querySelector(".standard-header #trailer").addEventListener("click",trailerClicked);
	document.querySelector(".standard-header #facebook").addEventListener("click",facebookClicked);
	document.querySelector(".standard-header #twitter").addEventListener("click",twitterClicked);
	document.querySelector(".standard-header #googleplus").addEventListener("click",googleClicked);
	document.querySelector(".standard-header #youtube").addEventListener("click",youtubeClicked);
	document.querySelector(".standard-header #sound").addEventListener("click",soundClicked);

	document.querySelector("#mobile-overlay #signup").addEventListener("click",MsignupClicked);
	document.querySelector("#mobile-overlay #trailer").addEventListener("click",MtrailerClicked);
	$("#mobile-overlay #youtube").click(MyoutubeClicked);
	$("#mobile-overlay #sound").click(MsoundClicked);

	document.querySelector("#mobile-overlay #join").addEventListener("click",MjoinClicked);
	document.querySelector("#mobile-overlay #tickets").addEventListener("click",MticketsClicked);

	// SOCIAL ROLLOVERS Clicks

	$("#fb-like").click(function(){
		//url = location.protocol + '//' + location.host;
		//url = "http://google.com/";
		FB.ui(
		 {
		  method: 'like',
		  href: 'https://developers.facebook.com/docs/'
		}, function(response){});
		
	});

	$("#fb-share").click(function(){
		url = location.protocol + '//' + location.host;
		FB.ui({
		  method: 'share',
		  href:  url
		}, function(response){
			trackEvent({'social':{'network':'Facebook','action':'Share','target':url},'event':'sa'});
		});
	});



	$("#twitter").mouseenter(function(){
		$(".share-links").removeClass("show");
		$("#twiter-share-links").addClass("show");
		IDR.showingSocialLinks = true;
	});

	$("#facebook").mouseenter(function(){
		$(".share-links").removeClass("show");
		$("#facebook-share-links").addClass("show");
		IDR.showingSocialLinks = true;
	});

	$("#googleplus").mouseenter(function(){
		$(".share-links").removeClass("show");
		$("#google-share-links").addClass("show");
		IDR.showingSocialLinks = true;
	});

	$(".share-links").mouseleave(function(){
		$(".share-links").removeClass("show");
		IDR.showingSocialLinks = false;
	}); 

	$("#sound").mouseenter(function(){
		$(".share-links").removeClass("show");
		IDR.showingSocialLinks = false;
	}); 

	$("#youtube").mouseenter(function(){
		$(".share-links").removeClass("show");
		IDR.showingSocialLinks = false;
	}); 

	$("#signup").mouseenter(function(){
		$(".share-links").removeClass("show");
		IDR.showingSocialLinks = false;
	}); 

	$("#trailer").mouseenter(function(){
		$(".share-links").removeClass("show");
		IDR.showingSocialLinks = false;
	}); 


	// mobiel social clicks
	$("#twitter","#mobile-overlay").click(function(){
		console.log("here");
		$(".share-links").removeClass("show");
		$("#twiter-share-links").addClass("show");
		IDR.showingSocialLinks = true;
	});

	$("#facebook","#mobile-overlay").click(function(){
		$(".share-links").removeClass("show");
		$("#facebook-share-links").addClass("show");
		IDR.showingSocialLinks = true;
	});

	$("#googleplus","#mobile-overlay").click(function(){
		$(".share-links").removeClass("show");
		$("#google-share-links").addClass("show");
		IDR.showingSocialLinks = true;
	});




	// SET UP FOX REG FORM HANDLERS
	var foxSignup = new FoxSignup();
	$("#signup-form").validate(foxSignup.formValidatorOptions());
	// or validate yourself (e.g. onchange) and delegate the submit $("#signup-form").submit(foxAjaxSubmitHandler);  
	// to customize some behaviour after the user signups define a onAjaxCallback function 
    foxSignup.onAjaxCallback = function(e){
    	console.log('signed up');
    	// hide the signup form
    	$("#signupFormContainer").removeClass("show");
    }

    $("#close-signup").click(function(){$("#signupFormContainer").removeClass("show"); showingSignup=false;});

    window.signupHandler = function(genres){
    	console.log('signed up here as well');
    	signupHandler.foxSignUp.sendTracking();
    	$("#signupFormContainer").removeClass("show");
    	setTimeout(function(){$("#signup-form").html('<h2>THANK YOU FOR SIGNING UP</h2>');},1000);
	};
	// if it exists setup facebook signup
	foxSignup.facebookSignup("#signup-form button.fbsignup",'1667600636830643');

	//$("#signupFormContainer").mouseleave(function(){
		//$("#signupFormContainer").removeClass("show");
	//});

	// END FOX REG FORM HANDERS

	// detemine if deep link
	// handle deep link logic here
	// deep link logic needs to go to WebGL and deep link if supprted
	// or go to gallery and show that link if no webgl


	addRandomXs();

	// show landing if not deep link
	if(!IDR.deepLinkID){
		showLanding();
	} else {
		if(IDR.webGLEnabled) { initWebGL(); $("#no-webgl-content").hide();} else { initNoWebGL(); $("#webgl-content").hide();}
	}

	//setInterval(addRandomDigitalText,100);
	
	// for testing
	
	//$("#landing").hide();

	// start background loaders
	// oncomplete of loading all background assets once, then show the "enter button"


}


window.addRandomXs = function(){
	for(i=0;i<30;i++){
		var t = Math.floor(Math.random()* window.innerHeight * .7); 
		var l = Math.floor(Math.random()* window.innerWidth) * .7; 
		$("#container").append("<div class'x' style='position:absolute; top:"+t+"px; left:"+l+"px; font-size:6px; opacity:.1;'>x</div>")
	}
}


window.addRandomDigitalText = function(){
	var t = window.innerHeight/2 + Math.floor(Math.random()*5) +200; 
	var l = 10; 
	var text = Date.now()* Math.random()
	$("body").append("<div id='randomText' class'x' style='position:absolute; top:"+t+"px; left:"+l+"px; font-size:10px; opacity:.1;'>"+text+"</div>");
	//$("#randomText").fadeOut();
	setTimeout(function(){$("#randomText").remove();},100);
}

window.showLanding = function(){
	console.log("show landing");
	IDR.showingLanding = true;
	//trackEvent({'page':{'name':'Landing','path':'/landing'},'event':'vpv'});
	
	$("#landing").addClass("show");
	// start landing slide show rotaiton
	IDR.landingRotationIndex = 0;

	
	// if mobile try this...
	// set up audio engine
	if(IDR.isMobile){IDR.audio.init(null);}

	// start background sound
	// wait for enough sounds to buffer
	IDR.soundCheck = setInterval(function(e){
		if(IDR.audio.soundsReady){
			IDR.audio.play("intro");
			IDR.soundOn=true;
			clearInterval(IDR.soundCheck);
			IDR.soundCheck = null;

				animate(enterButton,aniamteInFrames);
		
				enterButton.addEventListener("mouseover",enterOver);
				enterButton.addEventListener("mouseout",enterOut);

			
			IDR.landingRotaitonTimer = setInterval(function(e){
				$("#landing .slides .slide").removeClass("show");
				$("#landing .slides #slide_" + IDR.landingRotationIndex).addClass("show");
				IDR.landingRotationIndex++;
				if(IDR.landingRotationIndex==IDR.landingSlides.length){IDR.landingRotationIndex=0;}
			},5000);
			
		}
	},100);

	
	/* non webgl render loop */
	
	window.renderNoWebGL =function(){
		window.myReq = requestAnimationFrame( window.renderNoWebGL );
		TWEEN.update();
	}
	window.myReq = requestAnimationFrame( window.renderNoWebGL );
	cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	
}



/* enter butotn animations */
frameRate = 1000/30;
cellWidth = 180;
cellHeight = 280;
cols = 12;
curFrame = 0;
aniamteInFrames = [0,66];
aniamteRollOverFrames = [67,80];
aniamteRollOutFrames = [78,67];
aniamteOutFrames = [81,131];
enterButton = document.getElementById("enter-button");

showFrame = function(o,f){
	x = (curFrame%cols) * cellWidth;
	y = Math.floor(curFrame / cols) * cellHeight;
	o.style.backgroundPosition = -x + "px " + -y+ "px";
	//console.log("current frame:" + f);
	//console.log(x,y);
}

animate = function(o,frames){
	curFrame =frames[0];
	try{clearInterval(enterAnimation);}catch(e){}
	enterAnimation = null;
	enterAnimation = setInterval(function(){
		showFrame(o,curFrame);
		if(frames[0]<frames[1]){curFrame++;}
		if(frames[1]<frames[0]){curFrame--;}
		if(curFrame==frames[1]){
			clearInterval(enterAnimation);
			enterAnimation = null;
		}
	},frameRate);
}

enterOver = function(e){animate(enterButton,aniamteRollOverFrames)};
enterOut = function(e){animate(enterButton,aniamteRollOutFrames)};




// standard HTML event handlers
window.enterButtonClicked = function(e){
	//console.log("enter button clicked. attempt to start web audio if needed.");
	enterButton.removeEventListener("click",enterButtonClicked);
	trackEvent({'page':{'name':'Enter','path':'/enter'},'event':'vpv'});

	enterButton.removeEventListener("mouseover",enterOver);
	enterButton.removeEventListener("mouseout",enterOut);
	animate(enterButton,aniamteRollOutFrames);
	setTimeout(function(){animate(enterButton,aniamteOutFrames);},frameRate * (aniamteRollOutFrames[1]-aniamteRollOutFrames[1]));
										
	IDR.showingLanding = false;


	IDR.audio.playFromTo("detail",0,1);

	// hide the landing page
	$("#landing").removeClass("show");


	if(IDR.isMobile==true){
		$("footer").hide();
		$(".container").css("overflow","hidden");

	}

	// fade out the landing music, since each site exp. has own sounds
	IDR.audio.fadeOut("intro");

	// based on support serve correct version of site
	setTimeout(function(){
		if(IDR.webGLEnabled) { 
			var img = new Image();
			img.onload = function() {
				console.log("got earth map");
				initWebGL();
			}
			img.src = "assets/images/earth.jpg";
			
			$("#no-webgl-content").hide();
		} else { 
			initNoWebGL(); 
			$("#webgl-content").hide();
		}
		$("#landing").hide();
		$(".standard-header .titles").addClass("show");
		$(".mobile-header .title small").addClass("show");
		$(".mobile-header .title").addClass("show");
		window.cancelAnimationFrame(window.myReq);
		window.myReq= null;// kill that old render loop
	}, 3000);
	
	

}


window.signupClicked = function(e){
	showingSignup=true;
	trackEvent({'ea':{'name':'Nav','action':'signup','label':'SIGNUP CLICKED'},'event':'se'});
	IDR.audio.playFromTo("click",0,1);

	if($("#signupFormContainer").hasClass("show")){
		$("#signupFormContainer").removeClass("show");
	} else {
		$("#signupFormContainer").addClass("show");
	}
	
	
}


window.joinClicked = function(e){
	
	trackEvent({'ea':{'name':'Nav','action':'join','label':'JOIN CLICKED'},'event':'se'});
	IDR.audio.playFromTo("click",0,1);

	//open Join website
	window.open(IDR.nav[0].url);
	
}


window.ticketsClicked = function(e){
	
	trackEvent({'ea':{'name':'Nav','action':'tickets','label':'GET TICKETS CLICKED'},'event':'se'});
	IDR.audio.playFromTo("click",0,1);

	//open Join website
	window.open(IDR.nav[3].url);
	
}


window.closeTrailerClicked = function(e){
	console.log("close trailer");
	
	IDR.audio.playFromTo("click",0,1);
	IDR.player.pauseVideo();

	$("#trailerContainer").removeClass("show");
	setTimeout(function(e){$("#trailerContainer").hide(); },2000);

	// unmute the site sounds
	$("#sound .bar").removeClass("noAnim");
   	IDR.soundOn = true;
	IDR.audio.unMuteAll();


	if (typeof playSpeech == 'function') { playSpeech(); }

	if (typeof resumeVideo == 'function' && IDR.standardVideoPaused == false) { resumeVideo(); }
}

window.trailerClicked = function(e){
	console.log("show trailer");
	trackEvent({label:"trailer clicked"});
	IDR.audio.playFromTo("click",0,1);
	
	// mute the site sounds
	$("#sound .bar").addClass("noAnim");
   	IDR.soundOn = false;
	IDR.audio.muteAll();
	if (typeof pauseSpeech == 'function') { pauseSpeech(); }

	if (typeof pauseVideo == 'function' ) { pauseVideo(); }

	$("#trailerContainer").show();
	$("#trailerContainer").addClass("show");

	if(!isMobile){
		try{IDR.player.playVideo();}catch(e){
			// ie11 will fail playing YouTube videos

			// try again , one more time
			try{IDR.player.playVideo();}catch(e){
				// ah well, just let user press play :)
			}
		}
	}
	

	// close sign up form if open still
	$("#close-signup").click();


	

}


window.addTrailer = function(){

	var tag = document.createElement('script');
	tag.src = "//www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

window.onYouTubeIframeAPIReady = function () {
	//var hasVScroll = document.body.scrollHeight > document.body.clientHeight;
	//var w = window.innerWidth;
	//if( (IDR.browser.name=="IE" || IDR.browser.name=="MSIE" ) && IDR.showingLanding ){w-=20; console.log("adjust for scroll bar");}
	//var h = w  * 315/560;
    IDR.player = new YT.Player('player', {
		width: "100%",
		height: "100%",
		playerVars:{"autoplay":0, "autohide":1, "controls":1, "showinfo":0, "modestbranding":1, "rel":0, "fs":1, "wmode":"transparent", "iv_load_policy":3,"allowfullscreen":"true", "frameborder": 0, "scrolling": 'no' },
		videoId: IDR.trailer.youtubeID,
		events: {
		'onReady': window.onPlayerReady,
		'onStateChange': window.onPlayerStateChange
      }
    });
	
	this.videoResize = function() { 
		// check this video iframe exists before resizing it
		if($("#trailerContainer")){
			//var w = window.innerWidth;
			//if( (IDR.browser.name=="IE" || IDR.browser.name=="MSIE" ) && IDR.showingLanding){w-=20;}
			//var h= w  * 315/560;
			//$("#player").css({"width": w + 'px'});
			//$("#player").css({"height": h  + 'px'});

		}
	};

	window.addEventListener( 'resize', this.videoResize, false );
	// fire it to init
	this.videoResize();
	

}



window.onPlayerReady = function (event) {
	//event.target.playVideo();
	console.log("trailer is ready");
}

    
window.onPlayerStateChange = function(event) {

    if (event.data == YT.PlayerState.PLAYING ) { 
    	trackEvent({'media':{'action':'START','label':IDR.trailer.youtubeID},'event':'media'}); 
    	// clear any old intervals just in case
    	try{window.clearInterval(ytTimer);}catch(e){}

    	window.ytTimer = setInterval(function(){
    		// check YT player progress
    		duration = IDR.player.getCurrentTime() / IDR.player.getDuration();
    		//console.log(duration);
    		if( duration<.10 ){ 
    			// near strt of video, resert the flags
    			window.tracked20=false; window.tracked50=false; window.tracked75=false; window.tracked90=false; 
    		}
    		if( duration>=.20 && duration<.50 && !window.tracked20 ){ trackEvent({'media':{'action':"20%",'label':IDR.trailer.youtubeID},'event':'media'}); window.tracked20=true; }
    		if( duration>=.50 && duration<.75 && !window.tracked50 ){ trackEvent({'media':{'action':"50%",'label':IDR.trailer.youtubeID},'event':'media'}); window.tracked50=true;}
    		if( duration>=.75 && duration<.90 && !window.tracked75 ){ trackEvent({'media':{'action':"75%",'label':IDR.trailer.youtubeID},'event':'media'}); window.tracked75=true;}
    		if( duration>=.90 && duration<1 && !window.tracked90 ){ trackEvent({'media':{'action':"90%",'label':IDR.trailer.youtubeID},'event':'media'}); window.tracked90=true;}
    	},1000)

    }

    if (event.data == YT.PlayerState.ENDED ) { 
    	// clear any old intervals just in case
    	try{window.clearInterval(ytTimer);}catch(e){}
    	trackEvent({'media':{'action':'END','label':IDR.trailer.youtubeID},'event':'media'});
    }

    if (event.data == YT.PlayerState.PAUSED ) { 
    	// clear any old intervals just in case
    	try{window.clearInterval(ytTimer);}catch(e){}
    	// get current time
    	duration = ((IDR.player.getCurrentTime() / IDR.player.getDuration()) * 100) + "%";
    	trackEvent({'media':{'action': duration,'label':IDR.youtubeID},'event':'media'}) 
   	}

}
	



window.facebookClicked = function(e){
	console.log("show faebook share popup");
}

window.twitterClicked = function(e){
	console.log("show twitter share popup");
	
}

window.googleClicked = function(e){
	console.log("show google share popup");
	
}

window.youtubeClicked = function(e){
	console.log("show youtube");
	
	window.open(IDR.urlYouTubeChannel,'YouTube');
}

window.soundClicked = function(e){
	console.log("sound clicked");
	IDR.audio.playFromTo("click",0,1);
	if (IDR.soundOn) {
    	$("#sound .bar").addClass("noAnim");
   		IDR.soundOn = false;
   		IDR.audio.muteAll();
   		
  	} else {
    	$("#sound .bar").removeClass("noAnim");
    	IDR.soundOn = true;
    	IDR.audio.unMuteAll();
    	
  	}
	
}


// mobile event handlers
window.MsignupClicked = function(e){
	showingSignup=true;
	trackEvent({'ea':{'name':'Nav','action':'signup','label':'SIGNUP CLICKED'},'event':'se'});
	IDR.audio.playFromTo("click",0,1);

	if($("#signupFormContainer").hasClass("show")){
		$("#signupFormContainer").removeClass("show");
	} else {
		$("#signupFormContainer").addClass("show");
	}
	$(".share-links").removeClass("show");
}


window.MjoinClicked = function(e){
	
	trackEvent({'ea':{'name':'Nav','action':'join','label':'JOIN CLICKED'},'event':'se'});
	IDR.audio.playFromTo("click",0,1);

	//open Join website
	window.open(IDR.nav[0].url);
	
}


window.MticketsClicked = function(e){
	
	trackEvent({'ea':{'name':'Nav','action':'tickets','label':'GET TICKETS CLICKED'},'event':'se'});
	IDR.audio.playFromTo("click",0,1);

	//open Join website
	window.open(IDR.nav[3].url);
	
}

window.MtrailerClicked = function(e){
	window.trailerClicked();
	$(".share-links").removeClass("show");
}






window.MyoutubeClicked = function(e){
	console.log("show youtube");
	
	window.open(IDR.urlYouTubeChannel,'YouTube');
	
	$(".share-links").removeClass("show");
}

window.MsoundClicked = function(e){
	console.log("sound clicked");
	IDR.audio.playFromTo("click",0,1);
	if (IDR.soundOn) {
    	$("#sound .bar").addClass("noAnim");
   		IDR.soundOn = false;
   		IDR.audio.muteAll();
   		
  	} else {
    	$("#sound .bar").removeClass("noAnim");
    	IDR.soundOn = true;
    	IDR.audio.unMuteAll();
    	
  	}
}

window.hideMobileNav = function(){
	if (typeof pauseSpeech == 'function' && IDR.mode=="play") { playSpeech(); }
	$("#mobile-overlay").removeClass("show");
	$("#mobile-menu-button").removeClass("is-active");
}

window.showMobileNav = function(){
	if (typeof pauseSpeech == 'function') { pauseSpeech(); }
	$("#mobile-overlay").addClass("show");
	$("#mobile-menu-button").addClass("is-active");
}


// hamburger nav handler

$("#mobile-menu-button").click(function(e){
	if($("#mobile-overlay").hasClass("show")){
		hideMobileNav();
	} else {
		showMobileNav();
	}
	$(".share-links").removeClass("show");
});


// download button on gallery item clicked
$(".download-title").click(function(e){

	var d = $(this).attr("data-file");
	var n = $(this).attr("data-name");
	trackEvent({'ea':{'name':'Download','action':n,'label':'(not set)'},'event':'se'});

	// test if we can use downlaod method
	if(IDR.isDownloadSupported){
		var link = document.createElement("a");
		document.body.appendChild(link);
	    link.download = n;
	    link.href = d;
	    link.click();
		document.body.removeChild(link);
	} else {
		// fallback to old way
		window.open(d,n);
	}

});


// video button on gallery item clicked
$(".video-title").click(function(e){
	var d = $(this).attr("data-file");
	var n = $(this).attr("data-name");
	
	window.open(d,n);
	
});


// twitter detail share 
$(".share-twitter").click(function(e){
	var text = $(this).attr("data-text");
	if(!text){text="United We Survive. The War of 1996. Independce Day Resurgence."}
	var url = $(this).attr("data-url");
	if(!url){"http://warof1996.com";}
	var label = $(this).attr("data-label");

	trackEvent({'social':{'network':'Twitter','action':'Tweet','target':url},'event':'sa'});
	
	//open twitter share window
	window.open("https://twitter.com/intent/tweet?hashtags=IDR&original_referer=http://warof1996.com&ref_src=twsrc%5Etfw&related=20thcenturyfox%3A20th%20Century%20Fox&text="+text+"&tw_p=tweetbutton&url="+url,"Twitter Share","width=550, height=420");
});


// facebook detail share 
$(".share-facebook").click(function(e){
	var text = $(this).attr("data-text");
	if(!text){text="United We Survive. The War of 1996. Independce Day Resurgence."}
	var url = $(this).attr("data-url");
	if(!url){"http://warof1996.com";}
	var label = $(this).attr("data-label");

	trackEvent({'social':{'network':'Facebook','action':'Share','target':url},'event':'sa'});
	//open facebook share window
	window.open("https://www.facebook.com/sharer/sharer.php?app_id=1667600636830643&sdk=joey&u="+url+"&display=popup&ref=plugin&src=share_button","Facebook Share","width=550, height=420");
});


// google detail share 
$(".share-google").click(function(e){
	var text = $(this).attr("data-text");
	if(!text){text="United We Survive. The War of 1996. Independce Day Resurgence."}
	var url = $(this).attr("data-url");
	if(!url){"http://warof1996.com";}
	var label = $(this).attr("data-label");
	trackEvent({'social':{'network':'G+','action':'Share','target':url},'event':'sa'});
	//open facebook share window
	window.open("https://plus.google.com/share?url="+url,"Google Share","width=550, height=420");

});


// analytics event tracking
window.trackEvent = function(e){
	console.log("Event Tracked", e);
	dataLayer.push(e);

}



/* helper */
jQuery.extend({

  getQueryParameters : function(str) {
	  return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
  }

});


function isMobile(){
	var isMobile = false; //initiate as false
	// device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
	return isMobile;
}
showingSignup=false;
// init the app
init();