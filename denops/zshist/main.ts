import type { Denops } from "@denops/std";
import * as fn from "@denops/std/function";
import { ensure, is } from "@core/unknownutil";
import { read, write } from "./meta.ts";

export function main(denops: Denops) {
  denops.dispatcher = {
    async read(uFilepath: unknown, uBuffer: unknown) {
      try {
        const filepath = ensure(uFilepath, is.String);
        const buffer = ensure(uBuffer, is.Number);
        const content = await read(filepath);
        await fn.setbufline(denops, buffer, 1, content.split("\n"));
      } catch (err) {
        console.error(err);
      }
    },
    async write(uFilepath: unknown, uBuffer: unknown) {
      try {
        const filepath = ensure(uFilepath, is.String);
        const buffer = ensure(uBuffer, is.Number);
        const content = await fn.getbufline(denops, buffer, 1, "$");
        await write(filepath, content.join("\n"));
      } catch (err) {
        console.error(err);
      }
    },
  };
}
