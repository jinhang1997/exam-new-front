
var vm = new Vue({
  el:'#app',
  data:{
    paperid: '',
    stuid: '',
    paper: '',
    count: 0,
    anslist: '',
    answer_content: '',
    stuid_to_show: '',
    answer_to_show: '',
  },
  methods:{
    showpro:function(content){
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
          alert('获取试题列表失败(1)');
        }
      },function(res){
        console.log(res.status);
        alert('获取试题列表失败(2)');
      });
    },
    get_zhuguan_answers:function(){
      postdata = {
        action: 'getans',
        paperid: this.paperid,
        stuid: this.stuid
      };
      this.$http.post(backend_server + 'judge-zhuguan/', postdata, {credentials: true})
      .then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          templist = dataret.list;
          for (var i=0; i<templist.length; i++)
          {
            templist[i]['score'] = 0;
          }
          this.count = dataret.count;
          this.anslist = templist;
        }
        else
        {
          alert('获取主观题答案列表失败(1)');
        }
      },function(res){
        console.log(res.status);
        alert('获取主观题答案列表失败(2)');
      });
    },
    submit:function(){
      detail = [];
      grade = 0;
      for (var i=0; i<this.anslist.length; i++)
      {
        obj = {
          "id": this.anslist[i].id,
          "grade": parseInt(this.anslist[i].score)
        };
        detail.push(obj);
        grade += parseInt(this.anslist[i].score)
      }
      console.log(grade);
      console.log(detail);
      postdata = {
        action: 'submit',
        paperid: this.paperid,
        stuid: this.stuid,
        zhuguan_detail: detail,
        zhuguan_score: grade
      };
      this.$http.post(backend_server + 'judge-zhuguan/', postdata, {credentials: true})
      .then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          alert('保存主观题评分成功');
        }
        else
        {
          alert('保存主观题评分失败(1)');
        }
      },function(res){
        console.log(res.status);
        alert('保存主观题评分失败(2)');
      });
    },
    this_zero:function(index){
      this.anslist[index]['score'] = 0;
    },
    this_full:function(index){
      this.anslist[index]['score'] = this.anslist[index]['point'];
    },
    show_pro:function(index){
      show_div();
    }
  },
  created:function(){
    this.paperid = getQueryString('paperid');
    this.stuid = getQueryString('stuid');
    this.get_paper_detail();
    //this.get_student_answers();
    this.get_zhuguan_answers();
  }
})
