
var tLocalUrl = window.location.search

var url =''
var uid=''

if( tLocalUrl=='' || tLocalUrl==null ){
    //  游客访问

}else{

    if(tLocalUrl.indexOf('uid')>0){
        //用户登录
        tLocalUrl = tLocalUrl.substring(1)
        var t = tLocalUrl.split('&')

        if(tLocalUrl.indexOf('vip')>0){
            // vip 用户登录
            url = '&'+t[2]+'&'+t[3]
            uid = t[2].split('=')[1]
        }else{
            // 普通用户登录
            url = '&'+t[2]
            uid = t[2].split('=')[1]
        }
    }else{

        // 游客访问
    }
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

$(function (){

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

    var params=''
    var pageNumber

    var localUrl = window.location.search;

    var number = localUrl.indexOf('?')
    if (number >=0 ){

        localUrl = localUrl.substring(number+1)

        var t = localUrl.split('&')

        var params1 = t[0]

        var tparams1 = params1.split('=')

        var params2 = t[1]

        var tparams2 = params2.split('=')

        var target=''

        var start = (tparams1[1]-1)*28

        var tTarget = ''

        if (tparams2[1]=='complete'){
            $('#typeName1').append("最新完本小说")
            $('#title').append('好看的完本小说_2019完本小说排行榜_嘿 ! 污')
            $('#typeName').append("<i class='fa fa-fire fa-fw'></i>完本小说热门推荐 ")
            tTarget='http://47.106.110.16/solr/collection1/select?q=novel_state:已完成&start=0&rows=30&wt=json&indent=true'
            target='solr/collection1/select?sort=novel_updateTimes+desc&start='+start+'&rows=28&wt=json&indent=true&q=novel_state:已完成'
        }else{
            $('#typeName1').append(decodeURI(tparams2[1])+"最新更新")
            $('#title').append("好看的"+decodeURI(tparams2[1]) +"_2019 "+decodeURI(tparams2[1])+"排行榜_嘿 ! 污")
            $('#typeName').append("<i class='fa fa-fire fa-fw'></i>"+decodeURI(tparams2[1])+"热门推荐 ")
            tTarget='http://47.106.110.16/solr/collection1/select?q=novel_type:'+decodeURI(tparams2[1])+'&start=0&rows=30&wt=json&indent=true'
            target='solr/collection1/select?sort=novel_updateTimes+desc&start='+start+'&rows=28&wt=json&indent=true&q=novel_type:'+tparams2[1]
        }


        <!--  ===============推荐榜   ========================  -->
        var tresult = ''
        $.ajax({
            url:tTarget,
            error:function(){
                alert("请求出错.")
            },
            success:function(data){

                var jsonObject = eval("("+data+")")
                var docs= jsonObject.response.docs
                $(docs).each(function(index,ele) {
                    tresult+="<li class='list-group-item'>"
                    tresult+="<i class='topNum'>"+(index+1)+"</i>"
                    tresult+="<a href='/introduction.html?nid="+ele.id+url+"' title='"+ele.novel_name+"'>"+ele.novel_name+"</a>"
                    tresult+="<small class='text-muted'>/ "+ele.novel_author+"</small>"
                    tresult+="<span class='pull-right text-muted'>1745</span></li>"
                })
                $('#searchList').append(tresult)
            },
            type:'GET'
        });

        <!--  =======================================                       -->


        params = params2
        ajaxType(target,tparams1[1])
    }

    function getPage(page,pageStart,pageEnd) {

        var result = ''

        result+="<li class=\"disabled\"> <span>"+page+"/"+pageNumber+"</span></li>"

        result+="<li><a href=\"/type.html?page=1&"+params+url+"\" class=\"first\">1</a></li>"

        var lastPage =1
        if(page !=1)
            lastPage = page-1

        result+="<li><a href=\"/type.html?page="+lastPage+"&"+params+url+"\" class=\"prev\">&lt;</a></li>"

        for (var i = pageStart ; i < pageEnd ; i++ ){

            if(i==page)
                result+="<li class=\"active\"><span>"+page+"</span></li>"
            else
                result+="<li><a href=\"/type.html?page="+i+"&"+params+url+"\">"+i+"</a></li>"

        }

        var nextPage = parseInt(page)+1

        if( pageNumber>page )
            nextPage=parseInt(page)+1
        else
            nextPage=pageNumber

        result+="<li><a href=\"/type.html?page="+nextPage+"&"+params+url+"\" class=\"next\">&gt;</a></li>"
        result+="<li><a href=\"/type.html?page="+pageNumber+"&"+params+url+"\" class=\"last\">"+pageNumber+"</a></li>"

        $('#pagelink').append(result)

    }
    function ajaxType(target,page) {

        $.ajax({
            url:target,
            error:function(){
                alert("请求出错.")
            },
            success:function(data){

                var result="";

                var jsonObject = eval("("+data+")")

                /* 查询到的 总数量*/
                var numFound = jsonObject.response.numFound

                // 页数      一页15 个小说信息  显示十页
                pageNumber = 1
                var pageStart = 1
                var pageEnd = 2

                if(numFound>0){

                    // 进行分页
                    if(numFound%15==0)
                        pageNumber=Math.floor(numFound/28)
                    else
                        pageNumber=Math.floor(numFound/28) + 1

                    // page  为当前页   5
                    if(pageNumber>10){

                        if( (page - 5)>1){

                            //167  171   相差 4

                            if(( parseInt(page)+4)<pageNumber){
                                pageStart = page-5
                                pageEnd = parseInt(page)+5
                                console.log(pageEnd +  "  "+ page)
                            }
                            else{
                                pageEnd = parseInt(pageNumber)+1
                                pageStart =pageEnd-10
                            }

                            getPage(page,pageStart,pageEnd)
                        }else{
                            pageStart = 1
                            pageEnd =11
                            getPage(page,pageStart,pageEnd)
                        }
                    }else{

                        pageStart = 1
                        pageEnd = parseInt(pageNumber)+1
                        getPage(page,pageStart,pageEnd)
                    }
                }

                var docs= jsonObject.response.docs

                $(docs).each(function (index,ele) {

                    result+="<tr><td><a href=\"/introduction.html?nid="+ele.id+url+"\" title=\""+ele.novel_name+"\" target=\"_blank\">"+ele.novel_name+"</a></td>"
                    result+="<td class=\"hidden-xs\"><a class=\"text-muted\" href=\"/read.html?nid="+ele.id+"&cid="+ele.novel_latestChaptersUrl+url+"\" target=\"_blank\">"+ele.novel_latestChapters+"</a></td>"
                    result+="<td class=\"text-muted\">"+ele.novel_author+"</td>"
                    var tdate = ele.novel_tdate
                    tdate = tdate.substring( 0, tdate.lastIndexOf(':'))
                    result+="<td class=\"hidden-xs\">"+tdate+"</td>"
                    result+="<td>"+ele.novel_state+"</td></tr>"
                })
                $("#typeTable").append(result)
            },
            type:'GET'
        });
    }
})

