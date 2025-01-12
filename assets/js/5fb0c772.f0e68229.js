"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[189],{846:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"modules/migrations","title":"migrations","description":"the purpose of migrations is to easily apply and rollback changes to a database in a way that will sync across workspaces and developers. although not technically a module since exa.js has no internal code associated with migrations, it\'s included as a recommended way of handling database migrations anyway. the migrations directory could also be used with other tools, if so desired.","source":"@site/docs/modules/migrations.md","sourceDirName":"modules","slug":"/modules/migrations","permalink":"/modules/migrations","draft":false,"unlisted":false,"editUrl":"https://github.com/realtux/exa/tree/master/docs/docs/modules/migrations.md","tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"sidebar_position":5},"sidebar":"tutorialSidebar","previous":{"title":"database","permalink":"/modules/database"},"next":{"title":"console","permalink":"/modules/console"}}');var a=n(4848),o=n(8453);const s={sidebar_position:5},r="migrations",l={},d=[{value:"jmig",id:"jmig",level:2},{value:"managing migrations",id:"managing-migrations",level:2},{value:"sample migration file",id:"sample-migration-file",level:2},{value:"how to interpret",id:"how-to-interpret",level:3}];function c(e){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.header,{children:(0,a.jsx)(i.h1,{id:"migrations",children:"migrations"})}),"\n",(0,a.jsxs)(i.p,{children:["the purpose of migrations is to easily apply and rollback changes to a database in a way that will sync across workspaces and developers. although not technically a module since ",(0,a.jsx)(i.code,{children:"exa.js"})," has no internal code associated with migrations, it's included as a recommended way of handling database migrations anyway. the ",(0,a.jsx)(i.code,{children:"migrations"})," directory could also be used with other tools, if so desired."]}),"\n",(0,a.jsx)(i.h2,{id:"jmig",children:"jmig"}),"\n",(0,a.jsxs)(i.p,{children:["the suggested migration tool and the one this documentation will focus on is ",(0,a.jsx)(i.code,{children:"jmig"}),". the full documentation for this tool is located at ",(0,a.jsx)(i.a,{href:"https://github.com/realtux/jmig",children:"https://github.com/realtux/jmig"}),". ",(0,a.jsx)(i.code,{children:"jmig"})," is invoked in an ",(0,a.jsx)(i.code,{children:"exa.js"})," project via ",(0,a.jsx)(i.code,{children:"npx"}),"."]}),"\n",(0,a.jsx)(i.h2,{id:"managing-migrations",children:"managing migrations"}),"\n",(0,a.jsxs)(i.p,{children:["migration files are created in the ",(0,a.jsx)(i.code,{children:"migrations"})," folder using the jmig command ",(0,a.jsx)(i.code,{children:"npx jmig create <migration name>"}),". to create a migration file like the one in the next section, you could run ",(0,a.jsx)(i.code,{children:"npx jmig create initial tables"}),". after the migration file is filled out, the changes can be applied with ",(0,a.jsx)(i.code,{children:"npx jmig migrate"}),". changes can be rolled back with ",(0,a.jsx)(i.code,{children:"npx jmig rollback"}),"."]}),"\n",(0,a.jsx)(i.h2,{id:"sample-migration-file",children:"sample migration file"}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-sql",metastring:'title="migrations/20240417195942-initial-tables.sql"',children:"up:\ncreate table users (\n    user_id int unsigned primary key auto_increment,\n    name varchar(64) not null,\n    email varchar(64) not null,\n    created_at datetime not null\n) character set utf8mb4 collate utf8mb4_unicode_ci;\n\ndown:\ndrop table users;\n"})}),"\n",(0,a.jsx)(i.h3,{id:"how-to-interpret",children:"how to interpret"}),"\n",(0,a.jsxs)(i.p,{children:["a blank migration file will have only ",(0,a.jsx)(i.code,{children:"up:"})," and ",(0,a.jsx)(i.code,{children:"down:"})," in it to start. changes to a database should be placed under the ",(0,a.jsx)(i.code,{children:"up:"})," section, then reversing those changes should be placed in the ",(0,a.jsx)(i.code,{children:"down:"}),". in the provided example, a ",(0,a.jsx)(i.code,{children:"users"})," table is created upon migration, and then dropped upon rollback."]})]})}function h(e={}){const{wrapper:i}={...(0,o.R)(),...e.components};return i?(0,a.jsx)(i,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},8453:(e,i,n)=>{n.d(i,{R:()=>s,x:()=>r});var t=n(6540);const a={},o=t.createContext(a);function s(e){const i=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function r(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),t.createElement(o.Provider,{value:i},e.children)}}}]);