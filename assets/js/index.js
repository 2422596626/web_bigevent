$(function() {
        getUserInfo()
        var layer = layui.layer
            // 点击按钮实现退出的功能
        $('#btnLogout').on('click', function() {
            // 提示用户是否确认退出
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //do something
                //   1、清空本地存储的 token
                localStorage.removeItem = ('token')
                    // 2、重新跳转到登录页面
                location.href = '/login.html'
                    // 关闭 cofirm询问框
                layer.close(index);
            })
        })
    })
    // 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        mthod: 'GET',
        url: 'http://api-breakingnews-web.itheima.net/my/userinfo',
        // headers 就是请求头像配置
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar渲染用户的头像
            renderAvatar(res.data)
        },
        // 无论成功或失败，最终都会调用 complete 函数
        // complete: function(res) {
        //     // console.log('执行了complete 回调:');
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1、强制清空 token 
        //         localStorage.removeItem('token')
        //             // 2、强制跳转到登录页面
        //         location.href = '/login.html'

        //     }
        // }
    })
}
// 渲染下用户的头像
function renderAvatar(user) {
    //  1、获取用户名称
    var name = user.nickname || user.username
        //  2、设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
        // 3、按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3、1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //    3、2 渲染文本你头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase
        $('.text-avatar').html(first).show()
    }

}