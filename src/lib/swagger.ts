import { createSwaggerSpec } from "next-swagger-doc";

const api_root = process.env.SWAGGER_API_DOC_PATH;
export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
        apiFolder: api_root,
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Le projet de Todo List complexe",
                version: "1.0",
            },
            components: {
                securitySchemes: {
                    BearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    },
                },
            },
            security: [],
        },
    });
    return spec;
};