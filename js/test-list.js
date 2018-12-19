
var vm = new Vue({
  el:'#app',
  data:{
    myinfo: '',
    testlist : '',
    testhistory: ''
  },
  methods:{
    enter_test:function(paperid){
      //window.open("testing.html?paperid=" + paperid);
      window.location.href = "test-testing.html?paperid=" + paperid;
    },
    get_my_info:function(){
      this.$http.get(backend_server + 'my-info/').then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          this.myinfo = dataret.info
        }
        else
        {
          this.myinfo = '获取个人信息失败(1)'
        }
      },function(res){
        console.log(res.status);
        this.myinfo = '获取个人信息失败(2)';
      });
    },
    get_test_list:function(){
      this.$http.get(backend_server + 'paper-get-list-stu/', {credentials: true})
      .then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          this.testlist = dataret.list
        }
        else
        {
          this.testlist = '获取试题列表失败(1)'
        }
      },function(res){
        console.log(res.status);
        this.testlist = '获取试题列表失败(2)';
      });
    },
    get_test_history:function(){
      this.$http.get(backend_server + 'test-history/', {credentials: true})
      .then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          this.testhistory = dataret.list
        }
        else
        {
          this.testhistory = '获取考试历史记录失败(1)'
        }
      },function(res){
        console.log(res.status);
        this.testhistory = '获取考试历史记录失败(2)';
      });
    }
  },
  created:function(){
    //this.get_my_info();
    this.get_test_list();
    //this.get_test_history();
  }
})
