import { createApp } from "vue";
import App from "./App.vue";
import router from "./assets/js/router";
import store from "./assets/js/store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElIcons from "@element-plus/icons-vue";
import request from "@/assets/js/request/request.js";

// 预览组件插件
import VMdPreview from "@kangc/v-md-editor/lib/preview";
// 编辑组件
import VMdEditor  from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// codemirror 编辑器的相关资源
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
// edit
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';
// import "@kangc/v-md-editor/lib/style/preview.css";
// import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
// import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import createMermaidPlugin from "@kangc/v-md-editor/lib/plugins/mermaid/cdn";
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index";
import "@kangc/v-md-editor/lib/plugins/emoji/emoji.css";

// Prism
// import Prism from "prismjs";

// highlightjs
import hljs from 'highlight.js';


// highlight code
// import "prismjs/components/prism-json";
// katex
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';

// VMdPreview.use(vuepressTheme, {
//   Prism,
// });

VMdEditor.Codemirror = Codemirror
VMdEditor.use(githubTheme, {
  Hljs: hljs,
})

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

// markdown支持流程图
VMdEditor.use(createMermaidPlugin());
// markdown支持显示代码行数
VMdEditor.use(createLineNumbertPlugin());
// markdown支持代码快速复制
VMdEditor.use(createCopyCodePlugin());
// markdown支持emoji
VMdEditor.use(createEmojiPlugin());
// markdown支持katex公式
VMdEditor.use(createKatexPlugin());


// markdown支持流程图
VMdPreview.use(createMermaidPlugin());
// markdown支持显示代码行数
VMdPreview.use(createLineNumbertPlugin());
// markdown支持代码快速复制
VMdPreview.use(createCopyCodePlugin());
// markdown支持emoji
VMdPreview.use(createEmojiPlugin());
// markdown支持katex公式
VMdPreview.use(createKatexPlugin());

const app = createApp(App);

for (const icname in ElIcons) {
  app.component(icname, ElIcons[icname]);
}
app.config.globalProperties.$http = request;
app.use(ElementPlus);
app.use(router);
app.use(store);
app.use(VMdPreview)
app.use(VMdEditor)
app.mount("#app");
