type IStates = {
    currentError: boolean
    currentLoading: boolean
    forecastError: boolean
    forecastLoading: boolean
}

type IAction = 
    { type: ActionTypes.INITIAL_STATES } | 
    { type: ActionTypes.CURRENT_FETCHING } |
    { type: ActionTypes.CURRENT_FETCHED } |
    { type: ActionTypes.CURRENT_ERROR } |
    { type: ActionTypes.FORECAST_FETCHING } | 
    { type: ActionTypes.FORECAST_FETCHED } |
    { type: ActionTypes.FORECAST_ERROR }

export enum ActionTypes {
    INITIAL_STATES = 'INITIAL_STATES',
    CURRENT_FETCHING = 'CURRENT_FETCHING',
    CURRENT_FETCHED = 'CURRENT_FETCHED',
    CURRENT_ERROR = 'CURRENT_ERROR',
    FORECAST_FETCHING = 'FORECAST_FETCHING',
    FORECAST_FETCHED = 'FORECAST_FETCHED',
    FORECAST_ERROR = 'FORECAST_ERROR'
}

export const initialState: IStates = { currentError: false, currentLoading: false, forecastError: false, forecastLoading: false};

export const reducer = (state: IStates, action: IAction) => {
    switch (action.type) {
        case ActionTypes.INITIAL_STATES:
            return initialState
        case ActionTypes.CURRENT_FETCHING:
            return { ...state, currentLoading: true, currentError: false };
        case ActionTypes.CURRENT_FETCHED:
            return { ...state, currentError: false, currentLoading: false };
        case ActionTypes.CURRENT_ERROR:
            return { ...state, currentError: true, currentLoading: false };
        case ActionTypes.FORECAST_FETCHING:
            return { ...state, forecastLoading: true, forecastError: false };
        case ActionTypes.FORECAST_FETCHED:
            return { ...state, forecastError: false, forecastLoading: false };
        case ActionTypes.FORECAST_ERROR:
            return { ...state, forecastError: true, forecastLoading: false };    
        default:
            return state;
    }
};