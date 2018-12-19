
var vm = new Vue({
  el:'#app',
  data:{
    paperid: '',
    paper: '',
    anslist: '',
    answer_content: '',
    stuid_to_show: '',
    answer_to_show: '',
  },
  methods:{
    showans:function(stuid, answer){
      //for var in anslist
      this.stuid_to_show = stuid;
      this.answer_to_show = answer;
      this.$forceUpdate();
      show_div();
    },
    get_paper_detail:function(){
      this.$http.get(backend_server + 'paper-get-detail/?id=' + this.paperid, {credentials: true})
      .then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          this.paper = dataret.info;
        }
        else
        {
          this.prolist = '获取试题列表失败(1)';
        }
      },function(res){
        console.log(res.status);
        this.prolist = '获取试题列表失败(2)';
      });
    },
    get_student_answers:function(){
      postdata = {
        action: 'getans',
        paperid: this.paperid
      };
      this.$http.post(backend_server + 'judge-manage/', postdata, {credentials: true})
      .then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          this.anslist = dataret.anslist;
        }
        else
        {
          this.prolist = '获取试题列表失败(1)';
        }
      },function(res){
        console.log(res.status);
        this.prolist = '获取试题列表失败(2)';
      });
    }
  },
  created:function(){
    this.paperid = getQueryString('paperid');
    this.get_paper_detail();
    this.get_student_answers();
  }
})
