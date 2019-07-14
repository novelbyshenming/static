var tLocalUrl = window.location.search
tLocalUrl = tLocalUrl.substring(1)
var url = ''
var readUrl = '/readNovelChapter.n'
var uid =''

if(tLocalUrl.indexOf('uid')>0){
    // 用户登录
    var t = tLocalUrl.split('&')
    if(tLocalUrl.indexOf('vip')>0){
        // vip用户登录
        url = '&' +t[2]+'&'+t[3]
        uid = t[2].split('=')[1]
        readUrl = '/vipReadNovelChapter.n'
    }else{
        // 普通用户登录
        url = '&'+t[2]
        uid = t[2].split('=')[1]
        readUrl = '/userReadNovelChapter.n'
    }
}

function send() {

    if(url==''){
        alert("请先登录")
        return
    }
    window.location.href="sendmessage.html?"+url.substring(1)
}

var novelChapterName =''
function bookMark(nid,cid) {

    if(nid ==''||nid==null||cid==null||cid==''
            ||novelChapterName==null||novelChapterName==''
            ||uid==''||uid==null){
        alert("收藏失败,参数异常")
        return ;
    }

    $.ajax({
        url:'userCollectNovelChapter.u',
        data:{"nid":nid,"cid":cid,"uid":uid,"novelChapterName":novelChapterName},
        error:function(){
            alert("请求出错.")
        },
        success:function(data){

            alert(data)
            if(data =='1'){

                alert("操作成功")
            }else{
                alert("请稍等,服务器繁忙!")
            }
        },
        type:'POST'
    });


}

$(function(){


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
    /*
    url: 请求服务器地址
    data:请求参数
    dataType:服务器返回数据类型
    error请求出错执行的功能
    success请求成功执行的功能,function(data) data服务器返回的数据.
    type:请求方式
    */

    if(uid !=''){
        $.ajax({
            url : "userInfo.u?uid="+uid,
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
                result+="<li><a href='/userbooks.html?"+url.substring(1)+"' title='我的书架'><i class='fa fa-book fa-fw'></i>我的书架</a></li>"
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

    var localUrl = location.search

    var tUrl = localUrl

    localUrl = localUrl.substring(1)

    var params = localUrl.split('&')

    var params1 =params[0].split('=')

    var params2 = params[1].split('=')

    /*var params3 = params[2].split('=')

    var uid = params3[1]*/

    var nid
    var cid

    if(params1[0] =='nid'){

        nid = params1[1]
        cid = params2[1]
    }else{

        nid = params2[1]
        cid = params1[1]
    }


    $.ajax({

        url:readUrl+tUrl,
        error:function(){
            alert("请求出错.")
        },
        success:function(data){

            if(data=="-1"){
                alert("用户信息异常,请重新登陆")
                window.location.href="http://127.0.0.1:80/login.html"
                return ;
            }else if(data ==""||data==null){
                alert("服务器繁忙,请稍候再试")
                window.location.href="/introduction.html?nid="+nid+url
                return ;
            }

            var result =''
            result+="<p class='text-center booktag'>"
            result+="<a class='blue' href='/introduction.html?nid="+nid+url+"'><i class='fa fa-list fa-fw'></i>"+data.introductionNovel.novelName+"</a>"
            result+="<a class='blue' href='/search.html?page=1&key="+data.introductionNovel.author+url+"' target='_blank' title='"+data.introductionNovel.author+"'>作者："+data.introductionNovel.author+"</a>"
            result+="<a class='blue' rel='nofollow'><i class='fa fa-thumbs-up fa-fw'></i>投票推荐</a>"
            result+="<a class='red' id='' onclick='bookMark("+nid+","+cid+")' rel='nofollow'><i class='fa fa-bookmark fa-fw'></i>加入书签</a>"
            result+="<a href='#' class='red errorlink' target='_blank'>"
            result+="<i class='fa fa-comments fa-fw'></i>留言反馈</a></p>"

            $('#novelChapterTitle').append(result)
            $('#novelLi1').append("<a href='/type.html?page=1&key="+data.introductionNovel.type+url+"' target='_blank' title='"+data.introductionNovel.type+"'>"+data.introductionNovel.type+"</a>")
            $('#novelLi2').append("<a href='/introduction.html?nid="+nid+url+"'>"+data.introductionNovel.novelName+"</a>")
            $('#novelFoot').append("<a href='/introduction.html?nid="+nid+url+"' title='"+data.introductionNovel.novelName+"'>"+data.introductionNovel.novelName+"</a>所有内容均来自互联网，笔趣阁只为原作者 "+data.author+" 的小说进行宣传。欢迎各位书友支持 "+data.author+" 并收藏")



            novelChapterName = data.readNovel.novelChapterName
            $("#novelLi3").append(data.readNovel.novelChapterName)
            $('#htmlContent').append("<br>"+data.readNovel.context+"<br><br><br>")
            var result =''
            result+="<a id='linkPrev' class='btn btn-default' href='/read.html?nid="+nid+"&cid="+data.readNovel.lastChapter+url+"'><i class='fa fa-arrow-circle-left fa-fw'></i>上一章</a>"
            result+="<a id='linkIndex' class='btn btn-default' href='/introduction.html?nid="+nid+url+"'><i class='fa fa-list fa-fw'></i>章节目录</a>"
            if( data.readNovel.nextChapter =='-1' ){
                result+="<a id='linkNext' class='btn btn-default' onclick='tiShi()' href='javascript:void(0)'>下一章<i class='fa fa-arrow-circle-right fa-fw'></i></a>"
            }else{
                result+="<a id='linkNext' class='btn btn-default' href='/read.html?nid="+nid+"&cid="+data.readNovel.nextChapter+url+"'>下一章<i class='fa fa-arrow-circle-right fa-fw'></i></a>"
            }

            $('#novelTS').append(result)
            $('#novelChapterName').append(data.readNovel.novelChapterName)
        },
        type:'GET'
    });

});
function tiShi() {
    alert("暂无下一章节")
}
function indexUrl() {
    if (url==''){
        window.location.href = '/index.html'
    }else{
        window.location.href = '/index.html?'+url.substring(1)
    }

}