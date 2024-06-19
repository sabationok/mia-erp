"use strict";(self.webpackChunkmia_erp=self.webpackChunkmia_erp||[]).push([[152,495],{8495:function(t,e,n){n.d(e,{SI:function(){return d},VU:function(){return l}});var a,o,i,r=n(168),u=n(3350),l=(0,u.iv)(a||(a=(0,r.Z)(["\n  grid-column: 1/13;\n  grid-row: 1/13;\n"]))),d=(0,u.iv)(o||(o=(0,r.Z)(["\n  width: 100%;\n  height: 100%;\n"])));(0,u.iv)(i||(i=(0,r.Z)(["\n  outline: 1px solid tomato;\n"])))},2152:function(t,e,n){n.r(e),n.d(e,{default:function(){return B}});var a,o=n(168),i=n(1413),r=n(9439),u=n(8589),l=n(8495),d=n(3350),c=n(2791),s=n(6931),v=n(7348),h=n(4942),m=n(3665),p=n(1819),f=n(3185),g=n(7689),w=n(1383),b=n(3306),D=n(387),x=n(763),P=n.n(x),y=function(t,e){var n={};return Object.keys(t).forEach((function(e){var a=t[e];if(a)if(b.sr.isStr(a))n=(0,i.Z)((0,i.Z)({},n),{},(0,h.Z)({},e,a));else{if(!b.sr.isEmptyObj(a))return b.sr.hasUUID(a)?void(n=(0,i.Z)((0,i.Z)({},n),{},(0,h.Z)({},e,(0,D.rE)(a)))):(console.log("!checks.isEmptyObj(v)",e,!b.sr.isEmptyObj(a)),n=(0,i.Z)((0,i.Z)({},n),{},(0,h.Z)({},e,a)),e);if(!a)return e;n=(0,i.Z)((0,i.Z)({},n),{},(0,h.Z)({},e,a))}})),e?{_id:e,data:n,params:{setAsDefault:null===t||void 0===t?void 0:t.asDefault}}:{data:n,params:{setAsDefault:null===t||void 0===t?void 0:t.asDefault}}},Z=[function(t){return{icon:"refresh",onClick:function(){t.service.getAll({data:{refresh:!0}}).then()}}},function(){return{separator:!0}},function(t){var e,n=t.ctx,a=t.navigate;return{icon:"openInNew",disabled:!(null!==(e=n.selectedRow)&&void 0!==e&&e._id),onClick:function(){var t,e;(null===(t=n.selectedRow)||void 0===t?void 0:t._id)&&a(null===(e=n.selectedRow)||void 0===e?void 0:e._id)}}},function(t){var e=t.service,n=t.modalService,a=t.ctx;return{icon:"edit",onClick:function(){var t,o=n.openModal({Modal:f.n.FormCreateWarehouse,props:{update:null===(t=a.selectedRow)||void 0===t?void 0:t._id,title:"\u041e\u043d\u043e\u0432\u0438\u0442\u0438 \u0434\u0430\u043d\u0456 \u0441\u043a\u043b\u0430\u0434\u0443",onSubmit:function(t,n){var i;e.create({data:y(P().omit(t,["manager"]),null===a||void 0===a||null===(i=a.selectedRow)||void 0===i?void 0:i._id),onLoading:a.onRefresh,onSuccess:function(){null!==n&&void 0!==n&&n.close&&null!==o&&void 0!==o&&o.onClose&&(null===o||void 0===o||o.onClose())}})}}})}}},function(){return{icon:"delete"}},function(){return{separator:!0}},function(t){var e=t.service,n=t.modalService,a=t.ctx;return{icon:"plus",type:"onlyIconFilled",onClick:function(){var t=n.openModal({Modal:f.n.FormCreateWarehouse,props:{title:"\u0421\u0442\u0432\u043e\u0440\u0438\u0442\u0438 \u0441\u043a\u043b\u0430\u0434",onSubmit:function(n,o){var i;e.create({data:y(P().omit(n,["manager"]),null===a||void 0===a||null===(i=a.selectedRow)||void 0===i?void 0:i._id),onLoading:a.onRefresh,onSuccess:function(){null!==n&&void 0!==n&&n.asDefault&&w.kl.info("Warehouse wil be set as default"),null!==o&&void 0!==o&&o.close&&null!==t&&void 0!==t&&t.onClose&&(null===t||void 0===t||t.onClose())}})}}})}}}],S=function(){var t=(0,m.f9)(),e=(0,p.xc)()[p.EJ.warehouses],n=(0,g.s0)();return function(a){return Z.map((function(o){return o({modalService:t,service:e,ctx:a,navigate:n})}))}},k=n(758),A=n(3329),C=d.ZP.div(a||(a=(0,o.Z)(["\n  ","\n"])),l.VU),B=function(t){var e=(0,g.s0)(),n=(0,p.xc)()[p.EJ.warehouses].getAll,a=(0,v.eO)(),o=(0,c.useState)(!1),l=(0,r.Z)(o,2),d=l[0],h=l[1],m=(0,c.useState)(),f=(0,r.Z)(m,2),w=f[0],b=f[1],D=(0,c.useState)(),x=(0,r.Z)(D,2),P=x[0],y=x[1],Z=S(),B=(0,c.useMemo)((function(){return{tableData:a.warehouses,tableTitles:k.A7,hasFilter:!1,hasSearch:!0,showFooter:!1,actionsCreator:Z,onRowDoubleClick:function(t){(null===t||void 0===t?void 0:t.rowId)&&e(null===t||void 0===t?void 0:t.rowId)},onFilterSubmit:function(t){y(t),n({data:{refresh:!0,query:{filterParams:t,sortParams:w}},onLoading:h}).then()},onTableSortChange:function(t,e){b({sortPath:t.dataPath,sortOrder:e}),n({data:{refresh:!0,query:{sortParams:{sortPath:t.dataPath,sortOrder:e},filterParams:P}},onLoading:h}).then()}}}),[Z,P,n,e,w,a.warehouses]);return(0,c.useEffect)((function(){w||P||w||P||0===a.warehouses.length&&n({data:{refresh:!0},onLoading:h,onSuccess:function(t){console.log("PageWarehouses onSuccess getAll")}})}),[P,n,w,a.warehouses.length]),(0,A.jsx)(s.default,{path:t.path,children:(0,A.jsx)(C,{children:(0,A.jsx)(u.ZP,(0,i.Z)((0,i.Z)({tableTitles:k.A7},B),{},{isLoading:d}))})})}},758:function(t,e,n){n.d(e,{A7:function(){return i},QX:function(){return r},fK:function(){return l}});var a=n(6522),o=n(3306),i=[{top:{name:(0,a.t)("label"),getData:function(t){return t.label}},bottom:{name:(0,a.t)("code"),getData:function(t){return t.code}},width:"220px",action:"valueByPath"},{top:{name:(0,a.t)("type"),getData:function(t){return null===t||void 0===t?void 0:t.type}},width:"125px",action:"valueByPath"},{top:{name:(0,a.t)("email"),path:"email"},bottom:{name:(0,a.t)("phone"),path:"phone"},width:"180px",action:"contacts"},{top:{name:(0,a.t)("Address"),getData:function(t){return t.address||"\u043d\u0435 \u0432\u0438\u0437\u043d\u0430\u0447\u0435\u043d\u043e"}},bottom:{name:"".concat((0,a.t)("longitude"),"/").concat((0,a.t)("latitude")),getData:function(t){var e,n;return"".concat(((null===(e=t.location)||void 0===e?void 0:e.longitude)||"---")+", "+((null===(n=t.location)||void 0===n?void 0:n.latitude)||"---"))}},width:"175px",action:"valueByPath"},{top:{name:(0,a.t)("Manager"),getData:function(t){var e,n;return"".concat((null===(e=t.manager)||void 0===e||null===(n=e.user)||void 0===n?void 0:n.name)||"---")}},bottom:{name:(0,a.t)("email"),getData:function(t){var e,n;return"".concat((null===(e=t.manager)||void 0===e||null===(n=e.user)||void 0===n?void 0:n.email)||"---")}},width:"150px",action:"valueByPath"},{top:{name:(0,a.t)("updated"),align:"center",path:"updatedAt"},bottom:{name:(0,a.t)("created"),align:"center",path:"createdAt"},width:"150px",action:"dateSimple"}],r=[{top:{name:(0,a.t)("variationLabel"),getData:function(t){var e;return null===(e=t.variation)||void 0===e?void 0:e.label}},getImgPreview:function(t){var e,n,a;return null!==(e=t.offer)&&void 0!==e&&e.images?null===(n=t.offer)||void 0===n||null===(a=n.images[0])||void 0===a?void 0:a.img_preview:""},width:"270px",action:"doubleDataWithAvatar"},{top:{name:(0,a.t)("sku"),getData:function(t){var e;return null===(e=t.variation)||void 0===e?void 0:e.sku}},bottom:{name:(0,a.t)("barCode"),getData:function(t){var e;return null===(e=t.variation)||void 0===e?void 0:e.barCode}},width:"200px",action:"valueByPath"},{top:{name:(0,a.t)("type"),path:"type"},bottom:{name:(0,a.t)("status"),path:"status"},width:"120px",action:"status"},{top:{name:"\u041d\u0430\u044f\u0432\u043d\u0456\u0441\u0442\u044c",align:"end",getData:function(t){return t.stock||0}},bottom:{name:"\u0420\u0435\u0437\u0435\u0440\u0432",align:"end",getData:function(t){return t.reserved||0}},width:"150px",action:"valueByPath"},{top:{name:"\u041e\u0447\u0456\u043a\u0443\u0454\u0442\u044c\u0441\u044f",align:"end",getData:function(t){return(null===t||void 0===t?void 0:t.awaiting)||0}},bottom:{name:"\u0412\u0442\u0440\u0430\u0447\u0435\u043d\u043e",align:"end",getData:function(t){return(null===t||void 0===t?void 0:t.lost)||0}},width:"150px",action:"valueByPath"},{top:{name:(0,a.t)("warehouse"),getData:function(t){var e;return null===(e=t.warehouse)||void 0===e?void 0:e.label}},bottom:{name:(0,a.t)("code"),getData:function(t){var e;return null===(e=t.warehouse)||void 0===e?void 0:e.code}},width:"170px",action:"valueByPath"},{top:{name:"\u041e\u043f\u0438\u0441",path:"description"},width:"190px",action:"valueByPath"},{top:{name:"\u0410\u0432\u0442\u043e\u0440",path:"author.name"},bottom:{name:"\u0415\u043c\u0435\u0439\u043b",path:"author.email"},width:"190px",action:"valueByPath"},{top:{name:"\u0421\u0442\u0432\u043e\u0440\u0435\u043d\u043e",align:"center",path:"createdAt"},bottom:{name:"\u041e\u043d\u043e\u0432\u043b\u0435\u043d\u043e",align:"center",path:"updatedAt"},width:"150px",action:"dateSimple"}],u=[{top:{name:(0,a.t)("Price OUT"),align:"end",getData:function(t){var e;return(0,o.__)(Number((null===t||void 0===t||null===(e=t.price)||void 0===e?void 0:e.in)||0))}},bottom:{name:(0,a.t)("Price IN"),align:"end",getData:function(t){var e;return(0,o.__)(Number((null===t||void 0===t||null===(e=t.price)||void 0===e?void 0:e.out)||0))}},width:"170px",action:"valueByPath"},{top:{name:(0,a.t)("comment"),align:"start",path:"description"},width:"150px",action:"valueByPath"}],l=[{top:{name:(0,a.t)("batch")},width:"150px",action:"valueByPath"},{top:{name:(0,a.t)("warehouse"),getData:function(t){var e;return null===(e=t.warehouse)||void 0===e?void 0:e.label}},bottom:{name:(0,a.t)("code"),getData:function(t){var e;return null===(e=t.warehouse)||void 0===e?void 0:e.code}},width:"170px",action:"valueByPath"},{top:{name:(0,a.t)("Stock"),align:"end",getData:function(t){return t.stock||0}},bottom:{name:(0,a.t)("Reserved"),align:"end",getData:function(t){return t.reserved||0}},width:"150px",action:"valueByPath"},{top:{name:(0,a.t)("Awaiting"),align:"end",getData:function(t){return(null===t||void 0===t?void 0:t.awaiting)||0}},bottom:{name:(0,a.t)("Lost"),align:"end",getData:function(t){return(null===t||void 0===t?void 0:t.lost)||0}},width:"150px",action:"valueByPath"},{top:{name:(0,a.t)("updated"),align:"center",path:"updatedAt"},bottom:{name:(0,a.t)("created"),align:"center",path:"createdAt"},width:"150px",action:"dateSimple"}].concat(u)}}]);
//# sourceMappingURL=152.d64a2d7d.chunk.js.map