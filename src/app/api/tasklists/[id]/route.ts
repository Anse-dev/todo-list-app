import { NextResponse } from "next/server";
import connect from "../../../../lib/db";
import Tasklist from "../../../../lib/models/TaskList";
import { Types } from "mongoose";

/**
 * @swagger
 * /api/tasklists/{id}:
 *   get:
 *     description: Returns a tasklist by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Tasklist ID
 *     responses:
 *       200:
 *         description: Tasklist found
 *       400:
 *         description: Invalid tasklist ID
 *       404:
 *         description: Tasklist not found
 *       500:
 *         description: Error fetching tasklist
 */
export const GET = async (request: Request, context: { params: { id: string } }) => {
    const tasklistId = context.params.id;
    try {
        if (!Types.ObjectId.isValid(tasklistId)) {
            return new NextResponse("Invalid tasklist ID", { status: 400 });
        }

        await connect();
        const tasklist = await Tasklist.findById(tasklistId).populate("user").populate("tasks");
        if (!tasklist) {
            return new NextResponse("Tasklist not found", { status: 404 });
        }
        return new NextResponse(JSON.stringify(tasklist), { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error fetching tasklist: " + error.message, { status: 500 });
    }
};

/**
 * @swagger
 * /api/tasklists/{id}:
 *   patch:
 *     description: Updates a tasklist by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Tasklist ID
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
 *       200:
 *         description: Tasklist updated
 *       400:
 *         description: Invalid tasklist ID
 *       404:
 *         description: Tasklist not found
 *       500:
 *         description: Error updating tasklist
 */
export const PATCH = async (request: Request, context: { params: { id: string } }) => {
    const tasklistId = context.params.id;
    try {
        const body = await request.json();
        const { title, user, tasks } = body;

        if (!Types.ObjectId.isValid(tasklistId)) {
            return new NextResponse("Invalid tasklist ID", { status: 400 });
        }

        await connect();
        const updatedTasklist = await Tasklist.findByIdAndUpdate(
            tasklistId,
            { title, user, tasks },
            { new: true }
        ).populate("user").populate("tasks");

        if (!updatedTasklist) {
            return new NextResponse("Tasklist not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify(updatedTasklist), { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error updating tasklist: " + error.message, { status: 500 });
    }
};

/**
 * @swagger
 * /api/tasklists/{id}:
 *   delete:
 *     description: Deletes a tasklist by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Tasklist ID
 *     responses:
 *       200:
 *         description: Tasklist deleted
 *       400:
 *         description: Invalid tasklist ID
 *       404:
 *         description: Tasklist not found
 *       500:
 *         description: Error deleting tasklist
 */
export const DELETE = async (request: Request, context: { params: { id: string } }) => {
    const tasklistId = context.params.id;
    try {
        if (!Types.ObjectId.isValid(tasklistId)) {
            return new NextResponse("Invalid tasklist ID", { status: 400 });
        }

        await connect();
        const deletedTasklist = await Tasklist.findByIdAndDelete(tasklistId);
        if (!deletedTasklist) {
            return new NextResponse("Tasklist not found", { status: 404 });
        }

        return new NextResponse("Tasklist deleted", { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error deleting tasklist: " + error.message, { status: 500 });
    }
};
