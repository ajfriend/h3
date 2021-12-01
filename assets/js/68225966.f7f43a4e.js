"use strict";(self.webpackChunkh3_website=self.webpackChunkh3_website||[]).push([[6585],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return c}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var d=n.createContext({}),s=function(e){var t=n.useContext(d),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(d.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,d=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),m=s(r),c=a,g=m["".concat(d,".").concat(c)]||m[c]||p[c]||l;return r?n.createElement(g,i(i({ref:t},u),{},{components:r})):n.createElement(g,i({ref:t},u))}));function c(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,i=new Array(l);i[0]=m;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var s=2;s<l;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},1508:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return o},contentTitle:function(){return d},metadata:function(){return s},toc:function(){return u},default:function(){return m}});var n=r(3117),a=r(102),l=(r(7294),r(3905)),i=["components"],o={id:"errors",title:"Error handling",sidebar_label:"Error handling",slug:"/library/errors"},d=void 0,s={unversionedId:"library/errors",id:"library/errors",isDocsHomePage:!1,title:"Error handling",description:"H3 does it's best to be robust to system failures or unexpected inputs, but",source:"@site/docs/library/errors.md",sourceDirName:"library",slug:"/library/errors",permalink:"/docs/next/library/errors",editUrl:"https://github.com/uber/h3/edit/master/website/docs/library/errors.md",tags:[],version:"current",frontMatter:{id:"errors",title:"Error handling",sidebar_label:"Error handling",slug:"/library/errors"},sidebar:"someSidebar",previous:{title:"Terminology",permalink:"/docs/next/library/terminology"},next:{title:"Tables of cell stats",permalink:"/docs/next/core-library/restable"}},u=[{value:"Example",id:"example",children:[],level:2},{value:"H3Error type",id:"h3error-type",children:[],level:2},{value:"Table of error codes",id:"table-of-error-codes",children:[{value:"Bindings",id:"bindings",children:[],level:3}],level:2},{value:"References",id:"references",children:[],level:2}],p={toc:u};function m(e){var t=e.components,r=(0,a.Z)(e,i);return(0,l.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"H3 does it's best to be robust to system failures or unexpected inputs, but\nsome times these cannot be recovered from. H3's way of doing this is to return\nan error code to the caller."),(0,l.kt)("h2",{id:"example"},"Example"),(0,l.kt)("p",null,"This code example checks for an error when calling an H3 function and prints a message if the call did not succeed:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-c"},'H3Error err;\nH3Index result;\n\nerr = latLngToCell(lat, lng, res, &result);\nif (err) {\n    fprintf(stderr, "Error: %d", err);\n}\n')),(0,l.kt)("h2",{id:"h3error-type"},"H3Error type"),(0,l.kt)("p",null,"The type returned by most H3 functions is ",(0,l.kt)("inlineCode",{parentName:"p"},"H3Error"),", a 32 bit integer type with the following properties:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"H3Error")," will be an integer type of 32 bits, i.e. ",(0,l.kt)("inlineCode",{parentName:"li"},"uint32_t"),"."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"H3Error")," with value 0 indicates success (no error)."),(0,l.kt)("li",{parentName:"ul"},"No ",(0,l.kt)("inlineCode",{parentName:"li"},"H3Error")," value will set the most significant bit."),(0,l.kt)("li",{parentName:"ul"},"As a result of these properties, no ",(0,l.kt)("inlineCode",{parentName:"li"},"H3Error")," value will set the bits that correspond with the ",(0,l.kt)("strong",{parentName:"li"},"Mode")," bit field in an ",(0,l.kt)("inlineCode",{parentName:"li"},"H3Index"),".")),(0,l.kt)("p",null,"32 bit return codes with the high bit never set allows for mixing error codes and resulting indexes if desired by the application, after copying the error codes into the result buffer."),(0,l.kt)("h2",{id:"table-of-error-codes"},"Table of error codes"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Value"),(0,l.kt)("th",{parentName:"tr",align:null},"Name"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"0"),(0,l.kt)("td",{parentName:"tr",align:null},"E_SUCCESS"),(0,l.kt)("td",{parentName:"tr",align:null},"Success (no error)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"1"),(0,l.kt)("td",{parentName:"tr",align:null},"E_FAILED"),(0,l.kt)("td",{parentName:"tr",align:null},"The operation failed but a more specific error is not available")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"2"),(0,l.kt)("td",{parentName:"tr",align:null},"E_DOMAIN"),(0,l.kt)("td",{parentName:"tr",align:null},"Argument was outside of acceptable range (when a more specific error code is not available)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"3"),(0,l.kt)("td",{parentName:"tr",align:null},"E_LATLNG_DOMAIN"),(0,l.kt)("td",{parentName:"tr",align:null},"Latitude or longitude arguments were outside of acceptable range")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"4"),(0,l.kt)("td",{parentName:"tr",align:null},"E_RES_DOMAIN"),(0,l.kt)("td",{parentName:"tr",align:null},"Resolution argument was outside of acceptable range")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"5"),(0,l.kt)("td",{parentName:"tr",align:null},"E_CELL_INVALID"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"H3Index")," cell argument was not valid")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"6"),(0,l.kt)("td",{parentName:"tr",align:null},"E_DIR_EDGE_INVALID"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"H3Index")," directed edge argument was not valid")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"7"),(0,l.kt)("td",{parentName:"tr",align:null},"E_UNDIR_EDGE_INVALID"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"H3Index")," undirected edge argument was not valid")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"8"),(0,l.kt)("td",{parentName:"tr",align:null},"E_VERTEX_INVALID"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"H3Index")," vertex argument was not valid")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"9"),(0,l.kt)("td",{parentName:"tr",align:null},"E_PENTAGON"),(0,l.kt)("td",{parentName:"tr",align:null},"Pentagon distortion was encountered which the algorithm could not handle it")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"10"),(0,l.kt)("td",{parentName:"tr",align:null},"E_DUPLICATE_INPUT"),(0,l.kt)("td",{parentName:"tr",align:null},"Duplicate input was encountered in the arguments and the algorithm could not handle it")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"11"),(0,l.kt)("td",{parentName:"tr",align:null},"E_NOT_NEIGHBORS"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"H3Index")," cell arguments were not neighbors")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"12"),(0,l.kt)("td",{parentName:"tr",align:null},"E_RES_MISMATCH"),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"H3Index")," cell arguments had incompatible resolutions")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"13"),(0,l.kt)("td",{parentName:"tr",align:null},"E_MEMORY"),(0,l.kt)("td",{parentName:"tr",align:null},"Necessary memory allocation failed")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"14"),(0,l.kt)("td",{parentName:"tr",align:null},"E_MEMORY_BOUNDS"),(0,l.kt)("td",{parentName:"tr",align:null},"Bounds of provided memory were not large enough")))),(0,l.kt)("p",null,"The H3 library may always add additional error messages. Error messages not recognized by the application should be treated as ",(0,l.kt)("inlineCode",{parentName:"p"},"E_FAILED"),"."),(0,l.kt)("h3",{id:"bindings"},"Bindings"),(0,l.kt)("p",null,"Bindings translate error codes into the error handling mechanism appropriate to their language. For example, Java will convert error codes into Java Exceptions."),(0,l.kt)("p",null,"When possible, it is preferable to retain the error code. When this is not possible it is fine to elide them. Language bindings should include error messages that are formatted as is usual in their language."),(0,l.kt)("h2",{id:"references"},"References"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://github.com/uber/h3/blob/master/dev-docs/RFCs/v4.0.0/error-handling-rfc.md"},"Technical RFC on error handling"))))}m.isMDXComponent=!0}}]);