"use strict";(self["webpackChunkvue_template"]=self["webpackChunkvue_template"]||[]).push([[305],{305:function(e,t,n){n.r(t),n.d(t,{default:function(){return _}});var s=n(3396),u=n(9242),a=n(7139);const l=(0,s._)("h2",null,"線上考試",-1),r=["id","name","value","onUpdate:modelValue"],o=["for"],i=(0,s._)("button",{type:"submit"},"提交考卷",-1),m=(0,s._)("hr",null,null,-1),w=(0,s._)("h3",null,"考試結果",-1),c=(0,s._)("br",null,null,-1),h=(0,s._)("br",null,null,-1);function p(e,t,n,p,x,b){return(0,s.wg)(),(0,s.iD)(s.HY,null,[l,(0,s._)("form",{onSubmit:t[0]||(t[0]=(0,u.iM)(((...e)=>b.submit&&b.submit(...e)),["prevent"]))},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.teacherUseExPaper,((t,n,l)=>((0,s.wg)(),(0,s.iD)("section",{key:`${l}${n}`},[(0,s.Uk)((0,a.zw)(n)+" ",1),(0,s._)("small",null," 每題 "+(0,a.zw)(e.questionsList[n].score)+" 分, 共 "+(0,a.zw)(t.length)+" 題 ",1),(0,s._)("ol",null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(t,((e,t)=>((0,s.wg)(),(0,s.iD)("li",{key:`question${e.題目}${t}`},[(0,s.Uk)(" 題目： "+(0,a.zw)(e.題目)+" ",1),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.選項,((t,n,l)=>((0,s.wg)(),(0,s.iD)("ul",{key:`${e.題目}${t}${n}`,class:"list-unstyled ms-2"},[(0,s._)("li",null,[(0,s.wy)((0,s._)("input",{type:"radio",id:`${e.題目}${t}`,name:`${e.題目}`,value:l,"onUpdate:modelValue":t=>x.examForm[e.題目]=t},null,8,r),[[u.G2,x.examForm[e.題目]]]),(0,s._)("label",{for:`${e.題目}${t}`},(0,a.zw)(t),9,o)])])))),128))])))),128))])])))),128)),i],32),m,w,(0,s.Uk)(" 分數："+(0,a.zw)(x.examStatus.score)+" ",1),c,(0,s.Uk)(" 答對："+(0,a.zw)(x.examStatus.bingo)+" 題",1),h,(0,s.Uk)(" 答錯："+(0,a.zw)(x.examStatus.wrongAnswer)+" 題 ",1)],64)}var x=n(65),b={computed:{...(0,x.rn)(["teacherUseExPaper","questionsList"])},data(){return{examForm:{},examStatus:{score:0,bingo:0,wrongAnswer:0}}},methods:{submit(){this.examStatus.score=0,this.examStatus.bingo=0,this.examStatus.wrongAnswer=0;const e=[];Object.keys(this.teacherUseExPaper).forEach((t=>{this.teacherUseExPaper[t].forEach((t=>{e.push(t)}))})),e.forEach((e=>{const t=e.題目;this.examForm[t]===e.答案?this.examStatus.bingo++:this.examStatus.wrongAnswer++}))}},mounted(){}},g=n(89);const d=(0,g.Z)(b,[["render",p]]);var _=d}}]);
//# sourceMappingURL=305.e8a54d75.js.map