import createError, { HttpError } from "http-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import nodeRoute from "./routes/nodeRoute";
import pathRoute from "./routes/pathRoute";
import edgeRoute from "./routes/edgeRoute";
import flowerRoute from "./routes/flowerRoute";
import flowerUploadRoute from "./routes/flowerUploadRoute";
import giftRoute from "./routes/giftRoute.ts";
import medicineRoute from "./routes/medicineRoute.ts";
import medicineUploadRoute from "./routes/medicineUploadRoute.ts";
import securityRoute from "./routes/securityRoute.ts";
import interpreterRoute from "./routes/interpreterRoute.ts";
import sanitationRoute from "./routes/sanitationRoute.ts";
import roomRoute from "./routes/roomRoute.ts";
import medicalDeviceServiceRoute from "./routes/medicalDeviceServiceRoute.ts";
import edgeUploadRoute from "./routes/edgeUploadRoute.ts";
import nodeUploadRoute from "./routes/nodeUploadRoute.ts";
import editorRoute from "./routes/editorRoute.ts";
import mapEditorRoute from "./routes/mapEditorRoute.ts";
import mapEditorDragRoute from "./routes/mapEditorDragRoute.ts";
import mapEditorDelRoute from "./routes/mapEditorDelRoute.ts";
import mapEditorCreateRoute from "./routes/mapEditorCreateRoute.ts";
import employeeRoute from "./routes/employeeRoute.ts";
import serviceRoute from "./routes/serviceRoute.ts";
//import { auth } from "express-oauth2-jwt-bearer";

const app: Express = express(); // Setup the backend

// Setup generic middlewear
app.use(
    logger("dev", {
        stream: {
            // This is a "hack" that gets the output to appear in the remote debugger :)
            write: (msg) => console.info(msg),
        },
    }),
); // This records all HTTP requests
app.use(express.json()); // This processes requests as JSON
app.use(express.urlencoded({ extended: false })); // URL parser
app.use(cookieParser()); // Cookie parser
app.use("/api/path", pathRoute);
app.use("/api/nodes", nodeRoute);
app.use("/api/edges", edgeRoute);
app.use("/api/edge", edgeUploadRoute);
app.use("/api/node", nodeUploadRoute);
app.use("/api/editor", editorRoute);
// Setup routers. ALL ROUTERS MUST use /api as a start point, or they
// won't be reached by the default proxy and prod setup
app.use("/healthcheck", (req, res) => {
    res.status(200).send();
});
// if (!process.env["VITETEST"]) {
//     app.use(
//         auth({
//             audience: "/api",
//             issuerBaseURL: "https://dev-4m72lcr6jdjjoxgt.us.auth0.com",
//             tokenSigningAlg: "RS256",
//         }),
//     );
// } just for running test more easily without auth0 but giving me a little bit of trouble when committing so bye-bye for now :)

// Don't delete above: MIDDLEWARE
app.use("/api/employee", employeeRoute);
app.use("/api/flower", flowerRoute);
app.use("/api/gift", giftRoute);
app.use("/api/interpreter", interpreterRoute);
app.use("/api/security", securityRoute);
app.use("/api/medicine", medicineRoute);
app.use("/api/sanitation", sanitationRoute);
app.use("/api/room", roomRoute);
app.use("/api/medical-device", medicalDeviceServiceRoute);
app.use("/api/flower", flowerUploadRoute);
app.use("/api/medicine", medicineRoute);
app.use("/api/medicine", medicineUploadRoute);
app.use("/api/mapeditor", mapEditorRoute);
app.use("/api/mapeditordrag", mapEditorDragRoute);
app.use("/api/mapeditordel", mapEditorDelRoute);
app.use("/api/mapeditorcreate", mapEditorCreateRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/service-requests", serviceRoute);

/**
 * Catch all 404 errors, and forward them to the error handler
 */
app.use(function (req: Request, res: Response, next: NextFunction): void {
    // Have the next (generic error handler) process a 404 error
    next(createError(404));
});

/**
 * Generic error handler
 */
app.use((err: HttpError, req: Request, res: Response): void => {
    res.statusMessage = err.message; // Provide the error message

    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Reply with the error
    res.status(err.status || 500);
});

export default app; // Export the backend, so that www.ts can start it
