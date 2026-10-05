import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import {
  instagramAuthorizationFallback,
  isInstagramAuthorizationError,
} from "./provider-error.ts";

Deno.test("Meta code 190 becomes a successful empty-feed fallback", () => {
  assertEquals(isInstagramAuthorizationError({ status: 400, code: 190 }), true);
  assertEquals(instagramAuthorizationFallback(), {
    media: [],
    warning: "Instagram authorization needs to be renewed.",
    code: "TOKEN_INVALID",
  });
});

Deno.test("unrelated provider failures remain errors", () => {
  assertEquals(isInstagramAuthorizationError({ status: 500, code: 2 }), false);
});