// /lib/middleware/role.ts

import { NextResponse } from "next/server";

export const authorize = (roles: string[]) => {
    return (handler: Function) => {
        return async (request: Request) => {
            const user = (request as any).user;

            if (!user || !roles.includes(user.role)) {
                return new NextResponse("Forbidden", { status: 403 });
            }

            return handler(request);
        };
    };
};

