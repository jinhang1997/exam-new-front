
var vm = new Vue({
  el:'#usermanage',
  data:{
    username: '',
    password: '',
    usertype: '',
    batch_names: ''
  },
  methods:{
    insert:function(){
      postdata = {
        username: this.username,
        password: this.password,
        usertype: this.usertype
      };
      if (postdata.username == '' || postdata.password == '' || postdata.usertype == '')
      {
        alert('用户信息不能有缺省');
        return;
      }
      this.$http.post(backend_server + 'user-add/', postdata, {emulateJSON: true, credentials: true}).then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          alert('添加用户成功');
          location.reload();
        }
        else
        {
          alert('添加用户失败(' + dataret.info +')');
        }
      },function(res){
        console.log(res.status);
        alert('添加用户失败(unknown error)');
      });
    },
    reset_batch:function(){
      this.batch_names = '';
    },
    reset_form:function(){
      this.username = '';
      this.password = '';
      this.usertype = '';
    },
    batch_insert:function(){
      postdata = {
        batch_names: this.batch_names
      };
      this.$http.post(backend_server + 'user-add-batch/', postdata, {emulateJSON: true, credentials: true}).then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          alert('成功添加了' + dataret.info + '个用户');
          location.reload();
        }
        else
        {
          alert('添加用户失败(' + dataret.info +')');
        }
      },function(res){
        console.log(res.status);
        alert('添加用户失败(unknown error)');
      });
    },
  },
  created:function(){
  }
})
