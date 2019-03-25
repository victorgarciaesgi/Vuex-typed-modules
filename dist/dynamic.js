"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var builder_1 = require("./builder");
var hotModule_1 = require("./hotModule");
var registerDynamicModule = (function () {
    function registerDynamicModule(name, state, Vuexmodule) {
        this.mutations = {};
        this.actions = {};
        this.getters = {};
        this.newState = {};
        this.registered = false;
        this.Vuexmodule = Vuexmodule;
        this.name = name;
        this.initialState = state;
        Object.defineProperty(this, "state", {
            get: function () {
                return this.newState;
            },
            set: function (value) {
                this.newState = value;
            }
        });
    }
    registerDynamicModule.prototype.register = function () {
        builder_1.storeBuilder.storeModule(this.name, this.initialState, this.Vuexmodule);
        if (!builder_1.storeBuilder.state[this.name]() && !this.registered) {
            builder_1.storeBuilder.registerModule(this.name, this.initialState, this.Vuexmodule);
            this.registered = true;
        }
        if (builder_1.storeBuilder.state[this.name]()) {
            var _a = builder_1.stateBuilder(this.initialState, this.name), registerGetters = _a.registerGetters, registerMutations = _a.registerMutations, registerActions = _a.registerActions, newState = _a.state;
            (this.mutations = registerMutations(this.Vuexmodule.mutations)),
                (this.actions = registerActions(this.Vuexmodule.actions)),
                (this.getters = registerGetters(this.Vuexmodule.getters)),
                (this.newState = newState);
        }
    };
    registerDynamicModule.prototype.unregister = function () {
        if (!module.hot) {
            builder_1.storeBuilder.unregisterModule(this.name);
            hotModule_1.disableHotReload(this.name);
            this.mutations = {};
            this.actions = {};
            this.getters = {};
            this.state = {};
            this.registered = false;
        }
    };
    return registerDynamicModule;
}());
function defineDynamicModule(name, state, vuexModule) {
    hotModule_1.enableHotReload(name, state, vuexModule, true);
    return new registerDynamicModule(name, state, vuexModule);
}
exports.defineDynamicModule = defineDynamicModule;
