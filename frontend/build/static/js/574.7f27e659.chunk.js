"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[574],{8574:function(e,n,t){t.r(n),t.d(n,{default:function(){return Z}});var i=t(9439),r=t(390),s=t(9763),a=t(773),c=t(5477),o=t(5793),u=t(5594),l=t(5262),f=t(4300),d=t(9092),g=t(8900),h=t(2559),x=(0,r.lazy)((function(){return t.e(974).then(t.bind(t,974))}));function Z(e){var n=e.itemsOnPage,t=(0,r.useState)(""),Z=(0,i.Z)(t,2),p=Z[0],m=Z[1],j=(0,r.useContext)(s.Z).getCollection,C=(0,r.useContext)(a.Z),v=C.collection,P=C.userGameIDs,b=(0,d.Z)(P.size,n),k=(0,i.Z)(b,4),z=k[0],w=k[1],y=k[2],E=k[3],O=(0,r.useCallback)((function(){var e=[0,n];if(1!==z){var t=(z-1)*n;e=e.map((function(e){return e+t}))}var i=v.slice(e[0],e[1]);m(i)}),[z,n,m,v]);(0,r.useEffect)((function(){!v&&P&&j()}),[v,P,j]),(0,r.useEffect)((function(){O()}),[z,O]),(0,r.useEffect)((function(){p.length||1===z||E(z-1)}),[p.length,E]);var D=(0,h.jsx)(c.Z,{sx:{color:"primary.text",padding:3},variant:"h5",children:"There are no games in your collection."});return p?(0,h.jsxs)(o.Z,{spacing:2,children:[(0,h.jsx)(x,{size:P.size}),(0,h.jsxs)(u.ZP,{container:!0,direction:"row",spacing:3,paddingLeft:".5rem",children:[p.length?p.map((function(e){return(0,h.jsx)(u.ZP,{item:!0,children:(0,h.jsx)(l.Z,{game:e,onProfilePage:!0})},e.objectid)})):D,w>1?(0,h.jsx)(u.ZP,{item:!0,xs:12,children:(0,h.jsx)(f.Z,{page:z,handleChange:y,pageCount:w})}):null]})]}):(0,h.jsx)(g.Z,{itemsOnPage:n})}}}]);
//# sourceMappingURL=574.7f27e659.chunk.js.map