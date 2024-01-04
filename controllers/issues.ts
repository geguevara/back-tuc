import { Request, Response } from "express";
import Issue, { IIssue } from "../models/issue";
import { ObjectId } from "mongoose";

export const newIssue =async (req:Request, res: Response) => {
    const { title, desc, priority }: IIssue = req.body;
    const usuario: ObjectId = req.body.userConfirm._id;

    const issueData = {
        title,
        desc,
        priority,
        user: usuario,
        createdAt: new Date()
    }

    const issue = new Issue(issueData)

    await issue.save()

    res.status(201).json({
        issue
    })
 }