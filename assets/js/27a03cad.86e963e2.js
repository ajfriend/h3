(self.webpackChunkh3_website=self.webpackChunkh3_website||[]).push([[5691],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return d},kt:function(){return u}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},d=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=c(r),u=a,h=p["".concat(l,".").concat(u)]||p[u]||m[u]||o;return r?n.createElement(h,i(i({ref:t},d),{},{components:r})):n.createElement(h,i({ref:t},d))}));function u(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},2451:function(e,t,r){"use strict";r.r(t),r.d(t,{frontMatter:function(){return s},metadata:function(){return l},toc:function(){return c},default:function(){return m}});var n=r(2122),a=r(9756),o=(r(7294),r(3905)),i=["components"],s={id:"coordsystems",title:"Coordinate systems",sidebar_label:"Coordinate systems",slug:"/core-library/coordsystems"},l={unversionedId:"core-library/coordsystems",id:"core-library/coordsystems",isDocsHomePage:!1,title:"Coordinate systems",description:"The H3 Core Library uses the following coordinate systems internally.",source:"@site/docs/core-library/coordsystems.md",sourceDirName:"core-library",slug:"/core-library/coordsystems",permalink:"/docs/next/core-library/coordsystems",editUrl:"https://github.com/uber/h3/edit/master/website/docs/core-library/coordsystems.md",version:"current",sidebar_label:"Coordinate systems",frontMatter:{id:"coordsystems",title:"Coordinate systems",sidebar_label:"Coordinate systems",slug:"/core-library/coordsystems"},sidebar:"someSidebar",previous:{title:"H3 Index Representations",permalink:"/docs/next/core-library/h3Indexing"},next:{title:"Creating bindings for H3",permalink:"/docs/next/core-library/creating-bindings"}},c=[{value:"IJK Coordinates",id:"ijk-coordinates",children:[]},{value:"FaceIJK Coordinates",id:"faceijk-coordinates",children:[]},{value:"Hex2d Coordinates",id:"hex2d-coordinates",children:[]},{value:"Local IJ Coordinates",id:"local-ij-coordinates",children:[]}],d={toc:c};function m(e){var t=e.components,r=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"The H3 Core Library uses the following coordinate systems internally."),(0,o.kt)("h2",{id:"ijk-coordinates"},"IJK Coordinates"),(0,o.kt)("p",null,"Discrete hexagon planar grid systems naturally have 3 coordinate axes spaced 120","\xb0"," apart. We refer to such a system as an ",(0,o.kt)("em",{parentName:"p"},"ijk coordinate system"),", for the three coordinate axes ",(0,o.kt)("em",{parentName:"p"},"i"),", ",(0,o.kt)("em",{parentName:"p"},"j"),", and ",(0,o.kt)("em",{parentName:"p"},"k"),". A single ",(0,o.kt)("em",{parentName:"p"},"ijk")," coordinate triplet is represented in the H3 Core Library using the structure type ",(0,o.kt)("inlineCode",{parentName:"p"},"CoordIJK"),"."),(0,o.kt)("p",null,"Using an ",(0,o.kt)("em",{parentName:"p"},"ijk")," coordinate system to address hexagon grid cells provides multiple valid addresses for each cell. ",(0,o.kt)("em",{parentName:"p"},"Normalizing")," an ",(0,o.kt)("em",{parentName:"p"},"ijk")," address (function ",(0,o.kt)("inlineCode",{parentName:"p"},"_ijkNormalize"),") creates a unique address consisting of the minimal positive ",(0,o.kt)("em",{parentName:"p"},"ijk")," components; this always results in at most two non-zero components."),(0,o.kt)("div",{align:"center"},(0,o.kt)("img",{height:"300",src:"/images/ijkp.png"})),(0,o.kt)("h2",{id:"faceijk-coordinates"},"FaceIJK Coordinates"),(0,o.kt)("p",null,"The H3 Core Library centers an ",(0,o.kt)("em",{parentName:"p"},"ijk")," coordinate system on each face of the icosahedron; the combination of a face number and ",(0,o.kt)("em",{parentName:"p"},"ijk")," coordinates on that face's coordinate system is represented using the structure type ",(0,o.kt)("inlineCode",{parentName:"p"},"FaceIJK"),"."),(0,o.kt)("p",null,"Each grid resolution is rotated ~19.1","\xb0"," relative to the next coarser resolution. The rotation alternates between counterclockwise and clockwise at each successive resolution, so that each resolution will have one of two possible orientations: ",(0,o.kt)("em",{parentName:"p"},"Class II")," or ",(0,o.kt)("em",{parentName:"p"},"Class III")," (using a terminology coined by R. Buckminster Fuller). The base cells, which make up resolution 0, are ",(0,o.kt)("em",{parentName:"p"},"Class II"),"."),(0,o.kt)("div",{align:"center"},(0,o.kt)("img",{height:"300",src:"/images/classII.III.png"})),(0,o.kt)("h2",{id:"hex2d-coordinates"},"Hex2d Coordinates"),(0,o.kt)("p",null,"A ",(0,o.kt)("em",{parentName:"p"},"Hex2d")," coordinate system is a cartesian coordinate system associated with a specific ",(0,o.kt)("em",{parentName:"p"},"ijk")," coordinate system, where:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"the origin of the ",(0,o.kt)("em",{parentName:"li"},"Hex2d")," system is centered on the origin cell of the ",(0,o.kt)("em",{parentName:"li"},"ijk")," system, "),(0,o.kt)("li",{parentName:"ul"},"the positive ",(0,o.kt)("em",{parentName:"li"},"x"),"-axis of the ",(0,o.kt)("em",{parentName:"li"},"Hex2d")," system is aligned with the ",(0,o.kt)("em",{parentName:"li"},"i"),"-axis of the ",(0,o.kt)("em",{parentName:"li"},"ijk")," system, and"),(0,o.kt)("li",{parentName:"ul"},"1.0 unit distance in the ",(0,o.kt)("em",{parentName:"li"},"Hex2d")," system is the distance between adjacent cell centers in the ",(0,o.kt)("em",{parentName:"li"},"ijk")," coordinate system.")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Hex2d")," coordinates are represented using the structure type ",(0,o.kt)("inlineCode",{parentName:"p"},"Vec2d"),"."),(0,o.kt)("h2",{id:"local-ij-coordinates"},"Local IJ Coordinates"),(0,o.kt)("p",null,"Algorithms working with hexagons may want to refer to grid coordinates that are not interrupted by base cells or faces. These coordinates have 2 coordinate axes spaced 120","\xb0"," apart, with the coordinates anchored by an ",(0,o.kt)("em",{parentName:"p"},"origin")," H3 index."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"local coordinates are only comparable when they have the same ",(0,o.kt)("em",{parentName:"li"},"origin")," index."),(0,o.kt)("li",{parentName:"ul"},"local coordinates are only valid near the ",(0,o.kt)("em",{parentName:"li"},"origin"),". Pratically, this is within the same base cell or a neighboring base cell, except for pentagons."),(0,o.kt)("li",{parentName:"ul"},"the coordinate space may have deleted or warped regions due to pentagon distortion."),(0,o.kt)("li",{parentName:"ul"},"there may be multiple coordinates for the same index, with the same ",(0,o.kt)("em",{parentName:"li"},"origin"),"."),(0,o.kt)("li",{parentName:"ul"},"the ",(0,o.kt)("em",{parentName:"li"},"origin")," may not be at ",(0,o.kt)("inlineCode",{parentName:"li"},"(0, 0)")," in the local coordinate space.")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Local IJ")," coordinates are represented using the structure type ",(0,o.kt)("inlineCode",{parentName:"p"},"CoordIJ")," and an associated ",(0,o.kt)("em",{parentName:"p"},"origin")," ",(0,o.kt)("inlineCode",{parentName:"p"},"H3Index"),"."))}m.isMDXComponent=!0}}]);