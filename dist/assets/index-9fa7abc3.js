import{a as t,b as l,e as g,ae as x,P as f,j as o,F as i}from"./index-dcbaf21f.js";import{g as w}from"./index-b5b40da7.js";const y=s=>t("svg",{xmlns:"http://www.w3.org/2000/svg",id:"Layer_1","data-name":"Layer 1",viewBox:"0 0 24 24",width:512,height:512,...s,children:t("path",{d:"M10,9.5a1.5,1.5,0,0,1-3,0A1.5,1.5,0,0,1,10,9.5ZM15.5,8a1.5,1.5,0,0,0,0,3A1.5,1.5,0,0,0,15.5,8ZM24,12A12.013,12.013,0,0,0,12,0C-3.9.6-3.893,23.4,12,24A12.013,12.013,0,0,0,24,12Zm-2,0A10.011,10.011,0,0,1,12,22C-1.249,21.5-1.244,2.5,12,2A10.011,10.011,0,0,1,22,12Zm-4.254,5.666a1,1,0,0,0-.08-1.412A9.454,9.454,0,0,0,12,14a1,1,0,0,0,0,2,7.519,7.519,0,0,1,4.336,1.747,1,1,0,0,0,1.41-.081ZM5,16a2,2,0,0,0,4,0,6.571,6.571,0,0,0-1.538-3.388C6.46,11.512,4.953,15.152,5,16Z",fill:"currentColor"})}),A=s=>{const[c,d]=l.useState(!1),m=g(),{id:a}=x();l.useEffect(()=>{a&&h()},[a]);const h=async()=>{try{const e=await w({id:String(a)});if(!e)throw"Error";const r=e.sharedId,n={_id:r,name:e.name,storedId:f+r,playingSongIndex:0,songs:e.songs,createdAt:new Date().toDateString()};window.localStorage.setItem(n.storedId,JSON.stringify(n)),m(`/playlist?id=${a}`)}catch{d(!0)}};return t("div",{className:"flex flex-col items-center justify-center w-full mt-15 text-gray dark:text-silver",children:c?o(i,{children:[t(y,{className:"w-10 h-10"}),t("h1",{className:"mt-3 font-bold text-xxl",children:"404 Not found!"}),t("p",{className:"mt-1 text-lg font-medium text-gray",children:"Không tìm thấy playlist được chia sẽ!"})]}):o(i,{children:[t(p,{}),t("h1",{className:"font-bold text-xxl",children:"Sharing Playlist..."}),t("p",{className:"mt-1 text-lg font-medium text-gray",children:"Đang lấy playlist, vui lòng chờ..."})]})})},p=s=>t("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-10 h-10 animate-bounce ",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:t("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"})});export{A as default};
