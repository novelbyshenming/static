
var localUrl = window.location.search

var url = ''

var aUrl1 = "<a href='/login.html' >登录</a>"

var aUrl2 = "<a href='/register.html' >注册</a>"

if (localUrl == null || localUrl == '') {


} else {
    url = localUrl.substring(1)
    url = '&' + url
    aUrl1 = "<a href='/userbooks.html?"+url.substring(1)+"' >我的书架</a>"
    aUrl2 = "<a href='/userinfo.html?"+url.substring(1)+"' >个人中心</a>"
}

function send() {

    if(url==''){
        alert("请先登录")
        return
    }
    window.location.href="sendmessage.html?"+url.substring(1)
}
var result = ''
result += "<li><a href='/type.html?page=1&type=玄幻魔法" + url + "' title='玄幻魔法'>玄幻魔法</a></li>"
result += "<li><a href='/type.html?page=1&type=武侠修真" + url + "' title='武侠修真'>武侠修真</a></li>"
result += "<li><a href='/type.html?page=1&type=都市言情" + url + "' title='都市言情'>都市言情</a></li>"
result += "<li><a href='/type.html?page=1&type=历史军事" + url + "' title='历史军事'>历史军事</a></li>"
result += "<li><a href='/type.html?page=1&type=侦探推理" + url + "' title='侦探推理'>侦探推理</a></li>"
result += "<li><a href='/type.html?page=1&type=网游动漫" + url + "' title='网游动漫'>网游动漫</a></li>"
result += "<li class='dropdown'>"
result += "<a class='dropdown-toggle' data-toggle='dropdown'>更多分类<span class='caret'></span></a>"
result += "<ul class='dropdown-menu' role='menu'>"
result += "<li><a href='/type.html?page=1&type=科幻小说" + url + "' title='科幻小说'>科幻小说</a></li>"
result += "<li><a href='/type.html?page=1&type=恐怖灵异" + url + "' title='恐怖灵异'>恐怖灵异</a></li>"
result += "<li><a href='/type.html?page=1&type=穿越小说" + url + "' title='穿越小说'>穿越小说</a></li>"
result += "<li><a href='/type.html?page=1&type=其他类型" + url + "' title='其他类型'>其他类型</a></li>"
result += "</ul>"
result += "</li>"
result += "<li><a href='/type.html?page=1&state=complete" + url + "' title='完本小说'>完本小说</a></li>"


function search() {
    var data1 = document.getElementById("bdcsMain1").value
    var data2 = document.getElementById("bdcsMain2").value

    if (!(data1 != '' || data2 != ''))
        return


    if (data1 != null && data1 != '')
        window.location.href = "/search.html?page=1&key=" + data1 + url
    else
        window.location.href = "/search.html?page=1&key=" + data2 + url
}


document.onkeydown = function (e) {
    if (e.keyCode == 13) {

        search()
    }
}

function indexUrl() {
    if (url == '') {
        window.location.href = '/index.html'
    } else {
        window.location.href = '/index.html?' + url.substring(1)
    }

}

function searchOnclick() {
    $('#historySearch').css('display', 'block')
}

