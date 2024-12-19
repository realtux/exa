"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[611],{8984:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>i,default:()=>h,frontMatter:()=>c,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"modules/websockets","title":"websockets","description":"this module is used for exposing urls that upgrade to websocket connections.","source":"@site/docs/modules/websockets.md","sourceDirName":"modules","slug":"/modules/websockets","permalink":"/exa/exa/modules/websockets","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/modules/websockets.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"configuration","permalink":"/exa/exa/modules/configuration"}}');var o=s(4848),r=s(8453);const c={sidebar_position:2},i="websockets",a={},l=[{value:"concept",id:"concept",level:2},{value:"internal handling",id:"internal-handling",level:2},{value:"file structure",id:"file-structure",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"websockets",children:"websockets"})}),"\n",(0,o.jsx)(n.p,{children:"this module is used for exposing urls that upgrade to websocket connections."}),"\n",(0,o.jsx)(n.h2,{id:"concept",children:"concept"}),"\n",(0,o.jsxs)(n.p,{children:["zero or more files are created in the ",(0,o.jsx)(n.code,{children:"websocket"})," directory. each file is intended to be used for a single url that upgrades to websocket. the file can be named anything and has no effect on functionality. all files in the ",(0,o.jsx)(n.code,{children:"websocket"})," folder will be loaded and processed when ",(0,o.jsx)(n.code,{children:"exa.js"})," starts."]}),"\n",(0,o.jsx)(n.h2,{id:"internal-handling",children:"internal handling"}),"\n",(0,o.jsxs)(n.p,{children:["the websocket server implementation is handled using the well known and trusted ",(0,o.jsx)(n.code,{children:"ws"})," module. this module largely just wraps ",(0,o.jsx)(n.code,{children:"wss.on('connection', callback)"}),". connections are upgraded from regular http requests rather than running entirely separate servers on separate ports. this makes enabling websockets very easy."]}),"\n",(0,o.jsx)(n.h2,{id:"file-structure",children:"file structure"}),"\n",(0,o.jsx)(n.p,{children:"a websocket handler looks like this:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",metastring:'title="websocket/handler.js"',children:"export default new class {\n\n    // optional, defines route to handle\n    route = '/'\n\n    // will be called for each websocket connection that is established\n    connection(socket, req) {\n        console.log('new connection');\n\n        socket.on('message', data => {\n            console.log('new message', data);\n        });\n\n        socket.on('close', () => {\n            console.log('connection closed');\n        });\n\n        socket.on('error', err => {\n            console.log('ws error', err);\n        });\n    }\n\n}\n"})}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"route"})," is optional and defaults to ",(0,o.jsx)(n.code,{children:"/"})," if not supplied. this variable makes it possible to run separate servers on separate urls. whether this is useful or not depends on what you are building."]}),"\n",(0,o.jsxs)(n.p,{children:["the ",(0,o.jsx)(n.code,{children:"connection"})," callback is called on each new connection with ",(0,o.jsx)(n.code,{children:"socket"})," referring to the native ",(0,o.jsx)(n.code,{children:"ws"})," socket object and ",(0,o.jsx)(n.code,{children:"req"})," representing the http request that was received prior to upgrading."]}),"\n",(0,o.jsxs)(n.p,{children:["a very basic set of event listeners is provided in the example. for all options, please refer to the ",(0,o.jsx)(n.code,{children:"ws"})," documentation."]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>c,x:()=>i});var t=s(6540);const o={},r=t.createContext(o);function c(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:c(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);