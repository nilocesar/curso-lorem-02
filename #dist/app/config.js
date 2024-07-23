var config = {
  salvarDados: true,
  debug: false,
  waterMark: false,
  language: "pt-br",
  lms: {
    name: "default",
  },
  acessibility: {
    tools: true,
    outlines: true,
    vlibras: false,
    customLibras: true,
  },
  behaviors: {
    adaptive: false,
    width: 1920,
    height: 1080,
    fontSize: 30,
  },
  modalVoltar: {
    active: false,
    msg: "Você quer continuar de onde parou ou reiniciar o curso?",
    yes: "CONTINUAR",
    no: "REINICIAR",
    color: "#0a698d",
  },
  pages: [
    {
      uid: "onepag01",
      src: "onepag01/index.html",
    },
  ],
};
try {
  module.exports = config;
} catch (e) {}
