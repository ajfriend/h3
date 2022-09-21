"use strict";(self.webpackChunkh3_website=self.webpackChunkh3_website||[]).push([[2651],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),f=s(n),d=i,h=f["".concat(c,".").concat(d)]||f[d]||p[d]||a;return n?r.createElement(h,o(o({ref:t},u),{},{components:n})):r.createElement(h,o({ref:t},u))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var s=2;s<a;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},2257:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var r=n(7462),i=(n(7294),n(3905));const a={id:"quickstart",title:"Quick Start",sidebar_label:"Quick Start",slug:"/quickstart"},o=void 0,l={unversionedId:"quickstart",id:"quickstart",title:"Quick Start",description:"This page shows you how to get started with the functions in H3 that convert points to cell identifiers, and from cell identifiers back to geometry. These are the core indexing functions used in many applications of H3.",source:"@site/docs/quickstart.md",sourceDirName:".",slug:"/quickstart",permalink:"/docs/quickstart",draft:!1,editUrl:"https://github.com/uber/h3/edit/master/website/docs/quickstart.md",tags:[],version:"current",frontMatter:{id:"quickstart",title:"Quick Start",sidebar_label:"Quick Start",slug:"/quickstart"},sidebar:"someSidebar",previous:{title:"Installation",permalink:"/docs/installation"},next:{title:"Migration guide",permalink:"/docs/library/migrating-3.x"}},c={},s=[{value:"Point / cell",id:"point--cell",level:2}],u={toc:s};function p(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"This page shows you how to get started with the functions in H3 that convert points to cell identifiers, and from cell identifiers back to geometry. These are the core indexing functions used in many applications of H3."),(0,i.kt)("p",null,"You can run the code on this page directly in your browser. The page uses the JavaScript bindings for H3 to run the code, or follow along with the same API in ",(0,i.kt)("a",{parentName:"p",href:"/docs/community/bindings"},"your preferred programming language"),"."),(0,i.kt)("h2",{id:"point--cell"},"Point / cell"),(0,i.kt)("p",null,"First, we'll take the coordinates of the Ferry Building in San Francisco and find the containing H3 cell:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:"live",live:!0},"function example() {\n  const lat = 37.7955;\n  const lng = -122.3937;\n  const res = 10;\n  return h3.latLngToCell(lat, lng, res);\n}\n")),(0,i.kt)("p",null,"The result is the identifier of the hexagonal cell in H3 containing this point. We can retrieve the center of this cell:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:"live",live:!0},"function example() {\n  const h = '8a283082a677fff';\n  return h3.cellToLatLng(h);\n}\n")),(0,i.kt)("p",null,"Note that the result of this example is not our original coordinates. That's because the identifier represents the hexagonal cell, not the coordinates. All points indexed in H3 within the bounds of this cell will have the same identifier. We can find the bounds of this cell:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:"live",live:!0},"function example() {\n  const h = '8a283082a677fff';\n  return h3.cellToBoundary(h);\n}\n")))}p.isMDXComponent=!0}}]);