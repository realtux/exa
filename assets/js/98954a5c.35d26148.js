"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[907],{8563:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"modules/configuration","title":"configuration","description":"concept","source":"@site/docs/modules/configuration.md","sourceDirName":"modules","slug":"/modules/configuration","permalink":"/modules/configuration","draft":false,"unlisted":false,"editUrl":"https://github.com/realtux/exa/tree/master/docs/docs/modules/configuration.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"tutorialSidebar","previous":{"title":"modules","permalink":"/category/modules"},"next":{"title":"http","permalink":"/modules/http"}}');var o=s(4848),t=s(8453);const r={sidebar_position:1},l="configuration",c={},d=[{value:"concept",id:"concept",level:2},{value:"base configuration",id:"base-configuration",level:2},{value:"environment",id:"environment",level:3},{value:"http",id:"http",level:3},{value:"database",id:"database",level:3},{value:"console",id:"console",level:3},{value:"views",id:"views",level:3},{value:"public",id:"public",level:3},{value:"user defined configuration",id:"user-defined-configuration",level:3},{value:"environment configuration",id:"environment-configuration",level:2}];function a(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"configuration",children:"configuration"})}),"\n",(0,o.jsx)(n.h2,{id:"concept",children:"concept"}),"\n",(0,o.jsx)(n.p,{children:"configuration is intended to exist in two locations, one for your base configuration, and one for environment configuration."}),"\n",(0,o.jsx)(n.h2,{id:"base-configuration",children:"base configuration"}),"\n",(0,o.jsxs)(n.p,{children:["this file allows for base configuration. this is intended to have some hard coded configuration and also some dynamic configuration by referencing environment variables with ",(0,o.jsx)(n.code,{children:"process.env"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",metastring:'title="config/master.js"',children:"export default {\n\n    environment: {\n        development: process.env.EXAENV === 'development',\n    },\n\n    http: {\n        use: true,\n\n        host: '0.0.0.0',\n        port: 8118,\n        base_url: 'http://127.0.0.1:8118',\n        websocket: true,\n    },\n\n    database: {\n        use: true,\n\n        dialect: 'mysql',\n        username: process.env.DATABASE_USERNAME,\n        password: process.env.DATABASE_PASSWORD,\n        name: process.env.DATABASE_NAME,\n        host: process.env.DATABASE_HOST,\n        port: process.env.DATABASE_PORT,\n    },\n\n    console: {\n        use: true,\n\n        quiet: false,\n    },\n\n    views: {\n        use: true,\n\n        engine: 'nunjucks',\n    },\n\n    public: {\n        use: true,\n\n        base_url: '/public',\n    },\n\n    /**\n     * user defined custom configuration\n     * add anything you'd like to be avaiable at exa.config.*\n     */\n\n};\n"})}),"\n",(0,o.jsx)(n.admonition,{title:"Warning",type:"warning",children:(0,o.jsxs)(n.p,{children:["don't put secrets in ",(0,o.jsx)(n.code,{children:"config/master.js"}),", use ",(0,o.jsx)(n.code,{children:".env"})," instead and reference with ",(0,o.jsx)(n.code,{children:"process.env.*"})]})}),"\n",(0,o.jsx)(n.h3,{id:"environment",children:"environment"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"development"})," [",(0,o.jsx)(n.code,{children:"bool"}),"] - sets development mode on or off. by default this checks the value of ",(0,o.jsx)(n.code,{children:"process.env.EXAENV"})," and resolves to ",(0,o.jsx)(n.code,{children:"false"})," if it receives any other value than ",(0,o.jsx)(n.code,{children:"development"}),".it could also be hardcoded ",(0,o.jsx)(n.code,{children:"true"})," or ",(0,o.jsx)(n.code,{children:"false"})," if desired."]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"http",children:"http"}),"\n",(0,o.jsx)(n.p,{children:"this section is used to configure settings for the http and websockets module. because the http server is created using express.js, some settings here may reflect this."}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"use"})," [",(0,o.jsx)(n.code,{children:"bool"}),"] - whether or not to start an http server"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"host"})," [",(0,o.jsx)(n.code,{children:"string"}),"] - host to listen on","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["use ",(0,o.jsx)(n.code,{children:"0.0.0.0"})," to listen to all hosts"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"port"})," [",(0,o.jsx)(n.code,{children:"number"}),"] - post to listen on"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"base_url"})," [",(0,o.jsx)(n.code,{children:"string"}),"] - base url for the http server"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"websocket"})," [",(0,o.jsx)(n.code,{children:"bool"}),"] - whether or not to enable the websocket module","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["setting this to ",(0,o.jsx)(n.code,{children:"false"})," will cause files in ",(0,o.jsx)(n.code,{children:"websocket/*"})," to be ignored"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"database",children:"database"}),"\n",(0,o.jsxs)(n.p,{children:["this section is used to configure settings for the database module. the built-in database support is through the very great ",(0,o.jsx)(n.a,{href:"https://sequelize.org/",children:"sequelize.js"})," project. there's absolutely nothing stopping developers from using something else though."]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"use"})," [",(0,o.jsx)(n.code,{children:"bool"}),"] - whether or not to process models in ",(0,o.jsx)(n.code,{children:"models/*"})]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"dialect"})," [",(0,o.jsx)(n.code,{children:"dialect"}),"] - this is passed directly to sequelize.js","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["sequelize.js supports many dialects, please ",(0,o.jsx)(n.a,{href:"https://sequelize.org/docs/v6/getting-started/",children:"click here"})," for more information"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"username"})," [",(0,o.jsx)(n.code,{children:"string"}),"] - database username"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"password"})," [",(0,o.jsx)(n.code,{children:"string"}),"] - database password"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"name"})," [",(0,o.jsx)(n.code,{children:"string"}),"] - database name"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"host"})," [",(0,o.jsx)(n.code,{children:"string"}),"] - database host"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"port"})," [",(0,o.jsx)(n.code,{children:"number"}),"] - databse port"]}),"\n"]}),"\n",(0,o.jsx)(n.admonition,{title:"Tip",type:"tip",children:(0,o.jsxs)(n.p,{children:["use ",(0,o.jsx)(n.code,{children:"process.env.*"})," for these values. besides not putting secrets in your config, you'll also need these values for the migrations module."]})}),"\n",(0,o.jsx)(n.h3,{id:"console",children:"console"}),"\n",(0,o.jsx)(n.p,{children:"this section is used to configure console script runner settings."}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"use"})," [",(0,o.jsx)(n.code,{children:"bool"}),"] - whether or not to register console scripts in ",(0,o.jsx)(n.code,{children:"console/*"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["setting this to ",(0,o.jsx)(n.code,{children:"false"})," will disallow console scripts from being ran"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"quiet"})," [",(0,o.jsx)(n.code,{children:"bool"}),"] - whether or not to suppress exa.js related output","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["exa.js usually has script start-up information, such as version, time, and other information. setting this to ",(0,o.jsx)(n.code,{children:"false"})," will suppress all this so console command output is only from the developer."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"views",children:"views"}),"\n",(0,o.jsx)(n.p,{children:"this section is used to configure settings for views and templates."}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"use"})," [",(0,o.jsx)(n.code,{children:"bool"}),"] - whether or not to enable views"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"engine"})," [",(0,o.jsx)(n.code,{children:"string"}),"] - which templating engine to use","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["currently supported engines are","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"nunjucks"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"public",children:"public"}),"\n",(0,o.jsx)(n.p,{children:"this secion is used to configure static asset serving. internally this uses express.js."}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"use"})," [",(0,o.jsx)(n.code,{children:"bool"}),"] - whether or not to serve static assets"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"base_url"})," [",(0,o.jsx)(n.code,{children:"string"}),"] - base url that static assets should be available on","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["this value is passed to ",(0,o.jsx)(n.code,{children:"express.static(path)"})," internally"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"user-defined-configuration",children:"user defined configuration"}),"\n",(0,o.jsxs)(n.p,{children:["additional configuration can be included at the bottom of the configuration object. any additional configuration placed there will be available at ",(0,o.jsx)(n.code,{children:"exa.config.*"}),"."]}),"\n",(0,o.jsx)(n.hr,{}),"\n",(0,o.jsx)(n.h2,{id:"environment-configuration",children:"environment configuration"}),"\n",(0,o.jsx)(n.p,{children:"environment configuration is great for values that are specific to a machine or environment. it's also great when external tools need to access shared environment. this prevents needing to have configuration in multiple locations and is particularly useful when docker is in use."}),"\n",(0,o.jsxs)(n.p,{children:["although optional, it's highly recommend to use a ",(0,o.jsx)(n.code,{children:".env"})," file for all dynamic variables and also secrets. a sample ",(0,o.jsx)(n.code,{children:".env"})," file is located at ",(0,o.jsx)(n.code,{children:".env.sample"})," and a good starting point is to simply copy it ",(0,o.jsx)(n.code,{children:"cp .env.sample .env"})]}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"exa.js"})," will automatically parse any ",(0,o.jsx)(n.code,{children:".env"})," file and make it available via ",(0,o.jsx)(n.code,{children:"process.env"})," at runtime."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",metastring:'title=".env"',children:"EXAENV=production\n\n# optionally add values here and overwrite values in config/master.js\nDATABASE_HOST=mysql\nDATABASE_PORT=3306\nDATABASE_USERNAME=username\nDATABASE_PASSWORD=password\nDATABASE_NAME=yourdb\n\nCOMPOSE_PROJECT_NAME=exajs\n"})})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(a,{...e})}):a(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>l});var i=s(6540);const o={},t=i.createContext(o);function r(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);