import {createStore, Store, applyMiddleware, combineReducers} from "redux";
import {createLogger} from "redux-logger";

export enum ActionType {
    //
}

export type StatePart = any;

export type Reducer<T extends StatePart = any> = (state: T | null | undefined, action: Action<any>) => T | null;

export type Action<T extends object> = {
    readonly type: ActionType;
    readonly payload?: T;
}

export interface IAppState {
    //
}

const logger = createLogger({
    //
});

export const InitialState: IAppState = {
    //
};

export const store: Store = createStore(combineReducers({
    //
}), applyMiddleware(logger));
