import { RequestHandler, Request, Response, NextFunction } from "express";

export const proximity : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    res.send("ok");
}

export const cheapest : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    res.send("ok");
}