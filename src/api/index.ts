import Elysia from "elysia";
import { test } from './test';

export const api = new Elysia().use(test)