(function(_){for(var r in _){_[r].__farm_resource_pot__='detail_index_2cc0.js';(globalThis || window || global)['6a871738bed45b567e434cb8d22e0796'].__farm_module_system__.register(r,_[r])}})({"c184653d":function t(t,r,a,e){t._m(r),a("7db16566");var c=a("84a68c6c"),s=a("28724cd6");r.default=class{static async getTravelList(){var t=s.getCookie("tkn");try{var r=await c.http.get("travel",{Authorization:"Bearer ".concat(t)});if(!r.success)throw Error(r.message);return r.data;}catch(t){throw Error();}}static async getTravelPassengers(t){var r=s.getCookie("tkn");try{var a=await c.http.get("travel/".concat(t,"/passengers"),{Authorization:"Bearer ".concat(r)});if(!a.success)throw Error(a.message);return a.data;}catch(t){throw Error();}}};},});
//# sourceMappingURL=detail_index_2cc0.0fde9159.js.map