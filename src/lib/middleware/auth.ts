
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { authorize } from "./role";

const secret = process.env.JWT_SECRET || "votre_secret"; // Changez cela en production !

export const authenticate = (handler: Function) => {
    return async (request: Request) => {
        const token = request.headers.get("Authorization")?.split(" ")[1];

        if (!token) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        try {
            const user = jwt.verify(token, secret);
            (request as any).user = user; // Attachez l'utilisateur à la requête
            return handler(request);
        } catch (error) {
            return new NextResponse("Invalid token", { status: 403 });
        }
    };
};

// Exemple de route protégée avec gestion des rôles

export const POST = authenticate(authorize(["admin"])(async (request: Request) => {
    // Logique pour ajouter un cours
}));
