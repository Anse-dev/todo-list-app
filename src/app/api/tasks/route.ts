import { NextResponse } from "next/server";
import connect from "../../../lib/db";
import Task from "../../../lib/models/Task";

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     description: Returns a list of tasks
 *     responses:
 *       200:
 *         description: List of tasks
 *       500:
 *         description: Error fetching tasks
 */
export const GET = async () => {
    try {
        await connect();
        const tasks = await Task.find().populate("user").populate("list");
        return new NextResponse(JSON.stringify(tasks), { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error fetching tasks: " + error.message, { status: 500 });
    }
};

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     description: Creates a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               priority:
 *                 type: string
 *               user:
 *                 type: string
 *               list:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 *       500:
 *         description: Error creating task
 */
export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const { title, description, status, dueDate, priority, user, list } = body;
        const newTask = new Task({ title, description, status, dueDate, priority, user, list });
        await newTask.save();
        return new NextResponse(JSON.stringify(newTask), { status: 201 });
    } catch (error: any) {
        return new NextResponse("Error creating task: " + error.message, { status: 500 });
    }
};
