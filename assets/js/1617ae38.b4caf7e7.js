"use strict";(self.webpackChunkh3_website=self.webpackChunkh3_website||[]).push([[9810],{3905:function(e,t,r){r.d(t,{Zo:function(){return s},kt:function(){return m}});var a=r(7294);function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,a,l=function(e,t){if(null==e)return{};var r,a,l={},n=Object.keys(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}var o=a.createContext({}),h=function(e){var t=a.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=h(e.components);return a.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var r=e.components,l=e.mdxType,n=e.originalType,o=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),p=h(r),m=l,d=p["".concat(o,".").concat(m)]||p[m]||c[m]||n;return r?a.createElement(d,i(i({ref:t},s),{},{components:r})):a.createElement(d,i({ref:t},s))}));function m(e,t){var r=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var n=r.length,i=new Array(n);i[0]=p;var u={};for(var o in t)hasOwnProperty.call(t,o)&&(u[o]=t[o]);u.originalType=e,u.mdxType="string"==typeof e?e:l,i[1]=u;for(var h=2;h<n;h++)i[h]=r[h];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}p.displayName="MDXCreateElement"},6997:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return u},contentTitle:function(){return o},metadata:function(){return h},toc:function(){return s},default:function(){return p}});var a=r(3117),l=r(102),n=(r(7294),r(3905)),i=["components"],u={id:"bindings",title:"Bindings",sidebar_label:"Bindings",slug:"/community/bindings"},o=void 0,h={unversionedId:"community/bindings",id:"community/bindings",isDocsHomePage:!1,title:"Bindings",description:"As a C library, bindings can be made to call H3 functions from different programming languages. This page lists different bindings currently available. Contributions to this list are welcome, please feel free to open a pull request.",source:"@site/docs/community/bindings.md",sourceDirName:"community",slug:"/community/bindings",permalink:"/docs/next/community/bindings",editUrl:"https://github.com/uber/h3/edit/master/website/docs/community/bindings.md",tags:[],version:"current",frontMatter:{id:"bindings",title:"Bindings",sidebar_label:"Bindings",slug:"/community/bindings"},sidebar:"someSidebar",previous:{title:"Miscellaneous",permalink:"/docs/next/api/misc"},next:{title:"Libraries Using H3",permalink:"/docs/next/community/libraries"}},s=[{value:"Athena",id:"athena",children:[],level:2},{value:"Azure Data Explorer",id:"azure-data-explorer",children:[],level:2},{value:"BigQuery",id:"bigquery",children:[],level:2},{value:"C#",id:"c",children:[],level:2},{value:"ClickHouse",id:"clickhouse",children:[],level:2},{value:"Clojure",id:"clojure",children:[],level:2},{value:"Dart",id:"dart",children:[],level:2},{value:"DuckDB",id:"duckdb",children:[],level:2},{value:"ECL",id:"ecl",children:[],level:2},{value:"Erlang",id:"erlang",children:[],level:2},{value:"Go",id:"go",children:[],level:2},{value:"Java",id:"java",children:[],level:2},{value:"JavaScript",id:"javascript",children:[],level:2},{value:"Julia",id:"julia",children:[],level:2},{value:"OCaml",id:"ocaml",children:[],level:2},{value:"Perl",id:"perl",children:[],level:2},{value:"PHP",id:"php",children:[],level:2},{value:"PostgreSQL",id:"postgresql",children:[],level:2},{value:"Python",id:"python",children:[],level:2},{value:"R",id:"r",children:[],level:2},{value:"Ruby",id:"ruby",children:[],level:2},{value:"Rust",id:"rust",children:[],level:2},{value:"Snowflake",id:"snowflake",children:[],level:2},{value:"SQLite3",id:"sqlite3",children:[],level:2},{value:"Spark",id:"spark",children:[],level:2}],c={toc:s};function p(e){var t=e.components,r=(0,l.Z)(e,i);return(0,n.kt)("wrapper",(0,a.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"As a C library, bindings can be made to call H3 functions from different programming languages. This page lists different bindings currently available. Contributions to this list are welcome, please feel free to open a ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/uber/h3/tree/master/website/docs/community/bindings.md"},"pull request"),"."),(0,n.kt)("h2",{id:"athena"},"Athena"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/daniel-cortez-stevenson/aws-athena-udfs-h3"},"daniel-cortez-stevenson/aws-athena-udfs-h3"))),(0,n.kt)("h2",{id:"azure-data-explorer"},"Azure Data Explorer"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/geo-point-to-h3cell-function"},"Functions for Working with H3 Indexes"))),(0,n.kt)("h2",{id:"bigquery"},"BigQuery"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/CartoDB/analytics-toolbox-core#bigquery"},"CARTO Analytics Toolbox"))),(0,n.kt)("h2",{id:"c"},"C","#"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/entrepreneur-interet-general/H3.Standard"},"entrepreneur-interet-general/h3.standard")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/RichardVasquez/h3net"},"richardvasquez/h3net")," - A translation instead of a binding"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/pocketken/H3.net"},"pocketken/H3.net")," - A translation instead of a binding")),(0,n.kt)("h2",{id:"clickhouse"},"ClickHouse"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://clickhouse.tech/docs/en/sql-reference/functions/geo/h3/"},"Functions for Working with H3 Indexes"))),(0,n.kt)("h2",{id:"clojure"},"Clojure"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/Factual/geo"},"Factual/geo"))),(0,n.kt)("h2",{id:"dart"},"Dart"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/festelo/h3_flutter"},"festelo/h3_flutter"))),(0,n.kt)("h2",{id:"duckdb"},"DuckDB"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/isaacbrodsky/h3-duckdb"},"isaacbrodsky/h3-duckdb"))),(0,n.kt)("h2",{id:"ecl"},"ECL"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/hpcc-systems/HPCC-Platform/tree/master/plugins/h3"},"hpcc-systems/HPCC-Platform"))),(0,n.kt)("h2",{id:"erlang"},"Erlang"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/helium/erlang-h3"},"helium/erlang-h3"))),(0,n.kt)("h2",{id:"go"},"Go"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/uber/h3-go"},"uber/h3-go"))),(0,n.kt)("h2",{id:"java"},"Java"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/uber/h3-java"},"uber/h3-java"))),(0,n.kt)("h2",{id:"javascript"},"JavaScript"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/uber/h3-js"},"uber/h3-js")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/dfellis/h3-node"},"dfellis/h3-node")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/realPrimoh/h3-reactnative"},"realPrimoh/h3-reactnative"))),(0,n.kt)("h2",{id:"julia"},"Julia"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/wookay/H3.jl"},"wookay/H3.jl"))),(0,n.kt)("h2",{id:"ocaml"},"OCaml"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/travisbrady/ocaml-h3"},"travisbrady/ocaml-h3"))),(0,n.kt)("h2",{id:"perl"},"Perl"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://metacpan.org/pod/Geo::H3"},"mrdvt92/perl-Geo-H3"))),(0,n.kt)("h2",{id:"php"},"PHP"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/neatlife/php-h3"},"neatlife/php-h3"))),(0,n.kt)("h2",{id:"postgresql"},"PostgreSQL"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/bytesandbrains/h3-pg"},"bytesandbrains/h3-pg"))),(0,n.kt)("h2",{id:"python"},"Python"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/uber/h3-py"},"uber/h3-py")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/DahnJ/H3-Pandas"},"DahnJ/H3-Pandas"))),(0,n.kt)("h2",{id:"r"},"R"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/scottmmjackson/h3r"},"scottmmjackson/h3r")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/crazycapivara/h3-r"},"crazycapivara/h3-r")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/obrl-soil/h3jsr"},"obrl-soil/h3jsr"))),(0,n.kt)("h2",{id:"ruby"},"Ruby"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/StuartApp/h3_ruby"},"StuartApp/h3_ruby"))),(0,n.kt)("h2",{id:"rust"},"Rust"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/rustyconover/libh3-sys"},"rustyconover/libh3-sys")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/rustyconover/libh3"},"rustyconover/libh3")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/nmandery/h3ron"},"nmandery/h3ron"))),(0,n.kt)("h2",{id:"snowflake"},"Snowflake"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/CartoDB/analytics-toolbox-core#snowflake"},"CARTO Analytics Toolbox"))),(0,n.kt)("h2",{id:"sqlite3"},"SQLite3"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/isaacbrodsky/h3-sqlite3"},"isaacbrodsky/h3-sqlite3"))),(0,n.kt)("h2",{id:"spark"},"Spark"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/kevinschaich/h3-pyspark"},"kevinschaich/h3-pyspark"))))}p.isMDXComponent=!0}}]);