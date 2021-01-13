import * as Vuex from 'vuex';
import { VuexModule, VuexModuleArgs } from './default';
export declare type ModuleToInstance<TModule> = TModule extends VuexDynamicModule<infer S, infer M, infer G, infer A> ? DynamicModuleInstance<S, M, G, A> : TModule;
export declare class VuexDynamicModule<S extends Record<string, any>, M extends Vuex.MutationTree<S>, G extends Vuex.GetterTree<S, any>, A extends Record<string, Vuex.ActionHandler<S, any>>> {
    private nestedName?;
    private namespaceName;
    private module;
    private state;
    private getters;
    private mutations;
    private actions;
    private options?;
    private store;
    protected _logger: boolean;
    private get params();
    get name(): string;
    constructor({ name, mutations, state, actions, getters, options, logger, }: VuexModuleArgs<S, G, M, A>);
    save(store: Vuex.Store<any>): void;
    instance<NewState extends S = S>(moduleName?: string): DynamicModuleInstance<NewState, M, G, A>;
}
export declare class DynamicModuleInstance<S extends Record<string, any>, M extends Vuex.MutationTree<S>, G extends Vuex.GetterTree<S, any>, A extends Record<string, Vuex.ActionHandler<any, any>>> extends VuexModule<S, M, G, A> {
    private nestedName?;
    isRegistered: boolean;
    constructor({ store, ...args }: VuexModuleArgs<S, G, M, A> & {
        store: Vuex.Store<S>;
    });
    register(): void;
    unregister(): void;
}
