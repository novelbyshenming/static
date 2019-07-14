
var localUrl = window.location.search

var url =''

var aUrl1 ="<a href='/login.html' >登录</a>"

var aUrl2 = "<a href='/register.html' >注册</a>"

if (localUrl==null ||localUrl==''){


}else{
    url = localUrl.substring(1)

    url = '&'+url
    aUrl1 = "<a href='/userbooks.html?'"+url.substring(1)+" >我的书架</a>"
    aUrl2 = "<a href='/userinfo.html?'"+url.substring(1)+" >个人中心</a>"
}


function send() {

    if(url==''){
        alert("请先登录")
        return
    }
    window.location.href="sendmessage.html?"+url.substring(1)
}


var result = ''
result+="<li><a href='/type.html?page=1&type=玄幻魔法"+url+"' title='玄幻魔法'>玄幻魔法</a></li>"
result+="<li><a href='/type.html?page=1&type=武侠修真"+url+"' title='武侠修真'>武侠修真</a></li>"
result+= "<li><a href='/type.html?page=1&type=都市言情"+url+"' title='都市言情'>都市言情</a></li>"
result+="<li><a href='/type.html?page=1&type=历史军事"+url+"' title='历史军事'>历史军事</a></li>"
result+="<li><a href='/type.html?page=1&type=侦探推理"+url+"' title='侦探推理'>侦探推理</a></li>"
result+="<li><a href='/type.html?page=1&type=网游动漫"+url+"' title='网游动漫'>网游动漫</a></li>"
result+="<li class='dropdown'>"
result+="<a class='dropdown-toggle' data-toggle='dropdown'>更多分类<span class='caret'></span></a>"
result+="<ul class='dropdown-menu' role='menu'>"
result+="<li><a href='/type.html?page=1&type=科幻小说"+url+"' title='科幻小说'>科幻小说</a></li>"
result+="<li><a href='/type.html?page=1&type=恐怖灵异"+url+"' title='恐怖灵异'>恐怖灵异</a></li>"
result+="<li><a href='/type.html?page=1&type=穿越小说"+url+"' title='穿越小说'>穿越小说</a></li>"
result+="<li><a href='/type.html?page=1&type=其他类型"+url+"' title='其他类型'>其他类型</a></li>"
result+="</ul>"
result+="</li>"
result+="<li><a href='/type.html?page=1&state=complete"+url+"' title='完本小说'>完本小说</a></li>"


function search() {
    var data1 = document.getElementById("bdcsMain1").value
    var data2 = document.getElementById("bdcsMain2").value

    if (!(data1!='' ||data2!=''))
        return


    if(data1 != null && data1 !='')
        window.location.href="/search.html?page=1&key="+data1+url
    else
        window.location.href="/search.html?page=1&key="+data2+url
}


document.onkeydown = function(e){
    if(e.keyCode == 13){

        search()
    }
}

function indexUrl() {
    if (url==''){
        window.location.href = '/index.html'
    }else{
        window.location.href = '/index.html?'+url.substring(1)
    }

}

function searchOnclick(){
    $('#historySearch').css('display','block')
}

/**
 *     判断 小说的点击事件的    用户是否阅读了
 * @param {Object} nid
 */
novelMemorys = function(nid){

    if(url==''){
        window.location.href="/introduction.html?nid="+nid
    }

    var userUrl = window.location.search.substr(1);

    $.ajax({
        type:'GET',
        url:'memory.u',
        data:{'nid':nid},
        success:function(data){
            if(data == "-1"){//session_uid存在  数据库没记录
                window.location.href="/introduction.html?nid="+nid+"&"+userUrl;
            }else if(data == "0"){//session_uid不存在   通过套取uid登录
                window.location.href="/introduction.html?nid="+nid;
            }else{//返回的data为小说章节cid   session_uid存在  数据库有记录
                window.location.href="/read.html?nid="+nid+"&cid="+data+"&"+userUrl;
            }
        },
        error:function(){
            alert("系统繁忙，请稍后再试！");
        }
    });

};

$(function () {

    $('#login').append(aUrl1)
    $('#register').append(aUrl2)

    if(url!=''){

        $.ajax({
            type:'GET',
            url:'/userSearchHistory.u',
            data:{'uid':1},
            success:function(data){
                result =''
                $(data).each(function(index,ele) {
                    var tName = ele.historySearchName
                    result+="<li ><a href='/search.html?page=1&key="+ele.historySearchName+url+"'>"+ele.historySearchName+"</a></li>"
                })

                var historySearch = $('#historySearch')
                historySearch.append(result)
                historySearch.css('list-style-type','none')
            },
            error:function(){
                alert("系统繁忙，请稍后再试！");
            }
        });
    }

    $('#titleLi').append(result)
    $.ajax({
        url:'/solr/collection1/select?q=*%3A*&sort=novel_updateTimes+desc&rows=30&wt=json&indent=true',
        error:function(){
            alert("请求出错.")
        },
        success:function(data){

            var result="";
            var jsonObject = eval("("+data+")")
            var start = jsonObject.response.start
            var docs= jsonObject.response.docs
            $(docs).each(function (index,ele) {
                result+="<tr><td class=\"text-muted hidden-xs\" width=\"10%\">"+ele.novel_type+"</td>"
                result+="<td><a onclick=\"novelMemorys("+ele.id+")\" href=\"javascript:void(0)\" title=\""+ele.novel_name+"\">"+ele.novel_name+"</a></td>"
                result+="<td class=\"hidden-xs\">"
                result+="<a href=\"/read.html?nid="+ele.id+"&cid="+ele.novel_latestChaptersUrl+url+"\"title=\""+ele.novel_latestChapters+"\">"+ele.novel_latestChapters+"</a></td>"
                result+="<td class=\"text-muted fs-12\" title=\""+ele.novel_author+"\">"+ele.novel_author+"</td>"
                var tdate = ele.novel_tdate
                tdate = tdate.substring( 0, tdate.lastIndexOf(':'))
                result+="<td class=\"fs-12\">"+tdate+"</td></tr>"
            })
            $('#latestTable').append(result)
        },
        type:'GET'
    });

    $.ajax({
        url:'/novel/HotMonths.n',
        success:function(data){
            var results="";
            $(data).each(function(index,ele){
                index = parsInt(index)+1;
                results+= "<li class=\"list-group-item\">";
                results+= "<i class=\"topNum\">"+index+"</i>";
                results+= "<a href=\"/introduction.html?nid="+ele.nid+"\" class=\"novelMemory\" title=\""+ele.novelName+"\">"+ele.novelName+"</a>";
                results+= "<small class=\"text-muted\">/ "+ele.author+"</small>";
                results+= "<span class=\"pull-right text-muted\">"+ele.readCount+"</span>";
                results+= "</li>";
            });
            $('#HotThisMonth').append(results);
        }

    });

});



// function searchLiOnclick(data){
//
//     alert(data)
//     window.location.href="/search.html?page=1&key="+data+url
// }

