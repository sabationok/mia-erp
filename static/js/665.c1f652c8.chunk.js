"use strict";(self.webpackChunkmia_erp=self.webpackChunkmia_erp||[]).push([[665],{2931:function(e,n,t){t.r(n),t.d(n,{FormWarehousingSettings:function(){return k},createWarehousingSettingsFormData:function(){return C},createWarehousingSettingsReqData:function(){return j}});var i,o=t(168),a=t(4925),u=t(1413),r=t(9656),l=t(1819),s=t(2989),d=t(3423),c=t(7348),f=t(8095),v=t(2360),h=t(6522),p=t(6492),m=t(4681),g=t(5761),w=t(2791),b=t(7824),x=t(1383),Z=t(3329),S=["defaultState","onSubmit","onClose"];function C(e){if(C)return{warehouse:null===e||void 0===e?void 0:e.warehouse}}function j(e){if(e&&null!==e&&void 0!==e&&e.warehouse)return{warehouse:(0,g.rE)(null===e||void 0===e?void 0:e.warehouse)}}var k=function(e){var n,t=e.defaultState,i=(e.onSubmit,e.onClose),o=(0,a.Z)(e,S),v=(0,l.xc)()[b.d.permissions],g=null===(n=(0,c.O5)())||void 0===n?void 0:n.permission,k=(0,c.eO)().warehouses.map((function(e){return(0,u.Z)((0,u.Z)({},e),{},{value:e._id})})),y=(0,w.useMemo)((function(){return t||(null===g||void 0===g?void 0:g.company)}),[null===g||void 0===g?void 0:g.company,t]),D=(0,s.hN)({defaultValues:C(y)}),R=D.setValue,W=D.formValues,P=D.handleSubmit,V=D.registerSelect;return(0,Z.jsx)(r.Z,(0,u.Z)((0,u.Z)({fillHeight:!0,title:o.title||(0,h.t)("Warehousing settings"),onClose:i},o),{},{onSubmit:P((function(e){var n=j(e);n&&v.updateCurrentCompany({data:{_id:null===y||void 0===y?void 0:y._id,data:n},onSuccess:function(){x.kl.success("Updated"),i&&i()}})})),children:(0,Z.jsxs)(_,{flex:1,overflow:"auto",padding:"0 8px",children:[(0,Z.jsx)(d.Z,(0,u.Z)({},V("warehouse",{options:k,label:(0,h.t)("Default warehouse"),placeholder:(0,h.t)("Select default warehouse"),getLabel:function(e){return"".concat(e.label," | ").concat(null===e||void 0===e?void 0:e.code)}}))),(0,Z.jsxs)(f.ZP,{fxDirection:"row",justifyContent:"space-between",alignItems:"center",padding:"0 0 0 8px",children:[(0,Z.jsx)(p.x,{children:"Reservation available"}),(0,Z.jsx)(m.Z,{size:"32px",checked:null===W||void 0===W?void 0:W.isReservationAvailable,onChange:function(e){R("isReservationAvailable",e.checked)}})]})]})}))},_=(0,v.ZP)(f.ZP)(i||(i=(0,o.Z)([""])));n.default=k}}]);
//# sourceMappingURL=665.c1f652c8.chunk.js.map