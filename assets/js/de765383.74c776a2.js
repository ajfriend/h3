"use strict";(self.webpackChunkh3_website=self.webpackChunkh3_website||[]).push([[2874],{5680:(e,n,t)=>{t.d(n,{xA:()=>g,yg:()=>p});var i=t(6540);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,i,l=function(e,n){if(null==e)return{};var t,i,l={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var s=i.createContext({}),d=function(e){var n=i.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},g=function(e){var n=d(e.components);return i.createElement(s.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},u=i.forwardRef((function(e,n){var t=e.components,l=e.mdxType,r=e.originalType,s=e.parentName,g=o(e,["components","mdxType","originalType","parentName"]),u=d(t),p=l,y=u["".concat(s,".").concat(p)]||u[p]||c[p]||r;return t?i.createElement(y,a(a({ref:n},g),{},{components:t})):i.createElement(y,a({ref:n},g))}));function p(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var r=t.length,a=new Array(r);a[0]=u;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o.mdxType="string"==typeof e?e:l,a[1]=o;for(var d=2;d<r;d++)a[d]=t[d];return i.createElement.apply(null,a)}return i.createElement.apply(null,t)}u.displayName="MDXCreateElement"},4966:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>a,default:()=>c,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var i=t(8168),l=(t(6540),t(5680));const r={id:"h3Indexing",title:"H3 Index Representations",sidebar_label:"H3 Index Representations",slug:"/core-library/h3Indexing"},a=void 0,o={unversionedId:"core-library/h3Indexing",id:"version-3.x/core-library/h3Indexing",title:"H3 Index Representations",description:"Introduction",source:"@site/versioned_docs/version-3.x/core-library/h3indexing.md",sourceDirName:"core-library",slug:"/core-library/h3Indexing",permalink:"/docs/3.x/core-library/h3Indexing",draft:!1,editUrl:"https://github.com/uber/h3/edit/master/website/docs/core-library/h3indexing.md",tags:[],version:"3.x",frontMatter:{id:"h3Indexing",title:"H3 Index Representations",sidebar_label:"H3 Index Representations",slug:"/core-library/h3Indexing"},sidebar:"version-3.x/someSidebar",previous:{title:"Table of Cell Areas for H3 Resolutions",permalink:"/docs/3.x/core-library/restable"},next:{title:"Coordinate systems",permalink:"/docs/3.x/core-library/coordsystems"}},s={},d=[{value:"Introduction",id:"introduction",level:2},{value:"H3Index Representation",id:"h3index-representation",level:2},{value:"Invalid Index",id:"invalid-index",level:3},{value:"H3 Cell Index",id:"h3-cell-index",level:3},{value:"H3 Unidirectional Edge Index",id:"h3-unidirectional-edge-index",level:3},{value:"H3 Vertex Index",id:"h3-vertex-index",level:3},{value:"Bit layout of H3Index",id:"bit-layout-of-h3index",level:2},{value:"Links",id:"links",level:2}],g={toc:d};function c(e){let{components:n,...t}=e;return(0,l.yg)("wrapper",(0,i.A)({},g,t,{components:n,mdxType:"MDXLayout"}),(0,l.yg)("h2",{id:"introduction"},"Introduction"),(0,l.yg)("p",null,"The H3 system assigns a unique hierarchical index to each cell. The H3 index of a resolution ",(0,l.yg)("em",{parentName:"p"},"r")," cell begins with the appropriate resolution 0 base cell number. This is followed by a sequence of ",(0,l.yg)("em",{parentName:"p"},"r")," digits 0-6, where each ",(0,l.yg)("em",{parentName:"p"},"i"),(0,l.yg)("sup",null,"th")," digit ",(0,l.yg)("em",{parentName:"p"},"d"),(0,l.yg)("sub",null,"i")," specifies one of the 7 cells centered on the cell indicated by the coarser resolution digits ",(0,l.yg)("em",{parentName:"p"},"d"),(0,l.yg)("sub",null,"1")," through ",(0,l.yg)("em",{parentName:"p"},"d"),(0,l.yg)("sub",null,"i-1"),". A local hexagon coordinate system is assigned to each of the resolution 0 base cells and is used to orient all hierarchical indexing child cells of that base cell. The assignment of digits 0-6 at each resolution uses a ",(0,l.yg)("em",{parentName:"p"},"Central Place Indexing")," arrangement (see ",(0,l.yg)("a",{parentName:"p",href:"http://webpages.sou.edu/~sahrk/sqspc/pubs/autocarto14.pdf"},"Sahr, 2014"),"). In the case of the 12 pentagonal cells the indexing hierarchy produced by sub-digit 1 is removed at all resolutions."),(0,l.yg)("p",null,"Child hexagons are linearly smaller than their parent hexagons."),(0,l.yg)("div",{align:"center"},(0,l.yg)("img",{height:"300",src:"/images/cpidigits.png"})),(0,l.yg)("h2",{id:"h3index-representation"},"H3Index Representation"),(0,l.yg)("p",null,"An ",(0,l.yg)("inlineCode",{parentName:"p"},"H3Index")," is the integer representation of an H3 index, which may be one of multiple modes to indicate the concept being indexed."),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"Mode 0 is reserved and indicates an invalid H3 index."),(0,l.yg)("li",{parentName:"ul"},"Mode 1 is an ",(0,l.yg)("em",{parentName:"li"},"H3 Cell")," (Hexagon/Pentagon) index."),(0,l.yg)("li",{parentName:"ul"},"Mode 2 is an ",(0,l.yg)("em",{parentName:"li"},"H3 Unidirectional Edge")," (Cell A -> Cell B) index."),(0,l.yg)("li",{parentName:"ul"},"Mode 3 is planned to be a bidirectional edge (Cell A <-> Cell B)."),(0,l.yg)("li",{parentName:"ul"},"Mode 4 is an ",(0,l.yg)("em",{parentName:"li"},"H3 Vertex")," (i.e. a single vertex of an H3 Cell).")),(0,l.yg)("p",null,"The canonical string representation of an ",(0,l.yg)("inlineCode",{parentName:"p"},"H3Index")," is the hexadecimal representation of the integer, using lowercase letters. The string representation is variable length (no zero padding) and is not prefixed or suffixed."),(0,l.yg)("h3",{id:"invalid-index"},"Invalid Index"),(0,l.yg)("p",null,"Mode 0 contains a special index, ",(0,l.yg)("inlineCode",{parentName:"p"},"H3_NULL"),", which is unique: it is bit-equivalent to ",(0,l.yg)("inlineCode",{parentName:"p"},"0"),".\nThis index indicates, ",(0,l.yg)("em",{parentName:"p"},"specifically"),", an invalid, missing, or uninitialized H3 index;\nit is analogous to ",(0,l.yg)("inlineCode",{parentName:"p"},"NaN")," in floating point.\nIt should be used instead of an arbitrary Mode 0 index, due to its uniqueness and easy identifiability."),(0,l.yg)("h3",{id:"h3-cell-index"},"H3 Cell Index"),(0,l.yg)("p",null,"An H3 Cell index (mode 1) represents a cell (hexagon or pentagon) in the H3 grid system at a particular resolution. The components of the H3 Cell index are packed into a 64-bit integer in order, highest bit first, as follows:"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"1 bit reserved and set to 0,"),(0,l.yg)("li",{parentName:"ul"},"4 bits to indicate the H3 Cell index mode,"),(0,l.yg)("li",{parentName:"ul"},"3 bits reserved and set to 0,"),(0,l.yg)("li",{parentName:"ul"},"4 bits to indicate the cell resolution 0-15,"),(0,l.yg)("li",{parentName:"ul"},"7 bits to indicate the base cell 0-121,"),(0,l.yg)("li",{parentName:"ul"},"3 bits to indicate each subsequent digit 0-6 from resolution 1 up to the resolution of the cell (45 bits total are reserved for resolutions 1-15)")),(0,l.yg)("p",null,"The three bits for each unused digit are set to 7."),(0,l.yg)("h3",{id:"h3-unidirectional-edge-index"},"H3 Unidirectional Edge Index"),(0,l.yg)("p",null,'An H3 Unidirectional Edge index (mode 2) represents a single directed edge between two cells (an "origin" cell and a neighboring "destination" cell). The components of the H3 Unidirectional Edge index are packed into a 64-bit integer in order, highest bit first, as follows:'),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"1 bit reserved and set to 0,"),(0,l.yg)("li",{parentName:"ul"},"4 bits to indicate the H3 Unidirectional Edge index mode,"),(0,l.yg)("li",{parentName:"ul"},"3 bits to indicate the edge (1-6) of the origin cell,"),(0,l.yg)("li",{parentName:"ul"},"Subsequent bits matching the index bits of the origin cell.")),(0,l.yg)("h3",{id:"h3-vertex-index"},"H3 Vertex Index"),(0,l.yg)("p",null,'An H3 Vertex index (mode 4) represents a single topological vertex in H3 grid system, shared by three cells. Note that this does not include the distortion vertexes occasionally present in a cell\'s geo boundary. An H3 Vertex is arbitrarily assigned one of the three neighboring cells as its "owner", which is used to calculate the canonical index and geo coordinate for the vertex. The components of the H3 Vertex index are packed into a 64-bit integer in order, highest bit first, as follows:'),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"1 bit reserved and set to 0,"),(0,l.yg)("li",{parentName:"ul"},"4 bits to indicate the H3 Vertex index mode,"),(0,l.yg)("li",{parentName:"ul"},"3 bits to indicate the vertex number (0-5) of vertex on the owner cell,"),(0,l.yg)("li",{parentName:"ul"},"Subsequent bits matching the index bits of the owner cell.")),(0,l.yg)("h2",{id:"bit-layout-of-h3index"},"Bit layout of H3Index"),(0,l.yg)("p",null,"The layout of an ",(0,l.yg)("inlineCode",{parentName:"p"},"H3Index"),' is shown below in table form. The interpretation of the "Reserved" field differs depending on the mode of the index.'),(0,l.yg)("table",null,(0,l.yg)("tr",null,(0,l.yg)("th",null),(0,l.yg)("th",null,"0x0F"),(0,l.yg)("th",null,"0x0E"),(0,l.yg)("th",null,"0x0D"),(0,l.yg)("th",null,"0x0C"),(0,l.yg)("th",null,"0x0B"),(0,l.yg)("th",null,"0x0A"),(0,l.yg)("th",null,"0x09"),(0,l.yg)("th",null,"0x08"),(0,l.yg)("th",null,"0x07"),(0,l.yg)("th",null,"0x06"),(0,l.yg)("th",null,"0x05"),(0,l.yg)("th",null,"0x04"),(0,l.yg)("th",null,"0x03"),(0,l.yg)("th",null,"0x02"),(0,l.yg)("th",null,"0x01"),(0,l.yg)("th",null,"0x00")),(0,l.yg)("tr",null,(0,l.yg)("th",null,"0x30"),(0,l.yg)("td",null,"Reserved"),(0,l.yg)("td",{colspan:"4"},"Mode"),(0,l.yg)("td",{colspan:"3"},"Mode-Dependent"),(0,l.yg)("td",{colspan:"4"},"Resolution"),(0,l.yg)("td",{colspan:"4"},"Base cell")),(0,l.yg)("tr",null,(0,l.yg)("th",null,"0x20"),(0,l.yg)("td",{colspan:"3"},"Base cell"),(0,l.yg)("td",{colspan:"3"},"Digit 1"),(0,l.yg)("td",{colspan:"3"},"Digit 2"),(0,l.yg)("td",{colspan:"3"},"Digit 3"),(0,l.yg)("td",{colspan:"3"},"Digit 4"),(0,l.yg)("td",null,"Digit 5")),(0,l.yg)("tr",null,(0,l.yg)("th",null,"0x10"),(0,l.yg)("td",{colspan:"2"},"Digit 5"),(0,l.yg)("td",{colspan:"3"},"Digit 6"),(0,l.yg)("td",{colspan:"3"},"Digit 7"),(0,l.yg)("td",{colspan:"3"},"Digit 8"),(0,l.yg)("td",{colspan:"3"},"Digit 9"),(0,l.yg)("td",{colspan:"2"},"Digit 10")),(0,l.yg)("tr",null,(0,l.yg)("th",null,"0x00"),(0,l.yg)("td",null,"Digit 10"),(0,l.yg)("td",{colspan:"3"},"Digit 11"),(0,l.yg)("td",{colspan:"3"},"Digit 12"),(0,l.yg)("td",{colspan:"3"},"Digit 13"),(0,l.yg)("td",{colspan:"3"},"Digit 14"),(0,l.yg)("td",{colspan:"3"},"Digit 15"))),(0,l.yg)("h2",{id:"links"},"Links"),(0,l.yg)("ul",null,(0,l.yg)("li",{parentName:"ul"},"Observable notebook example: ",(0,l.yg)("a",{parentName:"li",href:"https://observablehq.com/@nrabinowitz/h3-index-bit-layout?collection=@nrabinowitz/h3"},"H3 Index Bit Layout")),(0,l.yg)("li",{parentName:"ul"},"Observable notebook example: ",(0,l.yg)("a",{parentName:"li",href:"https://observablehq.com/@nrabinowitz/h3-index-inspector?collection=@nrabinowitz/h3"},"H3 Index Inspector"))))}c.isMDXComponent=!0}}]);