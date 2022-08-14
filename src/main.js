import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElIcons from "@element-plus/icons-vue";
import request from "./request/request.js";

// markdown 系列插件
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import createMermaidPlugin from "@kangc/v-md-editor/lib/plugins/mermaid/cdn";
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index";
import "@kangc/v-md-editor/lib/plugins/emoji/emoji.css";

// Prism
import Prism from "prismjs";
// highlight code
import "prismjs/components/prism-json";

VMdPreview.use(vuepressTheme, {
  Prism,
});
// markdown支持流程图
VMdPreview.use(createMermaidPlugin());
// markdown支持显示代码行数
VMdPreview.use(createLineNumbertPlugin());
// markdown支持代码快速复制
VMdPreview.use(createCopyCodePlugin());
// markdown支持emoji
VMdPreview.use(createEmojiPlugin());

const app = createApp(App);

for (const icname in ElIcons) {
  app.component(icname, ElIcons[icname]);
}
app.config.globalProperties.$http = request;
app.use(ElementPlus);
app.use(router);
app.use(store);
app.use(VMdPreview)
app.mount("#app");
