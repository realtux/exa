import express from 'express';
import 'express-session';

// session keys are whatever the app stores on req.session
declare module 'express-session' {
    interface SessionData {
        [key: string]: any,
    }
}

export default express;

export {
    application,
    json,
    query,
    raw,
    request,
    response,
    Router,
    static,
    text,
    urlencoded,
} from 'express';

export type {
    Application,
    CookieOptions,
    Errback,
    ErrorRequestHandler,
    Express,
    Handler,
    IRoute,
    IRouter,
    IRouterHandler,
    IRouterMatcher,
    Locals,
    MediaType,
    NextFunction,
    Request,
    RequestHandler,
    RequestParamHandler,
    Response,
    Router,
    Send,
} from 'express';
