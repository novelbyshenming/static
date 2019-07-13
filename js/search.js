var tLocalUrl = window.location.search

tLocalUrl = tLocalUrl.substring(1)

var url =''
var uid=''
var t
if(tLocalUrl.indexOf('uid')>0){
    // 用户登录
     t = tLocalUrl.split('&')
    if (tLocalUrl.indexOf('vip')>0){
        // vip 用户登录
        url = '&'+t[2]+'&'+t[3]
        uid = "uid="+t[2].split('=')[1]
    }else{
        // 普通用户登录
        url = '&'+t[2]
        uid ="uid="+t[2].split('=')[1]
    }
}else{
    // 游客访问
    t = tLocalUrl.split('&')
}
function send() {

    if(url==''){
        alert("请先登录")
        return
    }
    window.location.href="sendmessage.html?"+url.substring(1)
}

function indexUrl() {
    if (url==''){
        window.location.href = '/index.html'
    }else{
        window.location.href = '/index.html?'+url.substring(1)
    }
}

$(function () {


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

    $('#titleLi').append(result)


    if(uid !=''){
        $.ajax({
            url : "/userInfo.u?uid="+uid,
            type : 'GET',
            success : function(data) {
                alert(data)
                if(data =='-1' ){
                    alert("该用户还没登录,或者用户信息过期,请重新登陆")
                    window.location.href = "/login.html"
                    return
                }else if( data =='' || data ==null){
                    alert("该用户信息异常,请重新登陆")
                    window.location.href = "/login.html"
                    return
                }

                /**
                 * result+="<li><a href='/userbooks.html?'"+url.substring(1)+">我的书架</a></li>"
                 result+="<li><a href='/userinfo.html?'"+url.substring(1)+">"+data.username+"</a></li>"
                 * @type {string}
                 */
                var result = ''
                result+="<li><a href='/userBooks.html?"+url.substring(1)+"' title='我的书架'><i class='fa fa-book fa-fw'></i>我的书架</a></li>"
                result+="<li class='dropdown'><a class='dropdown-toggle'"
                result+="data-toggle='dropdown'><i class='fa fa-user fa-fw'></i>"+data.username+"<span"
                result+="class='caret'></span></a>"
                $('#userInfo').append(result)
            }
        });
    }else{
        var result =''
        result+="<li><a href='/login.html'>登录</a></li>"
        result+="<li><a href='/register.html'>免费注册</a></li>"
        $('#userInfo').append(result)
    }


    var localUrl = window.location.href;

    var number = localUrl.lastIndexOf('?')

    if (number >0 ){

        localUrl = localUrl.substring(number+1)

        var t1 = t[0].split('=')
        var t2 = t[1].split('=')

        /* var params1 = localUrl.substring(0,number)

         var tparams1 = params1.split('=')

         var params2 = localUrl.substring(number+1)

         var tparams2 = params2.split('=')

         if ( tparams1[0] =='page' ){


         }else{
             ajaxType(t1[1],t[1])
         }*/
        ajaxType(t1[1],t2[1])

        if(uid!=''){

            $.ajax({
                url:'insHistory.u?'+uid+"&key="+encodeURI(t2[1]),
                error:function(){
                    alert("请求出错.")
                },
                success:function(data){
                    if(data =='-1'||data=='-2'){

                        alert("更新搜素历史记录异常")
                    }
                },
                type:'GET'
            });

        }
    }

    function getPage(pageStart,pageEnd) {

    }

    function ajaxType(page,key) {

        var start = (page-1)*15

        var target = 'solr/collection1/select?start='+start+'&rows=15&wt=json&indent=true&q=novel_keywords:'+key

        $.ajax({

            url:target,
            error:function(){

                alert("请求出错.")

            },
            success:function(data){

                var result=""

                var jsonObject = eval("("+data+")")

                /* 查询到的 总数量*/
                var numFound = jsonObject.response.numFound

                // 页数      一页15 个小说信息  显示十页
                var pageNumber = 1
                var pageStart = 1
                var pageEnd = 2

                if(numFound>0){

                    // 进行分页
                    if(numFound%15==0)
                        pageNumber=numFound/15
                    else
                        pageNumber=numFound/15 + 1

                    // page  为当前页   5
                    if(pageNumber>10){

                        if( (page - 5)>1 ){

                            pageStart = page -5
                            pageEnd = pageStart + 10

                            getPage(pageStart,pageEnd)
                        }
                    }

                }

                var docs= jsonObject.response.docs

                $(docs).each(function (index,ele) {

                    result+="<tr><td class=\"odd\"><a href=\"/introduction.html?nid="+ele.id+url+"\">"+ele.novel_name+"</a></td>"
                    result+="<td class=\"hidden-xs\"><a href=\"/read.html?nid="+ele.id+"&cid="+ele.novel_latestChaptersUrl+url+"\" target=\"_blank\"> "+ele.novel_latestChapters+"</a></td>"
                    result+="<td class=\"odd\">"+ele.novel_author+"</td>"
                    result+="<td class=\"hidden-xs\">"+ele.novel_type+"</td>"
                    var tdate = ele.novel_tdate
                    tdate = tdate.substring( 0, tdate.lastIndexOf(':'))

                    result+="<td class=\"hidden-xs\">"+tdate+"</td>"
                    result+="<td class=\"even\">连载中</td></tr>"

                })
                $("#searchTable").append(result)
            },
            type:'GET'
        });
    }
})
