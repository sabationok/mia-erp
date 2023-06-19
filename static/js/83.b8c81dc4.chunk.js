"use strict";(self.webpackChunkcounter_app_ts=self.webpackChunkcounter_app_ts||[]).push([[83],{8083:function(n,e,i){i.r(e),i.d(e,{default:function(){return Y}});var o,t,l,r,a,d,c,s,u,m=i(168),p=i(1413),f=i(9439),h=i(4109),v=i(4041),Z=i(1087),x=i(2791),g=i(2360),b=i(5366),y=i(7348),P=i(6733),w=i(8989),j=i(5100),C=i(4354),S=i(5114),k=i(7689),_=i(9085),z=i(6459),I=i(1134),R=i(6727),F=i(4695),M=i(4990),E=i(6681),N=i(184),B={name:"",fullName:"",email:"",phone:""},T=R.Ry().shape({name:R.Z_().required(),email:R.Z_().required(),fullName:R.Z_().required(),phone:R.Z_().required()}),A=(0,g.ZP)(S.Z)(o||(o=(0,m.Z)([""]))),O=g.ZP.div(t||(t=(0,m.Z)(["\n  display: flex;\n  flex-direction: column;\n\n  margin-bottom: 12px;\n  width: 100%;\n\n  padding: 8px 16px;\n\n  fill: ",";\n"])),(function(n){return n.theme.accentColor.base})),U=function(n){var e=Object.assign({},((0,z.Z)(n),n)),i=(0,w.Z)(),o=(0,I.cI)({defaultValues:B,reValidateMode:"onSubmit",resolver:(0,F.X)(T)}),t=o.register,l=o.formState.errors,r=o.handleSubmit;return(0,N.jsx)(A,(0,p.Z)((0,p.Z)({fillHeight:!0},e),{},{onSubmit:r((function(n){n&&console.log(n),i.createCompany({data:n,onSuccess:function(n){console.log("Registered company",n),_.Am.success("Company created: ".concat(null===n||void 0===n?void 0:n.name))},onError:function(){_.Am.error("Error")},onLoading:function(){}})})),children:(0,N.jsxs)(O,{children:[(0,N.jsx)(M.Z,{label:"\u041d\u0430\u0437\u0432\u0430",direction:"vertical",error:l.name,children:(0,N.jsx)(E.ZP,(0,p.Z)({},t("name")))}),(0,N.jsx)(M.Z,{label:"\u041f\u043e\u0432\u043d\u0430 \u043d\u0430\u0437\u0432\u0430",direction:"vertical",error:l.fullName,children:(0,N.jsx)(E.ZP,(0,p.Z)({},t("fullName")))}),(0,N.jsx)(M.Z,{label:"\u0415\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u0430 \u0430\u0434\u0440\u0435\u0441\u0430",direction:"vertical",error:l.email,children:(0,N.jsx)(E.ZP,(0,p.Z)((0,p.Z)({},t("email")),{},{type:"email"}))}),(0,N.jsx)(M.Z,{label:"\u0422\u0435\u043b\u0435\u0444\u043e\u043d",direction:"vertical",error:l.phone,children:(0,N.jsx)(E.ZP,(0,p.Z)({},t("phone")))}),(0,N.jsx)(M.Z,{label:"\u0422\u0438\u043f",direction:"vertical",error:l.type,children:(0,N.jsx)(E.ZP,(0,p.Z)({},t("type")))}),(0,N.jsx)(M.Z,{label:"\u041f\u043e\u0434\u0430\u0442\u043a\u043e\u0432\u0438\u0439 \u043d\u043e\u043c\u0435\u0440",direction:"vertical",error:l.taxCode,children:(0,N.jsx)(E.ZP,(0,p.Z)((0,p.Z)({},t("taxCode")),{},{type:"number"}))})]})}))},q=function(n,e){var i=(0,C.f9)(),o=(0,k.s0)();return(0,x.useCallback)((function(t){var l,r,a,d,c,s=t.selectedRow;return[{name:"selectPermission",title:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438",icon:"logIn",disabled:!(null!==(l=t.selectedRow)&&void 0!==l&&l._id),iconSize:"100%",type:"onlyIcon",onClick:function(){null!==s&&void 0!==s&&s._id&&(console.log("selPerm",s),n.logIn({data:{_id:s._id},onSuccess:function(n){var e;if(!n._id)return console.log("data",n);_.Am.success("Current company: ".concat(null===(e=n.company)||void 0===e?void 0:e.name)),o("/app/".concat(n._id))},onError:function(n){console.log(n)}}))}},{name:"editPermission",title:"\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438",icon:"edit",disabled:null===(r=t.selectedRow)||void 0===r||!r._id||!e||!["own"].includes(e),iconSize:"100%",type:"onlyIcon",onClick:function(){i.handleOpenModal({ModalChildren:S.Z,modalChildrenProps:{fillHeight:!0,title:"\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u043a\u043e\u043c\u043f\u0430\u043d\u0456\u044e"}})}},{name:"deletePermission",title:"\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438",icon:"delete",iconSize:"100%",disabled:null===(a=t.selectedRow)||void 0===a||!a._id||!e||!["own"].includes(e),type:"onlyIcon",onClick:function(){console.log("selPermission",s)}},{name:"leavePermission",title:"\u041f\u043e\u043a\u0438\u043d\u0443\u0442\u0438",icon:"logOut",iconSize:"100%",disabled:!t.selectedRow||!e||!["invited"].includes(e),type:"onlyIcon",onClick:function(){console.log("selPermission",s)}},{separator:!0},{name:"rejectPermission",title:"\u0412\u0456\u0434\u0445\u0438\u043b\u0438\u0442\u0438",icon:"clear",iconSize:"100%",type:"onlyIconFilled",disabled:null===(d=t.selectedRow)||void 0===d||!d._id||!e||!["invites"].includes(e),onClick:function(){console.log("selPermission",s)}},{name:"acceptPermission",title:"\u041f\u0440\u0438\u0439\u043d\u044f\u0442\u0438",icon:"done",iconSize:"100%",type:"onlyIconFilled",disabled:null===(c=t.selectedRow)||void 0===c||!c._id||!e||!["invites"].includes(e),onClick:function(){console.log("selPermission",s)}},{name:"createPermission",title:"\u0421\u0442\u0432\u043e\u0440\u0438\u0442\u0438",icon:"plus",iconSize:"100%",type:"onlyIconFilled",onClick:function(){i.handleOpenModal({ModalChildren:U,modalChildrenProps:{fillHeight:!0,title:"\u0421\u0442\u0432\u043e\u0440\u0438\u0442\u0438 \u043d\u043e\u0432\u0443 \u043a\u043e\u043c\u043f\u0430\u043d\u0456\u044e"}})}}]}),[e,i,o,n])},D=i(9680),V=[{title:"\u041c\u043e\u0457",param:"own"},{title:"\u041f\u0440\u0430\u0446\u044e\u044e",param:"invited"},{title:"\u0417\u0430\u043f\u0440\u043e\u0448\u0435\u043d\u043d\u044f",param:"invites"},{title:"\u0423\u0441\u0456",param:"all"}],H=function(n){n.path;var e=(0,y.DF)().user,i=(0,x.useState)(),o=(0,f.Z)(i,2),t=o[0],l=o[1],r=(0,Z.lr)({companyType:V[0].param})[1],a=(0,w.O)(),d=(0,w.Z)(),c=q(d,(null===t||void 0===t?void 0:t.param)||"own"),s=(0,x.useMemo)((function(){var n;return null===(n=a.permissions)||void 0===n?void 0:n.filter((function(n){var e,i;return"invited"===(null===t||void 0===t?void 0:t.param)?n.status===D.n.ACCEPTED:"invites"===(null===t||void 0===t?void 0:t.param)?n.status===D.n.PENDING:"all"===(null===t||void 0===t?void 0:t.param)?n:"own"===(null===t||void 0===t?void 0:t.param)?(null===(e=n.user)||void 0===e?void 0:e._id)===(null===(i=n.owner)||void 0===i?void 0:i._id):n}))}),[null===t||void 0===t?void 0:t.param,a.permissions]),u=(0,x.useMemo)((function(){return{tableData:s,tableTitles:j.Tz,tableSearchParams:j.rB,isFilter:!1,isSearch:!0,checkBoxes:!1,actionsCreator:c}}),[c,s]),m=(0,x.useCallback)((function(n){r({companyType:n.param}),l(n)}),[r]),h=(0,x.useCallback)((function(n){return(null===t||void 0===t?void 0:t.param)===n?"active":""}),[null===t||void 0===t?void 0:t.param]),g=(0,x.useMemo)((function(){return V.map((function(n){return(0,N.jsx)(W,{variant:"def",onClick:function(){return m(n)},className:h(n.param),children:n.title},n.param)}))}),[h,m]);return(0,x.useEffect)((function(){r({companyType:V[0].param}),l(V[0])}),[]),(0,x.useMemo)((function(){e._id&&d.getAllByUserId({data:{userId:e._id}})}),[e._id]),(0,N.jsxs)(L,{children:[(0,N.jsxs)(G,{children:[(0,N.jsx)(J,{children:(0,N.jsx)(P.Z,(0,p.Z)({},e))}),(0,N.jsx)(K,{children:(0,N.jsx)(Q,{children:g})})]}),(0,N.jsx)(X,{children:(0,N.jsx)(v.ZP,(0,p.Z)({},u))})]})},L=g.ZP.div(l||(l=(0,m.Z)(["\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: min-content 1fr;\n\n  ","\n"])),b.VU),G=g.ZP.div(r||(r=(0,m.Z)(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n\n  position: relative;\n\n  overflow: hidden;\n\n  //background-color: ",";\n\n  ","\n"])),(function(n){return n.theme.tableBackgroundColor}),b.SI),X=g.ZP.div(a||(a=(0,m.Z)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n\n  overflow: hidden;\n\n  ",";\n\n  background-color: ",";\n"])),b.SI,(function(n){return n.theme.tableBackgroundColor})),J=g.ZP.div(d||(d=(0,m.Z)(["\n  position: sticky;\n  top: 0;\n  left: 0;\n  z-index: 1;\n\n  padding: 16px 12px;\n  width: 100%;\n  max-width: 250px;\n"]))),K=g.ZP.div(c||(c=(0,m.Z)(["\n  max-width: 100%;\n  overflow: auto;\n\n  &::-webkit-scrollbar {\n    width: 0;\n    height: 0;\n  }\n"]))),Q=g.ZP.div(s||(s=(0,m.Z)(["\n  display: grid;\n  grid-template-columns: repeat(4, 150px);\n  grid-auto-rows: 32px;\n\n  max-width: 600px;\n"]))),W=(0,g.ZP)(h.Z)(u||(u=(0,m.Z)(["\n  position: relative;\n\n  font-weight: 700;\n  font-size: 12px;\n  text-transform: uppercase;\n  text-align: center;\n\n  border-radius: 0;\n  border-style: none;\n  border-width: 0;\n\n  &::before {\n    display: block;\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 1px;\n    background-color: ",";\n  }\n\n  &::after {\n    display: block;\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 50%;\n    //height: 1px;\n    //width: 100%;\n    height: 3px;\n    width: 0;\n    transition: all ",";\n    transform: translate(-50%);\n    background-color: ",";\n  }\n\n  &.active {\n    &::after {\n      width: 80%;\n    }\n  }\n\n  &:hover,\n  &:focus {\n    outline-style: none;\n\n    &::after {\n      width: 100%;\n    }\n  }\n"])),(function(n){return n.theme.trBorderClr}),(function(n){return n.theme.globals.timingFnMui}),(function(n){return n.theme.accentColor.base})),Y=(0,x.memo)(H)},5366:function(n,e,i){i.d(e,{SI:function(){return c},VU:function(){return d}});var o,t,l,r=i(168),a=i(2360),d=(0,a.iv)(o||(o=(0,r.Z)(["\n  grid-column: 1/13;\n  grid-row: 1/13;\n"]))),c=(0,a.iv)(t||(t=(0,r.Z)(["\n  width: 100%;\n  height: 100%;\n"])));(0,a.iv)(l||(l=(0,r.Z)(["\n  outline: 1px solid tomato;\n"])))},6733:function(n,e,i){var o,t,l,r,a,d=i(168),c=i(1413),s=i(4925),u=i(2360),m=i(184),p=["avatarURL","name","email","emailFontSize","nameFontSize","nameProps","emailProps","children"],f=u.ZP.div(o||(o=(0,d.Z)(["\n  display: flex;\n"]))),h=u.ZP.div(t||(t=(0,d.Z)(["\n  min-width: 64px;\n  max-width: 64px;\n  height: 64px;\n  overflow: hidden;\n  border-radius: 50%;\n"]))),v=u.ZP.div(l||(l=(0,d.Z)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 4px;\n  padding: 8px;\n\n  height: 100%;\n"]))),Z=u.ZP.div(r||(r=(0,d.Z)(["\n  font-size: ",";\n  font-weight: 600;\n"])),(function(n){var e=n.fontSize;return e||"12px"})),x=u.ZP.div(a||(a=(0,d.Z)(["\n  font-size: ",";\n  line-height: 16px;\n"])),(function(n){var e=n.fontSize;return e||"10px"}));e.Z=function(n){var e=n.avatarURL,i=void 0===e?"":e,o=n.name,t=void 0===o?"name":o,l=n.email,r=void 0===l?"email":l,a=n.emailFontSize,d=n.nameFontSize,u=n.nameProps,g=n.emailProps,b=n.children,y=(0,s.Z)(n,p);return(0,m.jsxs)(f,(0,c.Z)((0,c.Z)({},y),{},{children:[(0,m.jsx)(h,{children:(0,m.jsx)("img",{src:i,alt:"userImage",width:100,height:100})}),(0,m.jsxs)(v,{children:[(0,m.jsx)(Z,(0,c.Z)((0,c.Z)({fontSize:d},u),{},{children:t})),(0,m.jsx)(x,(0,c.Z)((0,c.Z)({fontSize:a},g),{},{children:r})),b]})]}))}}}]);
//# sourceMappingURL=83.b8c81dc4.chunk.js.map