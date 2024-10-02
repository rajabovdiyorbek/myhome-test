module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://dev.moydomonline.ru",
        changeOrigin: true,
      },
    },
  },
};
