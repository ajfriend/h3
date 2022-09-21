"use strict";(self.webpackChunkh3_website=self.webpackChunkh3_website||[]).push([[1906],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>u});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),s=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=s(e.components);return o.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),m=s(n),u=r,h=m["".concat(l,".").concat(u)]||m[u]||p[u]||a;return n?o.createElement(h,i(i({ref:t},d),{},{components:n})):o.createElement(h,i({ref:t},d))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var s=2;s<a;s++)i[s]=n[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3107:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>c,toc:()=>s});var o=n(7462),r=(n(7294),n(3905));const a={id:"h3ToGeoDesc",title:"Determine the latitude/longitude coordinates of the center point of an H3Index cell",sidebar_label:"Determine the latitude/longitude coordinates of the center point of an H3Index cell",slug:"/core-library/h3ToGeoDesc"},i=void 0,c={unversionedId:"core-library/h3ToGeoDesc",id:"version-3.x/core-library/h3ToGeoDesc",title:"Determine the latitude/longitude coordinates of the center point of an H3Index cell",description:"This operation is performed by function h3ToGeo. See the comments in the function source code for more detail.",source:"@site/versioned_docs/version-3.x/core-library/h3ToGeoDesc.md",sourceDirName:"core-library",slug:"/core-library/h3ToGeoDesc",permalink:"/docs/3.x/core-library/h3ToGeoDesc",draft:!1,editUrl:"https://github.com/uber/h3/edit/master/website/docs/core-library/h3ToGeoDesc.md",tags:[],version:"3.x",frontMatter:{id:"h3ToGeoDesc",title:"Determine the latitude/longitude coordinates of the center point of an H3Index cell",sidebar_label:"Determine the latitude/longitude coordinates of the center point of an H3Index cell",slug:"/core-library/h3ToGeoDesc"},sidebar:"version-3.x/someSidebar",previous:{title:"Conversion from latitude/longitude to containing H3 cell index",permalink:"/docs/3.x/core-library/geoToH3desc"},next:{title:"Generate the cell boundary in latitude/longitude coordinates of an H3Index cell",permalink:"/docs/3.x/core-library/h3ToGeoBoundaryDesc"}},l={},s=[],d={toc:s};function p(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"This operation is performed by function ",(0,r.kt)("inlineCode",{parentName:"p"},"h3ToGeo"),". See the comments in the function source code for more detail."),(0,r.kt)("p",null,"The conversion is performed as a series of coordinate system conversions described below. See the page ",(0,r.kt)("a",{parentName:"p",href:"/docs/core-library/coordsystems"},"Coordinate Systems used by the H3 Core Library")," for more information on each of these coordinate systems."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The function ",(0,r.kt)("inlineCode",{parentName:"li"},"_h3ToFaceIjk")," then converts the H3 index to the appropriate icosahedron face number and normalized ",(0,r.kt)("em",{parentName:"li"},"ijk")," coordinate's on that face's coordinate system as follows:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"We start by assuming that the cell center point falls on the same icosahedron face as its base cell."),(0,r.kt)("li",{parentName:"ul"},"It is possible that the cell center point lies on an adjacent face (termed an ",(0,r.kt)("em",{parentName:"li"},"overage")," in the code), in which case we would need to use a projection centered on that adjacent face instead. We recall that normalized ",(0,r.kt)("em",{parentName:"li"},"ijk")," coordinates have at most two non-zero components, and that in a face-centered Class II system the sum of those components is a resolution-specific constant value for cells that lie on the edge of that icosahedral face.\nWe determine whether an overage exists by taking the sum of the ",(0,r.kt)("em",{parentName:"li"},"ijk")," components, and if there is an overage the positive ",(0,r.kt)("em",{parentName:"li"},"ijk")," components indicate which adjacent face the cell center lies on. A lookup operation is then performed to find the appropriate rotation and translation to transform the ",(0,r.kt)("em",{parentName:"li"},"ijk")," coordinates into the adjacent face-centered ",(0,r.kt)("em",{parentName:"li"},"ijk")," system.")))),(0,r.kt)("div",{align:"center"},(0,r.kt)("img",{height:"300",src:"/images/triEdge.png"})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The face-centered ",(0,r.kt)("em",{parentName:"li"},"ijk")," coordinates are then converted into corresponding ",(0,r.kt)("em",{parentName:"li"},"Hex2d")," coordinates using the function ",(0,r.kt)("inlineCode",{parentName:"li"},"_ijkToHex2d"),"."),(0,r.kt)("li",{parentName:"ul"},"The function ",(0,r.kt)("inlineCode",{parentName:"li"},"_hex2dToGeo")," takes the ",(0,r.kt)("em",{parentName:"li"},"Hex2d")," coordinates and scales them into face-centered gnomonic coordinates, and then performs an inverse gnomonic projection to get the latitude/longitude coordinates.")))}p.isMDXComponent=!0}}]);