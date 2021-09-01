$(function() {
    // 点击"去注册账号"的链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击"去登录"的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
        // 通过 form.verify() 函数自定义效验规则
    form.verify({
        // 自定义了一个叫 pwd 的效验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 效验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框的内容
            // 还需要拿到密码框中的内容
            // 再进行一次等于的判断
            // 如果不相等就 return 提示一个消息两次输入的密码不一致
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交时间
    $('#form_reg').on('submit', function(e) {
            e.preventDefault()
                // 发起 Ajax 的 post 请求
            var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg[name=password]').val() }

            $.post('http://api-breakingnews-web.itheima.net/api/reguser', data, function(res) {
                if (res.status == 0) {
                    return layer.msg(res.message)
                        // return console.log('注册失败!')
                }
                layer.msg('注册成功，请登录!')
                    // console.log('注册成功!');

                // 模拟人的点击行为
                $('#link_login').click()
            })
        })
        // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status == 0) {
                    return layer('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登录成功得到的字符串 token 保存到 loacalStorage
                localStorage.setItem('token', res.token)
                    // console.log(res.token);
                    // 跳转到后台主页
                location.href = '/index.html'

            }
        })
    })
})