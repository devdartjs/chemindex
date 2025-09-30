import { handleErrors } from "../../middlewares/mid-functions/error.handler";

describe("handleErrors function testing", () => {
  test("returns email error message when email is incorrect", () => {
    const error = { message: "incorrect email" };
    const result = handleErrors(error);
    expect(result).toEqual({
      email: "That email is not registered yet!",
      password: "",
    });
  });

  test("returns password error message when password is incorrect", () => {
    const error = { message: "incorrect password" };
    const result = handleErrors(error);
    expect(result).toEqual({
      email: "",
      password: "Invalid password!",
    });
  });

  test("returns duplicate email error message when code is 11000", () => {
    const error = { message: "", code: 11000 };
    const result = handleErrors(error);
    expect(result).toEqual({
      email: "That email is already used!",
      password: "",
    });
  });

  test("returns validation messages from user validation errors", () => {
    const error = {
      message: "user validation failed",
      errors: {
        email: {
          properties: {
            path: "email",
            message: "Invalid email format",
          },
        },
        password: {
          properties: {
            path: "password",
            message: "Password must be at least 6 characters",
          },
        },
      },
    };

    const result = handleErrors(error);
    expect(result).toEqual({
      email: "Invalid email format",
      password: "Password must be at least 6 characters",
    });
  });

  test("returns empty error messages when unknown error occurs", () => {
    const error = { message: "some unknown error" };
    const result = handleErrors(error);
    expect(result).toEqual({
      email: "",
      password: "",
    });
  });
});
