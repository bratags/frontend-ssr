import vikeVue from "vike-vue/config";
import type { Config } from "vike/types";
import Layout from "../layouts/LayoutDefault.vue";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout,

  // https://vike.dev/head-tags
  title: "Bratags Vike App",
  description: "Static SSR rendering",

  extends: vikeVue as typeof vikeVue,
  prerender: true
} satisfies Config;
