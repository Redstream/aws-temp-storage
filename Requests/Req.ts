"use strict";
import {APIGatewayProxyEvent} from "aws-lambda";

export abstract class Req {

    protected event: APIGatewayProxyEvent;

    // Shorthands
    protected headers: { [name: string]: string };
    protected body: string;
    protected queryParams: { [name: string]: string };

    public constructor(event: APIGatewayProxyEvent) {
        this.event = event;
        this.headers = event.headers;
        this.queryParams = event.queryStringParameters;
        this.body = event.body;
    }

    public abstract processReq(): Promise<any>;
}