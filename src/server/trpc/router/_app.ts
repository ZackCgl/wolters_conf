import { router } from "../trpc";
import { authRouter } from "./auth";
import { contactRouter } from "./contact";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  contact: contactRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
