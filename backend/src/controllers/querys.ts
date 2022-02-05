import { RequestHandler, Request, Response, NextFunction } from "express";
import mongoose from 'mongoose';


export const proximity : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    res.send("ok");
}

export const cheapest : RequestHandler = async (req : Request, res : Response, next : NextFunction) => {
    res.send("ok");
}