$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1~6 个字符之间'
            }
        }
    })

    initUserInfo()
        // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            methon: 'GET',
            url: 'http://api-breakingnews-web.itheima.net/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败!')
                }
                console.log(res);
                // 调用form.val() 快速为表单赋值
                form.val('formUser.Info', res.data)
            }


        })
    }


    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
            // 阻止表单默认行为
            e.preventDefault()
            initUserInfo()
        })
        // 舰艇表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单默认提交行为
        e.preventDefault()
            // 发起 ajax 数据请求
        $.ajax({
            methon: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/my/userinfo',
            data: $(this).serialize(),

            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败!')
                }
                layer.msg('更新用户信息成功!')

                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }

        })
    })
})