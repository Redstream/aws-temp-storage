import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import {isUndefined} from "util";


export const handler: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    let path = getPath(event);
    import("./Requests/" + path)
        .catch(_ => cb(null, {statusCode: 404, body: JSON.stringify({error: "Invalid endpoint /" + path})}))
        .then(module => new module.default(event))
        .then(req => req.processReq())
        .then(data =>  cb(null, {statusCode: 200, body: JSON.stringify(data)}))
        .catch(error => cb(null, {statusCode: 500, body: JSON.stringify({errorMessage: error})}));
};

function getPath(event: APIGatewayEvent): string {
    if(isUndefined(event.pathParameters)|| isUndefined(event.pathParameters['proxy']))
        return "";

    return event.pathParameters['proxy']
        .split("/")
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .map(s => s.split('').filter(c => c != '.').join(''))
        .join("/")
}