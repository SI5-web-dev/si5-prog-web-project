import { RequestHandler, Request, Response, NextFunction } from "express";

export const signup : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    res.send("ok");
}

export const login : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    res.send("ok");
}