(function(_){for(var r in _){_[r].__farm_resource_pot__='index_68dd.js';(globalThis || window || global)['0f6266587c3c880ed98055938bafcf5c'].__farm_module_system__.register(r,_[r])}})({"2c6e69f1":function e(e,r,o,t){e._m(r);var d=o("036dd75c"),i=o("51d9ea92"),c=o("21e336be"),n=o("dcd4b961"),a=e.i(o("411e8452")),l=o("c7c1652a"),s=e.i(o("f7d0a475")),u=o("3b359b6b");o("9a5a328d"),u.locale("es-do");var b=document.querySelector("#root"),f=c.createRoot(b),j=new n.QueryClient;f.render(d.jsxs(n.QueryClientProvider,{client:j,children:[d.jsx(e.f(a),{children:d.jsx(l.RouterProvider,{router:e.f(s)})}),d.jsx(i.Toaster,{position:"top-right"})]}));},"342f3182":function e(e,u,d,i){e._m(u),e.o(u,"default",()=>p);var r=d("fb686e3f"),s=d("6da9187c"),a=d("74824e0b");d("e418ffc9"),d("07bb7302");var n=d("036dd75c"),l=d("da0b8b76"),o=d("dcd4b961"),f=d("c7c1652a"),c=d("43e033a1"),t=e.i(d("f7176859")),y=e.i(d("fae7f52f")),v=e.i(d("71bf2fa6")),b=e.i(d("7299281c")),T=e.i(d("6982241b")),g=e.i(d("61128824")),I=d("ebc3afb6");function p(u){var d,i=u.children,p=I.useSelector(e=>e.user),E=p.user,q=p.syncUser,_=p.setType,N=a._(o.useQueries({queries:[{queryKey:[e.f(y).AUTH],queryFn:e.f(v).verify},{queryKey:["user",null==E?void 0:E.code],queryFn:()=>e.f(b).getUserType(null==E?void 0:E.code)}]}),2),m=N[0],A=m.data,C=m.isLoading,R=N[1].data,S=o.useQuery({queryKey:["profile",null==E?void 0:E.code],queryFn:()=>(null==R?void 0:R.userType)==="DRIVER"?(_("driver"),e.f(T).getDriverByCode(null==E?void 0:E.code)):(_("passenger"),e.f(g).getPassengerByCode(null==E?void 0:E.code)),enabled:["DRIVER","PASSENGER"].includes(null!==(d=null==R?void 0:R.userType)&&void 0!==d?d:"")}),V=S.data,j=S.isLoading,x=S.isSuccess;return(l.useEffect(()=>{(null==R?void 0:R.userType)==="INACTIVE"?q(s._(r._({},E),{name:R.name,state:"INACTIVE"})):(null==R?void 0:R.userType)==="BOTH"?q(s._(r._({},E),{name:R.name,state:"ACTIVE"})):x&&q(V);},[R,x,V,q,E]),C||j)?n.jsx(c.Loading,{}):A?i||n.jsx(f.Outlet,{}):n.jsx(f.Navigate,{to:e.f(t).SING_IN});}},"3edab5ef":function s(s,a,l,e){s._m(a),s.o(a,"default",()=>t);var f=l("036dd75c"),i=l("c7c1652a"),c=s.i(l("d74df3a4")),d=s.i(l("5cbd8fa9")),n=s.i(l("f05aa7ff")),x=l("da0b8b76"),r=l("43e033a1");function t(a){var l=a.simple;return f.jsxs("div",{className:"min-h-svh w-full flex flex-col",children:[f.jsx(s.f(d),{}),f.jsx("main",{className:"flex-grow w-full py-16 grid items-stretch",children:f.jsx(x.Suspense,{fallback:f.jsx(r.Loading,{}),children:f.jsx(i.Outlet,{})})}),l?f.jsx(s.f(n),{}):f.jsx(s.f(c),{})]});}},"411e8452":function e(e,t,a,r){e._m(t);var h=a("036dd75c"),l=a("da0b8b76"),s=a("ebc3afb6");t.default=e=>{var t=e.children,a=s.useSelector(e=>e.theme),r=a.switchTheme,c=a.themeChosen,n=a.theme,d=a.blur,i=s.usePrefersDarkMode();return l.useEffect(()=>{i&&"light"===n&&!c&&r();},[i,r]),h.jsx("div",{"data-theme":n,className:"min-h-svh w-full ".concat(d?"blur-sm transition-all":""),children:t});};},"5cbd8fa9":function e(e,s,l,c){e._m(s),e.o(s,"default",()=>o);var a=l("036dd75c"),n=e.i(l("d49232d1")),t=l("5ef950a6");function o(){var s=e.f(n)(e=>e),l=s.theme,c=s.switchTheme,o=async()=>{var e=document.documentElement;e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen:e.webkitRequestFullScreen&&e.webkitRequestFullScreen;};return a.jsxs("header",{className:"fixed w-full flex justify-between top-0 z-10 bg-base-100",children:[a.jsx("h1",{className:"font-bold text-4xl text-left pl-2 pt-2",children:"Carpool 🚗 "}),a.jsxs("div",{className:"flex gap-2 pr-2",children:[a.jsxs("label",{className:"swap swap-rotate",children:[a.jsx("input",{type:"checkbox",className:"theme-controller",checked:"dracula"!==l,onChange:c}),a.jsx(t.IconSun,{className:"swap-off",size:32}),a.jsx(t.IconMoon,{className:"swap-on",size:32})]}),a.jsxs("label",{className:"swap",children:[a.jsx("input",{type:"checkbox",onClick:()=>{document.fullscreenElement?document.exitFullscreen():o();}}),a.jsx(t.IconMaximize,{size:32,className:"swap-off"}),a.jsx(t.IconMinimize,{size:32,className:"swap-on"})]})]})]});}},"cf4e7b87":function a(a,d,o,b){a._m(d),a.o(d,"a",()=>y),a.o(d,"b",()=>c),a.o(d,"c",()=>e),a.o(d,"d",()=>n),a.o(d,"e",()=>z),a.o(d,"f",()=>g),a.o(d,"g",()=>f),o("7db16566");var l=o("da0b8b76"),y=l.lazy(()=>b("dc50866c")),z=l.lazy(()=>b("a0de53ba")),c=l.lazy(()=>b("7d7a6b45")),e=l.lazy(()=>b("daa99167")),f=l.lazy(()=>b("8054e03e")),n=l.lazy(()=>b("51447ba3")),g=l.lazy(()=>b("4d5633a1"));},"d74df3a4":function e(e,a,i,c){e._m(a),e.o(a,"default",()=>l);var s=i("036dd75c"),n=e.i(i("f7176859")),t=i("ebc3afb6"),r=i("5ef950a6"),o=i("c7c1652a");function l(){var a=t.useSelector(e=>e.notification),i=a.newTravel,c=a.resetNotification;return s.jsxs("footer",{className:"btm-nav",children:[s.jsx(o.NavLink,{to:e.f(n).HISTORY,className:e=>e.isActive?(i&&c("newTravel"),"active"):"",children:s.jsxs("div",{className:"indicator",children:[i&&s.jsx("span",{className:"indicator-item badge badge-xs badge-primary"}),s.jsx(r.IconHistory,{})]})}),s.jsx(o.NavLink,{to:e.f(n).HOME,className:e=>e.isActive?"active":"",children:s.jsx(r.IconHome,{})}),s.jsx(o.NavLink,{to:e.f(n).PROFILE,className:e=>e.isActive?"active":"",children:s.jsx(r.IconUserCircle,{})})]});}},"f05aa7ff":function e(e,t,o,a){e._m(t),e.o(t,"default",()=>c);var n=o("036dd75c"),s=o("5ef950a6");function c(){return n.jsxs("footer",{className:"footer footer-center flex justify-between bg-base-100 text-base-content text-opacity-30 p-4 fixed bottom-0",children:[n.jsx("aside",{className:"grid-flow-col items-center font-bold",children:n.jsx("p",{children:"CarpoolApp"})}),n.jsx("nav",{children:n.jsxs("a",{href:"https://github.com/fabzio/carpool-app",className:"link flex gap-2",children:[n.jsx("p",{children:"Danos una estrella en GitHub"}),n.jsx(s.IconBrandGithub,{size:24})]})})]});}},"f7d0a475":function e(e,t,f,n){e._m(t);var a=f("036dd75c"),l=f("c7c1652a"),s=e.i(f("3edab5ef")),h=f("cf4e7b87"),m=e.i(f("342f3182")),j=e.i(f("f7176859")),x=l.createBrowserRouter([{element:a.jsx(e.f(s),{simple:!0}),children:[{path:e.f(j).SING_UP,element:a.jsx(h.a,{})},{path:e.f(j).SING_IN,element:a.jsx(h.e,{})},{path:e.f(j).CHOOSE_ROLE,element:a.jsx(h.f,{})}]},{element:a.jsx(e.f(m),{children:a.jsx(e.f(s),{})}),children:[{path:"/",element:a.jsx(l.Navigate,{to:e.f(j).HOME})},{path:e.f(j).HOME,element:a.jsx(h.b,{})},{path:e.f(j).HISTORY,element:a.jsx(h.c,{})},{path:e.f(j).HISTORY_DETAIL,element:a.jsx(h.d,{})},{path:e.f(j).PROFILE,element:a.jsx(h.g,{})}]},{path:"*",element:a.jsx("div",{children:"Not Found"})}]);t.default=x;},});
//# sourceMappingURL=index_68dd.75333f68.js.map