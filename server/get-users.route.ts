

import {Request, Response} from 'express';
import {USERS} from "./db-data";



export function getAllUsers(req: Request, res: Response) {

/*
    const error = (Math.random() >= 0.5);

    if (error) {
        console.log("ERROR loading courses!");
        res.status(500).json({message: 'random error occurred.'});
    }
    else { */

        setTimeout(() => {

             res.status(200).json({payload:Object.values(USERS)});

        }, 200);

  //  }
}


export function getUserById(req: Request, res: Response) {

    const userId = req.params["id"];

    const users:any = Object.values(USERS);

    const user = users.find(user => user.id == userId);

    res.status(200).json(user);
}