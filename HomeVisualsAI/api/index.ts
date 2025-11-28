import { app } from "../server/app";
import { registerRoutes } from "../server/routes";

// We use a variable to ensure routes are only registered once
// (This is important for serverless environments)
let routesRegistered = false;

export default async function handler(req, res) {
  if (!routesRegistered) {
    // We pass the app to your existing route registration logic
    // We await it in case your registerRoutes function is async
    await registerRoutes(app);
    routesRegistered = true;
  }

  // Pass the request to the Express app
  app(req, res);
}