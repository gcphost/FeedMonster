navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/) ? document.addEventListener("deviceready", onDeviceReady, false) :  onDeviceReady();

function onDeviceReady(){

/* plugins not on  cdn */
	//https://github.com/rochal/jQuery-slimScroll
		(function(e){e.fn.extend({slimScroll:function(g){var a=e.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},g);this.each(function(){function u(d){if(r){d=d||window.event;
		var c=0;d.wheelDelta&&(c=-d.wheelDelta/120);d.detail&&(c=d.detail/3);e(d.target||d.srcTarget||d.srcElement).closest("."+a.wrapperClass).is(b.parent())&&m(c,!0);d.preventDefault&&!k&&d.preventDefault();k||(d.returnValue=!1)}}function m(d,e,g){k=!1;var f=d,h=b.outerHeight()-c.outerHeight();e&&(f=parseInt(c.css("top"))+d*parseInt(a.wheelStep)/100*c.outerHeight(),f=Math.min(Math.max(f,0),h),f=0<d?Math.ceil(f):Math.floor(f),c.css({top:f+"px"}));l=parseInt(c.css("top"))/(b.outerHeight()-c.outerHeight());
		f=l*(b[0].scrollHeight-b.outerHeight());g&&(f=d,d=f/b[0].scrollHeight*b.outerHeight(),d=Math.min(Math.max(d,0),h),c.css({top:d+"px"}));b.scrollTop(f);b.trigger("slimscrolling",~~f);v();p()}function C(){window.addEventListener?(this.addEventListener("DOMMouseScroll",u,!1),this.addEventListener("mousewheel",u,!1)):document.attachEvent("onmousewheel",u)}function w(){s=Math.max(b.outerHeight()/b[0].scrollHeight*b.outerHeight(),30);c.css({height:s+"px"});var a=s==b.outerHeight()?"none":"block";c.css({display:a})}
		function v(){w();clearTimeout(A);l==~~l?(k=a.allowPageScroll,B!=l&&b.trigger("slimscroll",0==~~l?"top":"bottom")):k=!1;B=l;s>=b.outerHeight()?k=!0:(c.stop(!0,!0).fadeIn("fast"),a.railVisible&&h.stop(!0,!0).fadeIn("fast"))}function p(){a.alwaysVisible||(A=setTimeout(function(){a.disableFadeOut&&r||x||y||(c.fadeOut("slow"),h.fadeOut("slow"))},1E3))}var r,x,y,A,z,s,l,B,k=!1,b=e(this);if(b.parent().hasClass(a.wrapperClass)){var n=b.scrollTop(),c=b.parent().find("."+a.barClass),h=b.parent().find("."+a.railClass);
		w();if(e.isPlainObject(g)){if("height"in g&&"auto"==g.height){b.parent().css("height","auto");b.css("height","auto");var q=b.parent().parent().height();b.parent().css("height",q);b.css("height",q)}if("scrollTo"in g)n=parseInt(a.scrollTo);else if("scrollBy"in g)n+=parseInt(a.scrollBy);else if("destroy"in g){c.remove();h.remove();b.unwrap();return}m(n,!1,!0)}}else if(!(e.isPlainObject(g)&&"destroy"in g)){a.height="auto"==a.height?b.parent().height():a.height;n=e("<div></div>").addClass(a.wrapperClass).css({position:"relative",
		overflow:"hidden",width:a.width,height:a.height});b.css({overflow:"hidden",width:a.width,height:a.height});var h=e("<div></div>").addClass(a.railClass).css({width:a.size,height:"100%",position:"absolute",top:0,display:a.alwaysVisible&&a.railVisible?"block":"none","border-radius":a.railBorderRadius,background:a.railColor,opacity:a.railOpacity,zIndex:90}),c=e("<div></div>").addClass(a.barClass).css({background:a.color,width:a.size,position:"absolute",top:0,opacity:a.opacity,display:a.alwaysVisible?
		"block":"none","border-radius":a.borderRadius,BorderRadius:a.borderRadius,MozBorderRadius:a.borderRadius,WebkitBorderRadius:a.borderRadius,zIndex:99}),q="right"==a.position?{right:a.distance}:{left:a.distance};h.css(q);c.css(q);b.wrap(n);b.parent().append(c);b.parent().append(h);a.railDraggable&&c.bind("mousedown",function(a){var b=e(document);y=!0;t=parseFloat(c.css("top"));pageY=a.pageY;b.bind("mousemove.slimscroll",function(a){currTop=t+a.pageY-pageY;c.css("top",currTop);m(0,c.position().top,!1)});
		b.bind("mouseup.slimscroll",function(a){y=!1;p();b.unbind(".slimscroll")});return!1}).bind("selectstart.slimscroll",function(a){a.stopPropagation();a.preventDefault();return!1});h.hover(function(){v()},function(){p()});c.hover(function(){x=!0},function(){x=!1});b.hover(function(){r=!0;v();p()},function(){r=!1;p()});b.bind("touchstart",function(a,b){a.originalEvent.touches.length&&(z=a.originalEvent.touches[0].pageY)});b.bind("touchmove",function(b){k||b.originalEvent.preventDefault();b.originalEvent.touches.length&&
		(m((z-b.originalEvent.touches[0].pageY)/a.touchScrollStep,!0),z=b.originalEvent.touches[0].pageY)});w();"bottom"===a.start?(c.css({top:b.outerHeight()-c.outerHeight()}),m(0,!0)):"top"!==a.start&&(m(e(a.start).position().top,null,!0),a.alwaysVisible||c.hide());C()}});return this}});e.fn.extend({slimscroll:e.fn.slimScroll})})(jQuery);

	// https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
		(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(f){var p="left",o="right",e="up",x="down",c="in",z="out",m="none",s="auto",l="swipe",t="pinch",A="tap",j="doubletap",b="longtap",y="hold",D="horizontal",u="vertical",i="all",r=10,g="start",k="move",h="end",q="cancel",a="ontouchstart" in window,v=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,d=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,B="TouchSwipe";var n={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe"};f.fn.swipe=function(G){var F=f(this),E=F.data(B);if(E&&typeof G==="string"){if(E[G]){return E[G].apply(this,Array.prototype.slice.call(arguments,1))}else{f.error("Method "+G+" does not exist on jQuery.swipe")}}else{if(!E&&(typeof G==="object"||!G)){return w.apply(this,arguments)}}return F};f.fn.swipe.defaults=n;f.fn.swipe.phases={PHASE_START:g,PHASE_MOVE:k,PHASE_END:h,PHASE_CANCEL:q};f.fn.swipe.directions={LEFT:p,RIGHT:o,UP:e,DOWN:x,IN:c,OUT:z};f.fn.swipe.pageScroll={NONE:m,HORIZONTAL:D,VERTICAL:u,AUTO:s};f.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:i};function w(E){if(E&&(E.allowPageScroll===undefined&&(E.swipe!==undefined||E.swipeStatus!==undefined))){E.allowPageScroll=m}if(E.click!==undefined&&E.tap===undefined){E.tap=E.click}if(!E){E={}}E=f.extend({},f.fn.swipe.defaults,E);return this.each(function(){var G=f(this);var F=G.data(B);if(!F){F=new C(this,E);G.data(B,F)}})}function C(a4,av){var az=(a||d||!av.fallbackToMouseEvents),J=az?(d?(v?"MSPointerDown":"pointerdown"):"touchstart"):"mousedown",ay=az?(d?(v?"MSPointerMove":"pointermove"):"touchmove"):"mousemove",U=az?(d?(v?"MSPointerUp":"pointerup"):"touchend"):"mouseup",S=az?null:"mouseleave",aD=(d?(v?"MSPointerCancel":"pointercancel"):"touchcancel");var ag=0,aP=null,ab=0,a1=0,aZ=0,G=1,aq=0,aJ=0,M=null;var aR=f(a4);var Z="start";var W=0;var aQ=null;var T=0,a2=0,a5=0,ad=0,N=0;var aW=null,af=null;try{aR.bind(J,aN);aR.bind(aD,a9)}catch(ak){f.error("events not supported "+J+","+aD+" on jQuery.swipe")}this.enable=function(){aR.bind(J,aN);aR.bind(aD,a9);return aR};this.disable=function(){aK();return aR};this.destroy=function(){aK();aR.data(B,null);return aR};this.option=function(bc,bb){if(av[bc]!==undefined){if(bb===undefined){return av[bc]}else{av[bc]=bb}}else{f.error("Option "+bc+" does not exist on jQuery.swipe.options")}return null};function aN(bd){if(aB()){return}if(f(bd.target).closest(av.excludedElements,aR).length>0){return}var be=bd.originalEvent?bd.originalEvent:bd;var bc,bb=a?be.touches[0]:be;Z=g;if(a){W=be.touches.length}else{bd.preventDefault()}ag=0;aP=null;aJ=null;ab=0;a1=0;aZ=0;G=1;aq=0;aQ=aj();M=aa();R();if(!a||(W===av.fingers||av.fingers===i)||aX()){ai(0,bb);T=at();if(W==2){ai(1,be.touches[1]);a1=aZ=au(aQ[0].start,aQ[1].start)}if(av.swipeStatus||av.pinchStatus){bc=O(be,Z)}}else{bc=false}if(bc===false){Z=q;O(be,Z);return bc}else{if(av.hold){af=setTimeout(f.proxy(function(){aR.trigger("hold",[be.target]);if(av.hold){bc=av.hold.call(aR,be,be.target)}},this),av.longTapThreshold)}ao(true)}return null}function a3(be){var bh=be.originalEvent?be.originalEvent:be;if(Z===h||Z===q||am()){return}var bd,bc=a?bh.touches[0]:bh;var bf=aH(bc);a2=at();if(a){W=bh.touches.length}if(av.hold){clearTimeout(af)}Z=k;if(W==2){if(a1==0){ai(1,bh.touches[1]);a1=aZ=au(aQ[0].start,aQ[1].start)}else{aH(bh.touches[1]);aZ=au(aQ[0].end,aQ[1].end);aJ=ar(aQ[0].end,aQ[1].end)}G=a7(a1,aZ);aq=Math.abs(a1-aZ)}if((W===av.fingers||av.fingers===i)||!a||aX()){aP=aL(bf.start,bf.end);al(be,aP);ag=aS(bf.start,bf.end);ab=aM();aI(aP,ag);if(av.swipeStatus||av.pinchStatus){bd=O(bh,Z)}if(!av.triggerOnTouchEnd||av.triggerOnTouchLeave){var bb=true;if(av.triggerOnTouchLeave){var bg=aY(this);bb=E(bf.end,bg)}if(!av.triggerOnTouchEnd&&bb){Z=aC(k)}else{if(av.triggerOnTouchLeave&&!bb){Z=aC(h)}}if(Z==q||Z==h){O(bh,Z)}}}else{Z=q;O(bh,Z)}if(bd===false){Z=q;O(bh,Z)}}function L(bb){var bc=bb.originalEvent;if(a){if(bc.touches.length>0){F();return true}}if(am()){W=ad}a2=at();ab=aM();if(ba()||!an()){Z=q;O(bc,Z)}else{if(av.triggerOnTouchEnd||(av.triggerOnTouchEnd==false&&Z===k)){bb.preventDefault();Z=h;O(bc,Z)}else{if(!av.triggerOnTouchEnd&&a6()){Z=h;aF(bc,Z,A)}else{if(Z===k){Z=q;O(bc,Z)}}}}ao(false);return null}function a9(){W=0;a2=0;T=0;a1=0;aZ=0;G=1;R();ao(false)}function K(bb){var bc=bb.originalEvent;if(av.triggerOnTouchLeave){Z=aC(h);O(bc,Z)}}function aK(){aR.unbind(J,aN);aR.unbind(aD,a9);aR.unbind(ay,a3);aR.unbind(U,L);if(S){aR.unbind(S,K)}ao(false)}function aC(bf){var be=bf;var bd=aA();var bc=an();var bb=ba();if(!bd||bb){be=q}else{if(bc&&bf==k&&(!av.triggerOnTouchEnd||av.triggerOnTouchLeave)){be=h}else{if(!bc&&bf==h&&av.triggerOnTouchLeave){be=q}}}return be}function O(bd,bb){var bc=undefined;if(I()||V()){bc=aF(bd,bb,l)}else{if((P()||aX())&&bc!==false){bc=aF(bd,bb,t)}}if(aG()&&bc!==false){bc=aF(bd,bb,j)}else{if(ap()&&bc!==false){bc=aF(bd,bb,b)}else{if(ah()&&bc!==false){bc=aF(bd,bb,A)}}}if(bb===q){a9(bd)}if(bb===h){if(a){if(bd.touches.length==0){a9(bd)}}else{a9(bd)}}return bc}function aF(be,bb,bd){var bc=undefined;if(bd==l){aR.trigger("swipeStatus",[bb,aP||null,ag||0,ab||0,W,aQ]);if(av.swipeStatus){bc=av.swipeStatus.call(aR,be,bb,aP||null,ag||0,ab||0,W,aQ);if(bc===false){return false}}if(bb==h&&aV()){aR.trigger("swipe",[aP,ag,ab,W,aQ]);if(av.swipe){bc=av.swipe.call(aR,be,aP,ag,ab,W,aQ);if(bc===false){return false}}switch(aP){case p:aR.trigger("swipeLeft",[aP,ag,ab,W,aQ]);if(av.swipeLeft){bc=av.swipeLeft.call(aR,be,aP,ag,ab,W,aQ)}break;case o:aR.trigger("swipeRight",[aP,ag,ab,W,aQ]);if(av.swipeRight){bc=av.swipeRight.call(aR,be,aP,ag,ab,W,aQ)}break;case e:aR.trigger("swipeUp",[aP,ag,ab,W,aQ]);if(av.swipeUp){bc=av.swipeUp.call(aR,be,aP,ag,ab,W,aQ)}break;case x:aR.trigger("swipeDown",[aP,ag,ab,W,aQ]);if(av.swipeDown){bc=av.swipeDown.call(aR,be,aP,ag,ab,W,aQ)}break}}}if(bd==t){aR.trigger("pinchStatus",[bb,aJ||null,aq||0,ab||0,W,G,aQ]);if(av.pinchStatus){bc=av.pinchStatus.call(aR,be,bb,aJ||null,aq||0,ab||0,W,G,aQ);if(bc===false){return false}}if(bb==h&&a8()){switch(aJ){case c:aR.trigger("pinchIn",[aJ||null,aq||0,ab||0,W,G,aQ]);if(av.pinchIn){bc=av.pinchIn.call(aR,be,aJ||null,aq||0,ab||0,W,G,aQ)}break;case z:aR.trigger("pinchOut",[aJ||null,aq||0,ab||0,W,G,aQ]);if(av.pinchOut){bc=av.pinchOut.call(aR,be,aJ||null,aq||0,ab||0,W,G,aQ)}break}}}if(bd==A){if(bb===q||bb===h){clearTimeout(aW);clearTimeout(af);if(Y()&&!H()){N=at();aW=setTimeout(f.proxy(function(){N=null;aR.trigger("tap",[be.target]);if(av.tap){bc=av.tap.call(aR,be,be.target)}},this),av.doubleTapThreshold)}else{N=null;aR.trigger("tap",[be.target]);if(av.tap){bc=av.tap.call(aR,be,be.target)}}}}else{if(bd==j){if(bb===q||bb===h){clearTimeout(aW);N=null;aR.trigger("doubletap",[be.target]);if(av.doubleTap){bc=av.doubleTap.call(aR,be,be.target)}}}else{if(bd==b){if(bb===q||bb===h){clearTimeout(aW);N=null;aR.trigger("longtap",[be.target]);if(av.longTap){bc=av.longTap.call(aR,be,be.target)}}}}}return bc}function an(){var bb=true;if(av.threshold!==null){bb=ag>=av.threshold}return bb}function ba(){var bb=false;if(av.cancelThreshold!==null&&aP!==null){bb=(aT(aP)-ag)>=av.cancelThreshold}return bb}function ae(){if(av.pinchThreshold!==null){return aq>=av.pinchThreshold}return true}function aA(){var bb;if(av.maxTimeThreshold){if(ab>=av.maxTimeThreshold){bb=false}else{bb=true}}else{bb=true}return bb}function al(bb,bc){if(av.allowPageScroll===m||aX()){bb.preventDefault()}else{var bd=av.allowPageScroll===s;switch(bc){case p:if((av.swipeLeft&&bd)||(!bd&&av.allowPageScroll!=D)){bb.preventDefault()}break;case o:if((av.swipeRight&&bd)||(!bd&&av.allowPageScroll!=D)){bb.preventDefault()}break;case e:if((av.swipeUp&&bd)||(!bd&&av.allowPageScroll!=u)){bb.preventDefault()}break;case x:if((av.swipeDown&&bd)||(!bd&&av.allowPageScroll!=u)){bb.preventDefault()}break}}}function a8(){var bc=aO();var bb=X();var bd=ae();return bc&&bb&&bd}function aX(){return !!(av.pinchStatus||av.pinchIn||av.pinchOut)}function P(){return !!(a8()&&aX())}function aV(){var be=aA();var bg=an();var bd=aO();var bb=X();var bc=ba();var bf=!bc&&bb&&bd&&bg&&be;return bf}function V(){return !!(av.swipe||av.swipeStatus||av.swipeLeft||av.swipeRight||av.swipeUp||av.swipeDown)}function I(){return !!(aV()&&V())}function aO(){return((W===av.fingers||av.fingers===i)||!a)}function X(){return aQ[0].end.x!==0}function a6(){return !!(av.tap)}function Y(){return !!(av.doubleTap)}function aU(){return !!(av.longTap)}function Q(){if(N==null){return false}var bb=at();return(Y()&&((bb-N)<=av.doubleTapThreshold))}function H(){return Q()}function ax(){return((W===1||!a)&&(isNaN(ag)||ag<av.threshold))}function a0(){return((ab>av.longTapThreshold)&&(ag<r))}function ah(){return !!(ax()&&a6())}function aG(){return !!(Q()&&Y())}function ap(){return !!(a0()&&aU())}function F(){a5=at();ad=event.touches.length+1}function R(){a5=0;ad=0}function am(){var bb=false;if(a5){var bc=at()-a5;if(bc<=av.fingerReleaseThreshold){bb=true}}return bb}function aB(){return !!(aR.data(B+"_intouch")===true)}function ao(bb){if(bb===true){aR.bind(ay,a3);aR.bind(U,L);if(S){aR.bind(S,K)}}else{aR.unbind(ay,a3,false);aR.unbind(U,L,false);if(S){aR.unbind(S,K,false)}}aR.data(B+"_intouch",bb===true)}function ai(bc,bb){var bd=bb.identifier!==undefined?bb.identifier:0;aQ[bc].identifier=bd;aQ[bc].start.x=aQ[bc].end.x=bb.pageX||bb.clientX;aQ[bc].start.y=aQ[bc].end.y=bb.pageY||bb.clientY;return aQ[bc]}function aH(bb){var bd=bb.identifier!==undefined?bb.identifier:0;var bc=ac(bd);bc.end.x=bb.pageX||bb.clientX;bc.end.y=bb.pageY||bb.clientY;return bc}function ac(bc){for(var bb=0;bb<aQ.length;bb++){if(aQ[bb].identifier==bc){return aQ[bb]}}}function aj(){var bb=[];for(var bc=0;bc<=5;bc++){bb.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return bb}function aI(bb,bc){bc=Math.max(bc,aT(bb));M[bb].distance=bc}function aT(bb){if(M[bb]){return M[bb].distance}return undefined}function aa(){var bb={};bb[p]=aw(p);bb[o]=aw(o);bb[e]=aw(e);bb[x]=aw(x);return bb}function aw(bb){return{direction:bb,distance:0}}function aM(){return a2-T}function au(be,bd){var bc=Math.abs(be.x-bd.x);var bb=Math.abs(be.y-bd.y);return Math.round(Math.sqrt(bc*bc+bb*bb))}function a7(bb,bc){var bd=(bc/bb)*1;return bd.toFixed(2)}function ar(){if(G<1){return z}else{return c}}function aS(bc,bb){return Math.round(Math.sqrt(Math.pow(bb.x-bc.x,2)+Math.pow(bb.y-bc.y,2)))}function aE(be,bc){var bb=be.x-bc.x;var bg=bc.y-be.y;var bd=Math.atan2(bg,bb);var bf=Math.round(bd*180/Math.PI);if(bf<0){bf=360-Math.abs(bf)}return bf}function aL(bc,bb){var bd=aE(bc,bb);if((bd<=45)&&(bd>=0)){return p}else{if((bd<=360)&&(bd>=315)){return p}else{if((bd>=135)&&(bd<=225)){return o}else{if((bd>45)&&(bd<135)){return x}else{return e}}}}}function at(){var bb=new Date();return bb.getTime()}function aY(bb){bb=f(bb);var bd=bb.offset();var bc={left:bd.left,right:bd.left+bb.outerWidth(),top:bd.top,bottom:bd.top+bb.outerHeight()};return bc}function E(bb,bc){return(bb.x>bc.left&&bb.x<bc.right&&bb.y>bc.top&&bb.y<bc.bottom)}}}));

	// http://www.myersdaily.org/joseph/javascript/md5.js
		function md5cycle(e,t){var n=e[0],r=e[1],i=e[2],s=e[3];n=ff(n,r,i,s,t[0],7,-680876936);s=ff(s,n,r,i,t[1],12,-389564586);i=ff(i,s,n,r,t[2],17,606105819);r=ff(r,i,s,n,t[3],22,-1044525330);n=ff(n,r,i,s,t[4],7,-176418897);s=ff(s,n,r,i,t[5],12,1200080426);i=ff(i,s,n,r,t[6],17,-1473231341);r=ff(r,i,s,n,t[7],22,-45705983);n=ff(n,r,i,s,t[8],7,1770035416);s=ff(s,n,r,i,t[9],12,-1958414417);i=ff(i,s,n,r,t[10],17,-42063);r=ff(r,i,s,n,t[11],22,-1990404162);n=ff(n,r,i,s,t[12],7,1804603682);s=ff(s,n,r,i,t[13],12,-40341101);i=ff(i,s,n,r,t[14],17,-1502002290);r=ff(r,i,s,n,t[15],22,1236535329);n=gg(n,r,i,s,t[1],5,-165796510);s=gg(s,n,r,i,t[6],9,-1069501632);i=gg(i,s,n,r,t[11],14,643717713);r=gg(r,i,s,n,t[0],20,-373897302);n=gg(n,r,i,s,t[5],5,-701558691);s=gg(s,n,r,i,t[10],9,38016083);i=gg(i,s,n,r,t[15],14,-660478335);r=gg(r,i,s,n,t[4],20,-405537848);n=gg(n,r,i,s,t[9],5,568446438);s=gg(s,n,r,i,t[14],9,-1019803690);i=gg(i,s,n,r,t[3],14,-187363961);r=gg(r,i,s,n,t[8],20,1163531501);n=gg(n,r,i,s,t[13],5,-1444681467);s=gg(s,n,r,i,t[2],9,-51403784);i=gg(i,s,n,r,t[7],14,1735328473);r=gg(r,i,s,n,t[12],20,-1926607734);n=hh(n,r,i,s,t[5],4,-378558);s=hh(s,n,r,i,t[8],11,-2022574463);i=hh(i,s,n,r,t[11],16,1839030562);r=hh(r,i,s,n,t[14],23,-35309556);n=hh(n,r,i,s,t[1],4,-1530992060);s=hh(s,n,r,i,t[4],11,1272893353);i=hh(i,s,n,r,t[7],16,-155497632);r=hh(r,i,s,n,t[10],23,-1094730640);n=hh(n,r,i,s,t[13],4,681279174);s=hh(s,n,r,i,t[0],11,-358537222);i=hh(i,s,n,r,t[3],16,-722521979);r=hh(r,i,s,n,t[6],23,76029189);n=hh(n,r,i,s,t[9],4,-640364487);s=hh(s,n,r,i,t[12],11,-421815835);i=hh(i,s,n,r,t[15],16,530742520);r=hh(r,i,s,n,t[2],23,-995338651);n=ii(n,r,i,s,t[0],6,-198630844);s=ii(s,n,r,i,t[7],10,1126891415);i=ii(i,s,n,r,t[14],15,-1416354905);r=ii(r,i,s,n,t[5],21,-57434055);n=ii(n,r,i,s,t[12],6,1700485571);s=ii(s,n,r,i,t[3],10,-1894986606);i=ii(i,s,n,r,t[10],15,-1051523);r=ii(r,i,s,n,t[1],21,-2054922799);n=ii(n,r,i,s,t[8],6,1873313359);s=ii(s,n,r,i,t[15],10,-30611744);i=ii(i,s,n,r,t[6],15,-1560198380);r=ii(r,i,s,n,t[13],21,1309151649);n=ii(n,r,i,s,t[4],6,-145523070);s=ii(s,n,r,i,t[11],10,-1120210379);i=ii(i,s,n,r,t[2],15,718787259);r=ii(r,i,s,n,t[9],21,-343485551);e[0]=add32(n,e[0]);e[1]=add32(r,e[1]);e[2]=add32(i,e[2]);e[3]=add32(s,e[3])}function cmn(e,t,n,r,i,s){t=add32(add32(t,e),add32(r,s));return add32(t<<i|t>>>32-i,n)}function ff(e,t,n,r,i,s,o){return cmn(t&n|~t&r,e,t,i,s,o)}function gg(e,t,n,r,i,s,o){return cmn(t&r|n&~r,e,t,i,s,o)}function hh(e,t,n,r,i,s,o){return cmn(t^n^r,e,t,i,s,o)}function ii(e,t,n,r,i,s,o){return cmn(n^(t|~r),e,t,i,s,o)}function md51(e){txt="";var t=e.length,n=[1732584193,-271733879,-1732584194,271733878],r;for(r=64;r<=e.length;r+=64){md5cycle(n,md5blk(e.substring(r-64,r)))}e=e.substring(r-64);var i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(r=0;r<e.length;r++)i[r>>2]|=e.charCodeAt(r)<<(r%4<<3);i[r>>2]|=128<<(r%4<<3);if(r>55){md5cycle(n,i);for(r=0;r<16;r++)i[r]=0}i[14]=t*8;md5cycle(n,i);return n}function md5blk(e){var t=[],n;for(n=0;n<64;n+=4){t[n>>2]=e.charCodeAt(n)+(e.charCodeAt(n+1)<<8)+(e.charCodeAt(n+2)<<16)+(e.charCodeAt(n+3)<<24)}return t}function rhex(e){var t="",n=0;for(;n<4;n++)t+=hex_chr[e>>n*8+4&15]+hex_chr[e>>n*8&15];return t}function hex(e){for(var t=0;t<e.length;t++)e[t]=rhex(e[t]);return e.join("")}function md5(e){return hex(md51(e))}function add32(e,t){return e+t&4294967295}var hex_chr="0123456789abcdef".split("");if(md5("hello")!="5d41402abc4b2a76b9719d911017c592"){function add32(e,t){var n=(e&65535)+(t&65535),r=(e>>16)+(t>>16)+(n>>16);return r<<16|n&65535}}

/* settings */
	var items=10;
	var scrollLoad = true;
	var title='Top Stories';
	var cat='topstories';
	var totalrows=0;
	var page=0;
	var listi=1;
	var search=false;
	var source=false;
	var pictures=true;
	var sort=false;
	var display='card';
	var searchedfeeds=false;
	var searchfeedold='';
	var offmetimer=false;
	var timeoToken=false;
	var feedlisttype='';
	var searchfieldclicked=false;
	var resetsearch=false;
	var newuser=false;
	var nofeeds='<li class="list-group-item">Oh no! There\'s nothing in your fridge!</li>';
	var sharemonsterhtml=$('.sharemonster').html();
	var emailmonsterhtml=$('.emailmonster').html();
	var passwordmonsterhtml=$('.passwordmonster').html();
	var uuid=false;
	var csrftoken=false;
	var customcats=[];

	setup();

/* functions */
	function feed_wrap(){
		if(feedlisttype == 'settings'){
			return $('#settings');
		} else return $('.addcatmenu');
	}
	 
	function feed_list(){
		if(feedlisttype == 'settings'){
			return $('.settings-feed-list');
		} else return $('.addfeedslist');
	}

	function setup(){
		$.ajaxSetup({async:true});
		parseLocalStorage();
		checkUUID();
		getFirstLoad();
		catclicks();
		deletecatclicks();
		scrolltotop();
		settingsMenu();
		controlSettingsMenu();
		ui();
		load(0,items,cat+'&reset=true');
	}



	function ui(){

		if(feed_added)feedurladded();

		if(switch_cat){
			c=switch_cat_to;
			if(c && c != cat) switchCat($('*[data-cat="'+c+'"]'));
		}

		if(search != ''){
			$('#search').val(search);
			$('#searchclear').show();
		}

		if($('*[data-cat="'+cat+'"]').attr('data-customcat') == "true"){
			$('.scroll-top-wrapper-left').fadeIn();
		}

		$("[data-toggle='tooltip']").tooltip({html: true});
		$('.addcatmenu').append($('.feedme-fix').html());
		$('.addcatmenu .rssinput').attr('placeholder','Add more to your fridge!');
		$('.addcatmenu .typewrap').attr('data-type','category');


		/*

		setInterval(function () {
				$.post( site_url+"ajax.php", { mode: "getFeedUpdateStatus", c: cat, token:csrftoken })
				  .done(function( data ) {
					if(data=='new'){
						$('#timestamp').fadeIn();
						if ($(window).scrollTop() > 200) $('#bottomrefresh').fadeIn();
					}
				  });

			}, 10000);
		*/
	}

	function requirepassword(){
		$('.fullaccess').hide();
		$('.user-access').hide();
		$('.passwordaccess').show();
	}

	function feedurladded(){
		if(!uuid) return false;
		window.history.pushState({}, '', site_url  + 'feed-added/#'+ uuid);
		setTimeout(function () {
		  window.history.pushState({}, '', site_url  + '#'+ uuid);
		}, 3000);
	}

	function throttle(fn, delay) {
		  delay || (delay  = 100);
		  var timer = null;
		  return function () {
			var context = this, args = arguments;
			clearTimeout(timer);
			timer = setTimeout(function () {
			  fn.apply(context, args);
			}, delay);
		  };
	}

	function checkUUID(){
		if(localStorage.getItem("uuid") || window.location.hash){
			if(window.location.hash.replace('#', '')){
				uuid=window.location.hash.replace('#', '');
			} else uuid=localStorage.getItem("uuid");
		} else setupBeta();
	}

	function getFirstLoad(){
		$.ajaxSetup({async:false});
		$.getJSON( site_url+'ajax.php?mode=checkUUID&uuid='+uuid, function (data) {

			if(data.customcats && data.customcats.length > 0){
				$.each( data.customcats, function( key, val ) {
					if(val.slug) $('#customcats li:last').before('<li><a data-cat="'+val.slug+'"data-customcat="true"class="clink" href="/'+val.slug+'/"rel="nofollow">'+val.name+'</a> <i class="deletecat pull-right fa fa-trash" data-cat="'+val.slug+'" ></i></li><li class="divider"></li>');
				});
			}

			if(data.result != "failed"){
				if(data.result == "password"){
					requirepassword();
				} else setupBeta();


			} else {
				uuid='';
				localStorage.setItem("uuid", '');
				setupBeta();
			}
			csrftoken=data.CSRFTOKEN;
		})
		.error(function(){
			setupBeta();
		});
	}

	function setupBeta(){
		if(uuid){
			$('.fullaccess').show();
			$('.betaaccess').hide();
			controlSettingsMenu();
			window.location.hash = uuid;
		} else {
			$('.fullaccess').hide();
			$('.betaaccess').show();	
			$('.user-access').hide();
			window.location.hash = '';
		}
	}

	function parseLocalStorage(){
		if(typeof(Storage) !== "undefined") {
			if(localStorage.getItem("cat") !== "undefined"){
				if(localStorage.getItem("uuid")) uuid=localStorage.getItem("uuid");
				if(localStorage.getItem("cat")) cat=localStorage.getItem("cat");
				if(localStorage.getItem("display_"+cat)) display=localStorage.getItem("display_"+cat);
				if(localStorage.getItem("catTitle")) title=localStorage.getItem("catTitle");
				if(localStorage.getItem("search")) search=localStorage.getItem("search");
				if(localStorage.getItem("sort")) sort=localStorage.getItem("sort");
				if(localStorage.getItem("pictures")) pictures=localStorage.getItem("pictures");
				//if(localStorage.getItem("source")) source=localStorage.getItem("source");
				if(title) $('#categoryTitle').html(title);
			}
		}

	}

	function gotosource(val){
		if(navigator.app){ navigator.app.loadUrl(val.link, { openExternal:true })
		} else window.open(val.link);

		if(uuid) $.post( site_url+"ajax.php", { mode: "markRead", url: val.id, token:csrftoken });
	}


	function buildItemList(val){
		var img=val.image.replace('blank.png', 'images/blank.png');
		comment_count=prettyPrintNumber(val.comments);
		like_count=prettyPrintNumber(val.likes);
		share_count=prettyPrintNumber(val.shares);

		_container=$( "<div>", {
			 "class": "item_holder altlist2 clearfix",
		});

		_row=$( "<div>", {
			 "class": "row listitem",
		}).appendTo(_container);


		if(uuid){
			_star=$( "<div>", { 
				"class":'center fav acol-1 pull-left'}).html('<i class="fa fa-star-o fa-fw"></i>')
			//.attr({'title': 'Favorite','data-toggle':"tooltip",'data-placement':"bottom"})
			.on('click',function(event) {
					event.preventDefault();
					$( this ).find('i').toggleClass('fa-star-o').toggleClass('fa-star');
					mark_fav($( this ).find('i'), val);

			}).appendTo(_row);
			if(val.favorite != 'false') $( _star ).find('i').toggleClass('fa-star-o').toggleClass('fa-star');
		}


		_author=$( "<div>", {
			 "class": "center acol-2 pull-left author  hidden-xs",
		}).html(val.author)
		.on('click',function(event) {
				event.preventDefault();
				source=val.author;
				localStorage.setItem("source", source);
				resetnews();
				//window.open(val.authorLink);
			}).appendTo(_row);


		/*_likes=$( "<div>", {
			 "class": "likes acol-3 center pull-left hidden-xs",
		}).html(like_count).appendTo(_row);
*/

		_title=$( "<div>", {
			 "class": "ntitle acol-4 pull-left",
		}).on('click', function(){
			gotosource(val);
		}).html('<h4>'+val.title+' <span> ' + val.description+'</span></h4>').appendTo(_row);

		_fancy=$( "<div>", {
			 "class": "center pull-right acol-5 tools",
		}).appendTo(_row);

		
		_listitems=$( "<ul>", {
			 "class": "list-inline list-unstyled",
		}).appendTo(_fancy);
	
		if(uuid){
			_icons=$( "<li>").html('<i class="fa fa-check-square-o fa-fw"></i>')
					.on('click',function(event) {
						event.preventDefault();
						me=this;
						$(me).closest('.altlist').hide();
						mark_read(me, val);
			}).appendTo(_listitems);

		} else {
			_icons=$( "<li>").html('<i class="fa fa-share-alt-square fa-fw"></i>').appendTo(_listitems);
		}

		_listitems2=$( "<ul>", {
			 "class": "list-unstyled",
		}).appendTo(_icons);

		$( "<li>").html('<i class="fa fa-si fa-facebook-square fa-fw"></i>')
		.on('click',function(event) {
			share(2, val.link);
			event.preventDefault();
		}).appendTo(_listitems2);


		$( "<li>").html('<i class="fa fa-si fa-twitter-square fa-fw"></i>')
		.on('click',function(event) {
			share(3, val.link);
			event.preventDefault();
		}).appendTo(_listitems2);

		$( "<li>").html('<i class="fa fa-si fa-google-plus-square fa-fw"></i>')
		.on('click',function(event) {
			share(1, val.link);
			event.preventDefault();
		}).appendTo(_listitems2);

		$( "<li>").html('<i class="fa fa-si fa-linkedin-square fa-fw"></i>')
		.on('click',function(event) {
			share(4, val.link);
			event.preventDefault();
		}).appendTo(_listitems2);


		_container.appendTo('#news');

		$("[data-toggle='tooltip']").tooltip({html: true});
	}


	function rand(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var perrow=rand(1,3);
	var justadded=0;
	var used=totalrows;


	function buildItemCard(val){
		var comment='Loading comments...';
		var author='';
		var img=val.image.replace('blank.png', 'images/blank.png');

		comment_count=prettyPrintNumber(val.comments);
		like_count=prettyPrintNumber(val.likes);
		share_count=prettyPrintNumber(val.shares);


		/* main container */
		_container=$( "<article>", {
			 "class": "thumbnail",
			 'id': 'item'+listi,
			'attr': { 'itemscope' : '', 'itemtype' : 'http://schema.org/Article' }
		}).swipe( {
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			},
			allowPageScroll:"auto",
			swipeStatus:function(event, phase, direction, distance, duration)
			{
				if(uuid){
					shownbars=false;
					if(distance > 50){
						$(this).find('.imageclick').attr('data-oktoclick', 'no');

						if(direction == "right") $( this ).find('.sidebar-left').fadeIn();
						if(direction == "left") $( this ).find('.sidebar-right').fadeIn();
						shownbars=true;
					}
					if(shownbars == true && phase == 'cancel' || phase == 'end'){
						if(direction == 'right') mark_read(this, val);
						if(direction == 'left') mark_fav($(this).find('.fa-fav'), val);
						$( this ).find('.sidebars').fadeOut();
						me=this;
						 setTimeout(function () {
							$(me).find('.imageclick').attr('data-oktoclick', 'yes');
						}, 100);
					}
				}
			},
			 threshold:75
		  }).hover(
			 function() {
				if(val.description && $(document).width() > 480){
					$( this ).find('.description').slideDown();
				}
			  }, function() {
				if(val.description && $(document).width() > 480){
					$( this ).find('.description').slideUp();
				}
			}
		);

		var _imgran=0;

		_image_seo=$('<a/>', {
			'href': site_url+cat+'/'+val.slug,
			'title': val.title,
			'click': function(event){ 
				event.preventDefault();
			},
			'attr': { 'itemprop' : 'url' }
		}).appendTo(_container);

		_image=$( "<img/>", {
				"class": "img itemimg img-responsive",
				'src': site_url+img.replace('%2F', '/'),
				'title': val.title,
				'attr': { 'itemprop' : 'image' }
			
		}).load(function(){
				 $(this).parent().parent().find('.imageclick i').removeClass('fa-refresh fa-spin');
				 $(this).parent().parent().find('.imageclick i').addClass('fa-external-link-square');
				
		}).error(function(){
			if(_imgran == 0){
				$(this).parent().parent().find('.imageclick i').removeClass('fa-refresh fa-spin');
				$(this).parent().parent().find('.imageclick i').addClass('fa-external-link-square');
				$(this).attr('src', site_url+'images/blank.png');
				_imgran=1;
			}
		}).on('dragstart', function(event) { 
			event.preventDefault(); 
		}).attr('width', '100%').data('link', val.link).appendTo(_image_seo);



		/* top left wrapper */
		_holder=$( "<div/>", {
			 "class": " destop"
		}).appendTo(_container);


		/* description  */
		if(val.description){
			_description=$( "<div/>", {
				 "class": "description"
			});
			
			_desctxt=$( "<section/>", {
				"class": "descriptionText",
				'attr': { 'itemprop' : 'description' }
			}).html(val.description).appendTo(_description);

			_description.appendTo(_container);


			
			_drop=$( "<div/>", {
				 "class": "reorder pull-left"
			}).appendTo(_holder);

			_reorder=$( "<span/>", {
				 "class": "fa fa-reorder "
			})
			.attr({'title': 'Show Comments','data-toggle':"tooltip",'data-placement':"right"})
			.on('click',function(event) {
				event.preventDefault();
				$( this).parent().parent().parent().find('.description').slideToggle();
			}).prependTo(_drop);
				
		}


		/* sidebars */
		$( "<div/>", {
			 "class": "sidebars sidebar-left",
		}).html('<i class="fa fa-check-square-o fa-2x"></i>').appendTo(_container);
		
		$( "<div/>", {
			 "class": "sidebars sidebar-right",
		}).html('<i class="fa fa-star fa-2x"></i>').appendTo(_container);


		/* image click area */
		_imageclick=$( "<div/>", {
			 "class": "imageclick",
		}).attr('data-oktoclick', 'yes')
		.on('click',function(event) {
				if($(this).attr('data-oktoclick') == 'yes'){
					event.preventDefault();
					gotosource(val);

				}
		}).html('<i class="fa fa-refresh fa-spin fa-2x"></i>').appendTo(_container);


		/* comments */
		$( "<div/>", {
			 "class": "comments"
		}).html(author + ' ' + comment).appendTo(_container);


		/* title wrapper */
		_content=$( "<div/>", {
			 "class": "post-content"
		}).hover(
			  function() {
				 if($(document).width() > 480) getcomments(val,this);
			  }, function() {
				if($(document).width() > 480) $( this ).parent().find('.comments').slideUp();
			  }
		).click(function() {
				getcomments(val, this);
		}).appendTo(_container);


		/* title content wrapper */
		_caption=$( "<div/>", {
			 "class": "caption"
		}).on('click',function(event) {
			event.preventDefault();
			$( this ).parent().find('.comments').slideToggle();
		}).appendTo(_content);


		/* title itself */
		_title=$( "<header/>", {
			"class": "title col-md-12	 col-sm-12 col-xs-12",
			'attr': { 'itemprop' : 'headline' }
		}).html(val.title).appendTo(_caption);

		if(uuid){
			/* favorite wrapper */
			_fav=$( "<div/>", {
				 "class": "favorite pull-left"
			});
			
			_down=$( "<i/>", {
				 "class": "fa fa-check-square-o fa-fw"
			}).attr({'title': 'Mark as read','data-toggle':"tooltip",'data-placement':"bottom"})
			.on('click',function(event) {
				if(!uuid) return false;
				event.preventDefault();
				me=this;
				$(me).closest('.thumbnail').hide();
				mark_read(me, val);
			}).appendTo(_fav);

			_star=$( "<i/>", {
				 "class": "fa fa-star-o fa-fav"
			})
			.attr({'title': 'Favorite','data-toggle':"tooltip",'data-placement':"bottom"})
			.on('click',function(event) {
				if(!uuid) return false;
				event.preventDefault();
				me=this;
				$( me ).toggleClass('fa-star-o').toggleClass('fa-star');
				mark_fav(me, val);
			}).appendTo(_fav);
			if(val.favorite != 'false') $( _star ).toggleClass('fa-star-o').toggleClass('fa-star');
		}

		/* social status wrapper */
		_social=$( "<div/>", {
			 "class": "social pull-left"
		});


		/* social status */
		_social_wrap=$( "<div/>", {
			 "class": "socialwrap"
		}).appendTo(_social);


		/* shares */
		$( "<span/>").html(share_count).appendTo(_social_wrap);   


		_share_drop_hl=$( "<span/>", {
			 "class": "dropdown"
		})
		.attr({'title': share_count + ' shares','data-toggle':"tooltip",'data-placement':"bottom"})
		.appendTo(_social_wrap);  


		$( "<i/>", {
			 "class": "fa fa-fw fa-colored fa-share-alt dropdown-toggle"
		})	
		.attr('data-toggle', 'dropdown').appendTo(_share_drop_hl);   


		/* social share stuff */
		_share_drop=$( "<ul/>", {
			 "class": "social-share dropdown-menu"
		}).appendTo(_share_drop_hl);

		_share_list=$( "<li/>").appendTo(_share_drop);

		$( "<i/>", {
			 "class": "fa fa-facebook-square"
		}).on('click',function(event) {
			share(2, val.link);
			event.preventDefault();
		}).appendTo(_share_list);

		$( "<i/>", {
			 "class": "fa fa-linkedin-square"
		}).on('click',function(event) {
			share(4, val.link);
			event.preventDefault();
		}).appendTo(_share_list);

		$( "<i/>", {
			 "class": "fa fa-twitter-square"
		}).on('click',function(event) {
			share(3, val.link);
			event.preventDefault();
		}).appendTo(_share_list);

		$( "<i/>", {
			 "class": "fa fa-google-plus-square"
		}).on('click',function(event) {
			share(1, val.link);
			event.preventDefault();
		}).appendTo(_share_list);   
		
		/* likes */
		$( "<span/>").html(like_count)
			.appendTo(_social_wrap);   

		_social_drop=$( "<span/>", {
			 "class": "dropdown fblike"
		})
		.attr({'title': like_count + ' likes','data-toggle':"tooltip",'data-placement':"bottom"})
		.appendTo(_social_wrap);  

		$( "<i/>", {
			 "class": "fa fa-fw fa-colored fa-thumbs-up  dropdown-toggle"
		}).on('click',function(event) {
			event.preventDefault();
			$(this).parent().find('.fbarea').html('<iframe src="//www.facebook.com/plugins/like.php?href='+val.link+'&amp;width&amp;layout=button&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=35&amp;appId=377670419037612" scrolling="no" frameborder="0" allowTransparency="true"></iframe>');
		}).attr('data-toggle', 'dropdown').appendTo(_social_drop);  

		_share_drop2=$( "<div/>", {
			 "class": "social-share dropdown-menu"
		}).appendTo(_social_drop);

		_share_list=$( "<span/>").appendTo(_share_drop2);

		$( "<span/>", {
			 "class": "fbarea"
		})
		.appendTo(_share_list);

		/* comments */

		$( "<span/>").html(comment_count).appendTo(_social_wrap);   

		$( "<i/>", {
			"class": "fa fa-fw fa-colored fa-comments",
			'attr': { 'itemprop' : 'commentCount','title': comment_count + ' comments','data-toggle':"tooltip",'data-placement':"bottom"}

		})	
		.on('click',function(event) {
			event.preventDefault();
			me=$( this ).parent().parent().parent().parent().find('.comments')
			getcomments(val, me);
		}).appendTo(_social_wrap);   

			_social.appendTo(_holder);
		if(uuid){
			_fav.appendTo(_holder);
		}
		

		/* author wrapper */
		_vote=$( "<div/>", {
			 "class": "vote"
		}).appendTo(_container);

		/* author */
		if(val.author) 
			$( "<div/>", {
				 "class": "twitter pull-left",
				 'attr': { 'itemprop': 'author', 'itemscope' : '', 'itemtype' : 'http://schema.org/Person' }
			})
			.html(val.author)
			.on('click',function(event) {
				event.preventDefault();
				source=val.author;
				localStorage.setItem("source", source);
				resetnews();
				//window.open(val.authorLink);
			}).prependTo(_vote);



		use=(totalrows-used);

		if(justadded == perrow){
			oldperrow=perrow;

			do {
				perrow=rand(1,3);
			}
			while (perrow == oldperrow);

			if(perrow > use) perrow=use;
			justadded=0;
		}

		justadded++;
		used++;

		if(perrow == "1"){
			_col='col-md-12 col-sm-12';
		}else if(perrow =="2"){
			_col='col-md-6 col-sm-6';
		}else if(perrow =="3") _col='col-md-4 col-sm-4';

		_w=$( "<div>", {
			 "class": _col+ " col-xs-12 thumbwrap item_holder"
		});

		_container.appendTo(_w);

		_w.appendTo('#news');

		$("[data-toggle='tooltip']").tooltip({html: true});
	}

	function buildItemMagazine(val){

		var img=val.image.replace('blank.png', 'images/blank.png');
		var _imgran=0;
		comment_count=prettyPrintNumber(val.comments);
		like_count=prettyPrintNumber(val.likes);
		share_count=prettyPrintNumber(val.shares);

		_container=$( "<div>", {
			 "class": "item_holder well altlist clearfix",
		});

		_row=$( "<div>", {
			 "class": "row listitem",
		}).appendTo(_container);

		_imgwrap=$( "<div>", {
			 "class": "imgwrap col-md-4 col-sm-4 col-xs-12",
		}).appendTo(_row);

		_img=$( "<img>", {
			 "src": site_url+img,
		}).error(function(){
			if(_imgran == 0){
				$(this).attr('src', site_url+'images/blank.png');
				_imgran=1;
			}
		}).on('click', function(){
			gotosource(val);
		}).appendTo(_imgwrap);

		_author=$( "<div>", {
			 "class": "author",
		}).html(val.author).appendTo(_imgwrap);

		_details=$( "<div>", {
			 "class": "col-md-8 col-sm-8 col-xs-12",
		}).appendTo(_row);

		_details_row=$( "<div>", {
			 "class": "row",
		}).appendTo(_details);

		_title=$( "<div>", {
			 "class": "ntitle col-md-12",
		}).on('click', function(){
			gotosource(val);
		}).html('<h4>'+val.title+'</h4>').appendTo(_details_row);

		_contents_row=$( "<div>", {
			 "class": "row",
		}).appendTo(_details);

		_contents=$( "<div>", {
			 "class": "col-md-12",
		}).appendTo(_contents_row);

		_description=$( "<p>", {
			 "class": "listtext",
		}).html(val.description).appendTo(_contents);

		_listitems=$( "<ul>", {
			 "class": "pull-right list-inline list-unstyled",
		}).appendTo(_contents);

		if(uuid){
		
			$( "<li>").html('<i class="fa fa-check-square-o fa-fw"></i>')
					.attr({'title': 'Mark as read','data-toggle':"tooltip",'data-placement':"bottom"})
					.on('click',function(event) {
						event.preventDefault();
						me=this;
						$(me).closest('.altlist').hide();
						mark_read(me, val);
						
			}).appendTo(_listitems);


			_star=$( "<li>").html('<i class="fa fa-star-o fa-fw"></i>')
				.attr({'title': 'Favorite','data-toggle':"tooltip",'data-placement':"bottom"})
				.on('click',function(event) {
					event.preventDefault();
					me=this;
					$( me ).find('i').toggleClass('fa-star-o').toggleClass('fa-star');
					mark_fav(me, val);
			}).appendTo(_listitems);
			if(val.favorite != 'false') $( _star ).find('i').toggleClass('fa-star-o').toggleClass('fa-star');

		}

		$( "<li>").html('<i class="fa fa-si fa-facebook-square fa-fw"></i>')
		.on('click',function(event) {
			share(2, val.link);
			event.preventDefault();
		}).appendTo(_listitems);


		$( "<li>").html('<i class="fa fa-si fa-twitter-square fa-fw"></i>')
		.on('click',function(event) {
			share(3, val.link);
			event.preventDefault();
		}).appendTo(_listitems);

		$( "<li>").html('<i class="fa fa-si fa-google-plus-square fa-fw"></i>')
		.on('click',function(event) {
			share(1, val.link);
			event.preventDefault();
		}).appendTo(_listitems);

		$( "<li>").html('<i class="fa fa-si fa-linkedin-square fa-fw"></i>')
		.on('click',function(event) {
			share(4, val.link);
			event.preventDefault();
		}).appendTo(_listitems);


		_container.appendTo('#news');

		$("[data-toggle='tooltip']").tooltip({html: true});
	}

	function getcomments(val,me){
		$.getJSON( "https://graph.facebook.com/comments/?limit=10&ids="+val.link, 
			function( data )
			{
				d=data[val.link];
				comment='The monster found no comments :(';
				author='';
				if(d){

					count=d.comments.data.length;
					if(count > 0){

						_commentwrap=$( "<ul/>", {
							 "class": "comment-wrap list-unstyled"
						});

						for (i=0; i < count ; i++) {
							if(d.comments.data[i] && d.comments.data[i].from){
								$( "<li/>", {
									 "class": "comment-item"
								}).html('<b>'+ d.comments.data[i].from.name + '</b> ' + d.comments.data[i].message).appendTo(_commentwrap);
							}
						} 
						_a=$(me).parent().find('.comments');
						_a.html('');
						_commentwrap.appendTo(_a);


					} else {
						$(me).parent().find('.comments').html('<b>'+author + '</b> ' + comment);
					}


					 
				}
			}
		).error(function() { 
			comment='The monster could not eat any comments.!';
			
		});

		$( me ).parent().find('.comments').slideToggle();
	}

	function prettyPrintNumber( number ) {
		var numberString;
		var scale = '';
		if( isNaN( number ) || !isFinite( number ) ) {
			numberString = 'N/A';
		} else {
			var absVal = Math.abs( number );

			if( absVal < 1000 ) {
				scale = '';
			} else if( absVal < 1000000 ) {
				scale = 'K';
				absVal = absVal/1000;

			} else if( absVal < 1000000000 ) {
				scale = 'M';
				absVal = absVal/1000000;

			} else if( absVal < 1000000000000 ) {
				scale = 'B';
				absVal = absVal/1000000000;

			} else if( absVal < 1000000000000000 ) {
				scale = 'T';
				absVal = absVal/1000000000000;
			}

			var maxDecimals = 0;
			if( absVal < 10 && scale != '' ) {
				maxDecimals = 1;
			}
			numberString = absVal.toFixed( maxDecimals );
			numberString += scale
		}
		return numberString;
	}

	function load(start, limit, c){
		if(!c) c = 'topstories';
		$('#error').hide();
		$('#loading').show();
		$('#timestamp').fadeOut();

		
		if(localStorage.getItem("display_"+cat)) display=localStorage.getItem("display_"+cat);

		if(display == "list"){
			limit=25
			pictures=false;
		}else if(display == "card"){
			limit=10;
			pictures=true;
		} else {
			limit=10;
			pictures=true;
			//if(localStorage.getItem("pictures")) pictures=localStorage.getItem("pictures");
		}

		start=start*limit;

		$.getJSON( site_url+"pull.php?start="+start+"&limit="+limit+'&c='+c+'&token='+csrftoken+'&sort='+sort+'&source='+source+'&pictures='+pictures+'&search='+search, 
			function( data ) {
					$('.fa-searchcontrol').removeClass('fa-refresh fa-spin');

				if(data){
						
					if(data.length == ''){
						$('#more').hide();
						$('#loading').hide();
						$('#noresults').show();
					} else {
						$('#loading').fadeOut();
						scrollLoad = true;
						totalrows=Object.keys(data).length;
						used=0;
						use=0;
						justadded=0;
						ran=3;
						if(totalrows < ran) ran = totalrows;
						perrow=rand(1,ran);
						
						 
						 

						  $.each( data, function( key, val ) {
							if(listi > limit*4 && display != "list"){
								//$('#news').find('.item_holder:lt(1) img').attr('src','data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAA‌​LAAAAAABAAEAAAICRAEAOw%3D%3D');
								//$('#news').find('.item_holder:lt(1)').remove();
							}

							if(display == 'magazine'){
								buildItemMagazine(val);
							}else if(display == 'list'){
								buildItemList(val);
							} else {
								buildItemCard(val);
							}
							listi++;
						  });

						
						 $('#more').fadeIn();
					}
					page++;
				} else erroronload();

		}).error(function() { 
			erroronload();
		});
	}

	function erroronload(){
		$('.fa-searchcontrol').removeClass('fa-refresh fa-spin');
		$('#loading').hide();
		$('#noresults').hide();
		$('#more').hide();
		$('#error').show();
	}

	function resetbutton(me){
		$(me).data('confirmed', false);
		$(me).removeClass('red');
	}

	function resetsearchfeed(){
		resetsearch=true;
		searchedfeeds=false;
		feed_list().html(searchfeedold);
		feed_wrap().find('.clearsearch').hide();
		feed_wrap().find('.rssinput').val('');
		feed_wrap().find('.btn-file').show();
	}

	function searchfeeds(me,s){
		if(!uuid) return false;
		resetsearch=false;
		if(offmetimer) clearTimeout(offmetimer);
		searchedfeeds=true;

		myhtml=feed_list().html();
		feed_list().html('<li class="list-group-item">Going grocery shopping...</li>');
		feed_wrap().find('.fa-searchcontrol2').addClass('fa-refresh fa-spin');
		feed_wrap().find('.btn-file').hide();
		feed_wrap().find('.clearsearch').show();

		$.getJSON( site_url+'ajax.php?mode=searchSource&token='+csrftoken+'&q='+s, 
			function( data )
			{
				feed_wrap().find('.fa-searchcontrol2').removeClass('fa-refresh fa-spin');
				if(data.length > 0){
					$(feed_list()).html('');
					if(resetsearch){ 
						feed_list().html(myhtml);
					} else parsenewfeeds(data, 'search');
					//offmetimer = setTimeout(function(){$(me).blur()}, 900);
				} else {
					//offmetimer = setTimeout(function(){$(me).blur()}, 900);
					$(feed_list()).html('<li class="list-group-item">Oh no! No results were found :(</li>');
				}
			}
		).error(function() { 
			offmetimer = setTimeout(function(){$(me).blur()}, 2000);
			feed_list().html('<li class="list-group-item">Oh no! No results were found :(</li>');
			feed_wrap().find('.fa-searchcontrol2').removeClass('fa-refresh fa-spin');
		});
	}

	function parsenewfeedscode(icon, v, i){
		return '<li class="list-group-item list-group-id-'+i+'">'
				+ icon
				+'<strong>'+v.title+'</strong>'
				+'<br>'
				+v.url
				+'</li>';
	}

	function parsenewfeeds(data, _new){
		if(_new == "search") feed_list().html('');
		$.each(data, function (i, v) {
			i++;
			if(!v.title) v.title='No title';

			if(_new == "search"){
				icon='<i class="addcatfeedplus fa fa-plus fa-colored" data-id="'+ i +'" data-url="'+v.url+'" data-type="'+ feedlisttype +'"></i>';
			} else icon='<i class="rssdel fa fa-trash-o fa-colored" data-url="'+v.id+'"></i>';

			_code=parsenewfeedscode(icon, v, i);

			if(_new && _new != 'search'){
				if(searchfeedold == nofeeds) {
					searchfeedold=_code;
				} else searchfeedold= searchfeedold + _code;
			}

			if(!searchedfeeds ||  _new == 'search'){
				if(feedlisttype == 'settings'){
					feed_list().append(_code);
				} else { 
					if(v.added == "notadded" && _new != 'search') icon='<i class="addcatplus fa fa-plus fa-colored" data-url="'+ v.id +'"></i>';
					feed_list().append(parsenewfeedscode(icon, v, i));
				}
			}
		});
	}

	function shake(el){
		el.addClass('animated shake');
		el.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
		function () {
			el.removeClass('animated shake');
		});
	}

	function addFeedFail(me, id){
		if(id){
			$('.list-group-id-' + id).find('.fa').toggleClass('fa-times-circle fa-refresh fa-spin');
			shake($('.list-group-id-' +id).find('.fa'));
		} else {
			_me=$(me).parent().parent().parent().find('.input-group');
			shake(_me);
		}
	}

	function addFeedSuccess(me, myhtml, id){
		$(me).html('<i class="fa fa-check"></i>');

		timero = setTimeout(function () {
		  $(me).html(myhtml);
		}, 3000);

		if(id) $('.list-group-id-' + id).remove();
		resetnews();
	}

	function sendFile(file) {
		if(!uuid) return false;
		var me=feed_wrap().find('.addrss');
		var meupl=feed_wrap().find('.fa-upload-icon');
		var	myhtml=me.html();

		var form_data = new FormData();                  
		form_data.append('file', file)
		var extension = file.name.substr( (file.name.lastIndexOf('.') +1) );
		if(file.name.length < 1 || file.size > 100000 || extension != 'opml') {
			$('.fa-upload-icon').addClass('fa-upload');
			$('.fa-upload-icon').removeClass('fa-refresh fa-spin');
			addFeedFail(me);

			return false;
		}
		  $.ajax({
			type: 'post',
			url: site_url+'ajax.php?mode=upload&token=' + csrftoken,
			data: form_data,
			success: function (data) {
				meupl.toggleClass('fa-upload fa-refresh fa-spin')

				if(data != "failed"){
					addFeedSuccess(me, myhtml);
					parsenewfeeds(data, true);
				} else addFeedFail(me)

			},
			error: function(){
				meupl.toggleClass('fa-upload fa-refresh fa-spin');
				addFeedFail(me);
			},
			cache: false,
			processData: false,
			contentType: false,
			dataType: 'json'
		  });
	}

	function catclicks(){
		$('.clink').on('click', function(event){
			event.preventDefault();
			switchCat(this);
		});
	} 

	function deletecatclicks(){
		if(!uuid) return false;
		$('.deletecat').on('click', function(event){
			event.preventDefault();

			if(!$(this).data('confirmed')){
				$(this).data('confirmed', true);
				$(this).addClass('red');
				me=this;
			} else {
				resetbutton(this);

				event.preventDefault();
				val=$(this).data('cat');
				me=this;

				_me=$(this);
				_me.toggleClass('fa-trash fa-refresh fa-spin');

				$.post( site_url+"ajax.php", { mode: "deleteUserCat", cat: val, token:csrftoken })
				  .done(function( data ) {
					_me.toggleClass('fa-trash fa-refresh fa-spin');
					if(data == 'success'){
						$(me).parent().next('.divider').remove();
						$(me).parent().remove();

						if(val == cat){
							backhome();
							resetnews();
						}
					} else {
						shake(_me);
					}
				  });

			}

			$(document).on('mouseover', '.deletecat', function(event){
				clearTimeout(timeoToken);
			});

			$(document).on('mouseleave', '.deletecat', function(event){
				timeoToken = setTimeout(function(){resetbutton(me)}, 2000);
			});
		});
	}

	function backhome(){
		cat='topstories';
		title='Top Stories';
		$('#categoryTitle').html(title);
	}

	function switchCat(t){
		listi=1;
		$('nav .dropdown-menu').attr('aria-expanded', false);
		$('nav .dropdown').removeClass('open', false);

		cat=$(t).data('cat');
		if(cat){
			title=$(t).html();
			source='';
			$('#categoryTitle').html(title);

			if($('*[data-cat="'+cat+'"]').attr('data-customcat') == "true"){
				$('.scroll-top-wrapper-left').fadeIn();
			} else $('.scroll-top-wrapper-left').fadeOut();
			resetnews();
			window.history.pushState({}, '', site_url + cat + '/#'+ uuid);
		}else{
			window.history.pushState({}, '', site_url + '#'+ uuid);
		}
	}

	function resetnews(){
		page=0;
		listi=1;
		$('#news').html('');
		$('#noresults').hide();
		$('#more').hide();
		$('#loading').show();
		$('#bottomrefresh').fadeOut();
		if(typeof(Storage) !== "undefined") {
			localStorage.setItem("cat", cat);
			localStorage.setItem("catTitle", title);
		}

		load(0, items, cat+'&reset=true');

		if($('.pullrefresh').html() != ''){
			$('.pullrefresh').html('');
			$('body').css('padding-top', '0px');
			$(window).scrollTop(1);
		}
	}

	function setsearch(s){
		search=s;
		localStorage.setItem("search", s);
		$('.fa-searchcontrol').addClass('fa-refresh fa-spin');
		resetnews();
		if(s) $('#searchclear').show();
	}

	function scrollToTop() {
		$('html, body').scrollTop(0);
	}

	function share(type, url){
		switch(type){
			case 1:
				src='https://plus.google.com/share?url='+url;
			break;
			case 2:
				src='https://www.facebook.com/sharer/sharer.php?u='+url;
			break;
			case 3:
				src='http://twitter.com/share?&url='+url;
			break;
			case 4:
				src='https://www.linkedin.com/shareArticle?mini=true&url='+url;
			break;
		}

		var width = 500;
		var height = 250;
		var left = parseInt((screen.availWidth/2) - (width/2));
		var top = parseInt((screen.availHeight/2) - (height/2));
		var winProperty = "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top+ ",location=no,status=no,menubar=no,titlebar=no";
		mywindow = window.open(src,'Share',winProperty) ;
	}

	function validEmail(email) {
	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);
	}

	function mark_read(me, val){
		if(!uuid) return false;
		$.post( site_url+"ajax.php", { mode: "markRead", url: val.id, token:csrftoken })
		  .done(function( data ) {
			if(data == 'success'){
				$(me).closest('.thumbwrap, .item_holder').remove();
			} else $(me).closest('.thumbnail').show();

		  });
	}

	function mark_fav(me, val){
		//console.log(me.parent().attr('class'));
		if(!uuid) return false;
		$.post( site_url+"ajax.php", { mode: "addFavorite", url: val.id, token:csrftoken })
		  .done(function( data ) {
			if(data == 'success'){
				$( me ).removeClass('fa-star-o');
				$( me ).addClass('fa-star');
			} else {
				$( me ).removeClass('fa-star');
				$( me ).addClass('fa-star-o');
			}
		  });
	}

	function scrolltotop(){
		$(window).scroll(throttle(function () { 
			if ($(window).scrollTop() > 200) {
				$('.scroll-top-wrapper').addClass('show');
			} else $('.scroll-top-wrapper').removeClass('show');
			

			offset=$(document).height() / 3;
			if (scrollLoad && $(window).scrollTop() >= ($(document).height() - $(window).height() - offset)) {
				scrollLoad = false;
				$('#more').hide();
				load(page,items, cat);
			}
		}, 100));
	}

	function logout(){
		backhome();
		$('.fullaccess').hide();
		$('#settings').modal('hide');
		if(typeof(Storage) !== "undefined") localStorage.clear();
		uuid='';
		localStorage.setItem("uuid", uuid);
		controlSettingsMenu();
		resetnews();
		window.location.hash='';
		window.history.pushState({}, '', site_url);
	}

	function controlSettingsMenu(){
		if(!uuid){
			$('.user-access').hide();
		}else $('.user-access').show();
	}

	function settingsMenu(){
		var timeout;
		$(".settings-nav-click").hover(function () {
			clearTimeout(timeout);
			hidecatmenu();
			$(".settings-nav").show();
		}, function () {
			timeout = setTimeout(function(){
				$(".settings-nav").delay(500).hide();
			},500);
		});


		$('.settings-nav').hover(function(){
			clearTimeout(timeout);
		},function(){
			timeout = setTimeout(function(){
				$(".settings-nav").delay(500).hide();
			},500);

		});

		$(document).on('click', '.settings-nav-click', function(event){
			$('.settings-nav').show();
			$(this).blur();
		});
	}

	function trackconversions(){

		(function() {
		  var _fbq = window._fbq || (window._fbq = []);
		  if (!_fbq.loaded) {
			var fbds = document.createElement('script');
			fbds.async = true;
			fbds.src = '//connect.facebook.net/en_US/fbds.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(fbds, s);
			_fbq.loaded = true;
		  }
		})();
		window._fbq = window._fbq || [];
		window._fbq.push(['track', '6017469349881', {'value':'0.01','currency':'USD'}]);

		$('<img />').attr('src',"//www.googleadservices.com/pagead/conversion/1071645676/imp.gif?label=_JKFCKG65VcQ7IeA_wM&amp;guid=ON&amp;script=0").appendTo('body').hide();

	}

	function hidecatmenu(){
		$('.addcatmenu').hide(0, function () {
			$('.addfeedtocat').removeClass('fa-minus');
			$('.addfeedtocat').addClass('fa-plus');
			$('.addfeedslist').html('');
		});
	}

/* binds */
	$(document).on('click', '.rssdel', function(event){
		if(!uuid) return false;
		event.preventDefault();

		if(!$(this).data('confirmed')){
			$(this).data('confirmed', true);
			$(this).addClass('red');
			me=this;
		} else {
			resetbutton(this);

			val=$(this).data('url');
			me=this;
			$(me).toggleClass('fa-trash-o fa-refresh fa-spin');
		
			if(feedlisttype == "category"){
				mode = "deleteUserCatFeed";
			} else mode = "deleteUserFeed";

			$.post( site_url+"ajax.php", { mode: mode, cat: title, feed_id: val, token:csrftoken })
			  .done(function( data ) {
				if(data == 'success'){
					if(feedlisttype == "category"){
						$(me).removeClass('rssdel');
						$(me).toggleClass('addcatplus fa-refresh fa-spin fa-plus');
						$(me).parent().appendTo($(me).parent().parent());
					} else {
						$(me).closest('.list-group-item').remove();
					}

					if(!feed_list().html()) feed_list().html(nofeeds);
					searchfeedold=feed_list().html();

					resetnews();
				} else {
					$(me).toggleClass('fa-trash-o fa-refresh fa-spin');
					shake($(me));
				}
			  });

		}

		$(document).on('mouseover', '.rssdel', function(event){
			if(timeoToken) clearTimeout(timeoToken);
		});

		$(document).on('mouseleave', '.rssdel', function(event){
			timeoToken = setTimeout(function(){resetbutton(me)}, 2000);
		});
	});

	$(document).on('mouseover click', '.rssinput',function(event) {
		  if(offmetimer) clearTimeout(offmetimer);
	});

	$(document).on('keyup', '.rssinput',throttle(function(event) {
	  s=$(this).val();
	  if(offmetimer) clearTimeout(offmetimer);
	  if(s.length==0) resetsearchfeed();
	  if(s.length>=2) searchfeeds(this, s);
	}, 600));
	
	$(document).on('click', '.addcatfeedplus', function(event){
		if(!uuid) return false;
		searchfieldclicked=this;
		
		_input=feed_wrap().find('.rssinput');
		_addrss=feed_wrap().find('.addrss');
		
		$(this).toggleClass('fa-plus fa-refresh fa-spin');

		_ival=_input.val();
		_input.val($(this).data('url'));
		_addrss.data('addcat', $(this).data('id'));
		_addrss.click();
		_input.val(_ival);
	});

	$(document).on('click', '.addrss', function(event){
		event.preventDefault();
		if(!uuid) return false;
		var me=this;
		var myhtml='Feed Me!';
		var id=$(me).data('addcat');
		event.preventDefault();
		val=feed_wrap().find('.rssinput').val();

		if(val){
			$(me).html('<i class="fa fa-refresh fa-spin"></i>');

			$.post( site_url+"ajax.php", { mode: "addFeed", url: val, token:csrftoken, 'cat':title,'update_type':feedlisttype}, null, 'json')
			  .done(function( data ) {
					if(!searchedfeeds) $('.rssinput').val('');
					parsenewfeeds(data, true);
					
					addFeedSuccess(me, myhtml, id);
			  }).error(function() { 
					addFeedFail(me, id);
					if(!searchedfeeds) $('.rssinput').val('');
					$(me).html(myhtml);
			});
		}
	});

	$(document).on('click', '.settingsclick', function(event){
		event.preventDefault();
		if(!uuid) return false;
		$('.settings-nav').hide();
		feedlisttype='settings';
		_m=this;
		$('.settings-feed-list').html('<li class="list-group-item">The monster is finding food...</li>');
		$.getJSON( site_url+"ajax.php?mode=getAllFeedList&token="+csrftoken, 
			function( data )
			{
				$('.settings-feed-list').html('');
				$('.rssinput').val('');

				searchedfeeds=false;
				parsenewfeeds(data);
				searchfeedold=$('.settings-feed-list').html();

				$('.settings-feed-list').scrollTop(0);
				$('#settings').modal();
				$('#settings').find('.clearsearch').hide();
				$('#settings').find('.btn-file').show();
			}
		).error(function() { 
			$('.settings-feed-list').html(nofeeds);
			searchfeedold=$('.settings-feed-list').html();
			$('#settings').modal();
		});
	});

	$(document).on('click','.addfeedtocat', function(event){
		event.preventDefault();
		if(!uuid) return false;
		feedlisttype='category'
		$('.modal.in').modal('hide');
		_m=this;
		if($(_m).hasClass('fa-plus')){
			$(_m).toggleClass('fa-plus fa-refresh fa-spin')
			$('.addcatmenu .rssinput').val('');		
						$('.addcatmenu').find('.clearsearch').hide();
						$('.addcatmenu').find('.btn-file').show();

			$('.addfeedslist').html('<li class="list-group-item">The monster is finding food...</li>');
				$.getJSON( site_url+"ajax.php?mode=getFeedList&cat="+title+'&token='+csrftoken, 
					function( data )
					{
						$('.addcatmenu .typewrap').attr('data-type', 'category');
						$('.addfeedslist').html('');

						searchedfeeds=false;
						parsenewfeeds(data);
						searchfeedold=$('.addfeedslist').html();

						$('.addfeedslist').scrollTop(0);
						$('.addcatmenu').slideToggle();
						$(_m).toggleClass('fa-minus fa-refresh fa-spin')
					}
				).error(function() { 
					$('.addfeedslist').html(nofeeds);
					searchfeedold=$('.addfeedslist').html();
					$('.addcatmenu').slideToggle();
					$(_m).toggleClass('fa-minus fa-refresh fa-spin')
				});
		} else {
			$('.addcatmenu').slideToggle(0, function () {
				$(_m).toggleClass('fa-minus fa-plus');
				$('.addfeedslist').html('');
			});
		}
	});

	$(document).on("dragover", "#settings, .addcatmenu", function(event) {
		event.preventDefault();  
		event.stopPropagation();
		$(this).find('.modal-content').addClass('dragging');
		$('.addcatmenu').addClass('dragging');
	});

	$(document).on("dragleave", "#settings, .addcatmenu", function(event) {
		event.preventDefault();  
		event.stopPropagation();
		$(this).find('.modal-content').removeClass('dragging');
		$('.addcatmenu').removeClass('dragging');
	});

	$(document).on("drop", "#settings, .addcatmenu", function(event) {
		$(this).find('.modal-content').removeClass('dragging');
		$('.addcatmenu').removeClass('dragging');
		
		feed_wrap().find('.fa-upload-icon').toggleClass('fa-upload fa-refresh fa-spin')
		sendFile(event.originalEvent.dataTransfer.files[0]);
		event.preventDefault();  
		event.stopPropagation();
	});

	$(document).on('change', ':file', function (event) {
		if(!uuid) return false;
		event.preventDefault();  
		feed_wrap().find('.fa-upload-icon').toggleClass('fa-upload fa-refresh fa-spin')
		sendFile(this.files[0]);
		$(this).replaceWith($(this).clone());
	});

	$(document).on('click','#timestamp i, #bottomrefresh span', function(event){
		event.preventDefault();
		resetnews();
	});

	$(document).on('click','.feedhelp', function(event){
		event.preventDefault();
		backhome();
		resetnews();
	});

	$(document).on('click','#more', function(event){
		event.preventDefault();
		load(page,items, cat);
	});

	$(document).on('click','.reportissues', function(event){
		event.preventDefault();


		tag='<p>It\'s important to have a happy monster so be sure to tell the devs what\'s up with your monster.</p>'
			+'<h4>Your monsters name is '+uuid+'</h4>'
			+'<p><textarea rows="6" class="mailbody form-control" placeholder="Include your contact details if you would like a reply."></textarea></p>'
			+'<p><button class="sendmail form-control btn btn-primary">Submit to devs</button></p>'
			;

		$('#dialogTitle').html('Keep your monster happy!');
		$('#dialogBody').html(tag);
		$('#dialog').modal();

		$('.sendmail').on('click', function(event){
				event.preventDefault();
				val=$('.mailbody').val();
			if(val){
				var me=this;
				var myhtml=$(this).html();
				$(this).html('<i class="fa fa-refresh fa-spin"></i>');

			$.post( site_url+"ajax.php", { mode: "contact", body: val, token:csrftoken})
			  .done(function( data ) {
				$(me).html(myhtml);
				if(data == 'success'){
					$('#dialogTitle').html('Your message is on it\'s way');
					$('#dialogBody').html('<p>Your monster will be happy that you care so much about it.</p><p>If you provided contact information the devs will get back to you</p>');
					$('#dialog').modal();
				} else {
					$('#dialogTitle').html('Oh no! Your message can\'t be delivered :(');
					$('#dialogBody').html('<p>Your monster will not be happy, something went wrong!</p><p>Please try your message again.</p>');
					$('#dialog').modal();
				}
			  });
			}
		});
	});

	$(document).on('click','.signup', function(event){
		event.preventDefault();
		$('.betawrap').html('<br><strong>Contacting the monster adoption agency. <i class="fa fa-refresh fa-spin"></i></strong><br><br>');
		$.post( site_url+"ajax.php", { mode: "checkBeta", token:csrftoken})
		  .done(function( data ) {
			if(data.indexOf(' ') === -1){
				uuid=data;
				$('#newuuid').html(uuid);
				localStorage.setItem("uuid", uuid);
				$('.betawrap').html('<strong>Agency contacted :D</strong>');
				$('.betaaccess').hide();
				$('.fullaccess').show();
				controlSettingsMenu();
				newuser=true;

				trackconversions();

				window.location.hash = uuid;

			} else {
				$('.betawrap').html('<br>All monsters adopted, try again later.<br><br>');
			}
		  });
	});

	$(document).on('click', '#searchclear',function(event){
		$('#search').val('');
		$('#searchclear').hide();
		setsearch('');
	});

	$(document).on('keyup', '#search',throttle(function(event) {
	  s=$(this).val();
	  if(s.length>=2) setsearch(s);
	  if(s.length == 0) $('#searchclear').hide();
	}, 300));

	$(document).on('click','.scroll-top-wrapper', scrollToTop);

	$(document).on('click', '.addcatplus',  function(event){
		if(!uuid) return false;
		_m=this;
		_me=$(this);
		
		$(_m).toggleClass('fa-plus fa-refresh fa-spin');
		$.post( site_url+"ajax.php", { mode: "addUserFeed", feed_id: $(this).data('url'), cat: title, token:csrftoken })
		  .done(function( data ) {
			if(data == 'success'){
				$(_m).toggleClass('fa-plus fa-refresh fa-spin');
				$(_m).toggleClass('addcatplus rssdel fa-trash-o fa-plus');
				$(_m).parent().appendTo($(_m).parent().parent());
				resetnews();
			} else {
				$(_m).toggleClass('fa-plus fa-refresh fa-spin');
				shake(_me);
			}
		  }).error(function() { 
				$(_m).toggleClass('fa-plus fa-refresh fa-spin');
				shake(_me);
			});
	});

	$(document).on('click','.site_wrap, .dropdown-toggle',function(event){
		hidecatmenu();
	});

	$(document).on('click', '.clearsearch', function(event){
		resetsearchfeed();
	});

	$(document).on('keypress', '.monsterpassword', function(event){
		if(event.keyCode==13){
			if(!$(this).val()){
				shake($(this));
				return false;
			}
			_mep=$(this);
			$.post( site_url+"ajax.php", { mode: "authMonster", 'uuid': uuid, password: md5($(this).val()), token:csrftoken })
			  .done(function( data ) {
				if(data == 'success'){
					window.location.hash = uuid;
					$('.passwordaccess').hide();
					setupBeta();
				} else {
					shake(_mep);
				}
			  });
		}
	});


	$(window).on('popstate', function() {
		newcat=window.location.pathname.replace('news', '').replace(/\//g,'');
		if(newcat != cat) switchCat($('*[data-cat="'+newcat+'"]'));
	});

/* binds that didnt stick to document */
	$('.user-menu').on('click', '.logout', function(event){
		event.preventDefault();
		myhtml=$(this).html();
		me=this;

		if(!$(this).data('confirmed')){
			$(this).data('confirmed', true);
			$(this).html('<strong>Yes, log me out!</strong>');
			_me=$(this);
		} else {
			$(this).html(myhtml);
			$(this).data('confirmed', false);


			$.post( site_url+"ajax.php", { mode: "logout", token:csrftoken })
			  .done(function( data ) {
				if(data == 'success'){
					logout();
					$('.settings-nav').hide();
				} else {
					shake(_me);
				}
			  });
		}
		$(document).on('mouseover', '.logout', function(event){
			clearTimeout(timeoToken);
		});

		$(document).on('mouseleave', '.logout', function(event){
			timeoToken = setTimeout(function(){
				$(me).html(myhtml);
				$(me).data('confirmed', false);
			}, 2000);
		});

	});

	$('.user-menu').on('click', '.sharemonster', function(event){
		event.preventDefault();
		_me=$(this);
		_mep=$(this);

		_newinput=$( "<input/>", {
			 "class": "form-control email",
			'type':'email', "placeholder":' What\'s their e-mail?',
		}).blur(function(){
			$(this).parent().html(sharemonsterhtml);
		}).on('keypress',function(event) {
			if(event.keyCode==13){
				if(!$(this).val()){
					$(this).parent().html(sharemonsterhtml);
					return false;
				}

				if(!validEmail($(this).val())){
					shake($(this));
					return false;
				}

				_old=$(this).parent().html();
				$(this).parent().html('<i class="fa fa-refresh fa-spin"></i>');

				$.post( site_url+"ajax.php", { mode: "shareMonster", email: $(this).val(), token:csrftoken })
				  .done(function( data ) {
					if(data == 'success'){
						_mep.html('<strong>E-mail dispatched!</strong>');
						setTimeout(function () {
							_mep.html(sharemonsterhtml);
						}, 3000);
					} else {
						_mep.html(_old)
						shake(_mep);
					}
				  });
			}
		});

		$(this).html(_newinput);
		_newinput.focus();
	});
	
	$('.user-menu').on('click', '.emailmonster', function(event){
		event.preventDefault();
		_me=$(this);
		_mep=$(this);

		_newinput=$( "<input/>", {
			 "class": "form-control email",
			'type':'email', "placeholder":' What\'s your e-mail?',
		}).blur(function(){
			$(this).parent().html(emailmonsterhtml);
		}).on('keypress',function(event) {
			if(event.keyCode==13){
				if(!$(this).val()){
					$(this).parent().html(emailmonsterhtml);
					return false;
				}

				if(!validEmail($(this).val())){
					shake($(this));
					return false;
				}

				_old=$(this).parent().html();
				$(this).parent().html('<i class="fa fa-refresh fa-spin"></i>');

				$.post( site_url+"ajax.php", { mode: "emailMonster", email: $(this).val(), token:csrftoken })
				  .done(function( data ) {
					if(data == 'success'){
						_mep.html('<strong>E-mail dispatched!</strong>');
						setTimeout(function () {
							_mep.html(emailmonsterhtml);
						}, 3000);
					} else {
						_mep.html(_old)
						shake(_mep);
					}
				  });
			}
		});

		$(this).html(_newinput);
		_newinput.focus();
	});

	$('.user-menu').on('click', '.passwordmonster', function(event){
		event.preventDefault();
		_me=$(this);
		_mep=$(this);

		_newinput=$( "<input/>", {
			 "class": "form-control",
			'type':'password', "placeholder":' What password?',
		}).blur(function(){
			$(this).parent().html(passwordmonsterhtml);
		}).on('keypress',function(event) {
			if(event.keyCode==13){
				if(!$(this).val()){
					$(this).parent().html(passwordmonsterhtml);
					return false;
				}

				_old=$(this).parent().html();
				$(this).parent().html('<i class="fa fa-refresh fa-spin"></i>');

				$.post( site_url+"ajax.php", { mode: "passwordMonster", password: md5($(this).val()), token:csrftoken })
				  .done(function( data ) {
					if(data == 'success'){
						_mep.html('<strong>Password set!</strong>');
						setTimeout(function () {
							_mep.html(passwordmonsterhtml);
						}, 3000);
					} else {
						_mep.html(_old)
						shake(_mep);
					}
				  });
			}
		});

		$(this).html(_newinput);
		_newinput.focus();

	});

	$('.user-menu').on('click', '.killmonster', function(event){
		if(!uuid) return false;
		event.preventDefault();
		myhtml=$(this).html();

		if(!$(this).data('confirmed')){
			$(this).data('confirmed', true);
			$(this).html('<strong>Yes, I want to kill it!</strong>');
			me=this;
		} else {
			$(this).html(myhtml);
			$(this).data('confirmed', false);

			event.preventDefault();
			var me=this;
			var myhtml=$(this).html();
			var myuuid=uuid;
			$(this).html('<i class="fa fa-refresh fa-spin"></i>');
			$.post( site_url+"ajax.php", { mode: "deleteUser", token:csrftoken })
			  .done(function( data ) {
				$(me).html(myhtml);
				if(data == 'success'){
					logout();
					$('.settings-nav').hide();
				} else {
					$('.settings-nav').hide();
					$('#dialogTitle').html('Oh no! Your monster can\'t be killed :(');
					$('#dialogBody').html('<p>Something went wrong trying to kill your monster, it shall live another day.</p>');
					$('#dialog').modal();
				}
			  });
		}

		$(document).on('mouseover', '.killmonster', function(event){
			clearTimeout(timeoToken);
		});

		$(document).on('mouseleave', '.killmonster', function(event){
			timeoToken = setTimeout(function(){
				$(me).html(myhtml);
				$(me).data('confirmed', false);
			}, 2000);
		});
	});

	$('.sort-menu a').on('click', function(event){
		event.preventDefault();
		sort=$(this).attr('href').replace('#', '');
		localStorage.setItem("sort", sort);
		resetnews();
		$('.settings-nav').hide();
	});

	$('.display-menu a').on('click', function(event){
		event.preventDefault();
		display=$(this).attr('href').replace('#', '');
		localStorage.setItem("display_"+cat, display);
		resetnews();
		$('.settings-nav').hide();
	});

	$('.dropdown-menu').on('click', '.createcat', function(event){
		event.preventDefault();
		
		_old=$(this).parent().html();
		_newli=$( "<li/>");

		_me=$(this);

		_newinput=$( "<input/>", {
			 "class": "form-control",
			'type':'text',"maxlength":"22", "placeholder":'What will you call it?',
		}).blur(function(){
			$(this).parent().html(_old);
		}).on('keypress',function(event) {
			if(event.keyCode==13){
				if(!$(this).val()){
					$(this).parent().html(_me);
					return false;
				}
				_m=this;
				_val=$(this).val();
				$.post( site_url+"ajax.php", { mode: "addUserCat", name: $(this).val(), token:csrftoken })
				  .done(function( data ) {
					if(data != 'failed'){
						$('<li><a data-customcat="true" data-cat="' + data + '" class="clink" href="/' + data + '/" rel="nofollow">' + _val  + '</a><i class="deletecat pull-right fa fa-trash" data-cat="'+ data +'"></i></li><li class="divider"></li>').insertBefore('.newlist');
						$(_m).parent().html(_me);
						catclicks();
						deletecatclicks();
						switchCat($('*[data-cat="'+data+'"]'));
						$('.addfeedtocat').click();
					} else {
						shake($(_m));
					}
				  });
				}
		}).appendTo(_newli);

		$(this).parent().html(_newli);

		_newinput.focus();
	});
	
	$('.site_wrap').swipe( {
		allowPageScroll:"auto",
		swipeStatus:function(event, phase, direction, distance, duration)
	  {
		waswipe=false;	
			if(direction == "down" && distance > 20){

				waswipe=true;


				_icon=$( "<i/>", {
					 "class": "fa fa-refresh fa-spin fa-3x fa-bodyrefresh"
				})
				

				if($(window).scrollTop()<=0) {
					if($('.pullrefresh').html() == ''){
						icon=_icon.appendTo('.pullrefresh');
						$('body').css('padding-top', '10px');
						$(window).scrollTop(1);
						setTimeout(function(){
								resetnews();
								$('.pullrefresh').html('');
								$('body').css('padding-top', '0px');
								$(window).scrollTop(0);
						}, 500);
					}
				}

			}
			
		}
	});

	$('.nav-scroller-wrap').slimScroll({
		height: '230px',
		wheelStep: 50,
		touchScrollStep :120,
		allowPageScroll: false
	});

	$('nav .dropdown-menu').on('click', function(event){
		event.stopPropagation();
	});

	$('nav .dropdown-menu li a:not(.createcat, .deletecat)').on('click', function(event){
		$('[data-toggle="dropdown"]').parent().removeClass('open');
	});

}