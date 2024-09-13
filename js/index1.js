if ("IntersectionObserver"in window) {
    var recommendedBusinessObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(item) {
            if (item.isIntersecting) {
                getrecommendedData();
                recommendedBusinessObserver.unobserve(item.target);
            }
        });
    }
    );
    recommendedBusinessObserver.observe($("#recommended-business").get(0));
    var viewedBusinessObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(item) {
            if (item.isIntersecting) {
                getData();
                viewedBusinessObserver.unobserve(item.target);
            }
        });
    }
    );
    viewedBusinessObserver.observe($("#viewed-business").get(0));
} else {
    getrecommendedData();
    getData();
}
$('.search-toggle').click(function(e) {
    e.preventDefault()
    $('.navbar-toggle').toggleClass('active')
    $('.navbar-menu').toggleClass('active')
    $('#sector-input').focus()
})
getSearchRecommend();
var counter = true;
$(document).scroll(function() {
    if ($("html").scrollTop() > 1000 && counter) {
        counter = false;
        var url = "/include-functions/update_imps.php?cacheno=1&noindex=1&homepage=1";
        $.ajax({
            url: url,
        });
    }
});
$("[data-current-location]").click(getLocation);
$("#popular-sector .popular-sector__indicator span").click(function() {
    var popularSector = $($(this).data("target"));
    $("#popular-sector .popular-sector__indicator span.active").removeClass("active");
    $(".popular_sector_slider").removeClass("active");
    $("#popular-sector .popular-sector__image-list.active").removeClass("active");
    popularSector.addClass("active");
    $(this).addClass("active");
});
var nextBtn = $("#who-rightbiz .who-rightbiz__control .next");
var prevBtn = $("#who-rightbiz .who-rightbiz__control .prev");
var allContent = $("#who-rightbiz .who-rightbiz__content-item");
var whoIndex = 0;
allContent.eq(whoIndex).addClass("active");
nextBtn.click(function() {
    if (whoIndex < allContent.length - 1) {
        whoIndex++;
    } else {
        whoIndex = 0;
    }
    $("#who-rightbiz .who-rightbiz__content-item.active").removeClass("active");
    allContent.eq(whoIndex).addClass("active");
});
prevBtn.click(function() {
    if (whoIndex > 0) {
        whoIndex--;
    } else {
        whoIndex = allContent.length - 1;
    }
    $("#who-rightbiz .who-rightbiz__content-item.active").removeClass("active");
    allContent.eq(whoIndex).addClass("active");
});
var franchiseList = $("#franchise .franchise__slider-list");
var franchiseSection = $("#franchise");
if (franchiseList.children().length > 0) {
    var franchisePrev = franchiseSection.find(".arrow.prev");
    var franchiseNext = franchiseSection.find(".arrow.next");
    franchisePrev.toggleClass("hide", franchiseList.scrollLeft() < 1);
    franchiseNext.toggleClass("hide", franchiseList.scrollLeft() > franchiseList.prop("scrollWidth") - franchiseList.width() - 20);
    franchisePrev.click(function() {
        franchiseList.scrollLeft(franchiseList.scrollLeft() - franchiseList.width());
    });
    franchiseNext.click(function() {
        franchiseList.scrollLeft(franchiseList.scrollLeft() + franchiseList.width());
    });
    franchiseList.scroll(function() {
        franchisePrev.toggleClass("hide", franchiseList.scrollLeft() < 1);
        franchiseNext.toggleClass("hide", franchiseList.scrollLeft() > franchiseList.prop("scrollWidth") - franchiseList.width() - 20);
    });
} else {
    franchiseSection.remove();
}
var allFeaturedBrokers = $("#featured-brokers .featured-brokers__item");
var featuredBrokerSection = $("#featured-brokers");
if (allFeaturedBrokers.length > 0) {
    var indicatorWrapper = featuredBrokerSection.find(".featured-brokers__indicator");
    var idxFeaturedBrokers = 0;
    allFeaturedBrokers.removeClass("active");
    for (var i = 0; i < allFeaturedBrokers.length; i++) {
        var span = $(document.createElement("span"));
        indicatorWrapper.append(span);
    }
    var indicatorSpan = $("#featured-brokers .featured-brokers__indicator span");
    allFeaturedBrokers.eq(idxFeaturedBrokers).addClass("active");
    indicatorSpan.eq(idxFeaturedBrokers).addClass("active");
    var featuredBrokersInterval = setInterval(featuredBrokersAutoSlide, 3000);
    indicatorSpan.click(function() {
        clearInterval(featuredBrokersInterval);
        idxFeaturedBrokers = $(this).index();
        allFeaturedBrokers.removeClass("active");
        indicatorSpan.removeClass("active");
        allFeaturedBrokers.eq(idxFeaturedBrokers).addClass("active");
        indicatorSpan.eq(idxFeaturedBrokers).addClass("active");
        featuredBrokersInterval = setInterval(featuredBrokersAutoSlide, 3000);
    });
} else {
    featuredBrokerSection.remove();
}
function featuredBrokersAutoSlide() {
    if (idxFeaturedBrokers === allFeaturedBrokers.length - 1) {
        idxFeaturedBrokers = 0;
    } else {
        idxFeaturedBrokers++;
    }
    allFeaturedBrokers.removeClass("active");
    indicatorSpan.removeClass("active");
    allFeaturedBrokers.eq(idxFeaturedBrokers).addClass("active");
    indicatorSpan.eq(idxFeaturedBrokers).addClass("active");
}
var searchInputSectorBusiness = $("#sector-input");
var searchInputLocationBusiness = $("#location-input");
var backBtn = $(".back-btn");
var removeInputBtn = $(".close-btn");
autocompleteSectorBusiness(searchInputSectorBusiness);
autocompleteSectorLocation(searchInputLocationBusiness);
backBtn.click(mobileSearchCloseOnSelect);
removeInputBtn.click(function() {
    $(this).siblings("input").val("");
    $(this).siblings("input").focus();
});
checkSliderWrapper();
autocompleteFranchiseCat($('[data-autocomplete="sector"]'))
function autocompleteFranchiseCat(inp) {
    var d = new Date();
    var month = addZero(d.getMonth() + 1);
    var year = d.getFullYear();
    var cache = month + year;
    var url = "/include-functions/franchise_category.php?" + version + "&cache=" + cache + "&noindex=1&home=1";
    var data = []
    inp.focus(function() {
        if (data.length === 0) {
            $.ajax({
                url: url,
                async: false,
                success: function(result) {
                    data = (JSON.parse(result)).data
                }
            })
        }
        filterData()
    })
    inp.on('input', filterData)
    function filterData() {
        inp.parent().find('.form__autocomplete').remove()
        var filtered = data.filter(function(item) {
            return item.text.toLowerCase().indexOf(inp.val().toLowerCase()) > -1
        });
        var template = ''
        if (filtered.length === 0) {
            template = '<li class="text-red pointer-events-none">No result found, please try another keyword</li>'
        } else {
            filtered.forEach(function(item) {
                template += '<li data-value="' + item.value + '" data-text="' + item.text + '">' + item.text + '</li>'
            })
        }
        inp.parent().append('<ul class="form__autocomplete">' + template + '</ul>')
        inp.parent().find('.form__autocomplete').children().click(function() {
            inp.closest('form').attr('action', $(this).attr('data-value'))
            inp.val($(this).attr('data-text'))
        })
    }
    inp.blur(function() {
        setTimeout(function() {
            inp.parent().find('.form__autocomplete').remove()
        }, 150)
    })
}
$('#search-form-website li').click(function() {
    $('#form-website').attr('action', $(this).attr('data-value'))
})
function getrecommendedData() {
    var url = "/include-functions/get-recommended-adverts.php?cacheno=1";
    $.ajax({
        url: url,
        success: function(result) {
            var resp = JSON.parse(result);
            var data = resp.data;
            if (data.length > 0) {
                if (data.length < 4) {
                    $("#recommended-business .slider-arrow").remove();
                }
                var template = "";
                $.each(data, function(i, item) {
                    var image = item.default_image;
                    if (item.images.length > 0) {
                        image = item.images[0];
                        template += '<div class="slider-item"> <a href="/include-functions/get-recommended-adverts.php?cacheno=1&noindex=1" data-delete="' + item.rid + '" class="slider-item-remove" rel="nofollow"> &times; </a> <div class="slider-item-image-wrapper"> <a href="' + item.advert_link + '"> <img src="' + image + '" alt="" class="slider-item-image" loading="lazy" width="0" height="0"> </a> <span class="slider-item-price">' + item.price + '</span> </div> <div class="px-1 py-2"> <a href="' + item.advert_link + '" class="slider-item-title">' + item.headline + '</a> <div class="location-item"> <svg> <use xlink:href="/homepage2/index.svg?cache=1&' + version + '#location"></use> </svg> ' + item.towns_name + " </div> </div> </div> ";
                    } else {
                        template += '<div class="slider-item rounded-lg"> <a href="/include-functions/get-recommended-adverts.php?cacheno=1&noindex=1" data-delete="' + item.rid + '" class="slider-item-remove" rel="nofollow"> &times; </a> <div class="slider-item-image-wrapper"> <a href="' + item.advert_link + '"> <div class="slider-item-image w-full bg-white flex"> <div class="m-auto text-center py-4"> <svg class="w-1/2" height="48px"><use xlink:href="/app_global/svg/icons.svg?' + version + '#logo_notag"></use></svg> <p class="text-dark text-center">CONFIDENTIAL SALE</p> </div> </div> </a> <span class="slider-item-price">' + item.price + '</span> </div> <div class="p-1"> <a href="' + item.advert_link + '" class="slider-item-title">' + item.headline + '</a> <div class="location-item"> <svg> <use xlink:href="/homepage2/index.svg?cache=1&' + version + '#location"></use> </svg> ' + item.towns_name + " </div> </div> </div>";
                    }
                });
                $("#recommended-business-wrapper").html(template);
                $("#recommended-business-wrapper .slider-item-remove").click(function(e) {
                    e.preventDefault();
                    var removeEl = $(this);
                    $.ajax({
                        url: removeEl.attr("href"),
                        method: 'post',
                        data: {
                            delete: removeEl.attr('data-delete')
                        },
                        success: function(result) {
                            removeEl.parent(".slider-item").remove();
                        },
                    });
                });
            } else {
                $("#recommended-business").css("display", "none");
            }
        },
    });
}
function getData() {
    var url = "/include-functions/viewed-business.php?cacheno=1";
    $.ajax({
        url: url,
        success: function(result) {
            var resp = JSON.parse(result);
            var data = resp.data;
            if (data.length > 0) {
                if (data.length < 4) {
                    $("#viewed-business .slider-arrow").remove();
                }
                var template = "";
                $.each(data, function(i, item) {
                    var image = item.default_image;
                    if (item.images.length > 0) {
                        image = item.images[0];
                        template += '<div class="slider-item rounded-lg"> <a href="/include-functions/slider.php?cacheno=1&noindex=1" data-delete="' + item.rid + '" class="slider-item-remove" rel="nofollow"> &times; </a> <div class="slider-item-image-wrapper"> <a href="' + item.advert_link + '"> <img src="' + image + '" alt="" class="slider-item-image" loading="lazy" width="0" height="0"> </a> <span class="slider-item-price">' + item.price + '</span> </div> <div class="p-1"> <a href="' + item.advert_link + '" class="slider-item-title">' + item.headline + '</a> <div class="location-item"> <svg> <use xlink:href="/homepage2/index.svg?cache=1&' + version + '#location"></use> </svg> ' + item.towns_name + " </div> </div> </div>";
                    } else {
                        template += '<div class="slider-item rounded-lg"> <a href="/include-functions/slider.php?cacheno=1&noindex=1" data-delete="' + item.rid + '" class="slider-item-remove" rel="nofollow"> &times; </a> <div class="slider-item-image-wrapper"> <a href="' + item.advert_link + '"> <div class="slider-item-image w-full bg-white flex"> <div class="m-auto text-center py-4"> <svg class="w-1/2" height="48px"><use xlink:href="/app_global/svg/icons.svg?' + version + '#logo_notag"></use></svg> <p class="text-dark text-center">CONFIDENTIAL SALE</p> </div> </div> </a> <span class="slider-item-price">' + item.price + '</span> </div> <div class="p-1"> <a href="' + item.advert_link + '" class="slider-item-title">' + item.headline + '</a> <div class="location-item"> <svg> <use xlink:href="/homepage2/index.svg?cache=1&' + version + '#location"></use> </svg> ' + item.towns_name + " </div> </div> </div>";
                    }
                });
                $("#viewed-business-wrapper").html(template);
                $("#viewed-business-wrapper .slider-item-remove").click(function(e) {
                    e.preventDefault();
                    var removeEl = $(this);
                    $.ajax({
                        url: removeEl.attr("href"),
                        method: 'post',
                        data: {
                            delete: removeEl.attr('data-delete')
                        },
                        success: function(result) {
                            removeEl.parent(".slider-item").remove();
                        },
                    });
                });
            } else {
                $("#viewed-business").css("display", "none");
            }
        },
    });
}
function getSearchRecommend() {
    var url = "/include-functions/recommanded_searches.php?cacheno=1";
    var searchResultEl = $("#search-result");
    $.ajax({
        url: url,
        success: function(result) {
            var jsonData = JSON.parse(result);
            var data = jsonData.data;
            if (jsonData.is_login) {
                if (data.length > 0) {
                    var searchWrapper = '<div class="search-wrapper">';
                    $.each(data, function(i, item) {
                        searchWrapper += '<span class="search-recommend-item flex items-center"><a rel="nofollow" href="' + item.url + '" id="' + item.id + '" title="' + item.r_name + '" class="text-dark search-recommend-item-text" onclick="' + item.tags_track + '">' + item.r_name + "</a></span>";
                    });
                    searchWrapper += "</div>";
                    if (data.length > 3) {
                        searchWrapper += '<div class="expand"><span>View All <svg class="md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M24 24H0V0h24v24z" fill="none" opacity=".87"></path> <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path></svg></span></div>';
                    }
                    var resultHtml = '<h2 class="title-search">Your recent searches</h2>' + searchWrapper;
                    searchResultEl.html(resultHtml);
                    if (data.length > 3) {
                        $("#search-recommend .expand").click(function() {
                            $("#search-recommend .search-wrapper").addClass("show");
                            $(this).css("display", "none");
                        });
                    }
                } else {
                    searchResultEl.parent().remove();
                }
            } else {
                var searchWrapper = '<div class="search-wrapper"><a href="/hybridauth/login.php?provider=google"  class="btn-social-media mr-1 mb-1" id="ga4_home_page_google_login_button"> <svg class="md mr-1"> <use xlink:href="/homepage2/index.svg?' + version + '#svg-google"></use> </svg> Continue with Google</a>  <a href="/hybridauth/login.php?provider=Apple" class="btn-social-media mb-1"><svg class="md mr-1"> <use xlink:href="/homepage2/index.svg?' + version + '#svg-apple"></use></svg> Continue with Apple</a></div>';
                var resultHtml = '<h2 class="title-search">Improve your experience on Rightbiz</h2>' + searchWrapper;
                searchResultEl.html(resultHtml);
            }
        },
    });
}
$(document).on('click', '.form-search-sector-remove', function(e) {
    e.preventDefault()
    $(this).parent().remove()
    $('.form-search-sector > input').show()
    setMainSector()
})
function setMainSector() {
    $('#search-cat').val($('.form-search-sector > span').eq(0).attr("data-text"))
    $(".v-sector-input").eq(0).val($('.form-search-sector > span').eq(0).attr("data-value"));
    $(".v-sector-input").eq(1).val($('.form-search-sector > span').eq(0).attr("data-catId"));
    if ($('.form-search-sector > span').eq(0).length) {
        $('#sector').val($('.form-search-sector > span').eq(0).attr("data-inurl"));
    } else {
        $('#sector').val('businesses');
    }
    var moreCategory = []
    $('.form-search-sector > span').each(function(i, v) {
        if (i !== 0) {
            moreCategory.push($(v).attr("data-value"))
        }
    })
    $('#more_category').val(moreCategory.join('_'))
}
var isMobileActive = false;
var svgArr = {
    history: '<svg class="sm"> <use xlink:href="/tpl4/index.svg?cache=1&' + version + '#recent"></use> </svg>',
    search: '<svg class="sm"> <use xlink:href="/tpl4/index.svg?cache=1&' + version + '#search"></use> </svg>',
    location: '<svg class="sm"> <use xlink:href="/tpl4/index.svg?cache=1&' + version + '#location"></use> </svg>',
    trending: '<svg class="sm"> <use xlink:href="/tpl4/index.svg?cache=1&' + version + '#trending"></use> </svg>',
    "no-svg": "",
};
function autocompleteSectorBusiness(inp) {
    var selectedId = -1;
    var typeInp = $(".type-input");
    var vtype = $(".v-sector-input");
    var prevArr = [];
    var isBlur = false;
    typeInp.val("false");
    inp.on("input", function() {
        inputAction()
        $('#dropdown-cat').val('')
        $('#cat-inurl').val('')
    });
    inp.focus(function() {
        isBlur = false;
        if ($(window).width() < 576) {
            isMobileActive = true;
        }
        inp.closest(".form-group").addClass("mobile-active");
        inputAction();
    });
    inp.keydown(function(e) {
        var wrapperList = $(this).closest(".form-group").find(".form__autocomplete > *:not(.disabled)");
        if (wrapperList.length < 1)
            return;
        if (e.keyCode == 40) {
            selectedId++;
            addActive(wrapperList);
        } else if (e.keyCode == 38) {
            selectedId--;
            addActive(wrapperList);
        } else if (e.keyCode == 13) {
            if (selectedId < 0)
                return;
            e.preventDefault();
            wrapperList.eq(selectedId).click();
        }
    });
    function inputAction() {
        var item, subitem, wrapper, arr, val = inp.val();
        selectedId = -1;
        if (inp.siblings('span').length < 1) {
            $('#search-cat').val(inp.val())
        }
        if (val) {
            $.ajax({
                url: "/include-functions/category.php?cache=1&noindex=1&search=" + val,
                success: function(result) {
                    arr = JSON.parse(result).data;
                    if (arr.length > 3) {
                        prevArr = arr;
                        whenDataIsReady(arr, false);
                    } else {
                        whenDataIsReady(prevArr, true);
                    }
                },
            });
        } else {
            $.ajax({
                url: "/include-functions/history-search.php?cacheno=1&cache=" + (new Date).getMonth() + "&noindex=1&type=category&search=" + val,
                success: function(result) {
                    arr = JSON.parse(result).data;
                    typeInp.val("false");
                    whenDataIsReady(arr, false);
                },
            });
        }
    }
    function whenDataIsReady(arr, noResult) {
        closeAutocomplete();
        if (isBlur)
            return;
        wrapper = document.createElement("ul");
        $(wrapper).addClass("form__autocomplete");
        inp.parent().append(wrapper);
        for (var i = 0; i < arr.length; i++) {
            item = $(document.createElement("li"));
            if (arr[i].id == "title") {
                item.addClass("disabled").css('padding-left', '44px');
            }
            item.data("value", arr[i].cat_name);
            item.data("text", arr[i].id);
            item.data("catId", arr[i].cats_id);
            item.data("inurl", arr[i].inurl);
            item.html(svgArr[arr[i].svg]);
            subitem = $(document.createElement("span"));
            subitem.html(arr[i].name);
            item.append(subitem);
            item.mousedown(onMouseDownAndClick);
            item.click(onMouseDownAndClick);
            function onMouseDownAndClick() {
                isBlur = true;
                if (inp.siblings('span[data-value="' + $(this).data("value") + '"]').length < 1) {
                    inp.before('<span data-catId="' + $(this).data("catId") + '" data-inurl="' + $(this).data("inurl") + '" data-value="' + $(this).data("value") + '" data-text="' + $(this).data("text") + '">' + $(this).data("text") + ' <a href="#" class="form-search-sector-remove">&times;</a></span>')
                    inp.val('');
                    typeInp.val("true");
                    vtype.eq(0).val($(this).data("value"));
                    vtype.eq(1).val($(this).data("catId"));
                    $('#cat-id').val($(this).data("catId") ? $(this).data("catId") : 0);
                    $('#cat-inurl').val($(this).data('inurl'))
                    $('#dropdown-cat').val($(this).data('text'))
                }
                inp.blur();
                closeAutocomplete();
                mobileSearchCloseOnSelect();
                checkListingCount()
                setMainSector()
                if (inp.siblings('span').length > 3) {
                    inp.hide()
                } else {
                    inp.show()
                }
            }
            $(wrapper).append(item);
            if (arr[i].id.includes("head_text") && !noResult) {
                item.remove();
            } else if (arr[i].id.includes("head_text") && noResult) {
                item.addClass("disabled");
            }
        }
        if (isMobileActive) {
            setTimeout(function() {
                scrollToTop();
                preventScrollWindow();
                isMobileActive = false;
            }, 300);
        }
    }
    function addActive(wrapperList) {
        removeActive(wrapperList);
        if (selectedId >= wrapperList.length)
            selectedId = 0;
        if (selectedId < 0)
            selectedId = wrapperList.length - 1;
        wrapperList.eq(selectedId).addClass("active");
    }
    function removeActive(wrapperList) {
        wrapperList.removeClass("active");
    }
    function closeAutocomplete() {
        $(".form__autocomplete").remove();
    }
    inp.blur(function() {
        isBlur = true;
        closeAutocomplete();
    });
}
function autocompleteSectorLocation(inp) {
    var selectedId = -1;
    var typeInp = $(".type-input-location");
    var vtype = $(".v-location-input");
    var prevArr = [];
    var isBlur = false;
    typeInp.val("false");
    inp.on("input", function() {
        inputAction()
        $('#loc-inurl').val('')
        $('#dropdown-loc').val('')
    });
    inp.focus(function() {
        isBlur = false;
        if ($(window).width() < 576) {
            isMobileActive = true;
        }
        inp.closest(".form-group").addClass("mobile-active");
        inputAction();
    });
    inp.keydown(function(e) {
        var wrapperList = $(this).closest(".form-group").find(".form__autocomplete > *:not(.disabled)");
        if (wrapperList.length < 1)
            return;
        if (e.keyCode == 40) {
            selectedId++;
            addActive(wrapperList);
        } else if (e.keyCode == 38) {
            selectedId--;
            addActive(wrapperList);
        } else if (e.keyCode == 13) {
            if (selectedId < 0)
                return;
            e.preventDefault();
            wrapperList.eq(selectedId).click();
        }
    });
    function inputAction() {
        var item, subitem, wrapper, arr, val = inp.val();
        selectedId = -1;
        if (val) {
            $.ajax({
                url: "/include-functions/country.php?cache=1&noindex=2&search=" + val,
                success: function(result) {
                    arr = JSON.parse(result).data;
                    if (arr.length > 2) {
                        prevArr = arr;
                        whenDataIsReady(arr, false);
                    } else {
                        whenDataIsReady(prevArr, true);
                    }
                },
            });
        } else {
            $.ajax({
                url: "/include-functions/history-search.php?cacheno=1&cache=" + (new Date).getMonth() + "&noindex=1&type=county&search=" + val,
                success: function(result) {
                    arr = JSON.parse(result).data;
                    typeInp.val("false");
                    whenDataIsReady(arr, false);
                },
            });
        }
    }
    function whenDataIsReady(arr, noResult) {
        closeAutocomplete();
        if (isBlur)
            return;
        wrapper = document.createElement("ul");
        $(wrapper).addClass("form__autocomplete");
        inp.parent().append(wrapper);
        for (var i = 0; i < arr.length; i++) {
            item = $(document.createElement("li"));
            if (arr[i].id == "title") {
                item.addClass("disabled").css('padding-left', '44px').css('font-size', '16px');
            }
            item.data("text", arr[i].id);
            item.data("type", arr[i].type);
            item.data("locationId", arr[i].town_id);
            item.data("inurl", arr[i].inurl);
            item.data("county_name", arr[i].county_name);
            item.data("town_name", arr[i].town_name);
            item.html(svgArr[arr[i].svg]);
            subitem = $(document.createElement("span"));
            subitem.html(arr[i].name);
            item.append(subitem);
            item.mousedown(onMouseDownAndClick);
            item.click(onMouseDownAndClick);
            function onMouseDownAndClick() {
                isBlur = true;
                inp.val($.trim($(this).text()));
                $('#location').val($(this).data("inurl"))
                vtype.eq(0).val($.trim($(this).text()));
                vtype.eq(1).val($(this).data("locationId"));
                $('#loc-inurl').val($(this).data('inurl'))
                $('#dropdown-loc').val($(this).data('text'))
                $('#loc-county-name').val($(this).data('county_name'))
                $('#loc-town-name').val($(this).data('town_name'))
                inp.blur();
                closeAutocomplete();
                mobileSearchCloseOnSelect();
                checkListingCount()
            }
            $(wrapper).append(item);
            if (arr[i].id.includes("head_text") && !noResult) {
                item.remove();
            } else if (arr[i].id.includes("head_text") && noResult) {
                item.addClass("disabled");
            }
        }
        if (isMobileActive) {
            setTimeout(function() {
                scrollToTop();
                preventScrollWindow();
                isMobileActive = false;
            }, 300);
        }
    }
    function addActive(wrapperList) {
        removeActive(wrapperList);
        if (selectedId >= wrapperList.length)
            selectedId = 0;
        if (selectedId < 0)
            selectedId = wrapperList.length - 1;
        wrapperList.eq(selectedId).addClass("active");
    }
    function removeActive(wrapperList) {
        wrapperList.removeClass("active");
    }
    function closeAutocomplete() {
        $(".form__autocomplete").remove();
    }
    inp.blur(function() {
        isBlur = true;
        closeAutocomplete();
    });
}
function mobileSearchCloseOnSelect() {
    $(".form-group").removeClass("mobile-active");
    addScrollWindow();
    isMobileActive = false;
}
function scrollToTop() {
    $("body").scrollTop(0);
    $("html").scrollTop(0);
}
function preventScrollWindow() {
    $("html").addClass("overflow-hidden");
    $("body").addClass("overflow-hidden");
}
function addScrollWindow() {
    $("html").removeClass("overflow-hidden");
    $("body").removeClass("overflow-hidden");
}
function checkListingCount() {
    if (!$('#cat-id').val() || !$('#loc-county-name').val() || !$('#loc-town-name').val())
        return
    $.ajax({
        url: '/include-functions/check_listing_count.php?cats_id=' + $('#cat-id').val() + '&county_name=' + $('#loc-county-name').val() + '&town_name=' + $('#loc-town-name').val(),
        success: function(resp) {
            var result = JSON.parse(resp)
            if (result.total > 50) {
                $('#tenure-search').show()
                $('#tenure-search').html('<div class="form-group type-search-wrapper">\
                    <input value="" type="radio" id="sale" name="tenure" data-tenure-count="' + result.total + '" checked>\
                    <label for="sale">All</label>\
                    <input type="radio" value="freehold" id="freehold" data-tenure-count="' + result.freehold + '" name="tenure">\
                    <label for="freehold">Freehold</label>\
                    <input type="radio" value="leasehold" id="leasehold" data-tenure-count="' + result.leasehold + '" name="tenure">\
                    <label for="leasehold">Leasehold</label>\
                    <input type="radio" value="othertenure" id="othertenure" data-tenure-count="' + result.othertenure + '" name="tenure">\
                    <label for="othertenure">Other</label>\
                </div>')
                $('[data-tenure-count]').change(function() {
                    var total = Number($(this).attr('data-tenure-count'))
                    $('#search-submit-text').text(total > 0 ? 'Data-Driven Search (' + total + ')' : 'Data-Driven Search')
                })
            } else {
                $('#tenure-search').hide()
                $('#tenure-search').empty()
            }
            $('#search-submit-text').text(result.total > 0 ? 'Data-Driven Search (' + result.total + ')' : 'Data-Driven Search')
        }
    })
}
function addZero(number) {
    if (number < 10) {
        return "0" + number;
    }
    return number;
}
function checkSliderWrapper() {
    var sliderWrapper = $(".slider-wrapper");
    sliderWrapper.scroll(function() {
        $(this).siblings(".prev").toggleClass("show", $(this).scrollLeft() != 0);
        $(this).siblings(".prev").toggleClass("hidden", $(this).scrollLeft() == 0);
        $(this).siblings(".next").toggleClass("show", $(this).scrollLeft() < $(this).prop("scrollWidth"));
        $(this).siblings(".next").toggleClass("hidden", $(this).scrollLeft() >= $(this).prop("scrollWidth") - $(this).width() - 20);
    });
}
function getCookie(cName) {
    var name = cName + "=";
    var res;
    try {
        var cDecoded = decodeURIComponent(document.cookie);
        var cArr = cDecoded.split("; ");
        cArr.forEach(function(val) {
            if (val.indexOf(name) === 0)
                res = val.substring(name.length);
        });
    } catch (e) {
        res = "";
    }
    return res;
}
function GetSelector(val) {
    var search_val = $(val).data("value");
    $("#form-franchise").attr("action", search_val);
}
function getLocation() {
    var x = $("#error-div");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.text("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    var crd = position.coords;
    var lat = crd.latitude;
    var lon = crd.longitude;
    var url = "/include-functions/geolocation.php?cacheno=1&noindex=1";
    var body = "lat=" + lat + "&lon=" + lon;
    $.ajax({
        url: url,
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: body,
        success: function(result) {
            var data = JSON.parse(result);
            if (data.message.includes("nodata") || data.message.includes("No location found. Please enter a location.")) {
                alert(data.message);
            } else {
                console.log(data);
                $("#location-input").val(data.data.locations);
                $("input[name='dropdown-loc']").val(data.data.locations);
                $("input[name='id-loc']").val(data.data.id);
                $("input[name='location']").val(data.data.inurl);
            }
        },
    });
}
$("#popular-sector .popular-sector__indicator__split span").click(function() {
    var popularSector = $($(this).data("target"));
    $("#popular-sector .popular-sector__indicator__split span.active").removeClass("active");
    $("#popular-sector .popular-sector__image-list-split.active").removeClass("active");
    $('.popular_sector_controllers').removeClass('active')
    popularSector.addClass("active");
    popularSector.siblings('.popular_sector_controllers').addClass('active')
    $(this).addClass("active");
});
$("#prev_popular_sector").on("click", function() {
    $(".popular_sector_slider").scrollLeft($(".popular_sector_slider").scrollLeft() - 350)
});
$("#next_popular_sector").on("click", function() {
    $(".popular_sector_slider").scrollLeft($(".popular_sector_slider").scrollLeft() + 350)
});
$("#sector-input").keyup(function() {
    $("input[name='dropdown-cat']").val("");
    $("input[name='id-cat']").val("");
});
$("#location-input").keyup(function() {
    $("input[name='dropdown-loc']").val("");
    $("input[name='id-loc']").val("");
});
var franchiseLists = $("#franchise-section .franchise__slider-lists");
var franchiseSections = $("#franchise-section");
if (franchiseLists.children().length > 0) {
    var franchisePrevs = franchiseSections.find(".arrows.left");
    var franchiseNexts = franchiseSections.find(".arrows.right");
    console.log(franchisePrevs);
    console.log(franchiseNexts);
    franchisePrevs.toggleClass("hide", franchiseLists.scrollLeft() < 1);
    franchiseNexts.toggleClass("hide", franchiseLists.scrollLeft() > franchiseLists.prop("scrollWidth") - franchiseLists.width() - 20);
    franchisePrevs.click(function() {
        franchiseLists.scrollLeft(franchiseLists.scrollLeft() - franchiseLists.width());
    });
    franchiseNexts.click(function() {
        franchiseLists.scrollLeft(franchiseLists.scrollLeft() + franchiseLists.width());
    });
    franchiseLists.scroll(function() {
        franchisePrevs.toggleClass("hide", franchiseLists.scrollLeft() < 1);
        franchiseNexts.toggleClass("hide", franchiseLists.scrollLeft() > franchiseLists.prop("scrollWidth") - franchiseLists.width() - 20);
    });
} else {
    franchiseSections.remove();
}
$('[data-nextel]').keydown(function(e) {
    if (e.key == 'Enter') {
        e.preventDefault()
        $(this).closest('.form-group').removeClass('mobile-active')
        $($(this).attr('data-nextel')).focus()
    }
})
$('.select-value').change(function() {
    $(this).siblings('.selected').removeClass('selected-grey')
})
