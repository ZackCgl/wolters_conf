import { atom } from "jotai";

export const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL;
export const companyAtom = atom("companyCode");
