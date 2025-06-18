import { sum, sub } from "./math.js";

describe("Math Functions", () => {
  test("sum function adds two numbers", () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(-1, 1)).toBe(0);
    expect(sum(0, 0)).toBe(0);
  });

  test("sub function subtracts two numbers", () => {
    expect(sub(2, 1)).toBe(1);
    expect(sub(1, -1)).toBe(2);
    expect(sub(0, 0)).toBe(0);
  });
});
