const { not } = require("../../components/service/fp-function");

describe("Funciones genericas", () => {
  test("Negar un resultado verdadero a falso", () => {
    expect(not(true)).toBe(false);
  });
  test("Negar un resultado FALSO a VERDADERO", () => {
    expect(not(false)).toBe(true);
  });
});
