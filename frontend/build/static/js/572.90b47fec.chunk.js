"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[572],{1572:function(e,n,r){r.r(n),r.d(n,{default:function(){return Ge}});var t=r(390),i=r(5545),a=r(773),s=r(5793),o=r(5477),l=r(9763),c=r(5880),d=r(6128),u=r(5995),m=r(9656),h=r(2559),x=(0,m.Z)(c.Z)((function(e){var n=e.alphascale,r=e.theme;return{margin:0,backgroundColor:(0,d.Fq)("".concat(r.palette.primary.main),n),borderRadius:r.shape.borderRadius,alignSelf:"center"}}));function p(e){var n=e.alphascale,r=void 0===n?1:n,i=e.shadow,a=void 0===i?"none":i,c=e.header,d=void 0===c?null:c,m=e.headerData,p=e.divider,j=e.blur,g=e.children,Z=(0,t.useContext)(l.Z).isSmallScreen;return(0,h.jsxs)(x,{maxWidth:"lg",alphascale:r,sx:{padding:Z?".5rem":"1.5rem",boxShadow:a,backdropFilter:j?"blur(7px)":"none"},children:[d?(0,h.jsxs)(s.Z,{direction:"row",spacing:2,children:[(0,h.jsx)(o.Z,{variant:Z?"h5":"h4",sx:{color:"secondary.main"},gutterBottom:!0,children:d}),m?(0,h.jsx)(o.Z,{variant:"h6",sx:{color:"primary.muted"},children:"(".concat(m,")")}):null]}):null,p?(0,h.jsx)(u.Z,{sx:{bgcolor:"primary.dark"}}):null,g]})}function j(){return(0,h.jsx)(s.Z,{children:(0,h.jsx)(p,{children:(0,h.jsx)(o.Z,{variant:"h5",sx:{color:"primary.text",textAlign:"center"},children:"404 Sorry, can't find what you're looking for."})})})}var g=r(6805),Z=r(5211),f=r(8913),v=r(2226);function y(){var e=(0,t.useContext)(a.Z),n=e.currentUser,r=e.navigate,i=(0,t.useContext)(l.Z),c=i.isSmallScreen,d=i.hotGames,u=i.getHotCache,m=i.setGame;(0,t.useEffect)((function(){!d.length&&n&&u()}),[d.length,n,u]);var x={width:"5rem",height:"5rem",fontSize:"1.8rem"},j=function(){return(0,h.jsx)(p,{shadow:2,alphascale:.4,blur:!0,children:(0,h.jsxs)(g.Z,{sx:{color:"primary.text",fontSize:"1.2rem",width:"95%",margin:"auto"},children:[(0,h.jsx)(o.Z,{variant:c?"h6":"h4",gutterBottom:!0,children:"Welcome to MyGameNights!"}),(0,h.jsx)("p",{children:"You can browse an extensive library of games by searching for board game titles."}),(0,h.jsx)("p",{children:"Create a profile and use MyGameNights to compile a digital library of all your games."}),(0,h.jsx)("p",{children:"Your personal collection is now complete with videos and resources to jog your memory when you\u2019ve forgotten the rules or to help you decide what to play."}),(0,h.jsx)("p",{children:"Click around. Have fun. Build your collection. Game night has never been better."})]})})},y=function(e){m(""),r("/games/".concat(e))},w=function(){return(0,h.jsx)(p,{shadow:2,alphascale:0,blur:!0,header:"Popular Games",divider:!0,children:(0,h.jsx)(Z.Z,{children:d.length?d.map((function(e,n){return(0,h.jsx)(f.Z,{item:e,idx:n,clickFunc:y,isLastItem:e===d.length-1,dimensions:c?{}:x,isSmallScreen:c,hotListItem:!0},e.id)})):(0,h.jsx)(v.Z,{})})})};return(0,h.jsx)(s.Z,{children:n?(0,h.jsx)(w,{}):(0,h.jsx)(j,{})})}var w=r(4165),b=r(5861),S=r(9439),C=r(5400),k=r(7554),P=r(2463),U=r(5771),z=r(6649),A=r(5173),F=r(3692);function R(e){var n=e.showPassword,r=e.handleShowPassword;return(0,h.jsx)(U.Z,{position:"end",children:(0,h.jsx)(z.Z,{"aria-label":"toggle password visibility",onClick:r,onMouseDown:function(e){e.preventDefault()},edge:"end",sx:{color:"primary.muted"},children:n?(0,h.jsx)(A.Z,{}):(0,h.jsx)(F.Z,{})})})}var L=r(4723);function W(e){var n=e.header,r=e.initialState,i=e.inputs,l=e.submitFunc,c=(0,t.useState)(!1),d=(0,S.Z)(c,2),u=d[0],m=d[1],x=(0,t.useContext)(a.Z).navigate,j=(0,t.useState)(!1),Z=(0,S.Z)(j,2),f=Z[0],y=Z[1],U="Login"===n,z=u?"text":"password",A=(0,L.Z)(r),F=(0,S.Z)(A,4),W=F[0],D=F[1],N=F[2],I=F[3],M=function(){return m((function(e){return!e}))},O=function(){var e=(0,b.Z)((0,w.Z)().mark((function e(n){var r;return(0,w.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),y(!0),e.next=4,l(W);case 4:(r=e.sent)?(I(r.err),y(!1)):(y(!1),x("/"));case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,h.jsx)(s.Z,{sx:{paddingTop:10},children:(0,h.jsx)(p,{alphascale:.4,children:(0,h.jsxs)(P.tP,{component:"form",onSubmit:O,children:[(0,h.jsx)(o.Z,{variant:"h5",sx:{color:"primary.text"},children:n}),(0,h.jsx)(g.Z,{sx:{height:"1.5rem",maxWidth:"22rem",marginBottom:".4rem"},children:"string"===typeof N[0]?(0,h.jsx)(P.gk,{children:N[0]}):null}),(0,h.jsxs)(s.Z,{spacing:3,children:[i.map((function(e,n){var r=e[0].toUpperCase().concat(e.slice(1)),t="password"===e;return(0,h.jsx)(k.Z,{children:(0,h.jsx)(P.Xn,{variant:"outlined",label:r,type:t?z:"text",name:e,value:W[e],onChange:D,autoFocus:0===n,autoComplete:t?"current-password":"",InputProps:{endAdornment:t?(0,h.jsx)(R,{showPassword:u,handleShowPassword:M}):null},helperText:N.length&&!U?(0,h.jsx)(P.gk,{children:N[0][e]}):null,required:!0})},e)})),U?(0,h.jsxs)(s.Z,{sx:{height:"3.5rem",justifyContent:"center",color:"primary.text",margin:"auto"},children:[(0,h.jsx)(o.Z,{sx:{textAlign:"center"},children:"Don't have an account yet?"}),(0,h.jsxs)(s.Z,{spacing:.6,direction:"row",justifyContent:"center",children:[(0,h.jsx)(o.Z,{children:"Sign up"}),(0,h.jsx)(C.rU,{to:"/signup",children:(0,h.jsx)(o.Z,{sx:{color:"secondary.main"},children:"here."})})]})]}):null,(0,h.jsxs)(P.KM,{variant:"contained",type:"submit",className:"main-button",children:["Submit",f?(0,h.jsx)(g.Z,{sx:{position:"absolute",right:20},children:(0,h.jsx)(v.Z,{size:"1.3rem",color:"primary.dark"})}):null]})]})]})})})}function D(e){var n=e.loginUser;return(0,h.jsx)(W,{header:"Login",initialState:{username:"",password:""},inputs:["username","password"],submitFunc:n})}function N(e){var n=e.registerUser;return(0,h.jsx)(W,{header:"Sign Up",initialState:{username:"",password:"",email:""},inputs:["username","password","email"],submitFunc:n})}var I=r(5594),M=r(720),O=r(6946),G=r(189),_=r(6025);function B(e){var n=e.avatarSize;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(I.ZP,{item:!0,xs:12,md:2,children:(0,h.jsx)(_.Z,{variant:"circular",width:n.width,height:n.height})}),(0,h.jsx)(I.ZP,{item:!0,marginTop:"auto",xs:12,md:10,children:(0,h.jsx)(_.Z,{width:"10rem"})})]})}var T=r(8900),E=r(1413),q=r(4982),H=r(8426),Y=r(3085),K=r(7887),X=r(4602),V=r(9572),J=r(5462);function Q(e){var n=e.avatarSize,r=e.imageURL,t=e.handleFileUpload,i=e.isSmallScreen;return(0,h.jsxs)(s.Z,{direction:"row",children:[(0,h.jsx)(M.Z,{src:r,sx:{width:n.width,height:n.height}}),(0,h.jsx)(g.Z,{sx:{marginTop:"auto",marginLeft:"auto"},children:(0,h.jsxs)(X.Z,{htmlFor:"imageURL",sx:{padding:".3rem",borderRadius:9999},children:[(0,h.jsxs)(O.Z,{variant:"contained",component:"span",className:"main-button",size:i?"small":"medium",sx:{bgcolor:"primary.dark","&:hover":{bgcolor:"secondary.main",color:"primary.main"}},children:[(0,h.jsx)(J.Z,{fontSize:"small",sx:{marginRight:1}}),"Upload Image"]}),(0,h.jsx)(V.Z,{id:"imageURL",type:"file",onChange:t,sx:{display:"none"}})]})})]})}function $(e){var n=e.open,r=e.setOpen,i=e.username,o=e.avatarSize,c=(0,t.useContext)(a.Z),d=c.updateUser,u=c.userData,m=(0,t.useContext)(l.Z).isSmallScreen,x=(0,L.Z)(u),p=(0,S.Z)(x,5),j=p[0],Z=p[1],f=p[2],v=p[3],y=p[4],C=function(){v([]),y(u),r(!1)},k=function(e,n){var r=Object.entries(e),t=Object.entries(n),i={},a=r.filter((function(e,n){var r=(0,S.Z)(e,2);r[0];return r[1]!==t[n][1]}));return a.length?(a.map((function(e){return i[e[0]]=e[1]})),i):-1},U=function(){var e=(0,b.Z)((0,w.Z)().mark((function e(n){var r,t;return(0,w.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),-1!==(r=k(j,u))){e.next=4;break}return e.abrupt("return",C());case 4:return e.next=6,d(r,i);case 6:(t=e.sent)?v(t.msg):C();case 8:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,t.useEffect)((function(){y(u)}),[u,y]),(0,h.jsxs)(q.Z,{fullScreen:m,open:n,onClose:C,fullWidth:!0,maxWidth:"sm",sx:{"& .MuiPaper-root":{bgcolor:"primary.main",padding:m?1:"0rem 4rem 1rem 4rem"}},children:[(0,h.jsx)(H.Z,{fontSize:m?"1.2rem":"1.5rem",sx:{color:"primary.text",paddingBottom:0},children:"Edit Profile"}),(0,h.jsxs)(Y.Z,{children:[(0,h.jsx)(g.Z,{sx:{marginBottom:".4rem"},children:"string"===typeof f[0]?(0,h.jsx)(P.gk,{children:f[0]}):null}),(0,h.jsxs)(s.Z,{spacing:3,children:[(0,h.jsx)(Q,{imageURL:j.imageURL,handleFileUpload:function(e){var n=e.target.files[0],r=new FileReader;r.onloadend=function(){y((0,E.Z)((0,E.Z)({},j),{},{imageURL:r.result}))},r.readAsDataURL(n)},avatarSize:o,isSmallScreen:m}),["username","email"].map((function(e){var n=e[0].toUpperCase().concat(e.slice(1));return(0,h.jsx)(P.Xn,{variant:"outlined",label:n,type:"text",name:e,value:j[e],onChange:Z,helperText:f.length&&"string"!==typeof f[0]?(0,h.jsx)(P.gk,{children:f[0][e]}):null},e)}))]})]}),(0,h.jsxs)(K.Z,{sx:{marginRight:"auto",padding:"5px 0px 0px 24px"},children:[(0,h.jsx)(P.Lw,{variant:"outlined",onClick:C,className:"main-button",children:"Cancel"}),(0,h.jsx)(P.KM,{variant:"contained",onClick:U,className:"main-button",children:"Submit"})]})]})}var ee=(0,t.lazy)((function(){return r.e(970).then(r.bind(r,4970))}));function ne(e){var n=e.itemsOnPage,r=(0,i.UO)().username,c=(0,t.useContext)(a.Z),d=c.currentUser,m=c.getCurrentUser,x=c.userData,j=c.token,g=(0,t.useContext)(l.Z).isSmallScreen,Z=g?{width:"5.5rem",height:"5.5rem"}:{width:"7.5rem",height:"7.5rem"},f=(0,t.useState)(!1),v=(0,S.Z)(f,2),y=v[0],w=v[1];return(0,t.useEffect)((function(){!x&&d&&m(r)}),[d,m]),j?(0,h.jsxs)(s.Z,{children:[x?(0,h.jsx)($,{open:y,setOpen:w,username:r,avatarSize:Z}):null,(0,h.jsxs)(p,{children:[(0,h.jsx)(I.ZP,{container:!0,spacing:2,direction:"row",alignItems:"flex-end",padding:1,children:x?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(I.ZP,{item:!0,xs:12,md:2,children:(0,h.jsx)(M.Z,{src:x.imageURL,sx:{width:Z.width,height:Z.height}})}),(0,h.jsxs)(I.ZP,{item:!0,sx:{display:"flex"},xs:12,md:10,children:[(0,h.jsx)(o.Z,{variant:"h5",color:"secondary.main",sx:{flexGrow:1},children:x.username}),(0,h.jsx)(O.Z,{size:"small",onClick:function(){w(!0)},children:(0,h.jsx)(G.Z,{fontSize:"medium",sx:{color:"secondary.main",marginLeft:2}})})]})]}):(0,h.jsx)(B,{avatarSize:Z})}),(0,h.jsx)(u.Z,{sx:{bgcolor:"primary.dark",margin:1}}),(0,h.jsx)(t.Suspense,{fallback:(0,h.jsx)(T.Z,{itemsOnPage:n,isSmallScreen:g}),children:(0,h.jsx)(ee,{itemsOnPage:n})})]})]}):(0,h.jsx)(i.Fg,{to:"/login"})}var re=r(4942),te=r(8643),ie=r(4291),ae=r(902),se=r(8965),oe=r(5600),le=r(4959),ce=r(8834),de=r(2556),ue=r(4836),me=r(817),he=(0,m.Z)(O.Z)((function(e){var n=e.theme;return{color:n.palette.secondary.main,"&:hover":{backgroundColor:n.palette.secondary.main,color:n.palette.primary.main}}})),xe=(0,m.Z)(g.Z)((function(e){return{color:e.theme.palette.success.main,display:"flex"}})),pe=(0,m.Z)(I.ZP)((function(e){var n=e.theme;return(0,re.Z)({height:"2rem",color:n.palette.primary.text},n.breakpoints.down("sm"),{justifyContent:"space-around"})}));function je(e){var n=e.game,r=(0,t.useState)(!1),i=(0,S.Z)(r,2),c=i[0],d=i[1],m=(0,t.useContext)(l.Z),x=m.addGame,j=m.isSmallScreen,Z=(0,t.useContext)(a.Z),f=Z.currentUser,y=Z.userGameIDs,C=!!y&&y.has(n.objectid),k=(0,t.useState)(!1),P=(0,S.Z)(k,2),U=P[0],z=P[1],A=j?300:800,F=function(){var e=(0,b.Z)((0,w.Z)().mark((function e(){return(0,w.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return z(!0),e.next=3,x(n);case 3:z(!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,t.useEffect)((function(){var e=document.createRange().createContextualFragment(n.description);document.getElementById("description").appendChild(e)}),[n.description]),(0,h.jsx)(p,{children:(0,h.jsxs)(s.Z,{spacing:1,children:[(0,h.jsxs)(g.Z,{display:"flex",children:[(0,h.jsx)(o.Z,{variant:j?"h5":"h4",sx:{color:"secondary.main",flex:1,alignSelf:"center"},children:n.name}),f?C?(0,h.jsx)(xe,{children:j?(0,h.jsx)(o.Z,{sx:{alignSelf:"flex-end",display:"flex",padding:".3rem"},children:(0,h.jsx)(ce.Z,{})}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o.Z,{margin:1,children:"In Collection"}),(0,h.jsx)(o.Z,{padding:".3rem",children:(0,h.jsx)(ce.Z,{})})]})}):j?(0,h.jsx)(te.Z,{size:"small",sx:{color:"secondary.main",bgcolor:"primary.dark",alignSelf:"flex-end"},onClick:F,children:U?(0,h.jsx)(v.Z,{size:"1rem",color:"secondary.main"}):(0,h.jsx)(le.Z,{})}):(0,h.jsxs)(he,{variant:"text",onClick:F,className:"main-button",children:[(0,h.jsx)(le.Z,{fontSize:"small"}),(0,h.jsx)(o.Z,{paddingRight:1,children:"Add to collection"}),U?(0,h.jsx)(v.Z,{size:"1rem",color:"primary.dark"}):(0,h.jsx)(g.Z,{width:"1rem"})]}):null]}),(0,h.jsxs)(pe,{container:!0,direction:"row",children:[(0,h.jsx)(I.ZP,{item:!0,children:(0,h.jsx)(ie.ZP,{sx:{padding:j?0:null},children:(0,h.jsx)(ae.Z,{children:n.yearpublished})})}),(0,h.jsx)(me.Z,{min_players:n.minplayers,max_players:n.maxplayers,min_playtime:n.minplaytime,max_playtime:n.maxplaytime,isSmallScreen:j})]}),(0,h.jsx)(u.Z,{sx:{bgcolor:"primary.dark"}}),(0,h.jsxs)(I.ZP,{container:!0,direction:j?"column":"row",justifyContent:j?"center":"space-around",children:[(0,h.jsx)(I.ZP,{item:!0,display:"flex",justifyContent:"center",children:(0,h.jsx)(se.Z,{component:"img",src:n.image,alt:n.name,sx:{maxWidth:"18rem",maxHeight:"18rem"}})}),(0,h.jsx)(I.ZP,{item:!0,xs:7,children:n.description?(0,h.jsxs)(s.Z,{spacing:1,padding:j?1:0,children:[(0,h.jsx)(oe.Z,{in:c,collapsedSize:j?"7.8rem":"18rem",children:(0,h.jsx)(o.Z,{id:"description",sx:{color:"primary.text"}})}),n.description.length>A?(0,h.jsx)(O.Z,{sx:{height:"1.5rem",color:"secondary.main","&:hover":{backgroundColor:"secondary.main",color:"primary.main"},alignSelf:"flex-end"},variant:"text",onClick:function(){d(!c),c&&window.scrollTo({top:0})},children:c?(0,h.jsx)(de.Z,{fontSize:"large"}):(0,h.jsx)(ue.Z,{fontSize:"large"})}):null]}):null})]})]})})}var ge=(0,m.Z)(I.ZP)((function(e){var n=e.theme;return(0,re.Z)({height:"2rem"},n.breakpoints.down("sm"),{justifyContent:"space-around"})}));function Ze(){var e=(0,t.useContext)(l.Z).isSmallScreen;return(0,h.jsx)(p,{children:(0,h.jsxs)(s.Z,{spacing:1,children:[(0,h.jsx)(o.Z,{children:(0,h.jsx)(_.Z,{width:"70%",height:e?"2rem":"2.624rem"})}),(0,h.jsx)(ge,{container:!0,direction:"row",children:["","",""].map((function(n,r){return(0,h.jsx)(I.ZP,{item:!0,display:"flex",alignItems:"flex-end",children:(0,h.jsx)(ie.ZP,{sx:{padding:e?0:null},children:(0,h.jsx)(_.Z,{width:e?"4rem":"4.816rem",height:e?"1.5rem":"1.7rem"})})},r)}))}),(0,h.jsx)(u.Z,{sx:{bgcolor:"primary.dark"}}),(0,h.jsxs)(I.ZP,{container:!0,direction:e?"column":"row",justifyContent:e?"center":"space-around",children:[(0,h.jsx)(I.ZP,{item:!0,display:"flex",justifyContent:"center",width:e?"100%":"none",children:(0,h.jsx)(_.Z,{width:e?"17rem":"18rem",height:e?"17rem":"18rem"})}),(0,h.jsx)(I.ZP,{item:!0,xs:7,children:(0,h.jsxs)(s.Z,{spacing:1,padding:e?1:0,children:[function(){for(var n=[],r=e?5:9,t=e?2:3,i=e?null:6,a=0;a<r;a++){var s=Math.floor(10*Math.random()+90);a===t||a===i?n.push((0,h.jsx)(g.Z,{height:e?"1rem":"1.5rem"})):n.push((0,h.jsx)(_.Z,{width:"".concat(s,"%"),height:e?"1rem":"1.5rem"}))}return n}().map((function(e,n){return(0,h.jsx)("div",{children:e},n)})),(0,h.jsx)(g.Z,{height:"2.188rem"})]})})]})]})})}var fe=r(6356),ve=r(366),ye=r(2832),we=r(7291),be=(0,m.Z)(g.Z)((function(e){var n=e.theme;return{position:"absolute",backgroundColor:(0,d.Fq)(n.palette.common.black,.6),width:"100%",height:"100%",textAlign:"center",padding:".5rem"}}));function Se(e){var n=e.title;return(0,h.jsx)(ye.Z,{title:n,children:(0,h.jsxs)(be,{children:[(0,h.jsx)(o.Z,{sx:{color:"secondary.main",textShadow:"2px 1px 1px solid black"},variant:"h5",noWrap:!0,children:n}),(0,h.jsx)(g.Z,{sx:{marginTop:"1rem",color:"red"},children:(0,h.jsx)(we.Z,{sx:{fontSize:"5rem"}})})]})})}function Ce(e){var n=e.item,r=e.handleClick;return(0,h.jsx)(fe.Z,{sx:{boxShadow:0},children:(0,h.jsxs)(ve.Z,{onClick:function(){return r(n)},children:[(0,h.jsx)(Se,{title:n.snippet.title}),(0,h.jsx)(se.Z,{src:n.snippet.thumbnails.medium.url,sx:{objectFit:"fill"},component:"img",alt:n.snippet.title})]})})}function ke(e){var n=e.isSmallScreen;return function(){for(var e=[],r=0;r<6;r++)e.push((0,h.jsx)(I.ZP,{item:!0,margin:"auto",width:n?"100%":null,children:(0,h.jsx)(fe.Z,{sx:{boxShadow:0,bgcolor:"transparent"},children:(0,h.jsx)(_.Z,{width:n?"18rem":"20rem",height:n?"9.25rem":"11.25rem"})})},r));return e}()}var Pe=r(1278);function Ue(e){var n=e.open,r=e.video,t=e.handleClose,i=e.fullScreen;return(0,h.jsxs)(q.Z,{fullScreen:i,open:n,onClose:t,sx:{"& .MuiPaper-root":{bgcolor:"primary.dark"}},maxWidth:"lg",fullWidth:!0,children:[i?(0,h.jsx)(H.Z,{sx:{padding:0,display:"flex"},children:(0,h.jsx)(z.Z,{"aria-label":"close",onClick:t,sx:{color:"primary.muted",marginLeft:"auto"},children:(0,h.jsx)(Pe.Z,{})})}):null,(0,h.jsx)(fe.Z,{sx:{position:"relative",width:"100%",paddingBottom:"56.25%",borderRadius:i?0:null,display:"flex"},children:(0,h.jsx)(se.Z,{component:"iframe",src:"https://www.youtube.com/embed/".concat(r.id.videoId,"?autoplay=1"),title:r.snippet.title,allowFullScreen:!0,allow:"accelerometer;  autoplay;  encrypted-media;  gyroscope;  picture-in-picture",sx:{position:"absolute",width:"100%",height:"100%",border:0}})})]})}function ze(e){var n=e.game,r=e.items,i=(0,t.useState)(!1),a=(0,S.Z)(i,2),s=a[0],o=a[1],c=(0,t.useState)(""),d=(0,S.Z)(c,2),u=d[0],m=d[1],x=(0,t.useContext)(l.Z).isSmallScreen,j=function(e){o(!0),m(e)};return(0,h.jsxs)(p,{header:"Videos",divider:!0,children:[u?(0,h.jsx)(Ue,{open:s,video:u,handleClose:function(){o(!1),m("")},fullScreen:x}):null,(0,h.jsx)(I.ZP,{sx:{marginTop:1,overflow:"auto",height:x?"21.5rem":null},container:!0,direction:"row",spacing:2,children:n?r.map((function(e){return(0,h.jsx)(I.ZP,{item:!0,margin:"auto",children:(0,h.jsx)(Ce,{item:e,handleClick:j,isSmallScreen:x})},e.id.videoId)})):(0,h.jsx)(ke,{isSmallScreen:x})})]})}var Ae=r(9399),Fe=r(3512),Re=r(4182),Le=r(5044),We=r(3481),De=r(8669),Ne=function(e){return{name:e,data:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"N/A"}},Ie=(0,m.Z)(Ae.Z)((function(e){var n=e.theme;return{backgroundColor:n.palette.primary.main,"& td, & th":{border:0},"&:nth-of-type(odd)":{backgroundColor:n.palette.primary.dark}}}));function Me(e){var n,r,t,i=e.game,a=(0,De.Z)(),s=(0,Fe.Z)(a.breakpoints.down("sm"));if(i){n=i.boardgamemechanic.length?i.boardgamemechanic.map((function(e,n){return e._text})).join(", "):"N/A",r=i.boardgamecategory.length?i.boardgamecategory.map((function(e,n){return e._text})).join(", "):"N/A";var o=i.yearpublished?i.yearpublished:"N/A",l=i.publishers.length?i.publishers[0]:"N/A",c=i.artists?i.artists.join(", "):"N/A",d=i.age.concat("+");t=[Ne("Ages",d),Ne("Year Published",o),Ne("Publisher",l),Ne("Artists",c),Ne("Mechanics",n),Ne("Categories",r)]}return(0,h.jsx)(p,{header:"Details",children:i?(0,h.jsx)(Re.Z,{children:(0,h.jsx)(Le.Z,{children:t?t.map((function(e,n){return(0,h.jsxs)(Ie,{children:[(0,h.jsx)(We.Z,{component:"th",scope:"row",sx:{color:"primary.text",fontSize:s?"1.1rem":"1.3rem"},children:e.name}),(0,h.jsx)(We.Z,{sx:{color:"primary.text",fontSize:s?".9rem":"1.1rem"},children:e.data})]},n)})):null})}):(0,h.jsx)(v.Z,{})})}function Oe(){var e=(0,t.useContext)(l.Z),n=e.game,r=e.videos,a=e.checkGameCache,c=(0,i.UO)().id,d=(0,i.TH)().pathname;(0,t.useEffect)((function(){try{n&&n.objectid===c||a(c)}catch(e){console.error(e)}}),[n,d,a,c]);var u=function(){return(0,h.jsx)(s.Z,{children:(0,h.jsx)(p,{children:(0,h.jsxs)(o.Z,{variant:"h5",textAlign:"center",color:"primary.text",children:["Sorry, no game found with ID '",c,"'."]})})})};return-1===n?(0,h.jsx)(u,{}):(0,h.jsxs)(s.Z,{spacing:".3rem",children:[n?(0,h.jsx)(je,{game:n}):(0,h.jsx)(Ze,{}),(0,h.jsx)(ze,{game:n,items:r}),(0,h.jsx)(Me,{game:n})]})}function Ge(){var e=(0,t.useContext)(a.Z),n=e.loginUser,r=e.registerUser;return(0,h.jsxs)(i.Z5,{children:[(0,h.jsx)(i.AW,{path:"*",element:(0,h.jsx)(j,{})}),(0,h.jsx)(i.AW,{path:"/",element:(0,h.jsx)(y,{})}),(0,h.jsx)(i.AW,{path:"/login",element:(0,h.jsx)(D,{loginUser:n})}),(0,h.jsx)(i.AW,{path:"/signup",element:(0,h.jsx)(N,{registerUser:r})}),(0,h.jsx)(i.AW,{path:"/profile/:username",element:(0,h.jsx)(ne,{itemsOnPage:9})}),(0,h.jsx)(i.AW,{path:"/games/:id",element:(0,h.jsx)(Oe,{})})]})}},8900:function(e,n,r){r.d(n,{Z:function(){return o}});r(390);var t=r(5594),i=r(5793),a=r(6025),s=r(2559);function o(e){for(var n=e.itemsOnPage,r=e.isSmallScreen,o=[],l=0;l<n;l++)o.push((0,s.jsx)(t.ZP,{item:!0,sx:{marginBottom:2},lg:4,children:(0,s.jsx)(a.Z,{width:r?"16rem":"20rem",height:r?"19rem":"24rem",shadow:1,center:!0})},l));return(0,s.jsxs)(i.Z,{spacing:2,children:[(0,s.jsxs)(i.Z,{spacing:1,padding:"1.5rem 1.5rem 0rem 2rem",children:[(0,s.jsx)(a.Z,{width:"7rem"}),(0,s.jsx)(a.Z,{width:"8rem",height:"1.5rem"})]}),(0,s.jsx)(t.ZP,{container:!0,direction:"row",sx:{width:"100%",justifyContent:"space-around"},children:o.map((function(e){return e}))})]})}},6025:function(e,n,r){r.d(n,{Z:function(){return l}});r(390);var t=r(5718),i=r(6128),a=r(9656),s=r(2559),o=(0,a.Z)(t.Z)((function(e){var n=e.theme;return{backgroundColor:(0,i.Fq)(n.palette.primary.muted,.4),"& .MuiSkeleton-root":{animationDuration:".3sec"}}}));function l(e){var n=e.variant,r=void 0===n?"rounded":n,t=e.width,i=void 0===t?"100%":t,a=e.height,l=void 0===a?"2rem":a,c=e.shadow,d=e.center,u=c||"none";return(0,s.jsx)(o,{variant:r,animation:"wave",sx:{margin:d?"auto":null,width:i,height:l,boxShadow:u}})}},817:function(e,n,r){r.d(n,{Z:function(){return d}});r(390);var t=r(5594),i=r(4291),a=r(498),s=r(902),o=r(107),l=r(3013),c=r(2559);function d(e){var n=e.min_players,r=e.max_players,d=e.min_playtime,u=e.max_playtime,m=e.isSmallScreen;return(0,c.jsx)(c.Fragment,{children:[function(){var e=n===r?n:n+" - "+r;return[(0,c.jsx)(o.Z,{}),e]}(),function(){var e=d===u?d:d+" - "+u;return[(0,c.jsx)(l.Z,{}),e]}()].map((function(e,n,r){return(0,c.jsx)(t.ZP,{item:!0,children:(0,c.jsxs)(i.ZP,{sx:{padding:m?0:null},children:[(0,c.jsx)(a.Z,{sx:{color:"primary.text",minWidth:30},children:e[0]}),(0,c.jsx)(s.Z,{children:e[1]})]})},n)}))})}}}]);
//# sourceMappingURL=572.90b47fec.chunk.js.map