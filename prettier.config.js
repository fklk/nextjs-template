/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
    tabWidth: 4,
    singleAttributePerLine: true,
    arrowParens: "avoid",
    useTabs: false,
    plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
