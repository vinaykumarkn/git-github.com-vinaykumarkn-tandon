$(window).resize(function(){if($(window).width()>991){$('.navbar-menu-dropdown').slideDown('fast')}})
    $('.navbar-toggle-wrapper').click(function(e){e.stopImmediatePropagation()
    $('.navbar-toggle').toggleClass('active')
    $('.navbar-menu').toggleClass('active')
    $('html').toggleClass('overflow-hidden',$('.navbar-menu').hasClass('active'))})
    $('.navbar-menu-link:not(.no-prevent)').click(function(e){e.preventDefault()
    e.stopImmediatePropagation()
    if($(window).width()<992){if(!$(this).hasClass('active')){$('.navbar-menu-link.active').removeClass('active')
    $('.navbar-menu-dropdown').slideUp('fast')
    $(this).addClass('active')
    $(this).next('.navbar-menu-dropdown').slideDown('fast')}else{$(this).removeClass('active')
    $(this).next('.navbar-menu-dropdown').slideUp('fast')}}})
    $('.listing-search-open').click(function(e){e.preventDefault()
    $('.navbar-toggle').removeClass('active')
    $('.navbar-menu').removeClass('active')
    $('.listing-search-popup').addClass('active')
    $('html').addClass('overflow-hidden')})
    $('.listing-search-popup-close').click(function(){$('.listing-search-popup').removeClass('active')
    $('html').removeClass('overflow-hidden')})
    $('.listing-search-popup-form-group input').focus(function(){$(this).parent().addClass('focused')})
    $('.listing-search-popup-form-group input').blur(function(){$(this).parent().removeClass('focused')})
    $('.listing-search-popup-filter-toggle').click(function(e){e.preventDefault()
    $(this).toggleClass('active')
    $('.listing-search-popup-filter').toggle()})
    if(version==undefined){var version=''}
    var svgArr={history:'<svg class="sm"> <use xlink:href="/tpl4/index.svg?cache=1&'+
    version+
    '#recent"></use> </svg>',search:'<svg class="sm"> <use xlink:href="/tpl4/index.svg?cache=1&'+
    version+
    '#search"></use> </svg>',location:'<svg class="sm"> <use xlink:href="/tpl4/index.svg?cache=1&'+
    version+
    '#location"></use> </svg>',trending:'<svg class="sm"> <use xlink:href="/tpl4/index.svg?cache=1&'+
    version+
    '#trending"></use> </svg>',"no-svg":"",};function listingAutocompleteCategory(inp){var selectedId=-1
    inp.on('input focus',function(){var url='/include-functions/category.php?cache=5&noindex=1&search='+inp.val()
    if(!inp.val()){url="/include-functions/history-search.php?cacheno=1&noindex=1&type=category&search="+inp.val()}
    $.ajax({url:url,success:function(result){var data=JSON.parse(result)
    var arr=data.data
    closeAutocomplete()
    selectedId=-1
    var wrapper=$(document.createElement("ul"));wrapper.addClass("listing-search-popup-autocomplete");for(var i=0;i<arr.length;i++){var item=$(document.createElement("li"));if(arr[i].id=="title"){item.addClass("disabled");}
    item.attr("data-value",arr[i].cat_name);item.attr("data-text",arr[i].id);item.attr("data-catId",arr[i].cats_id);item.html(svgArr[arr[i].svg]);var subitem=$(document.createElement("span"));subitem.html(arr[i].name);item.append(subitem);item.mousedown(onMouseDownAndClick);item.click(onMouseDownAndClick);function onMouseDownAndClick(){inp.val($(this).attr("data-text"));$('#v1-global').val($(this).attr("data-value"))
    $('#v1_id-global').val($(this).attr("data-catId"))
    inp.blur();}
    wrapper.append(item);if(arr[i].id.includes("head_text")&&data.count>0){item.remove();}else if(arr[i].id.includes("head_text")&&data.count<=0){item.addClass("disabled");}}
    inp.parent().append(wrapper);}})})
    inp.keydown(function(e){var wrapperList=inp.closest(".listing-search-popup-form-group").find(".listing-search-popup-autocomplete > *:not(.disabled)");if(wrapperList.length<1)return;if(e.keyCode==40){selectedId++;addActive(wrapperList);}else if(e.keyCode==38){selectedId--;addActive(wrapperList);}else if(e.keyCode==13){if(selectedId<0)return;e.preventDefault();wrapperList.eq(selectedId).click();}});function addActive(wrapperList){wrapperList.removeClass("selected");if(selectedId>=wrapperList.length)selectedId=0;if(selectedId<0)selectedId=wrapperList.length-1;wrapperList.eq(selectedId).addClass("selected");}
    function closeAutocomplete(){$(".listing-search-popup-autocomplete").remove();}
    inp.blur(function(){closeAutocomplete();});}
    function listingAutocompleteLocation(inp){var selectedId=-1
    inp.on('input focus',function(){var url='/include-functions/country.php?cache=5&noindex=2&search='+inp.val()
    if(!inp.val()){url="/include-functions/history-search.php?cacheno=1&noindex=1&type=county&search="+inp.val()}
    $.ajax({url:url,success:function(result){var data=JSON.parse(result)
    var arr=data.data
    closeAutocomplete()
    selectedId=-1
    var wrapper=$(document.createElement("ul"));wrapper.addClass("listing-search-popup-autocomplete");for(var i=0;i<arr.length;i++){var item=$(document.createElement("li"));if(arr[i].id=="title"){item.addClass("disabled");}
    item.attr("data-text",arr[i].id);item.attr("data-type",arr[i].type);item.attr("data-locationId",arr[i].town_id);item.html(svgArr[arr[i].svg]);var subitem=$(document.createElement("span"));subitem.html(arr[i].name);item.append(subitem);item.mousedown(onMouseDownAndClick);item.click(onMouseDownAndClick);function onMouseDownAndClick(){inp.val($.trim($(this).text()));$('#v2-global').val($.trim($(this).text()));$('#v2_id-global').val($(this).attr("data-locationId"));inp.blur();}
    wrapper.append(item);if(arr[i].id.includes("head_text")&&data.count>0){item.remove();}else if(arr[i].id.includes("head_text")&&data.count<=0){item.addClass("disabled");}}
    inp.parent().append(wrapper);}})})
    inp.keydown(function(e){var wrapperList=inp.closest(".listing-search-popup-form-group").find(".listing-search-popup-autocomplete > *:not(.disabled)");if(wrapperList.length<1)return;if(e.keyCode==40){selectedId++;addActive(wrapperList);}else if(e.keyCode==38){selectedId--;addActive(wrapperList);}else if(e.keyCode==13){if(selectedId<0)return;e.preventDefault();wrapperList.eq(selectedId).click();}});function addActive(wrapperList){wrapperList.removeClass("selected");if(selectedId>=wrapperList.length)selectedId=0;if(selectedId<0)selectedId=wrapperList.length-1;wrapperList.eq(selectedId).addClass("selected");}
    function closeAutocomplete(){$(".listing-search-popup-autocomplete").remove();}
    inp.blur(function(){closeAutocomplete();});}
    listingAutocompleteCategory($('#listing-search-category'))
    listingAutocompleteLocation($('#listing-search-location'))
    $('input:not(.with-placeholder), textarea:not(.with-placeholder)').attr('placeholder',' ')
    function customSelectRender(){$('.custom-select').each(function(i,val){var current=$(val)
    var selected=current.find('.select-option > [data-selected]').eq(0)
    if(selected.length>0){current.find('.select-value').val(selected.data('value'))
    current.find('.selected').text(selected.text())}})}
    customSelectRender()
    $(document).on('click','.custom-select',function(e){e.stopImmediatePropagation()
    var currentFocus=-1
    var customSelect=$(this)
    removeActive()
    if(!$(this).hasClass('active')){$('.custom-select').removeClass('active')
    $(this).addClass('active')}
    $(window).keydown(function(e){if(customSelect.hasClass('active')){switch(e.key){case 'ArrowDown':e.preventDefault()
    currentFocus++
    addActive()
    break;case 'ArrowUp':e.preventDefault()
    currentFocus--
    addActive()
    break;case 'Enter':e.preventDefault()
    $('.select-option > .bg-grey').click()
    customSelect.removeClass('active')
    default:break;}}})
    function addActive(){removeActive()
    if(currentFocus>=customSelect.find('.select-option > :visible:not(.select-option-search)').length)currentFocus=0
    if(currentFocus<0)currentFocus=(customSelect.find('.select-option > :visible:not(.select-option-search)').length-1)
    customSelect.find('.select-option > :visible:not(.select-option-search)').eq(currentFocus).addClass('bg-grey')}
    function removeActive(){customSelect.find('.select-option > .bg-grey').removeClass('bg-grey')}})
    $(document).on('click','.select-option > :not(.select-option-search)',function(e){e.stopImmediatePropagation();var el=$(this);var customSelect=el.closest('.custom-select')
    customSelect.find('.select-value').val($(this).attr('data-value')).trigger('change')
    customSelect.find('.selected').text($(this).text())
    customSelect.removeClass('active')})
    $(document).click(function(e){if(!$(e.target).is('.custom-select, .custom-select > *')){$('.custom-select').removeClass('active')}});function sliderArrowAction(){$('.slider-arrow.prev').click(function(){$(this).siblings('.slider-wrapper').scrollLeft($(this).siblings('.slider-wrapper').scrollLeft()-$(this).siblings('.slider-wrapper').width())})
    $('.slider-arrow.next').click(function(){$(this).siblings('.slider-wrapper').scrollLeft($(this).siblings('.slider-wrapper').scrollLeft()+$(this).siblings('.slider-wrapper').width())})}
    sliderArrowAction()
    $('.with-clear-input').each(function(i,item){if($(item).val()){$(item).siblings('.clear-input').addClass('show')}else{$(item).siblings('.clear-input').removeClass('show')}})
    $('.with-clear-input').on('input blur',function(){if($(this).val()){$(this).siblings('.clear-input').addClass('show')}else{$(this).siblings('.clear-input').removeClass('show')}})
    $('.clear-input').on('click mousedown',function(e){e.preventDefault()
    $(this).siblings('.with-clear-input').val('')
    $(this).siblings('.with-clear-input').focus()
    $(this).removeClass('show')})
    $('.footer__title').click(function(){$(this).next('ul').toggleClass('hidden')
    $(this).toggleClass('active')})
    lazyloadFunc()
    function scrollToEl(target){$(target).get(0).scrollIntoView({behavior:'auto'});}
    $('.btn-submit').click(function(){var el=$(this)
    el.addClass('btn-loading')
    setTimeout(function(){el.removeClass('btn-loading')},1500)})
    function lazyloadFunc(){var imageLazy=$('img.lazy, img[src^="https://img.rightbiz.co.uk/listings/"]')
    if('IntersectionObserver'in window){var imageLazyLoadObserver=new IntersectionObserver(function(entries){$.each(entries,function(i,img){if(img.isIntersecting){var image=$(img.target)
    if(image.hasClass('lazy')){image.attr('src',image.data('src'))
    image.on('load',function(){image.removeClass('lazy')})
    fixImage(image)}else{fixImage(image)}
    imageLazyLoadObserver.unobserve(image.get(0))}})})
    $.each(imageLazy,function(i,image){imageLazyLoadObserver.observe(image)})}else{$.each(imageLazy,function(i,image){if($(image).hasClass('lazy')){$(image).attr('src',$(image).data('src'))
    $(image).on('load',function(){$(this).removeClass('lazy')})
    fixImage($(image))}else{fixImage($(image))}})}}
    function fixImage(image){if(image.attr('src').startsWith('https://img.rightbiz.co.uk/listings/')){image.on('error',function(){var splitted=image.attr('src').split('/')
    var id=splitted[splitted.length-1].split('.')[0]
    $.ajax({url:'https://www.rightbiz.co.uk/all_script/400x250/index2.php?id='+id})})}}
    function getUrlParameter(sParam){var sPageURL=window.location.search.substring(1),sURLVariables=sPageURL.split('&'),sParameterName,i;for(i=0;i<sURLVariables.length;i++){sParameterName=sURLVariables[i].split('=');if(sParameterName[0]===sParam){return sParameterName[1]===undefined?true:decodeURIComponent(sParameterName[1]);}}
    return false;};$('.listing-search-popup-save').click(function(){var $btn=$(this)
    if($btn.data("state")=="save"){var state=0}else{var state=1}
    var url="/ajax/save_search.ajax.php?cacheno=1&noindex=1&headline=Businesses for Sale in UK&location=Nationwide, UK&link=/businesses-for-sale-in-uk.html"+"&state="+state;gtag("event","click",{event_category:"ListingPage",event_label:"save-search",non_interaction:false,});$.ajax({url:url,success:function(result){var result=JSON.parse(result);if(result.redirect){window.location.href=result.redirect;return false;}
    if(result.saved==true){$btn.data("state","saved");$btn.html('Saved')}else{$btn.data("state","save");$btn.html('Save Search')}}})})
    if(!getCookie('rb_user')){$('.navbar-account').html('<svg class="fill-blue" width="24px" height="24px">\
            <use xlink:href="/header-footer2/index.svg#user-circle"></use>\
        </svg><span class="text-sm font-medium text-dark">Sign In</span>')}else{$('.navbar-account').html('<svg class="fill-blue" width="24px" height="24px">\
            <use xlink:href="/header-footer2/index.svg#user-circle"></use>\
        </svg><span class="text-sm font-medium text-dark">Account</span>')}
    function getCookie(name){let cookieValue=null;if(document.cookie&&document.cookie!==''){const cookies=document.cookie.split(';');for(let i=0;i<cookies.length;i++){const cookie=cookies[i].trim();if(cookie.substring(0,name.length+1)===(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
    return cookieValue;}