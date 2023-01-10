import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import { env } from "../../../env/server.mjs";
import * as contentful from "contentful";

export const contactRouter = router({
  
    getItems: publicProcedure.mutation(async ({  }) => {
      const client = contentful.createClient({
        space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE!,
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESTOKEN!
    })
    return await (await client?.getEntries({content_type: "blog"}).then((response: { items: any; }) => {
        return response.items
       }))
    }),
    getItemsEnglish: publicProcedure.mutation(async ({  }) => {
      const client = contentful.createClient({
        space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE!,
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESTOKEN!
    })
    return await (await client?.getEntries({content_type: "rubyen"}).then((response: { items: any; }) => {
        return response.items
       }))
    }),
  });

