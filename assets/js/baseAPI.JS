// 注意 每次调用 $.post() 或 $.get() 或 $.ajax
// 的时候 会先调用 $.ajaxPrefilter()这个函数
// 在这个函数中 可以拿到 ajax 提供的配置对象
$.ajaxPrefilter(function(options) {
    console.log(options.url);
})