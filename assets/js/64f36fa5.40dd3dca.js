"use strict";(self.webpackChunkh3_website=self.webpackChunkh3_website||[]).push([[9240],{3905:(e,a,n)=>{n.d(a,{Zo:()=>p,kt:()=>m});var t=n(7294);function i(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function r(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),n.push.apply(n,t)}return n}function l(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?r(Object(n),!0).forEach((function(a){i(e,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))}))}return e}function o(e,a){if(null==e)return{};var n,t,i=function(e,a){if(null==e)return{};var n,t,i={},r=Object.keys(e);for(t=0;t<r.length;t++)n=r[t],a.indexOf(n)>=0||(i[n]=e[n]);return i}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)n=r[t],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=t.createContext({}),d=function(e){var a=t.useContext(s),n=a;return e&&(n="function"==typeof e?e(a):l(l({},a),e)),n},p=function(e){var a=d(e.components);return t.createElement(s.Provider,{value:a},e.children)},u={inlineCode:"code",wrapper:function(e){var a=e.children;return t.createElement(t.Fragment,{},a)}},c=t.forwardRef((function(e,a){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),c=d(n),m=i,g=c["".concat(s,".").concat(m)]||c[m]||u[m]||r;return n?t.createElement(g,l(l({ref:a},p),{},{components:n})):t.createElement(g,l({ref:a},p))}));function m(e,a){var n=arguments,i=a&&a.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=c;var o={};for(var s in a)hasOwnProperty.call(a,s)&&(o[s]=a[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var d=2;d<r;d++)l[d]=n[d];return t.createElement.apply(null,l)}return t.createElement.apply(null,n)}c.displayName="MDXCreateElement"},5162:(e,a,n)=>{n.d(a,{Z:()=>l});var t=n(7294),i=n(6010);const r="tabItem_Ymn6";function l(e){let{children:a,hidden:n,className:l}=e;return t.createElement("div",{role:"tabpanel",className:(0,i.Z)(r,l),hidden:n},a)}},5488:(e,a,n)=>{n.d(a,{Z:()=>m});var t=n(7462),i=n(7294),r=n(6010),l=n(2389),o=n(7392),s=n(7094),d=n(2466);const p="tabList__CuJ",u="tabItem_LNqP";function c(e){var a,n;const{lazy:l,block:c,defaultValue:m,values:g,groupId:k,className:v}=e,f=i.Children.map(e.children,(e=>{if((0,i.isValidElement)(e)&&"value"in e.props)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),h=null!=g?g:f.map((e=>{let{props:{value:a,label:n,attributes:t}}=e;return{value:a,label:n,attributes:t}})),b=(0,o.l)(h,((e,a)=>e.value===a.value));if(b.length>0)throw new Error('Docusaurus error: Duplicate values "'+b.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.');const y=null===m?m:null!=(a=null!=m?m:null==(n=f.find((e=>e.props.default)))?void 0:n.props.value)?a:f[0].props.value;if(null!==y&&!h.some((e=>e.value===y)))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+y+'" but none of its children has the corresponding value. Available values are: '+h.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");const{tabGroupChoices:x,setTabGroupChoices:T}=(0,s.U)(),[N,I]=(0,i.useState)(y),j=[],{blockElementScrollPositionUntilNextRender:C}=(0,d.o5)();if(null!=k){const e=x[k];null!=e&&e!==N&&h.some((a=>a.value===e))&&I(e)}const D=e=>{const a=e.currentTarget,n=j.indexOf(a),t=h[n].value;t!==N&&(C(a),I(t),null!=k&&T(k,String(t)))},w=e=>{var a;let n=null;switch(e.key){case"ArrowRight":{var t;const a=j.indexOf(e.currentTarget)+1;n=null!=(t=j[a])?t:j[0];break}case"ArrowLeft":{var i;const a=j.indexOf(e.currentTarget)-1;n=null!=(i=j[a])?i:j[j.length-1];break}}null==(a=n)||a.focus()};return i.createElement("div",{className:(0,r.Z)("tabs-container",p)},i.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":c},v)},h.map((e=>{let{value:a,label:n,attributes:l}=e;return i.createElement("li",(0,t.Z)({role:"tab",tabIndex:N===a?0:-1,"aria-selected":N===a,key:a,ref:e=>j.push(e),onKeyDown:w,onFocus:D,onClick:D},l,{className:(0,r.Z)("tabs__item",u,null==l?void 0:l.className,{"tabs__item--active":N===a})}),null!=n?n:a)}))),l?(0,i.cloneElement)(f.filter((e=>e.props.value===N))[0],{className:"margin-top--md"}):i.createElement("div",{className:"margin-top--md"},f.map(((e,a)=>(0,i.cloneElement)(e,{key:a,hidden:e.props.value!==N})))))}function m(e){const a=(0,l.Z)();return i.createElement(c,(0,t.Z)({key:String(a)},e))}},4315:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>p,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>d,toc:()=>u});var t=n(7462),i=(n(7294),n(3905)),r=n(5488),l=n(5162);const o={id:"traversal",title:"Grid traversal functions",sidebar_label:"Traversal",slug:"/api/traversal"},s=void 0,d={unversionedId:"api/traversal",id:"api/traversal",title:"Grid traversal functions",description:"Grid traversal allows finding cells in the vicinity of an origin cell, and determining how to traverse the grid from one cell to another.",source:"@site/docs/api/traversal.mdx",sourceDirName:"api",slug:"/api/traversal",permalink:"/docs/api/traversal",draft:!1,editUrl:"https://github.com/uber/h3/edit/master/website/docs/api/traversal.mdx",tags:[],version:"current",frontMatter:{id:"traversal",title:"Grid traversal functions",sidebar_label:"Traversal",slug:"/api/traversal"},sidebar:"someSidebar",previous:{title:"Inspection",permalink:"/docs/api/inspection"},next:{title:"Hierarchy",permalink:"/docs/api/hierarchy"}},p={},u=[{value:"gridDisk",id:"griddisk",level:2},{value:"maxGridDiskSize",id:"maxgriddisksize",level:2},{value:"gridDiskDistances",id:"griddiskdistances",level:2},{value:"gridDiskUnsafe",id:"griddiskunsafe",level:2},{value:"gridDiskDistancesUnsafe",id:"griddiskdistancesunsafe",level:2},{value:"gridDiskDistancesSafe",id:"griddiskdistancessafe",level:2},{value:"gridDisksUnsafe",id:"griddisksunsafe",level:2},{value:"gridRingUnsafe",id:"gridringunsafe",level:2},{value:"gridPathCells",id:"gridpathcells",level:2},{value:"gridPathCellsSize",id:"gridpathcellssize",level:2},{value:"gridDistance",id:"griddistance",level:2},{value:"cellToLocalIj",id:"celltolocalij",level:2},{value:"localIjToCell",id:"localijtocell",level:2}],c={toc:u};function m(e){let{components:a,...n}=e;return(0,i.kt)("wrapper",(0,t.Z)({},c,n,{components:a,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Grid traversal allows finding cells in the vicinity of an origin cell, and determining how to traverse the grid from one cell to another."),(0,i.kt)("h2",{id:"griddisk"},"gridDisk"),(0,i.kt)(r.Z,{groupId:"language",defaultValue:"c",values:[{label:"C",value:"c"},{label:"Python",value:"python"},{label:"Java",value:"java"},{label:"JavaScript (Live)",value:"javascript"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"c",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},"H3Error gridDisk(H3Index origin, int k, H3Index* out);\n"))),(0,i.kt)(l.Z,{value:"python",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-py"},"h3.grid_disk(origin, k)\n"))),(0,i.kt)(l.Z,{value:"java",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"List<Long> gridDisk(long origin, int k);\nList<String> gridDisk(String origin, int k);\n"))),(0,i.kt)(l.Z,{value:"javascript",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"h3.gridDisk(origin, k)\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:"live",live:!0},"function example() {\n  const h = '85283473fffffff';\n  const k = 5;\n  return h3.gridDisk(h, k);\n}\n")))),(0,i.kt)("p",null,"gridDisk produces indices within k distance of the origin index."),(0,i.kt)("p",null,"gridDisk was previously named ",(0,i.kt)("em",{parentName:"p"},"k-ring")," after the concept of a ring with\ndistance k. k-ring 0 is defined as the origin index, k-ring 1 is\ndefined as k-ring 0 and all neighboring indices, and so on."),(0,i.kt)("p",null,"Output is placed in the provided array in no particular order. Elements of\nthe output array may be left as zero, which can happen when crossing a pentagon."),(0,i.kt)("h2",{id:"maxgriddisksize"},"maxGridDiskSize"),(0,i.kt)(r.Z,{groupId:"language",defaultValue:"c",values:[{label:"C",value:"c"},{label:"Python",value:"python"},{label:"Java",value:"java"},{label:"JavaScript (Live)",value:"javascript"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"c",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},"H3Error maxGridDiskSize(int k, int64_t *out);\n"))),(0,i.kt)(l.Z,{value:"python",mdxType:"TabItem"},(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This function exists for memory management and is not exposed."))),(0,i.kt)(l.Z,{value:"java",mdxType:"TabItem"},(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This function exists for memory management and is not exposed."))),(0,i.kt)(l.Z,{value:"javascript",mdxType:"TabItem"},(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This function exists for memory management and is not exposed.")))),(0,i.kt)("p",null,"Maximum number of indices that result from the ",(0,i.kt)("inlineCode",{parentName:"p"},"gridDisk")," algorithm with the given ",(0,i.kt)("inlineCode",{parentName:"p"},"k"),"."),(0,i.kt)("h2",{id:"griddiskdistances"},"gridDiskDistances"),(0,i.kt)(r.Z,{groupId:"language",defaultValue:"c",values:[{label:"C",value:"c"},{label:"Python",value:"python"},{label:"Java",value:"java"},{label:"JavaScript (Live)",value:"javascript"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"c",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},"H3Error gridDiskDistances(H3Index origin, int k, H3Index* out, int* distances);\n"))),(0,i.kt)(l.Z,{value:"python",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-py"},"h3.grid_disk_distances(origin, k)\n"))),(0,i.kt)(l.Z,{value:"java",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"List<List<Long>> gridDiskDistances(long origin, int k);\nList<List<String>> gridDiskDistances(String origin, int k);\n"))),(0,i.kt)(l.Z,{value:"javascript",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"h3.gridDiskDistances(origin, k)\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:"live",live:!0},"function example() {\n  const h = '85283473fffffff';\n  const k = 5;\n  return h3.gridDiskDistances(h, k);\n}\n")))),(0,i.kt)("p",null,"gridDiskDistances produces indices within k distance of the origin index."),(0,i.kt)("p",null,"k-ring 0 is defined as the origin index, k-ring 1 is defined as k-ring 0 and\nall neighboring indices, and so on."),(0,i.kt)("p",null,"Output is placed in the provided array in no particular order. Elements of\nthe output array may be left as zero, which can happen when crossing a pentagon."),(0,i.kt)("h2",{id:"griddiskunsafe"},"gridDiskUnsafe"),(0,i.kt)(r.Z,{groupId:"language",defaultValue:"c",values:[{label:"C",value:"c"},{label:"Python",value:"python"},{label:"Java",value:"java"},{label:"JavaScript (Live)",value:"javascript"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"c",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},"H3Error gridDiskUnsafe(H3Index origin, int k, H3Index* out);\n"))),(0,i.kt)(l.Z,{value:"python",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-py"},"h3.grid_disk_unsafe(h, k)\n"))),(0,i.kt)(l.Z,{value:"java",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"List<List<Long>> gridDiskUnsafe(Long h3, int k) throws PentagonEncounteredException;\nList<List<String>> gridDiskUnsafe(String h3Address, int k) throws PentagonEncounteredException;\n"))),(0,i.kt)(l.Z,{value:"javascript",mdxType:"TabItem"},(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This function is not exposed.")))),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"gridDiskUnsafe")," produces indexes within ",(0,i.kt)("inlineCode",{parentName:"p"},"k")," distance of the origin index.\nThe function returns an error code when one of the returned by this\nfunction is a pentagon or is in the pentagon distortion area. In this case,\nthe output behavior of the ",(0,i.kt)("inlineCode",{parentName:"p"},"out")," array is undefined."),(0,i.kt)("p",null,"k-ring 0 is defined as the origin index, k-ring 1 is defined as k-ring 0 and\nall neighboring indexes, and so on."),(0,i.kt)("p",null,"Output is placed in the provided array in order of increasing distance from\nthe origin. The provided array must be of size ",(0,i.kt)("inlineCode",{parentName:"p"},"maxGridDiskSize(k)"),"."),(0,i.kt)("p",null,"Returns 0 (",(0,i.kt)("inlineCode",{parentName:"p"},"E_SUCCESS"),") if no pentagonal distortion is encountered."),(0,i.kt)("h2",{id:"griddiskdistancesunsafe"},"gridDiskDistancesUnsafe"),(0,i.kt)(r.Z,{groupId:"language",defaultValue:"c",values:[{label:"C",value:"c"},{label:"Python",value:"python"},{label:"Java",value:"java"},{label:"JavaScript (Live)",value:"javascript"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"c",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},"H3Error gridDiskDistancesUnsafe(H3Index origin, int k, H3Index* out, int* distances);\n"))),(0,i.kt)(l.Z,{value:"python",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-py"},"h3.grid_disk_distances_unsafe(h, k)\n"))),(0,i.kt)(l.Z,{value:"java",mdxType:"TabItem"},(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This function is not exposed because the same functionality is exposed by ",(0,i.kt)("inlineCode",{parentName:"p"},"gridDiskUnsafe")))),(0,i.kt)(l.Z,{value:"javascript",mdxType:"TabItem"},(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This function is not exposed.")))),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"gridDiskDistancesUnsafe")," produces indexes within ",(0,i.kt)("inlineCode",{parentName:"p"},"k")," distance of the origin index.\nOutput behavior is undefined when one of the indexes returned by this\nfunction is a pentagon or is in the pentagon distortion area."),(0,i.kt)("p",null,"k-ring 0 is defined as the origin index, k-ring 1 is defined as k-ring 0 and\nall neighboring indexes, and so on."),(0,i.kt)("p",null,"Output is placed in the provided array in order of increasing distance from\nthe origin. The distances in hexagons is placed in the distances array at\nthe same offset. The provided array must be of size ",(0,i.kt)("inlineCode",{parentName:"p"},"maxGridDiskSize(k)"),"."),(0,i.kt)("p",null,"Returns 0 (",(0,i.kt)("inlineCode",{parentName:"p"},"E_SUCCESS"),") if no pentagonal distortion is encountered."),(0,i.kt)("h2",{id:"griddiskdistancessafe"},"gridDiskDistancesSafe"),(0,i.kt)(r.Z,{groupId:"language",defaultValue:"c",values:[{label:"C",value:"c"},{label:"Python",value:"python"},{label:"Java",value:"java"},{label:"JavaScript (Live)",value:"javascript"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"c",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},"H3Error gridDiskDistancesSafe(H3Index origin, int k, H3Index* out, int* distances);\n"))),(0,i.kt)(l.Z,{value:"python",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-py"},"h3.grid_disk_distances_safe(h, k)\n"))),(0,i.kt)(l.Z,{value:"java",mdxType:"TabItem"},(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This function is not exposed because the same functionality is exposed by ",(0,i.kt)("inlineCode",{parentName:"p"},"gridDiskSafe")))),(0,i.kt)(l.Z,{value:"javascript",mdxType:"TabItem"},(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This function is not exposed.")))),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"gridDiskDistancesSafe")," produces indexes within ",(0,i.kt)("inlineCode",{parentName:"p"},"k")," distance of the origin index."),(0,i.kt)("p",null,"k-ring 0 is defined as the origin index, k-ring 1 is defined as k-ring 0 and\nall neighboring indexes, and so on."),(0,i.kt)("p",null,"Output is placed in the provided array in order of increasing distance from\nthe origin. The distances in hexagons is placed in the distances array at\nthe same offset. The provided array must be of size ",(0,i.kt)("inlineCode",{parentName:"p"},"maxGridDiskSize(k)"),"."),(0,i.kt)("p",null,"Returns 0 (",(0,i.kt)("inlineCode",{parentName:"p"},"E_SUCCESS"),") on success."),(0,i.kt)("h2",{id:"griddisksunsafe"},"gridDisksUnsafe"),(0,i.kt)(r.Z,{groupId:"language",defaultValue:"c",values:[{label:"C",value:"c"},{label:"Python",value:"python"},{label:"Java",value:"java"},{label:"JavaScript (Live)",value:"javascript"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"c",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},"H3Error gridDisksUnsafe(H3Index* h3Set, int length, int k, H3Index* out);\n"))),(0,i.kt)(l.Z,{value:"python",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-py"},"h3.grid_disks_unsafe(h, k)\n"))),(0,i.kt)(l.Z,{value:"java",mdxType:"TabItem"},(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This function is not exposed because the same functionality is exposed by ",(0,i.kt)("inlineCode",{parentName:"p"},"gridDiskUnsafe")))),(0,i.kt)(l.Z,{value:"javascript",mdxType:"TabItem"},(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This function is not exposed.")))),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"gridDisksUnsafe")," takes an array of input hex IDs and a max k and returns an\narray of hexagon IDs sorted first by the original hex IDs and then by the\ngrid k-ring (0 to max), with no guaranteed sorting within each grid k-ring group."),(0,i.kt)("p",null,"Returns 0 (",(0,i.kt)("inlineCode",{parentName:"p"},"E_SUCCESS"),") if no pentagonal distortion was encountered. Otherwise, output\nis undefined"),(0,i.kt)("h2",{id:"gridringunsafe"},"gridRingUnsafe"),(0,i.kt)(r.Z,{groupId:"language",defaultValue:"c",values:[{label:"C",value:"c"},{label:"Python",value:"python"},{label:"Java",value:"java"},{label:"JavaScript (Live)",value:"javascript"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"c",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},"H3Error gridRingUnsafe(H3Index origin, int k, H3Index* out);\n"))),(0,i.kt)(l.Z,{value:"python",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-py"},"h3.grid_ring_unsafe(h, k)\n"))),(0,i.kt)(l.Z,{value:"java",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"List<Long> gridRingUnsafe(long h3, int k) throws PentagonEncounteredException;\nList<String> gridRingUnsafe(String h3Address, int k) throws PentagonEncounteredException;\n"))),(0,i.kt)(l.Z,{value:"javascript",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"h3.gridRingUnsafe(h3Index, k)\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:"live",live:!0},"function example() {\n  const h = '85283473fffffff';\n  const k = 1;\n  return h3.gridRingUnsafe(h, k);\n}\n")))),(0,i.kt)("p",null,"Produces the hollow hexagonal ring centered at origin with sides of length k."),(0,i.kt)("p",null,"Returns 0 (",(0,i.kt)("inlineCode",{parentName:"p"},"E_SUCCESS"),") if no pentagonal distortion was encountered."),(0,i.kt)("h2",{id:"gridpathcells"},"gridPathCells"),(0,i.kt)(r.Z,{groupId:"language",defaultValue:"c",values:[{label:"C",value:"c"},{label:"Python",value:"python"},{label:"Java",value:"java"},{label:"JavaScript (Live)",value:"javascript"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"c",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},"H3Error gridPathCells(H3Index start, H3Index end, H3Index* out);\n"))),(0,i.kt)(l.Z,{value:"python",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-py"},"h3.grid_path_cells(start, end)\n"))),(0,i.kt)(l.Z,{value:"java",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"List<Long> gridPathCells(long start, long end) throws LineUndefinedException\nList<String> gridPathCells(String startAddress, String endAddress) throws LineUndefinedException\n"))),(0,i.kt)(l.Z,{value:"javascript",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"h3.gridPathCells(start, end)\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:"live",live:!0},"function example() {\n  const start = '85283473fffffff';\n  const end = '8528342bfffffff';\n  return h3.gridPathCells(start, end);\n}\n")))),(0,i.kt)("p",null,"Given two H3 indexes, return the line of indexes between them (inclusive)."),(0,i.kt)("p",null,"This function may fail to find the line between two indexes, for\nexample if they are very far apart. It may also fail when finding\ndistances for indexes on opposite sides of a pentagon."),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Notes:")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"The specific output of this function should not be considered stable\nacross library versions. The only guarantees the library provides are\nthat the line length will be ",(0,i.kt)("inlineCode",{parentName:"p"},"h3Distance(start, end) + 1")," and that\nevery index in the line will be a neighbor of the preceding index.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Lines are drawn in grid space, and may not correspond exactly to either\nCartesian lines or great arcs."))),(0,i.kt)("h2",{id:"gridpathcellssize"},"gridPathCellsSize"),(0,i.kt)(r.Z,{groupId:"language",defaultValue:"c",values:[{label:"C",value:"c"},{label:"Python",value:"python"},{label:"Java",value:"java"},{label:"JavaScript (Live)",value:"javascript"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"c",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},"H3Error gridPathCellsSize(H3Index start, H3Index end, int64_t* size);\n"))),(0,i.kt)(l.Z,{value:"python",mdxType:"TabItem"},(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This function exists for memory management and is not exposed."))),(0,i.kt)(l.Z,{value:"java",mdxType:"TabItem"},(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This function exists for memory management and is not exposed."))),(0,i.kt)(l.Z,{value:"javascript",mdxType:"TabItem"},(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"This function exists for memory management and is not exposed.")))),(0,i.kt)("p",null,"Number of indexes in a line from the start index to the end index,\nto be used for allocating memory."),(0,i.kt)("p",null,"Returns 0 (",(0,i.kt)("inlineCode",{parentName:"p"},"E_SUCCESS"),") on success, or an error if the line cannot be computed."),(0,i.kt)("h2",{id:"griddistance"},"gridDistance"),(0,i.kt)(r.Z,{groupId:"language",defaultValue:"c",values:[{label:"C",value:"c"},{label:"Python",value:"python"},{label:"Java",value:"java"},{label:"JavaScript (Live)",value:"javascript"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"c",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},"H3Error gridDistance(H3Index origin, H3Index h3, int64_t *distance);\n"))),(0,i.kt)(l.Z,{value:"python",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-py"},"h3.grid_distance(h1, h2)\n"))),(0,i.kt)(l.Z,{value:"java",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"long gridDistance(long a, long b) throws DistanceUndefinedException;\nlong gridDistance(String a, String b) throws DistanceUndefinedException;\n"))),(0,i.kt)(l.Z,{value:"javascript",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"h3.gridDistance(a, b)\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:"live",live:!0},"function example() {\n  const start = '85283473fffffff';\n  const end = '8528342bfffffff';\n  return h3.gridDistance(start, end);\n}\n")))),(0,i.kt)("p",null,"Provides the distance in grid cells between the two indexes."),(0,i.kt)("p",null,"Returns 0 (",(0,i.kt)("inlineCode",{parentName:"p"},"E_SUCCESS"),") on success, or an error if finding the distance failed. Finding the distance\ncan fail because the two indexes are not comparable (different resolutions), too far apart, or are\nseparated by pentagonal distortion. This is the same set of limitations as the local IJ coordinate\nspace functions."),(0,i.kt)("h2",{id:"celltolocalij"},"cellToLocalIj"),(0,i.kt)(r.Z,{groupId:"language",defaultValue:"c",values:[{label:"C",value:"c"},{label:"Python",value:"python"},{label:"Java",value:"java"},{label:"JavaScript (Live)",value:"javascript"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"c",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},"H3Error cellToLocalIj(H3Index origin, H3Index h3, uint32_t mode, CoordIJ *out);\n"))),(0,i.kt)(l.Z,{value:"python",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-py"},"h3.cell_to_local_ij(origin, h)\n"))),(0,i.kt)(l.Z,{value:"java",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"CoordIJ cellToLocalIj(long origin, long h3) throws PentagonEncounteredException, LocalIjUndefinedException;\nCoordIJ cellToLocalIj(String originAddress, String h3Address) throws PentagonEncounteredException, LocalIjUndefinedException;\n"))),(0,i.kt)(l.Z,{value:"javascript",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"h3.cellToLocalIj(origin, h3)\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:"live",live:!0},"function example() {\n  const origin = '85283473fffffff';\n  const h = '8528342bfffffff';\n  const {i, j} = h3.cellToLocalIj(origin, h);\n  return [i, j];\n}\n")))),(0,i.kt)("p",null,"Produces local IJ coordinates for an H3 index anchored by an origin."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"mode")," is reserved for future expansion and must be set to ",(0,i.kt)("inlineCode",{parentName:"p"},"0"),"."),(0,i.kt)("p",null,"This function's output is not guaranteed to be compatible across different\nversions of H3."),(0,i.kt)("h2",{id:"localijtocell"},"localIjToCell"),(0,i.kt)(r.Z,{groupId:"language",defaultValue:"c",values:[{label:"C",value:"c"},{label:"Python",value:"python"},{label:"Java",value:"java"},{label:"JavaScript (Live)",value:"javascript"}],mdxType:"Tabs"},(0,i.kt)(l.Z,{value:"c",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},"H3Error localIjToCell(H3Index origin, const CoordIJ *ij, uint32_t mode, H3Index *out);\n"))),(0,i.kt)(l.Z,{value:"python",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-py"},"h3.local_ij_to_cell(origin, i, j)\n"))),(0,i.kt)(l.Z,{value:"java",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"long localIjToCell(long origin, CoordIJ ij) throws LocalIjUndefinedException;\nString localIjToCell(String originAddress, CoordIJ ij) throws LocalIjUndefinedException;\n"))),(0,i.kt)(l.Z,{value:"javascript",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"h3.localIjToCell(origin, coords)\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:"live",live:!0},"function example() {\n  const h = '85283473fffffff';\n  const coords = {i: 0, j: 0};\n  return h3.localIjToCell(h, coords);\n}\n")))),(0,i.kt)("p",null,"Produces an H3 index from local IJ coordinates anchored by an origin."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"mode")," is reserved for future expansion and must be set to ",(0,i.kt)("inlineCode",{parentName:"p"},"0"),"."),(0,i.kt)("p",null,"This function's output is not guaranteed to be compatible across different\nversions of H3."))}m.isMDXComponent=!0}}]);