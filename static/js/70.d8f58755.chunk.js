"use strict";(self.webpackChunkcounter_app_ts=self.webpackChunkcounter_app_ts||[]).push([[70],{2070:function(n,t,e){e.r(t),e.d(t,{default:function(){return U}});var i,r,a,o,d,l,s,c=e(168),u=e(1413),p=e(9439),m=e(4109),f=e(5157),h=e(1087),x=e(2791),g=e(2360),b=e(1680),w=e(6083),v=e(7348),Z=e(6733),y=e(3551),k=e(9434),j=e(9995),C=function(){var n=(0,y.TL)(),t=(0,k.v9)((function(n){return n.permissions}));return(0,u.Z)((0,u.Z)({dispatch:n},t),{},{getAllByCompanyId:function(t){n((0,j.G5)({submitData:{companyId:t}}))},getAllByUserId:function(t){n((0,j.aN)({submitData:{userId:t}}))},getCurrentPermission:function(t){n((0,j.WY)({submitData:{permissionId:t}}))},deleteById:function(t,e){n((0,j.w)({submitData:{id:t}}))},edit:function(t,e){n((0,j.Cz)({submitData:{id:t,data:e}}))},create:function(t,e){n((0,j.R$)({submitData:{id:t,data:e}}))}})},P=e(184),I=[{title:"\u041c\u043e\u0457",param:"own"},{title:"\u041f\u0440\u0430\u0446\u044e\u044e",param:"invited"},{title:"\u0417\u0430\u043f\u0440\u043e\u0448\u0435\u043d\u043d\u044f",param:"invites"},{title:"\u0423\u0441\u0456",param:"all"}],D=g.ZP.div(i||(i=(0,c.Z)(["\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: min-content 1fr;\n\n  ","\n"])),b.VU),B=g.ZP.div(r||(r=(0,c.Z)(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n\n  position: relative;\n\n  overflow: hidden;\n\n    //background-color: ",";\n\n  ","\n"])),(function(n){return n.theme.tableBackgroundColor}),b.SI),T=g.ZP.div(a||(a=(0,c.Z)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n\n  overflow: hidden;\n\n  ","\n\n  background-color: ",";\n"])),b.SI,(function(n){return n.theme.tableBackgroundColor})),S=g.ZP.div(o||(o=(0,c.Z)(["\n  position: sticky;\n  top: 0;\n  left: 0;\n  z-index: 1;\n\n  padding: 16px 12px;\n  width: 100%;\n  max-width: 250px;\n"]))),z=g.ZP.div(d||(d=(0,c.Z)(["\n  max-width: 100%;\n  overflow: auto;\n\n  &::-webkit-scrollbar {\n    width: 0;\n    height: 0;\n  }\n"]))),_=g.ZP.div(l||(l=(0,c.Z)(["\n  display: grid;\n  grid-template-columns: repeat(4, 150px);\n  grid-auto-rows: 32px;\n\n  max-width: 600px;\n\n  /* max-width: 300px; */\n\n  /* max-width: 550px; */\n  /* @media screen and (max-height: 480px) and (min-width: 480px) {\n    grid-template-columns: repeat(4, 1fr);\n    grid-auto-rows: 32px;\n    max-width: 100%;\n  }\n  @media screen and (min-width: 768px) {\n    grid-template-columns: repeat(4, 1fr);\n    grid-auto-rows: 44px;\n    max-width: 550px;\n  } */\n"]))),F=(0,g.ZP)(m.Z)(s||(s=(0,c.Z)(["\n  position: relative;\n\n  font-weight: 700;\n  font-size: 12px;\n  text-transform: uppercase;\n  text-align: center;\n\n  border-radius: 0;\n  border-style: none;\n  border-width: 0;\n\n  &::before {\n    display: block;\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 1px;\n    background-color: ",";\n  }\n\n  &::after {\n    display: block;\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 50%;\n    height: 1px;\n    width: 100%;\n    height: 3px;\n    width: 0;\n    transition: all ",";\n    transform: translate(-50%);\n    background-color: ",";\n  }\n\n  &.active {\n    &::after {\n      width: 80%;\n    }\n  }\n\n  &:hover,\n  &:focus {\n    outline-style: none;\n\n    &::after {\n      width: 100%;\n    }\n  }\n"])),(function(n){return n.theme.trBorderClr}),(function(n){return n.theme.globals.timingFnMui}),(function(n){return n.theme.accentColor.base})),U=function(){var n=(0,v.DF)().user,t=C().permissions,e=(0,h.lr)({companyType:I[0].param}),i=(0,p.Z)(e,2),r=i[0],a=i[1];return(0,x.useEffect)((function(){a({companyType:I[0].param})}),[]),(0,P.jsxs)(D,{children:[(0,P.jsxs)(B,{children:[(0,P.jsx)(S,{children:(0,P.jsx)(Z.Z,(0,u.Z)({},n))}),(0,P.jsx)(z,{children:(0,P.jsx)(_,{children:I.map((function(n){return(0,P.jsx)(F,{variant:"def",onClick:function(){return t=n.param,void a({companyType:t});var t},className:(t=n.param,r.get("companyType")===t?"active":""),children:n.title},n.param);var t}))})})]}),(0,P.jsx)(T,{children:(0,P.jsx)(f.ZP,{tableData:t,tableTitles:w.Tz,tableSearchParams:w.rB,isFilter:!1,isSearch:!0,checkboxes:!1})})]})}},1680:function(n,t,e){e.d(t,{SI:function(){return s},VU:function(){return l}});var i,r,a,o=e(168),d=e(2360),l=(0,d.iv)(i||(i=(0,o.Z)(["\n  grid-column: 1/13;\n  grid-row: 1/13;\n"]))),s=(0,d.iv)(r||(r=(0,o.Z)(["\n  width: 100%;\n  height: 100%;\n"])));(0,d.iv)(a||(a=(0,o.Z)(["\n  outline: 1px solid tomato;\n"])))}}]);
//# sourceMappingURL=70.d8f58755.chunk.js.map