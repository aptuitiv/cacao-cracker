!function($){var mfp,_prevStatus,_body,_document,_prevContentType,_wrapClasses,_currPopupType,CLOSE_EVENT="Close",BEFORE_CLOSE_EVENT="BeforeClose",AFTER_CLOSE_EVENT="AfterClose",BEFORE_APPEND_EVENT="BeforeAppend",MARKUP_PARSE_EVENT="MarkupParse",OPEN_EVENT="Open",CHANGE_EVENT="Change",NS="mfp",EVENT_NS="."+NS,READY_CLASS="mfp-ready",REMOVING_CLASS="mfp-removing",PREVENT_CLOSE_CLASS="mfp-prevent-close",MagnificPopup=function(){},_isJQ=!!window.jQuery,_window=$(window),_mfpOn=function(name,f){mfp.ev.on(NS+name+EVENT_NS,f)},_getEl=function(className,appendTo,html,raw){var el=document.createElement("div");return el.className="mfp-"+className,html&&(el.innerHTML=html),raw?appendTo&&appendTo.appendChild(el):(el=$(el),appendTo&&el.appendTo(appendTo)),el},_mfpTrigger=function(e,data){mfp.ev.triggerHandler(NS+e,data),mfp.st.callbacks&&(e=e.charAt(0).toLowerCase()+e.slice(1),mfp.st.callbacks[e]&&mfp.st.callbacks[e].apply(mfp,$.isArray(data)?data:[data]))},_getCloseBtn=function(type){return type===_currPopupType&&mfp.currTemplate.closeBtn||(mfp.currTemplate.closeBtn=$(mfp.st.closeMarkup.replace("%title%",mfp.st.tClose)),_currPopupType=type),mfp.currTemplate.closeBtn},_checkInstance=function(){$.magnificPopup.instance||(mfp=new MagnificPopup,mfp.init(),$.magnificPopup.instance=mfp)},supportsTransitions=function(){var s=document.createElement("p").style,v=["ms","O","Moz","Webkit"];if(void 0!==s.transition)return!0;for(;v.length;)if(v.pop()+"Transition"in s)return!0;return!1};MagnificPopup.prototype={constructor:MagnificPopup,init:function(){var appVersion=navigator.appVersion;mfp.isIE7=-1!==appVersion.indexOf("MSIE 7."),mfp.isIE8=-1!==appVersion.indexOf("MSIE 8."),mfp.isLowIE=mfp.isIE7||mfp.isIE8,mfp.isAndroid=/android/gi.test(appVersion),mfp.isIOS=/iphone|ipad|ipod/gi.test(appVersion),mfp.supportsTransition=supportsTransitions(),mfp.probablyMobile=mfp.isAndroid||mfp.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),_body=$(document.body),_document=$(document),mfp.popupsCache={}},open:function(data){var i;if(data.isObj===!1){mfp.items=data.items.toArray(),mfp.index=0;var item,items=data.items;for(i=0;i<items.length;i++)if(item=items[i],item.parsed&&(item=item.el[0]),item===data.el[0]){mfp.index=i;break}}else mfp.items=$.isArray(data.items)?data.items:[data.items],mfp.index=data.index||0;if(mfp.isOpen)return void mfp.updateItemHTML();mfp.types=[],_wrapClasses="",mfp.ev=data.mainEl&&data.mainEl.length?data.mainEl.eq(0):_document,data.key?(mfp.popupsCache[data.key]||(mfp.popupsCache[data.key]={}),mfp.currTemplate=mfp.popupsCache[data.key]):mfp.currTemplate={},mfp.st=$.extend(!0,{},$.magnificPopup.defaults,data),mfp.fixedContentPos="auto"===mfp.st.fixedContentPos?!mfp.probablyMobile:mfp.st.fixedContentPos,mfp.st.modal&&(mfp.st.closeOnContentClick=!1,mfp.st.closeOnBgClick=!1,mfp.st.showCloseBtn=!1,mfp.st.enableEscapeKey=!1),mfp.bgOverlay||(mfp.bgOverlay=_getEl("bg").on("click"+EVENT_NS,function(){mfp.close()}),mfp.wrap=_getEl("wrap").attr("tabindex",-1).on("click"+EVENT_NS,function(e){mfp._checkIfClose(e.target)&&mfp.close()}),mfp.container=_getEl("container",mfp.wrap)),mfp.contentContainer=_getEl("content"),mfp.st.preloader&&(mfp.preloader=_getEl("preloader",mfp.container,mfp.st.tLoading));var modules=$.magnificPopup.modules;for(i=0;i<modules.length;i++){var n=modules[i];n=n.charAt(0).toUpperCase()+n.slice(1),mfp["init"+n].call(mfp)}_mfpTrigger("BeforeOpen"),mfp.st.showCloseBtn&&(mfp.st.closeBtnInside?(_mfpOn(MARKUP_PARSE_EVENT,function(e,template,values,item){values.close_replaceWith=_getCloseBtn(item.type)}),_wrapClasses+=" mfp-close-btn-in"):mfp.wrap.append(_getCloseBtn())),mfp.st.alignTop&&(_wrapClasses+=" mfp-align-top"),mfp.wrap.css(mfp.fixedContentPos?{overflow:mfp.st.overflowY,overflowX:"hidden",overflowY:mfp.st.overflowY}:{top:_window.scrollTop(),position:"absolute"}),(mfp.st.fixedBgPos===!1||"auto"===mfp.st.fixedBgPos&&!mfp.fixedContentPos)&&mfp.bgOverlay.css({height:_document.height(),position:"absolute"}),mfp.st.enableEscapeKey&&_document.on("keyup"+EVENT_NS,function(e){27===e.keyCode&&mfp.close()}),_window.on("resize"+EVENT_NS,function(){mfp.updateSize()}),mfp.st.closeOnContentClick||(_wrapClasses+=" mfp-auto-cursor"),_wrapClasses&&mfp.wrap.addClass(_wrapClasses);var windowHeight=mfp.wH=_window.height(),windowStyles={};if(mfp.fixedContentPos&&mfp._hasScrollBar(windowHeight)){var s=mfp._getScrollbarSize();s&&(windowStyles.marginRight=s)}mfp.fixedContentPos&&(mfp.isIE7?$("body, html").css("overflow","hidden"):windowStyles.overflow="hidden");var classesToadd=mfp.st.mainClass;return mfp.isIE7&&(classesToadd+=" mfp-ie7"),classesToadd&&mfp._addClassToMFP(classesToadd),mfp.updateItemHTML(),_mfpTrigger("BuildControls"),$("html").css(windowStyles),mfp.bgOverlay.add(mfp.wrap).prependTo(document.body),mfp._lastFocusedEl=document.activeElement,setTimeout(function(){mfp.content?(mfp._addClassToMFP(READY_CLASS),mfp._setFocus()):mfp.bgOverlay.addClass(READY_CLASS),_document.on("focusin"+EVENT_NS,mfp._onFocusIn)},16),mfp.isOpen=!0,mfp.updateSize(windowHeight),_mfpTrigger(OPEN_EVENT),data},close:function(){mfp.isOpen&&(_mfpTrigger(BEFORE_CLOSE_EVENT),mfp.isOpen=!1,mfp.st.removalDelay&&!mfp.isLowIE&&mfp.supportsTransition?(mfp._addClassToMFP(REMOVING_CLASS),setTimeout(function(){mfp._close()},mfp.st.removalDelay)):mfp._close())},_close:function(){_mfpTrigger(CLOSE_EVENT);var classesToRemove=REMOVING_CLASS+" "+READY_CLASS+" ";if(mfp.bgOverlay.detach(),mfp.wrap.detach(),mfp.container.empty(),mfp.st.mainClass&&(classesToRemove+=mfp.st.mainClass+" "),mfp._removeClassFromMFP(classesToRemove),mfp.fixedContentPos){var windowStyles={marginRight:""};mfp.isIE7?$("body, html").css("overflow",""):windowStyles.overflow="",$("html").css(windowStyles)}_document.off("keyup"+EVENT_NS+" focusin"+EVENT_NS),mfp.ev.off(EVENT_NS),mfp.wrap.attr("class","mfp-wrap").removeAttr("style"),mfp.bgOverlay.attr("class","mfp-bg"),mfp.container.attr("class","mfp-container"),!mfp.st.showCloseBtn||mfp.st.closeBtnInside&&mfp.currTemplate[mfp.currItem.type]!==!0||mfp.currTemplate.closeBtn&&mfp.currTemplate.closeBtn.detach(),mfp._lastFocusedEl&&$(mfp._lastFocusedEl).focus(),mfp.currItem=null,mfp.content=null,mfp.currTemplate=null,mfp.prevHeight=0,_mfpTrigger(AFTER_CLOSE_EVENT)},updateSize:function(winHeight){if(mfp.isIOS){var zoomLevel=document.documentElement.clientWidth/window.innerWidth,height=window.innerHeight*zoomLevel;mfp.wrap.css("height",height),mfp.wH=height}else mfp.wH=winHeight||_window.height();mfp.fixedContentPos||mfp.wrap.css("height",mfp.wH),_mfpTrigger("Resize")},updateItemHTML:function(){var item=mfp.items[mfp.index];mfp.contentContainer.detach(),mfp.content&&mfp.content.detach(),item.parsed||(item=mfp.parseEl(mfp.index));var type=item.type;if(_mfpTrigger("BeforeChange",[mfp.currItem?mfp.currItem.type:"",type]),mfp.currItem=item,!mfp.currTemplate[type]){var markup=mfp.st[type]?mfp.st[type].markup:!1;_mfpTrigger("FirstMarkupParse",markup),mfp.currTemplate[type]=markup?$(markup):!0}_prevContentType&&_prevContentType!==item.type&&mfp.container.removeClass("mfp-"+_prevContentType+"-holder");var newContent=mfp["get"+type.charAt(0).toUpperCase()+type.slice(1)](item,mfp.currTemplate[type]);mfp.appendContent(newContent,type),item.preloaded=!0,_mfpTrigger(CHANGE_EVENT,item),_prevContentType=item.type,mfp.container.prepend(mfp.contentContainer),_mfpTrigger("AfterChange")},appendContent:function(newContent,type){mfp.content=newContent,newContent?mfp.st.showCloseBtn&&mfp.st.closeBtnInside&&mfp.currTemplate[type]===!0?mfp.content.find(".mfp-close").length||mfp.content.append(_getCloseBtn()):mfp.content=newContent:mfp.content="",_mfpTrigger(BEFORE_APPEND_EVENT),mfp.container.addClass("mfp-"+type+"-holder"),mfp.contentContainer.append(mfp.content)},parseEl:function(index){var item=mfp.items[index],type=item.type;if(item=item.tagName?{el:$(item)}:{data:item,src:item.src},item.el){for(var types=mfp.types,i=0;i<types.length;i++)if(item.el.hasClass("mfp-"+types[i])){type=types[i];break}item.src=item.el.attr("data-mfp-src"),item.src||(item.src=item.el.attr("href"))}return item.type=type||mfp.st.type||"inline",item.index=index,item.parsed=!0,mfp.items[index]=item,_mfpTrigger("ElementParse",item),mfp.items[index]},addGroup:function(el,options){var eHandler=function(e){e.mfpEl=this,mfp._openClick(e,el,options)};options||(options={});var eName="click.magnificPopup";options.mainEl=el,options.items?(options.isObj=!0,el.off(eName).on(eName,eHandler)):(options.isObj=!1,options.delegate?el.off(eName).on(eName,options.delegate,eHandler):(options.items=el,el.off(eName).on(eName,eHandler)))},_openClick:function(e,el,options){var midClick=void 0!==options.midClick?options.midClick:$.magnificPopup.defaults.midClick;if(midClick||2!==e.which&&!e.ctrlKey&&!e.metaKey){var disableOn=void 0!==options.disableOn?options.disableOn:$.magnificPopup.defaults.disableOn;if(disableOn)if($.isFunction(disableOn)){if(!disableOn.call(mfp))return!0}else if(_window.width()<disableOn)return!0;e.type&&(e.preventDefault(),mfp.isOpen&&e.stopPropagation()),options.el=$(e.mfpEl),options.delegate&&(options.items=el.find(options.delegate)),mfp.open(options)}},updateStatus:function(status,text){if(mfp.preloader){_prevStatus!==status&&mfp.container.removeClass("mfp-s-"+_prevStatus),text||"loading"!==status||(text=mfp.st.tLoading);var data={status:status,text:text};_mfpTrigger("UpdateStatus",data),status=data.status,text=data.text,mfp.preloader.html(text),mfp.preloader.find("a").on("click",function(e){e.stopImmediatePropagation()}),mfp.container.addClass("mfp-s-"+status),_prevStatus=status}},_checkIfClose:function(target){if(!$(target).hasClass(PREVENT_CLOSE_CLASS)){var closeOnContent=mfp.st.closeOnContentClick,closeOnBg=mfp.st.closeOnBgClick;if(closeOnContent&&closeOnBg)return!0;if(!mfp.content||$(target).hasClass("mfp-close")||mfp.preloader&&target===mfp.preloader[0])return!0;if(target===mfp.content[0]||$.contains(mfp.content[0],target)){if(closeOnContent)return!0}else if(closeOnBg&&$.contains(document,target))return!0;return!1}},_addClassToMFP:function(cName){mfp.bgOverlay.addClass(cName),mfp.wrap.addClass(cName)},_removeClassFromMFP:function(cName){this.bgOverlay.removeClass(cName),mfp.wrap.removeClass(cName)},_hasScrollBar:function(winHeight){return(mfp.isIE7?_document.height():document.body.scrollHeight)>(winHeight||_window.height())},_setFocus:function(){(mfp.st.focus?mfp.content.find(mfp.st.focus).eq(0):mfp.wrap).focus()},_onFocusIn:function(e){return e.target===mfp.wrap[0]||$.contains(mfp.wrap[0],e.target)?void 0:(mfp._setFocus(),!1)},_parseMarkup:function(template,values,item){var arr;item.data&&(values=$.extend(item.data,values)),_mfpTrigger(MARKUP_PARSE_EVENT,[template,values,item]),$.each(values,function(key,value){if(void 0===value||value===!1)return!0;if(arr=key.split("_"),arr.length>1){var el=template.find(EVENT_NS+"-"+arr[0]);if(el.length>0){var attr=arr[1];"replaceWith"===attr?el[0]!==value[0]&&el.replaceWith(value):"img"===attr?el.is("img")?el.attr("src",value):el.replaceWith('<img src="'+value+'" class="'+el.attr("class")+'" />'):el.attr(arr[1],value)}}else template.find(EVENT_NS+"-"+key).html(value)})},_getScrollbarSize:function(){if(void 0===mfp.scrollbarSize){var scrollDiv=document.createElement("div");scrollDiv.id="mfp-sbm",scrollDiv.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(scrollDiv),mfp.scrollbarSize=scrollDiv.offsetWidth-scrollDiv.clientWidth,document.body.removeChild(scrollDiv)}return mfp.scrollbarSize}},$.magnificPopup={instance:null,proto:MagnificPopup.prototype,modules:[],open:function(options,index){return _checkInstance(),options=options?$.extend(!0,{},options):{},options.isObj=!0,options.index=index||0,this.instance.open(options)},close:function(){return $.magnificPopup.instance&&$.magnificPopup.instance.close()},registerModule:function(name,module){module.options&&($.magnificPopup.defaults[name]=module.options),$.extend(this.proto,module.proto),this.modules.push(name)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},$.fn.magnificPopup=function(options){_checkInstance();var jqEl=$(this);if("string"==typeof options)if("open"===options){var items,itemOpts=_isJQ?jqEl.data("magnificPopup"):jqEl[0].magnificPopup,index=parseInt(arguments[1],10)||0;itemOpts.items?items=itemOpts.items[index]:(items=jqEl,itemOpts.delegate&&(items=items.find(itemOpts.delegate)),items=items.eq(index)),mfp._openClick({mfpEl:items},jqEl,itemOpts)}else mfp.isOpen&&mfp[options].apply(mfp,Array.prototype.slice.call(arguments,1));else options=$.extend(!0,{},options),_isJQ?jqEl.data("magnificPopup",options):jqEl[0].magnificPopup=options,mfp.addGroup(jqEl,options);return jqEl};var _hiddenClass,_inlinePlaceholder,_lastInlineElement,INLINE_NS="inline",_putInlineElementsBack=function(){_lastInlineElement&&(_inlinePlaceholder.after(_lastInlineElement.addClass(_hiddenClass)).detach(),_lastInlineElement=null)};$.magnificPopup.registerModule(INLINE_NS,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){mfp.types.push(INLINE_NS),_mfpOn(CLOSE_EVENT+"."+INLINE_NS,function(){_putInlineElementsBack()})},getInline:function(item,template){if(_putInlineElementsBack(),item.src){var inlineSt=mfp.st.inline,el=$(item.src);if(el.length){var parent=el[0].parentNode;parent&&parent.tagName&&(_inlinePlaceholder||(_hiddenClass=inlineSt.hiddenClass,_inlinePlaceholder=_getEl(_hiddenClass),_hiddenClass="mfp-"+_hiddenClass),_lastInlineElement=el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass)),mfp.updateStatus("ready")}else mfp.updateStatus("error",inlineSt.tNotFound),el=$("<div>");return item.inlineElement=el,el}return mfp.updateStatus("ready"),mfp._parseMarkup(template,{},item),template}}});var _ajaxCur,AJAX_NS="ajax",_removeAjaxCursor=function(){_ajaxCur&&_body.removeClass(_ajaxCur)},_destroyAjaxRequest=function(){_removeAjaxCursor(),mfp.req&&mfp.req.abort()};$.magnificPopup.registerModule(AJAX_NS,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){mfp.types.push(AJAX_NS),_ajaxCur=mfp.st.ajax.cursor,_mfpOn(CLOSE_EVENT+"."+AJAX_NS,_destroyAjaxRequest),_mfpOn("BeforeChange."+AJAX_NS,_destroyAjaxRequest)},getAjax:function(item){_ajaxCur&&_body.addClass(_ajaxCur),mfp.updateStatus("loading");var opts=$.extend({url:item.src,success:function(data,textStatus,jqXHR){var temp={data:data,xhr:jqXHR};_mfpTrigger("ParseAjax",temp),mfp.appendContent($(temp.data),AJAX_NS),item.finished=!0,_removeAjaxCursor(),mfp._setFocus(),setTimeout(function(){mfp.wrap.addClass(READY_CLASS)},16),mfp.updateStatus("ready"),_mfpTrigger("AjaxContentAdded")},error:function(){_removeAjaxCursor(),item.finished=item.loadError=!0,mfp.updateStatus("error",mfp.st.ajax.tError.replace("%url%",item.src))}},mfp.st.ajax.settings);return mfp.req=$.ajax(opts),""}}});var _imgInterval,_getTitle=function(item){if(item.data&&void 0!==item.data.title)return item.data.title;var src=mfp.st.image.titleSrc;if(src){if($.isFunction(src))return src.call(mfp,item);if(item.el)return item.el.attr(src)||""}return""};$.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var imgSt=mfp.st.image,ns=".image";mfp.types.push("image"),_mfpOn(OPEN_EVENT+ns,function(){"image"===mfp.currItem.type&&imgSt.cursor&&_body.addClass(imgSt.cursor)}),_mfpOn(CLOSE_EVENT+ns,function(){imgSt.cursor&&_body.removeClass(imgSt.cursor),_window.off("resize"+EVENT_NS)}),_mfpOn("Resize"+ns,mfp.resizeImage),mfp.isLowIE&&_mfpOn("AfterChange",mfp.resizeImage)},resizeImage:function(){var item=mfp.currItem;if(item&&item.img&&mfp.st.image.verticalFit){var decr=0;mfp.isLowIE&&(decr=parseInt(item.img.css("padding-top"),10)+parseInt(item.img.css("padding-bottom"),10)),item.img.css("max-height",mfp.wH-decr)}},_onImageHasSize:function(item){item.img&&(item.hasSize=!0,_imgInterval&&clearInterval(_imgInterval),item.isCheckingImgSize=!1,_mfpTrigger("ImageHasSize",item),item.imgHidden&&(mfp.content&&mfp.content.removeClass("mfp-loading"),item.imgHidden=!1))},findImageSize:function(item){var counter=0,img=item.img[0],mfpSetInterval=function(delay){_imgInterval&&clearInterval(_imgInterval),_imgInterval=setInterval(function(){return img.naturalWidth>0?void mfp._onImageHasSize(item):(counter>200&&clearInterval(_imgInterval),counter++,void(3===counter?mfpSetInterval(10):40===counter?mfpSetInterval(50):100===counter&&mfpSetInterval(500)))},delay)};mfpSetInterval(1)},getImage:function(item,template){var guard=0,onLoadComplete=function(){item&&(item.img[0].complete?(item.img.off(".mfploader"),item===mfp.currItem&&(mfp._onImageHasSize(item),mfp.updateStatus("ready")),item.hasSize=!0,item.loaded=!0,_mfpTrigger("ImageLoadComplete")):(guard++,200>guard?setTimeout(onLoadComplete,100):onLoadError()))},onLoadError=function(){item&&(item.img.off(".mfploader"),item===mfp.currItem&&(mfp._onImageHasSize(item),mfp.updateStatus("error",imgSt.tError.replace("%url%",item.src))),item.hasSize=!0,item.loaded=!0,item.loadError=!0)},imgSt=mfp.st.image,el=template.find(".mfp-img");if(el.length){var img=document.createElement("img");img.className="mfp-img",item.img=$(img).on("load.mfploader",onLoadComplete).on("error.mfploader",onLoadError),img.src=item.src,el.is("img")&&(item.img=item.img.clone()),item.img[0].naturalWidth>0&&(item.hasSize=!0)}return mfp._parseMarkup(template,{title:_getTitle(item),img_replaceWith:item.img},item),mfp.resizeImage(),item.hasSize?(_imgInterval&&clearInterval(_imgInterval),item.loadError?(template.addClass("mfp-loading"),mfp.updateStatus("error",imgSt.tError.replace("%url%",item.src))):(template.removeClass("mfp-loading"),mfp.updateStatus("ready")),template):(mfp.updateStatus("loading"),item.loading=!0,item.hasSize||(item.imgHidden=!0,template.addClass("mfp-loading"),mfp.findImageSize(item)),template)}}});var hasMozTransform,getHasMozTransform=function(){return void 0===hasMozTransform&&(hasMozTransform=void 0!==document.createElement("p").style.MozTransform),hasMozTransform};$.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(element){return element.is("img")?element:element.find("img")}},proto:{initZoom:function(){var image,zoomSt=mfp.st.zoom,ns=".zoom";if(zoomSt.enabled&&mfp.supportsTransition){var openTimeout,animatedImg,duration=zoomSt.duration,getElToAnimate=function(image){var newImg=image.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),transition="all "+zoomSt.duration/1e3+"s "+zoomSt.easing,cssObj={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},t="transition";return cssObj["-webkit-"+t]=cssObj["-moz-"+t]=cssObj["-o-"+t]=cssObj[t]=transition,newImg.css(cssObj),newImg},showMainContent=function(){mfp.content.css("visibility","visible")};_mfpOn("BuildControls"+ns,function(){if(mfp._allowZoom()){if(clearTimeout(openTimeout),mfp.content.css("visibility","hidden"),image=mfp._getItemToZoom(),!image)return void showMainContent();animatedImg=getElToAnimate(image),animatedImg.css(mfp._getOffset()),mfp.wrap.append(animatedImg),openTimeout=setTimeout(function(){animatedImg.css(mfp._getOffset(!0)),openTimeout=setTimeout(function(){showMainContent(),setTimeout(function(){animatedImg.remove(),image=animatedImg=null,_mfpTrigger("ZoomAnimationEnded")},16)},duration)},16)}}),_mfpOn(BEFORE_CLOSE_EVENT+ns,function(){if(mfp._allowZoom()){if(clearTimeout(openTimeout),mfp.st.removalDelay=duration,!image){if(image=mfp._getItemToZoom(),!image)return;animatedImg=getElToAnimate(image)}animatedImg.css(mfp._getOffset(!0)),mfp.wrap.append(animatedImg),mfp.content.css("visibility","hidden"),setTimeout(function(){animatedImg.css(mfp._getOffset())},16)}}),_mfpOn(CLOSE_EVENT+ns,function(){mfp._allowZoom()&&(showMainContent(),animatedImg&&animatedImg.remove(),image=null)})}},_allowZoom:function(){return"image"===mfp.currItem.type},_getItemToZoom:function(){return mfp.currItem.hasSize?mfp.currItem.img:!1},_getOffset:function(isLarge){var el;el=isLarge?mfp.currItem.img:mfp.st.zoom.opener(mfp.currItem.el||mfp.currItem);var offset=el.offset(),paddingTop=parseInt(el.css("padding-top"),10),paddingBottom=parseInt(el.css("padding-bottom"),10);offset.top-=$(window).scrollTop()-paddingTop;var obj={width:el.width(),height:(_isJQ?el.innerHeight():el[0].offsetHeight)-paddingBottom-paddingTop};return getHasMozTransform()?obj["-moz-transform"]=obj.transform="translate("+offset.left+"px,"+offset.top+"px)":(obj.left=offset.left,obj.top=offset.top),obj}}});var IFRAME_NS="iframe",_emptyPage="//about:blank",_fixIframeBugs=function(isShowing){if(mfp.currTemplate[IFRAME_NS]){var el=mfp.currTemplate[IFRAME_NS].find("iframe");el.length&&(isShowing||(el[0].src=_emptyPage),mfp.isIE8&&el.css("display",isShowing?"block":"none"))}};$.magnificPopup.registerModule(IFRAME_NS,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){mfp.types.push(IFRAME_NS),_mfpOn("BeforeChange",function(e,prevType,newType){prevType!==newType&&(prevType===IFRAME_NS?_fixIframeBugs():newType===IFRAME_NS&&_fixIframeBugs(!0))}),_mfpOn(CLOSE_EVENT+"."+IFRAME_NS,function(){_fixIframeBugs()})},getIframe:function(item,template){var embedSrc=item.src,iframeSt=mfp.st.iframe;$.each(iframeSt.patterns,function(){return embedSrc.indexOf(this.index)>-1?(this.id&&(embedSrc="string"==typeof this.id?embedSrc.substr(embedSrc.lastIndexOf(this.id)+this.id.length,embedSrc.length):this.id.call(this,embedSrc)),embedSrc=this.src.replace("%id%",embedSrc),!1):void 0});var dataObj={};return iframeSt.srcAction&&(dataObj[iframeSt.srcAction]=embedSrc),mfp._parseMarkup(template,dataObj,item),mfp.updateStatus("ready"),template}}});var _getLoopedId=function(index){var numSlides=mfp.items.length;return index>numSlides-1?index-numSlides:0>index?numSlides+index:index},_replaceCurrTotal=function(text,curr,total){return text.replace(/%curr%/gi,curr+1).replace(/%total%/gi,total)};$.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var gSt=mfp.st.gallery,ns=".mfp-gallery",supportsFastClick=Boolean($.fn.mfpFastClick);return mfp.direction=!0,gSt&&gSt.enabled?(_wrapClasses+=" mfp-gallery",_mfpOn(OPEN_EVENT+ns,function(){gSt.navigateByImgClick&&mfp.wrap.on("click"+ns,".mfp-img",function(){return mfp.items.length>1?(mfp.next(),!1):void 0}),_document.on("keydown"+ns,function(e){37===e.keyCode?mfp.prev():39===e.keyCode&&mfp.next()})}),_mfpOn("UpdateStatus"+ns,function(e,data){data.text&&(data.text=_replaceCurrTotal(data.text,mfp.currItem.index,mfp.items.length))}),_mfpOn(MARKUP_PARSE_EVENT+ns,function(e,element,values,item){var l=mfp.items.length;values.counter=l>1?_replaceCurrTotal(gSt.tCounter,item.index,l):""}),_mfpOn("BuildControls"+ns,function(){if(mfp.items.length>1&&gSt.arrows&&!mfp.arrowLeft){var markup=gSt.arrowMarkup,arrowLeft=mfp.arrowLeft=$(markup.replace(/%title%/gi,gSt.tPrev).replace(/%dir%/gi,"left")).addClass(PREVENT_CLOSE_CLASS),arrowRight=mfp.arrowRight=$(markup.replace(/%title%/gi,gSt.tNext).replace(/%dir%/gi,"right")).addClass(PREVENT_CLOSE_CLASS),eName=supportsFastClick?"mfpFastClick":"click";arrowLeft[eName](function(){mfp.prev()}),arrowRight[eName](function(){mfp.next()}),mfp.isIE7&&(_getEl("b",arrowLeft[0],!1,!0),_getEl("a",arrowLeft[0],!1,!0),_getEl("b",arrowRight[0],!1,!0),_getEl("a",arrowRight[0],!1,!0)),mfp.container.append(arrowLeft.add(arrowRight))}}),_mfpOn(CHANGE_EVENT+ns,function(){mfp._preloadTimeout&&clearTimeout(mfp._preloadTimeout),mfp._preloadTimeout=setTimeout(function(){mfp.preloadNearbyImages(),mfp._preloadTimeout=null},16)}),void _mfpOn(CLOSE_EVENT+ns,function(){_document.off(ns),mfp.wrap.off("click"+ns),mfp.arrowLeft&&supportsFastClick&&mfp.arrowLeft.add(mfp.arrowRight).destroyMfpFastClick(),mfp.arrowRight=mfp.arrowLeft=null})):!1},next:function(){mfp.direction=!0,mfp.index=_getLoopedId(mfp.index+1),mfp.updateItemHTML()},prev:function(){mfp.direction=!1,mfp.index=_getLoopedId(mfp.index-1),mfp.updateItemHTML()},goTo:function(newIndex){mfp.direction=newIndex>=mfp.index,mfp.index=newIndex,mfp.updateItemHTML()},preloadNearbyImages:function(){var i,p=mfp.st.gallery.preload,preloadBefore=Math.min(p[0],mfp.items.length),preloadAfter=Math.min(p[1],mfp.items.length);for(i=1;i<=(mfp.direction?preloadAfter:preloadBefore);i++)mfp._preloadItem(mfp.index+i);for(i=1;i<=(mfp.direction?preloadBefore:preloadAfter);i++)mfp._preloadItem(mfp.index-i)},_preloadItem:function(index){if(index=_getLoopedId(index),!mfp.items[index].preloaded){var item=mfp.items[index];item.parsed||(item=mfp.parseEl(index)),_mfpTrigger("LazyLoad",item),"image"===item.type&&(item.img=$('<img class="mfp-img" />').on("load.mfploader",function(){item.hasSize=!0}).on("error.mfploader",function(){item.hasSize=!0,item.loadError=!0,_mfpTrigger("LazyLoadError",item)}).attr("src",item.src)),item.preloaded=!0}}}});var RETINA_NS="retina";$.magnificPopup.registerModule(RETINA_NS,{options:{replaceSrc:function(item){return item.src.replace(/\.\w+$/,function(m){return"@2x"+m})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var st=mfp.st.retina,ratio=st.ratio;ratio=isNaN(ratio)?ratio():ratio,ratio>1&&(_mfpOn("ImageHasSize."+RETINA_NS,function(e,item){item.img.css({"max-width":item.img[0].naturalWidth/ratio,width:"100%"})}),_mfpOn("ElementParse."+RETINA_NS,function(e,item){item.src=st.replaceSrc(item,ratio)}))}}}}),function(){var ghostClickDelay=1e3,supportsTouch="ontouchstart"in window,unbindTouchMove=function(){_window.off("touchmove"+ns+" touchend"+ns)},eName="mfpFastClick",ns="."+eName;$.fn.mfpFastClick=function(callback){return $(this).each(function(){var lock,elem=$(this);if(supportsTouch){var timeout,startX,startY,pointerMoved,point,numPointers;elem.on("touchstart"+ns,function(e){pointerMoved=!1,numPointers=1,point=e.originalEvent?e.originalEvent.touches[0]:e.touches[0],startX=point.clientX,startY=point.clientY,_window.on("touchmove"+ns,function(e){point=e.originalEvent?e.originalEvent.touches:e.touches,numPointers=point.length,point=point[0],(Math.abs(point.clientX-startX)>10||Math.abs(point.clientY-startY)>10)&&(pointerMoved=!0,unbindTouchMove())}).on("touchend"+ns,function(e){unbindTouchMove(),pointerMoved||numPointers>1||(lock=!0,e.preventDefault(),clearTimeout(timeout),timeout=setTimeout(function(){lock=!1},ghostClickDelay),callback())})})}elem.on("click"+ns,function(){lock||callback()})})},$.fn.destroyMfpFastClick=function(){$(this).off("touchstart"+ns+" click"+ns),supportsTouch&&_window.off("touchmove"+ns+" touchend"+ns)}}(),_checkInstance()}(window.jQuery||window.Zepto);