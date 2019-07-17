var localUrl = window.location.search

var tUrl = localUrl

localUrl = localUrl.substring(1)

var urlParams = localUrl.split('&')

var params = urlParams[0].split('=')

var nid = params[1]

var uid =''

var vip =''

var url=''

var introductionUrlMapping='/novelChapters.n?nid='+nid

/*
  在此判断   是否为  用户 访问  用户是否为  vip用户
*/
var userIndex = localUrl.indexOf('uid')
if(userIndex>=0){

    // 代表用户登陆
    var vipIndex = localUrl.indexOf('vip')

    if(vipIndex>=0){
        // 代表 vip用户登陆

        uid = urlParams[1].split('=')[1]
        vip = urlParams[2].split('=')[1]
        url ='&uid='+uid+'&vip='+vip
        introductionUrlMapping='/vipNovelChapters.n'+tUrl
    }else{
        // 代表 普通用户登陆
        uid = urlParams[1].split('=')[1]
        url = '&uid='+uid
        introductionUrlMapping='/userNovelChapters.n'+tUrl
    }
}else{
    // 游客登录
}

function indexUrl() {
    if (url==''){
        window.location.href = '/index.html'
    }else{
        window.location.href = '/index.html?'+url.substring(1)
    }
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

    if(uid !=''){
        $.ajax({
            url : "userInfo.u?uid="+uid,
            type : 'GET',
            success : function(data) {
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


    $.ajax({
        url:introductionUrlMapping,
        error:function(){
            alert("请求出错.")
        },
        success:function(data){

            data = eval(data)
            $('#novelTitle').append(data.introductionNovel.novelName)
            $('#lastNovel').append("《"+data.introductionNovel.novelName+"》所有内容均来自互联网或网友上传，嘿 ! 污 只为原作者夜与雪的小说进行宣传。欢迎各位书友支持夜与雪并收藏《"+data.introductionNovel.novelName+"》最新章节。")

            $('#novelNewChapter').append("<strong>《"+data.introductionNovel.novelName+"》最新章节</strong>")
            var result =''
            result+="<li><a href='/' title='嘿 ! 污'><i class='fa fa-home fa-fw'></i>首页</a></li>"
            result+="<li><a href='/type.html?page=1&type="+data.introductionNovel.type+url+"' target='_blank' title='"+data.introductionNovel.type+"'>"+data.introductionNovel.type+"</a></li>"
            result+="<li class='active'>"+data.introductionNovel.novelName+"</li>"
            $('#introductionHead').append(result)

            result=''
            result+="<div class='col-md-2 col-xs-4 hidden-xs'>"
            result+="<img class='img-thumbnail' alt='"+data.introductionNovel.novelName+"' src='"+data.introductionNovel.image+"' title='"+data.introductionNovel.novelName+"' width='140' height='180'>"
            result+="</div>"
            result+="<div class='col-md-10'>"
            result+="<h1 class='bookTitle'>"+data.introductionNovel.novelName+"</h1>"
            result+="<p class='booktag'>"
            result+="<a class='red' href='/search.html?page=1&key="+data.introductionNovel.author+url+"' target='_blank' title='作者："+data.introductionNovel.author+"'>"+data.introductionNovel.author+"</a>"
            result+="<a class='red' href='/type.html?page=1&type="+data.introductionNovel.type+url+"' target='_blank' title='"+data.introductionNovel.type+"'>"+data.introductionNovel.type+"</a>"
            result+="<span class='blue'>阅读数："+data.introductionNovel.readCount+"</span>"
            result+="<span class='blue'>"+data.introductionNovel.state+"</span>"
            result+="</p>"
            result+="<p>"

            result+="</p>"
            result+="<div class='row'>"
            result+="<span class='col-md-8'>"
            result+="<button class='btn btn-sm btn-info' type='button'>"
            result+="<i class='fa fa-thumbs-up fa-fw'></i>投票推荐"
            result+="</button>"
            result+="<button onclick='userCollect()' class='btn btn-sm btn-success' type='button'>"
            result+="<i class='fa fa-plus fa-fw'></i>加入书架"
            result+="</button>"
            result+="<a class='errorlink btn btn-sm btn-warning' href='/sendmessage.html?"+url.substring(1)+"' target='_blank' rel='nofollow'>"
            result+="<i class='fa fa-comments fa-fw'></i>留言反馈</a></span>"
            result+="<div class='clear'></div></div><hr>"
            result+="<p class='text-muted' id='bookIntro' style=''>"
            result+="<img class='img-thumbnail pull-left visible-xs' style='margin:0 5px 0 0' alt='"+data.introductionNovel.novelName+"' src='"+data.image+"' title='"+data.introductionNovel.novelName+"' width='80' height='120'>"
            result+=""+data.introductionNovel.introduction+""
            result+="</p></div><div class='clear'><br></div>"
            $('#novelIntroduction').append(result)





            var result =''
            // data = eval('('+data+')')

            var chapters =eval("("+data.novelChapters+")").chapters

            var chapterNumber = chapters.length

            var novelNewChapterList =$('#novelNewChapterList')

            if(chapterNumber<=12){
                // length 小于或者等于  显示0 - length-1
                for (var i =chapterNumber-1;i>=0;i--){

                    result+= "<dd class='col-md-3'>"
                    result+= "<a href='/read.html?nid="+nid+"&cid="+chapters[i].url+url+"' title='"+chapters[i].title+"'>"+chapters[i].title+"</a></dd>"
                }

            }else{
                // length  大于九 显示最后的 九条数据
                for (var i =chapterNumber-1;i>=chapterNumber-12;i--){

                    result+= "<dd class='col-md-3'>"
                    result+= "<a href='/read.html?nid="+nid+"&cid="+chapters[i].url+url+"' title='"+chapters[i].title+"'>"+chapters[i].title+"</a></dd>"
                }
            }
            novelNewChapterList.append(result)

            result=''

            $(chapters).each(function (index,ele) {

                result+="<dd class='col-md-3'>"
                result+="<a href='/read.html?nid="+nid+"&cid="+ele.url+url+"'  title='"+ele.title+"'>"+ele.title+"</a></dd>"
            })

            $('#chapterList').append(result)

        },
        type:'GET'
    });

});

function userCollect() {

    var collectUrl = tUrl
    if(tUrl.indexOf('vip')>=0){
        //  vip  用户登录
        collectUrl = t.substring(0,tUrl.lastIndexOf('&'))
    }

    if(url==''){
        alert("你还未登陆")
        return
    }

    $.ajax({

        url : "userCollectNovel.u"+collectUrl,
        type : 'GET',
        success : function(data) {

            if( data =='0' || data==0 ){

                alert("参数异常,请稍后再试")
                return
            }else if( data=='-1' || data==-1 ){
                alert("你已经收藏此书籍了")
                return
            }
            alert("收藏成功! 已经添加到你的书架了 ")
        }
    });

}