$(function () {

    $('#login').append(aUrl1)
    $('#register').append(aUrl2)

    getReadList();
    if (url != '') {

        $.ajax({
            type: 'GET',
            url: '/userSearchHistory.u',
            data: {'uid': 1},
            success: function (data) {

                if (data == null || data == '') {
                    return;
                }

                result = ''
                $(data).each(function (index, ele) {
                    var tName = ele.historySearchName
                    result += "<li ><a href='/search.html?page=1&key=" + ele.historySearchName + url + "'>" + ele.historySearchName + "</a></li>"
                })

                var historySearch = $('#historySearch')
                historySearch.append(result)
                historySearch.css('list-style-type', 'none')
            },
            error: function () {
                alert("系统繁忙，请稍后再试！");
            }
        });

        $.ajax({
            type: 'GET',
            url: '/getSearchHistory.r',
            success: function (data) {
                if (data == null || data == '') {
                    return;
                }

                result = ''
                $(data).each(function (index, ele) {
                    var tName = ele;
                    result += "<li ><a style='color:red' href='/search.html?page=1&key=" +tName+ "&uid="+1+"'>" + tName + "</a></li>"
                })

                var historySearch = $('#historySearch')
                historySearch.append(result)
                historySearch.css('list-style-type', 'none')
            },
            error: function () {
                alert("系统繁忙，请稍后再试！");
            }
        });
    }

    $('#titleLi').append(result)
    $.ajax({
        url: '/solr/collection1/select?q=*%3A*&sort=novel_updateTimes+desc&rows=30&wt=json&indent=true',
        error: function () {
            alert("请求出错.")
        },
        success: function (data) {

            var result = "";
            var jsonObject = eval("(" + data + ")")
            var start = jsonObject.response.start
            var docs = jsonObject.response.docs
            $(docs).each(function (index, ele) {
                result += "<tr><td class=\"text-muted hidden-xs\" width=\"10%\">" + ele.novel_type + "</td>"
                result += "<td><a  href=\"/introduction.html?nid="+ele.id+url+"\" title=\"" + ele.novel_name + "\">" + ele.novel_name + "</a></td>"
                result += "<td class=\"hidden-xs\">"
                result += "<a href=\"/read.html?nid=" + ele.id + "&cid=" + ele.novel_latestChaptersUrl + url + "\"title=\"" + ele.novel_latestChapters + "\">" + ele.novel_latestChapters + "</a></td>"
                result += "<td class=\"text-muted fs-12\" title=\"" + ele.novel_author + "\">" + ele.novel_author + "</td>"
                var tdate = ele.novel_tdate
                tdate = tdate.substring(0, tdate.lastIndexOf(':'))
                result += "<td class=\"fs-12\">" + tdate + "</td></tr>"
            })
            $('#latestTable').append(result)
        },
        type: 'GET'
    });
});

function getReadList(num) {
    event.preventDefault();//使a自带的方法失效
    $("li[name='titleList"+num+"']").addClass("active");
    $("li[name='titleList"+(num+1)+"']").removeClass("active");
    $("li[name='titleList"+(num+2)+"']").removeClass("active");
    $('#showList').html("");
    $.ajax({
        url: "/getReadList.r",
        success: function (data) {
            var i = 1;
            for (var j in data) {

                $('#showList').append('<li class="list-group-item">\n' +
                    '<i class="topNum">' + i++ + '</i>\n' +
                    '<a href="/introduction.html?nid='+data[j].nid+url+'" class="novelMemory"\n' +
                    '>' + data[j].novelName + '</a>\n' +
                    '<small class="text-muted">/' + data[j].author + '</small>\n' +
                    '<span class="pull-right text-muted">' + data[j].number + '</span>\n' +
                    '</li>');
            }
        },
        error: function () {
            alert("系统繁忙，请稍后再试！");
        }
    });
}

function getConlectionList(num) {
    event.preventDefault();//使a自带的方法失效
    $('#showList').html("");
    $("li[name='titleList"+(num-1)+"']").removeClass("active");
    $("li[name='titleList"+num+"']").addClass("active");
    $("li[name='titleList"+(num+1)+"']").removeClass("active");
    $.ajax({
        url: "/getCollectionList.r",
        success: function (data) {
            var i = 1;
            for (var key in data) {
                $('#showList').append('<li class="list-group-item">\n' +
                    '<i class="topNum">' + i++ + '</i>\n' +
                    '<a href="/introduction.html?nid='+data[key].nid+url+'" class="novelMemory"\n' +
                    '>' + data[key].novelName + '</a>\n' +
                    '<small class="text-muted">/' + data[key].author + '</small>\n' +
                    '<span class="pull-right text-muted">' + data[key].number + '</span>\n' +
                    '</li>');
            }
        },
        error: function () {
            alert("系统繁忙，请稍后再试！");
        }
    });
}

function getRecommendList( num ) {
    event.preventDefault();//使a自带的方法失效
    $("li[name='titleList"+(num-2)+"']").removeClass("active");
    $("li[name='titleList"+(num-1)+"']").removeClass("active");
    $("li[name='titleList"+num+"']").addClass("active");
    $('#showList').html("");
    $.ajax({
        url: "/getRecommendList.r",
        success: function (data) {
            var i = 1;
            for (var key in data) {
                $('#showList').append('<li class="list-group-item">\n' +
                    '<i class="topNum">' + i++ + '</i>\n' +
                    '<a href="/introduction.html?nid='+data[key].nid+url+'" class="novelMemory"\n' +
                    '>' + data[key].novelName + '</a>\n' +
                    '<small class="text-muted">/' + data[key].author + '</small>\n' +
                    '<span class="pull-right text-muted">' + data[key].number + '</span>\n' +
                    '</li>');
            }
        },
        error: function () {
            alert("系统繁忙，请稍后再试！");
        }
    });
}
