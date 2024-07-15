import { defineConfig } from "@farmfe/core";
import farmPluginPostCss from "@farmfe/js-plugin-postcss";
import path from "path";

export default defineConfig({
  plugins: ["@farmfe/plugin-react", farmPluginPostCss()],
  compilation: {
    resolve: {
      alias: {
        "@components": path.resolve(process.cwd(), "src/components"),
        "@interfaces": path.resolve(process.cwd(), "src/interfaces"),
        "@services": path.resolve(process.cwd(), "src/services"),
        "@store": path.resolve(process.cwd(), "src/store"),
        "@hooks": path.resolve(process.cwd(), "src/hooks"),
        "@utils": path.resolve(process.cwd(), "src/utils"),
      },
    },
    external: ["node:fs"],
  },
});
