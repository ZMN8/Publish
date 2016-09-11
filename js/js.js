/**
 * Created by Administrator on 2016/9/2.
 */
var json={
    file:$(".file"),
    pubTxtBtn:$(".pub_txt_btn"),
    select:$(".select"),
    lableCheck1:$(".check li").first().children("label"),
    lableCheck2:$(".check li").last().children("label"),
    checkBool1:false,//跟踪第一个复选框的选中情况
    checkBool2:false,//跟踪第二个复选框的选中情况
    boxRight:$(".box_right"),
    boxLeft:$(".box_left"),
    form:$("form"),
    trans:function(obj,left,top){//切换背景
        $(obj).css("background-position",left+"px "+(top-39)+"px");
    },
    trans1:function(obj,left,top){//切换背景
        $(obj).css("background-position",left+"px "+(top+39)+"px");
    },
    btnClick: function () {//移上按钮切换背景
        var fileNode=this.file;
        var resetBtn=this.pubTxtBtn.children("input[type='reset']");
        var submitBtn=this.pubTxtBtn.children("input[type='submit']");
        var trans=this.trans;
        var trans1=this.trans1;
        fileNode.mouseenter(function () {
            trans(this,0,0);
        }).mouseleave(function(){
            trans1(this,0,-39);
        });
        resetBtn.mouseenter(function(){
            trans(this,-95,0);
        }).mouseleave(function(){
            trans1(this,-95,-39);
        });
        submitBtn.mouseenter(function(){
            trans(this,0,-93);
        }).mouseleave(function(){
            trans1(this,0,-132);
        })
    },
    selectFun:function(){//下拉菜单效果
        var  ddNode=this.select.children("#list");
        var  aNodes=ddNode.children("a");
        var  dtNode=this.select.children("dt");
        var  inputNode=dtNode.children("#txt");
        dtNode.mouseenter(function(){
            ddNode.css("display","");
        }).mouseleave(function(){
            ddNode.css("display","none");
        });
        ddNode.mouseenter(function(){
            $(this).css("display","");
        }).mouseleave(function(){
            $(this).css("display","none");
        });
        aNodes.click(function(){
            var val=this.textContent;
            $(inputNode).val(val);
        })
    },
    checkBGfun1:function(){//复选框1背景切换
            json.checkBool1=!json.checkBool1;
            if(json.checkBool1){
                json.lableCheck1.css("background-position","-109px -159px");
            }else if(!json.checkBool1){
                json.lableCheck1.css("background-position","-95px -159px");
            }
    },
    checkBGfun2:function(){//复选框2背景切换
            json.checkBool2=!json.checkBool2;
            if(json.checkBool2){
                json.lableCheck2.css("background-position","-109px -159px");
            }else if(!json.checkBool2){
                json.lableCheck2.css("background-position","-95px -159px");
            }
        },
    boxRightFun: function () {//事件委托
        var signInput=$("#signInput");
        this.boxRight.click(function(e){
            var e=window.event||e;
            var target= e.srcElement|| e.target;
            if(target.nodeName.toLowerCase()=="label"){//复选框
               if($(target).siblings("input").attr("id")=="check1"){
                   json.checkBGfun1();
               }
               if($(target).siblings("input").attr("id")=="check2"){
                   json.checkBGfun2();
               }
            }
            if(target.id=="signInput"){//标签框
                signInput.keyup(function(e){
                    var e=window.event||e;
                    if(e.keyCode==13){
                        var signVal=this.value;
                        signVal=signVal.replace(/^(\s*)|(\s*)$/g,"");
                        signVal=signVal.replace(/</g,"&lt");
                        signVal=signVal.replace(/>/g,"&gt");
                        this.value="";
                        if(signVal.length>10){
                            alert("长度过长！");
                            return signInput.val("");
                        }
                        if(signVal==""){

                            return signInput.val("");
                        }
                        var dtNode=$(".sign_box dt");
                        var pNodes=dtNode.children("p");
                        for(var i=0;i<pNodes.length;i++){
                            if(signVal==pNodes.eq(i).text()){
                                alert("内容不能重复！");
                                return signInput.val("");
                            }
                        }

                        var pCreatNode=document.createElement("p");
                        var iCreatNode=document.createElement("i");
                        var inputCreatNode=document.createElement("input");
                        iCreatNode.className="X";
                        inputCreatNode.type="hidden";
                        var spanCreatNode=document.createElement("span");
                        var spanNodes=dtNode.children("span");//找到虚线框
                        spanCreatNode.innerHTML=signVal;//将内容插入到span标签
                        inputCreatNode.value=signVal;
                        pCreatNode.appendChild(spanCreatNode);
                        pCreatNode.appendChild(inputCreatNode);
                        pCreatNode.appendChild(iCreatNode);
                        if(spanNodes.length>0){
                            $(spanNodes).first().before($(pCreatNode)).remove();
                        }else{
                            dtNode.append($(pCreatNode));
                        }


                    }
                })
            }
            if(target.className=="X"){//点击X
                var dtNode=$(".sign_box dt");
                $(target).parent().remove();
                var spanNodes=dtNode.children("span");//找到虚线框
                if(spanNodes.length<6){//虚线框个数小于6
                    var spanCreatNode=document.createElement("span");
                    dtNode.append($(spanCreatNode));
                }

            }
            if(target.className.indexOf("commendTag")!=-1){//点击推荐标签
                var dtNode=$(".sign_box dt");
                var pCreatNode=document.createElement("p");
                var iCreatNode=document.createElement("i");
                var inputCreatNode=document.createElement("input");
                iCreatNode.className="X";
                inputCreatNode.type="hidden";
                var spanCreatNode=document.createElement("span");
                spanCreatNode.innerHTML=target.textContent;
                inputCreatNode.value=target.textContent;
                pCreatNode.appendChild(spanCreatNode);
                pCreatNode.appendChild(inputCreatNode);
                pCreatNode.appendChild(iCreatNode);
                var spanNodes=dtNode.children("span");//找到虚线框
                if(spanNodes.length>0){
                    $(spanNodes).first().before($(pCreatNode)).remove();
                }else{
                    dtNode.append($(pCreatNode));
                }

            }
        })
    },
    formFun: function () {//取消enter键默认提交表单事件
        this.form.keypress(function(e){
            var e=window.event||e;
            if(e.keyCode==13){
                return false;
            }
        })
    },
    init:function(){
        this.trans();
        this.btnClick();
        this.selectFun();
        this.boxRightFun();
        this.formFun();
    }
};
json.init();