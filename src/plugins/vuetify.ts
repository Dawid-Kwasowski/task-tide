/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { md3 } from "vuetify/blueprints";

// Composables
import { ThemeDefinition, createVuetify } from "vuetify";

const customLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#D1DEDE",
    surface: "#D1DEDE",
    primary: "#1d201fff",
    "primary-darken-1": "#3700B3",
    secondary: "#D1DEDE",
    "secondary-darken-1": "#D1DEDE",
    error: "#FF1654",
    info: "#2196F3",
    success: "#0A8754",
    warning: "#FB8C00",
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: md3,
  theme: {
    defaultTheme: "customLightTheme",
    themes: {
      customLightTheme,
    },
  },
});
