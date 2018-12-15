
var vm = new Vue({
  el:'#app',
  data:{
    paper: {
      pid: 0,
      pname: '',
      teaname: '',
      penabled: ''
    },
    newpro:{
      problem: '',
      ptype: '',
      point: '',
      right: '',
      wrong1: '',
      wrong2: '',
      wrong3: ''
    },
    prolist : '',
    paperid: 0
  },
  methods:{
    remove:function(id_to_del){
      //console.warn(id_to_del + " is to be removed.");
      if (id_to_del == "all")
      {
        postdata = {
          action: 'delall',
          paperid: this.paper.pid,
        };
      }
      else
      {
        postdata = {
          action: 'delpro',
          paperid: this.paper.pid,
          problem: id_to_del
        };
      }
      this.$http.post(backend_server + 'paper-prolist/', postdata, {credentials: true})
      .then(function(res){
        //console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          //console.log(this.prolist);
          alert('删除题目成功');
          location.reload();
        }
        else
        {
          alert('删除题目失败（1）');
          //location.reload();
        }
      },function(res){
        console.log(res.status);
        alert('删除题目失败（2）');
        //location.reload();
      });
    },
    modify:function(){
      // NOT confirmed to implement this one
    },
    insert:function(){
      postdata = {
        action: 'addpro',
        paperid: this.paper.pid,
        problem: this.newpro
      };
      console.log(postdata);
      this.$http.post(backend_server + 'paper-prolist/', postdata, {credentials: true})
      .then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          //console.log(this.prolist);
          alert('新增题目成功');
          location.reload();
        }
        else
        {
          //this.prolist = '获取试题列表失败(1)';
          alert('新增题目失败（1）');
          location.reload();
        }
      },function(res){
        console.log(res.status);
        //this.prolist = '获取试题列表失败(2)';
        alert('新增题目失败（2）');
        location.reload();
      });
    },
    reset:function(){
      this.newpro = {
        problem: '',
        ptype: '',
        point: '',
        right: '',
        wrong1: '',
        wrong2: '',
        wrong3: ''
      };
      console.log(this.newpro);
    },
    get_paper_detail:function(){
      this.$http.get(backend_server + 'paper-get-detail/?id=' + this.paperid, {credentials: true})
      .then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          this.paper = dataret.info;
          /*this.procount = dataret.paper.problem_count;
          this.prolist = dataret.paper.question_list;*/
          this.prolist = dataret.paper;
          //this.stulist = dataret.stulist;
          //console.log(this.prolist);
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
  }
})



