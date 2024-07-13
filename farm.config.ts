import { defineConfig } from "@farmfe/core";
import farmPluginPostCss from "@farmfe/js-plugin-postcss";

export default defineConfig({
  plugins: ["@farmfe/plugin-react", farmPluginPostCss()],
});
