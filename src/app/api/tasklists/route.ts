import { NextResponse } from "next/server";
import connect from "../../../lib/db";
import Tasklist from "../../../lib/models/TaskList";
import { formatApiResponse } from "@/lib/helper";


/**
 * @swagger
 * /api/tasklists:
 *   get:
 *     description: Returns a list of tasklists
 *     responses:
 *       200:
 *         description: List of tasklists
 *       500:
 *         description: Error fetching tasklists
 */
export const GET = async () => {
    try {
        await connect();
        const tasklists = await Tasklist.find().populate("user").populate("tasks");
        let message = tasklists.length > 0 ? 'All users' : "Pas de users"
        const format = formatApiResponse(200, tasklists, message, null)
        return new NextResponse(JSON.stringify(format), { status: 200 });
    } catch (error: any) {
        const format = formatApiResponse(500, null, 'Error fetching tasklists', null)
        return new NextResponse(JSON.stringify(format), { status: 500 });
    }
};

/**
 * @swagger
 * /api/tasklists:
 *   post:
 *     description: Creates a new tasklist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               user:
 *                 type: string
 *               tasks:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Tasklist created
 *       500:
 *         description: Error creating tasklist
 */
export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const { title, user, tasks } = body;
        const newTasklist = new Tasklist({ title, user, tasks });
        await newTasklist.save();
        let message = "User Created"
        const format = formatApiResponse(201, newTasklist, message, null)
        return new NextResponse(JSON.stringify(format), { status: 201 });
    } catch (error: any) {
        const format = formatApiResponse(500, null, 'ErrorCreating fetching tasklists', null)
        return new NextResponse(JSON.stringify(format), { status: 500 });
    }
};
