import { NextResponse } from "next/server";
import connect from "../../../../lib/db";
import Task from "../../../../lib/models/Task";
import { Types } from "mongoose";

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     description: Returns a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task found
 *       400:
 *         description: Invalid task ID
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error fetching task
 */
export const GET = async (request: Request, context: { params: { id: string } }) => {
    const taskId = context.params.id;
    try {
        if (!Types.ObjectId.isValid(taskId)) {
            return new NextResponse("Invalid task ID", { status: 400 });
        }

        await connect();
        const task = await Task.findById(taskId).populate("user").populate("list");
        if (!task) {
            return new NextResponse("Task not found", { status: 404 });
        }
        return new NextResponse(JSON.stringify(task), { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error fetching task: " + error.message, { status: 500 });
    }
};

/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     description: Updates a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
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
 *       200:
 *         description: Task updated
 *       400:
 *         description: Invalid task ID
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error updating task
 */
export const PATCH = async (request: Request, context: { params: { id: string } }) => {
    const taskId = context.params.id;
    try {
        const body = await request.json();
        const { title, description, status, dueDate, priority, user, list } = body;

        if (!Types.ObjectId.isValid(taskId)) {
            return new NextResponse("Invalid task ID", { status: 400 });
        }

        await connect();
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, description, status, dueDate, priority, user, list },
            { new: true }
        ).populate("user").populate("list");

        if (!updatedTask) {
            return new NextResponse("Task not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify(updatedTask), { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error updating task: " + error.message, { status: 500 });
    }
};

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     description: Deletes a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted
 *       400:
 *         description: Invalid task ID
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error deleting task
 */
export const DELETE = async (request: Request, context: { params: { id: string } }) => {
    const taskId = context.params.id;
    try {
        if (!Types.ObjectId.isValid(taskId)) {
            return new NextResponse("Invalid task ID", { status: 400 });
        }

        await connect();
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return new NextResponse("Task not found", { status: 404 });
        }

        return new NextResponse("Task deleted", { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error deleting task: " + error.message, { status: 500 });
    }
};
