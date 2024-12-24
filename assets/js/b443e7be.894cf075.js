"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[953],{9559:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>i,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"modules/http","title":"http","description":"this module is used for exposing http routes for use in apis and other purposes.","source":"@site/docs/modules/http.md","sourceDirName":"modules","slug":"/modules/http","permalink":"/modules/http","draft":false,"unlisted":false,"editUrl":"https://github.com/realtux/exa/tree/master/docs/docs/modules/http.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"configuration","permalink":"/modules/configuration"},"next":{"title":"console","permalink":"/modules/console"}}');var s=n(4848),o=n(8453);const i={sidebar_position:2},a="http",l={},d=[{value:"concept",id:"concept",level:2},{value:"internal handling",id:"internal-handling",level:2},{value:"anatomy of an http file",id:"anatomy-of-an-http-file",level:2},{value:"routes",id:"routes",level:3},{value:"middleware",id:"middleware",level:3}];function h(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"http",children:"http"})}),"\n",(0,s.jsx)(t.p,{children:"this module is used for exposing http routes for use in apis and other purposes."}),"\n",(0,s.jsx)(t.h2,{id:"concept",children:"concept"}),"\n",(0,s.jsxs)(t.p,{children:["files are organized within the ",(0,s.jsx)(t.code,{children:"http"})," directory in any manner desired. a common pattern used is to have directories in the same structure that your urls will ultimately be, however, this is entirely up to you. exa.js on start will process all files recursively that are present in the ",(0,s.jsx)(t.code,{children:"http"})," directory."]}),"\n",(0,s.jsx)(t.h2,{id:"internal-handling",children:"internal handling"}),"\n",(0,s.jsx)(t.p,{children:"http server and routes and implemented using express.js, a well known and trusted http server. everything express.js supports is also supported in exa.js."}),"\n",(0,s.jsx)(t.h2,{id:"anatomy-of-an-http-file",children:"anatomy of an http file"}),"\n",(0,s.jsx)(t.p,{children:"the following is the structure of an http file"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",metastring:'title="http/sample.js"',children:"import authorized from '#app/middleware/authorized.js';\n\nexport default new class {\n\n    routes = {\n        'get /hello/world': 'world',\n    }\n\n    middleware = {\n        '*': [authorized]\n    }\n\n    async world(req, res) {\n        return res\n            .status(200)\n            .send({\n                message: 'hello world'\n            });\n    }\n\n};\n"})}),"\n",(0,s.jsx)(t.h3,{id:"routes",children:"routes"}),"\n",(0,s.jsx)(t.p,{children:"each route is a key composed of the http method and route path or pattern with a string value of the name of the method it should call. because this just wraps express.js internally, it supports everything express.js supports, including:"}),"\n",(0,s.jsx)(t.p,{children:"basic routes"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"routes = {\n    'get /hello/world': 'world',\n}\n"})}),"\n",(0,s.jsx)(t.p,{children:"regex routes"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"routes = {\n    'get /pets/(dog|cat)': 'pet',\n}\n"})}),"\n",(0,s.jsx)(t.p,{children:"param routes"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"routes = {\n    'get /blogs/:blog_id': 'get_blog',\n}\n"})}),"\n",(0,s.jsx)(t.h3,{id:"middleware",children:"middleware"}),"\n",(0,s.jsx)(t.p,{children:"one or more pieces of middleware can be ran prior to the route method being called. this middleware is great for many purposes such as authentication, setting context variables, or performing pre-route logic."}),"\n",(0,s.jsx)(t.p,{children:"a middleware file looks like this:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",metastring:'title="middleware/authorized.js"',children:"export default async (req, res, next) => {\n    // middleware logic\n    if (req.headers.authorization !== 'abc123') {\n        return res\n            .status(401)\n            .send();\n    }\n\n    return next();\n};\n"})}),"\n",(0,s.jsxs)(t.p,{children:["this middleware checks an api key to see if it's the right value. if it's not, a 401 unauthorized response is received, otherwise ",(0,s.jsx)(t.code,{children:"next()"})," is called which either calls the next middleware in the chain or calls the route method."]}),"\n",(0,s.jsxs)(t.p,{children:["to use middleware, add key/value pairs to the ",(0,s.jsx)(t.code,{children:"middleware"})," object. the key should be the method name and the value should be an array of middleware to run."]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"// apply authorized middleware to all routes\nmiddleware = {\n    '*': [authorized],\n}\n\n// apply authorized middleware to one route\nmiddleware = {\n    hello: [authorized],\n}\n\n// apply authorized middleware to all routes except for hello\nmiddleware = {\n    '*': [authorized],\n    hello: []\n}\n\n// apply common and authorized middleware to all routes\nmiddleware = {\n    '*': [common, authorized],\n}\n"})}),"\n",(0,s.jsxs)(t.p,{children:["middleware precedence is top to bottom. this is why everything works in the third example. ",(0,s.jsx)(t.code,{children:"hello"})," has a value of blank array."]})]})}function c(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>a});var r=n(6540);const s={},o=r.createContext(s);function i(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);