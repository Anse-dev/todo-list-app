import { NextResponse } from "next/server";
import connect from "../../../lib/db";
import User from "../../../lib/models/User";

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Returns a list of users
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Error fetching users
 */
export const GET = async () => {
    try {
        await connect();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error fetching users: " + error.message, { status: 500 });
    }
};

/**
 * @swagger
 * /api/users:
 *   post:
 *     description: Creates a new user
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
 *       201:
 *         description: User created
 *       500:
 *         description: Error creating user
 */
export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const { name, email, password, role } = body;
        await connect();
        const newUser = new User({ name, email, password, role });
        await newUser.save();
        return new NextResponse(JSON.stringify(newUser), { status: 201 });
    } catch (error: any) {
        console.log(error)
        return new NextResponse("Error creating user: " + error.message, { status: 500 });
    }
};
