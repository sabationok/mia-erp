"use strict";(self.webpackChunkmia_erp=self.webpackChunkmia_erp||[]).push([[243],{1243:function(e,l,i){i.r(l);var n,o,d=i(168),t=i(1413),a=i(9439),r=i(6459),u=i(9656),c=i(8095),s=i(2791),v=i(8589),h=i(6981),p=i(2360),f=i(7348),b=i(4990),Z=i(6681),m=i(6522),x=i(8553),w=i(9964),g=i(401),j=i(2246),P=i(5761),S=i(1134),k=i(3329),I=[{name:"stock",label:(0,m.t)("Available"),placeholder:(0,m.t)("Available")},{name:"reserved",label:(0,m.t)("Reserved"),placeholder:(0,m.t)("Reserved")}],C=function(e){return e.Yes="Yes",e.No="No",e}(C||{}),y=(0,x.H1)(C),A=(0,p.ZP)(u.Z)(n||(n=(0,d.Z)(["\n  @media screen and (min-width: 480px) {\n    width: fit-content;\n    max-width: 960px;\n  }\n"]))),E=p.ZP.div(o||(o=(0,d.Z)(["\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n\n  width: 100%;\n"])));l.default=function(e){var l=Object.assign({},((0,r.Z)(e),e)),i=(0,f.i7)().currentOffer,n=(0,S.cI)({}),o=(0,s.useMemo)((function(){return(null===l||void 0===l?void 0:l.product)||i}),[i,null===l||void 0===l?void 0:l.product]),d=(0,s.useState)([]),u=(0,a.Z)(d,2),p=u[0],x=u[1],C=(0,s.useState)(),R=(0,a.Z)(C,2),q=R[0],_=R[1],D=(0,s.useState)(),F=(0,a.Z)(D,2),H=F[0],M=F[1];(0,s.useEffect)((function(){console.log("FormCreateProductInventory selectedPrice",q)}),[q]),(0,s.useEffect)((function(){H&&(0,j.Eh)({data:{variation:(0,P.rE)(H)},onSuccess:x},j.oh.prices.getAll,j.oh)}),[H]);var N=(0,s.useMemo)((function(){var e;return null===o||void 0===o||null===(e=o.variations)||void 0===e?void 0:e.map((function(e){return(0,g.m$)(e)}))}),[null===o||void 0===o?void 0:o.variations]),O=(0,s.useCallback)((function(e){var l=null!==e&&void 0!==e&&e.rowId?{_id:e.rowId}:null;l&&(M(l),(0,j.Eh)({data:{variation:l},onSuccess:x},j.oh.prices.getAll,j.oh))}),[]),Y=(0,s.useCallback)((function(e){var l=null!==e&&void 0!==e&&e.rowId?{_id:e.rowId}:null;l&&_(l)}),[]);return(0,k.jsx)(A,(0,t.Z)((0,t.Z)({fillHeight:!0,title:"Add new product inventory",width:"960px"},l),{},{onSubmit:n.handleSubmit((function(e){console.log("IProductInventoryFormData",e)})),children:(0,k.jsxs)(c.ZP,{padding:"8px",overflow:"auto",gap:8,children:[(0,k.jsx)(b.Z,{label:(0,m.t)("Select variation"),children:(0,k.jsx)(c.ZP,{style:{height:300},overflow:"hidden",children:(0,k.jsx)(v.ZP,{tableData:N,hasSearch:!1,onRowClick:O})})}),(0,k.jsx)(b.Z,{label:(0,m.t)("Select price"),children:(0,k.jsx)(c.ZP,{style:{height:300},overflow:"hidden",children:(0,k.jsx)(v.ZP,{tableTitles:h.po,tableData:p,hasSearch:!1,onRowClick:Y})})}),(0,k.jsx)(E,{children:I.map((function(e){return(0,k.jsx)(b.Z,{label:null===e||void 0===e?void 0:e.label,disabled:null===e||void 0===e?void 0:e.disabled,required:null===e||void 0===e?void 0:e.required,children:(0,k.jsx)(Z.ZP,{name:null===e||void 0===e?void 0:e.name,align:"right",disabled:null===e||void 0===e?void 0:e.disabled,required:null===e||void 0===e?void 0:e.required,placeholder:null===e||void 0===e?void 0:e.placeholder})},null===e||void 0===e?void 0:e.name)}))}),(0,k.jsx)(b.Z,{label:(0,m.t)("Reservation anable"),children:(0,k.jsx)(w.Z,{options:y})})]})}))}}}]);
//# sourceMappingURL=243.697ee590.chunk.js.map