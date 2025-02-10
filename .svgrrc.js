module.exports = {
  svgoConfig: {
    plugins: [
      {
        name: "removeAttrs",
        params: { attrs: "(fill|stroke)" },
      },
    ],
  },
};