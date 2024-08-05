import { NextResponse } from "next/server";
import connect from "../../../../lib/db";
import User from "../../../../lib/models/User";
import { Types } from "mongoose";

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     description: Returns a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Error fetching user
 */
export const GET = async (request: Request, context: { params: { id: string } }) => {
    const userId = context.params.id;
    try {
        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse("Invalid user ID", { status: 400 });
        }

        await connect();
        const user = await User.findById(userId);
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }
        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error fetching user: " + error.message, { status: 500 });
    }
};

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     description: Updates a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating user
 */
export const PATCH = async (request: Request, context: { params: { id: string } }) => {
    const userId = context.params.id;
    try {
        const body = await request.json();
        const { name, email, password, role } = body;

        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse("Invalid user ID", { status: 400 });
        }

        await connect();
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, password, role },
            { new: true }
        );

        if (!updatedUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error updating user: " + error.message, { status: 500 });
    }
};

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     description: Deletes a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Error deleting user
 */
export const DELETE = async (request: Request, context: { params: { id: string } }) => {
    const userId = context.params.id;
    try {
        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse("Invalid user ID", { status: 400 });
        }

        await connect();
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        return new NextResponse("User deleted", { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error deleting user: " + error.message, { status: 500 });
    }
};
