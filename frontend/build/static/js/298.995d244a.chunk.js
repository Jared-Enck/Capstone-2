"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[298],{3298:function(e,n,t){t.r(n),t.d(n,{default:function(){return Z}});var i=t(9439),r=t(390),s=t(9763),a=t(773),c=t(5477),u=t(5793),o=t(5594),l=t(5262),f=t(4300),d=t(9092),g=t(6113),h=t(2559),x=(0,r.lazy)((function(){return t.e(178).then(t.bind(t,3178))}));function Z(e){var n=e.itemsOnPage,t=(0,r.useState)(""),Z=(0,i.Z)(t,2),p=Z[0],m=Z[1],j=(0,r.useContext)(s.Z).getCollection,C=(0,r.useContext)(a.Z),v=C.collection,P=C.userGameIDs,k=(0,d.Z)(P.size,n),b=(0,i.Z)(k,4),z=b[0],w=b[1],y=b[2],E=b[3],O=(0,r.useCallback)((function(){var e=[0,n];if(1!==z){var t=(z-1)*n;e=e.map((function(e){return e+t}))}var i=v.slice(e[0],e[1]);m(i)}),[z,n,m,v]);(0,r.useEffect)((function(){!v&&P&&j()}),[v,j]),(0,r.useEffect)((function(){O()}),[z,O]),(0,r.useEffect)((function(){p.length||1===z||E(z-1)}),[p.length,E]);var D=(0,h.jsx)(c.Z,{sx:{color:"primary.text",padding:3},variant:"h5",children:"There are no games in your collection."});return p?(0,h.jsxs)(u.Z,{spacing:2,children:[(0,h.jsx)(x,{size:P.size}),(0,h.jsxs)(o.ZP,{container:!0,direction:"row",spacing:3,paddingLeft:".5rem",children:[p.length?p.map((function(e){return(0,h.jsx)(o.ZP,{item:!0,children:(0,h.jsx)(l.Z,{game:e,onProfilePage:!0})},e.id)})):D,w>1?(0,h.jsx)(o.ZP,{item:!0,xs:12,children:(0,h.jsx)(f.Z,{page:z,handleChange:y,pageCount:w})}):null]})]}):(0,h.jsx)(g.Z,{itemsOnPage:n})}}}]);
//# sourceMappingURL=298.995d244a.chunk.js.map