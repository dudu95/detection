/**
 * Created by Administrator on 2016-12-03.
 */
var shuju = items;
var vm = new Vue({
    el: '#list-data',
    data: {
        items: shuju,
        cols: 12,
        message: [],
        summary: '',
        // hosts: [],
        nid: ''
    },
    methods: {
        changecols: function (cols) {
            if(cols == '' || typeof(cols) == NaN){
                this.cols = 12
            }
            else{
                this.cols = cols
            }
            $("caption").trigger("click")
        },
        onhover: function (n,m,length,value,index) {
            if((m-1)*this.cols+n<=length){
                $(".ttd-"+index).eq((m-1)*this.cols+n-1).popover('show')
            }
        },
        onhoverleave: function (n,m,length,value,index) {
            if((m-1)*this.cols+n<=length){
                $(".ttd-"+index).eq((m-1)*this.cols+n-1).popover('hide')
            }
        },
        onclick: function (n,m,length,value) {
            this.getdetail(n,m,length,this.cols,value)
            $('#myModal').modal('show')
        },
        getnid: function (n,m,length,value) {
            return (m-1)*this.cols+n<=length?value[(m-1)*this.cols+n-1].nid:''
        },
        getlocation: function (n,m,length,value) {
            return (m-1)*this.cols+n<=length?value[(m-1)*this.cols+n-1].location:''
        },
        getpercent: function (n,m,value) {
            return value[(m-1)*this.cols+n-1].percent
        },
        showpercent: function (value,index,leng) {
            var $ele = $(".ttd-"+index)
            var per,$elem
            for(var i=0;i<leng;i++){
                per = value[i]["percent"]
                $elem = $ele.eq(i)
                $elem.css('background','')
                if(per>0){
                    $elem.css('background','linear-gradient(to right,yellow, white '+per+'%)')
                }
            }
        },
        getmsg: function (n,m,length,value) {
            if((m-1)*this.cols+n<=length){
                return "nid:"+value[(m-1)*this.cols+n-1].nid
                    +" | percent:"+value[(m-1)*this.cols+n-1].percent+"%"
            }
        },
        getdetail: function (n,m,leng,value) {
            this.message = []
            this.nid = "../nodeDetail?nodeId="+this.getnid(n,m,leng,value)
            this.summary = this.getlocation(n,m,leng,value)+" | "+this.getmsg(n,m,leng,value)
            for(var i=0;i<value[(m-1)*this.cols+n-1].server.length;i++){
                for(var j=0;j<value[(m-1)*this.cols+n-1].server[i].disk.length;j++){
                    // this.hosts.push(value[(m-1)*this.cols+n-1].server[i].host)
                    this.message.push(value[(m-1)*this.cols+n-1].server[i].host
                        +" | sid:"+value[(m-1)*this.cols+n-1].server[i].sid
                        +" | rootDir:"+value[(m-1)*this.cols+n-1].server[i].disk[j].rootDir
                        +" | did:"+value[(m-1)*this.cols+n-1].server[i].disk[j].did
                        +" | state:"+value[(m-1)*this.cols+n-1].server[i].state)
                }
            }
        }
    }
})

$(function(){
    $("caption").trigger("click")
})
// function onloadEvent(){
//     getData();
//     showonclick();
//     setInterval("getData()",2*60*1000);
// }

// window.onload=onloadEvent(); 
// function showonclick() {
//             alert("showonclick");
//             $("caption").trigger("click")
// }
// function getData() {
//     $.ajax({
//         type: 'GET',
//         url: '../report/online',
//         async: false,
//         dataType: 'jsonp',
//         success:function(data) {
//             alert("success");
//             vm.items = JSON.parse(data);
//             return '';
//         },
//         error:function(data){
//             alert("get json error!");
//             return '';
//         }
//     });
// }


