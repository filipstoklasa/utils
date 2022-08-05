import mapParamsToPath from "../mapParamsToPath";

const KEY = "key",
  VALUE = "value",
  VALUE2 = "value2",
  FOO = "foo",
  BAZ = "baz",
  WIZ = "key";

describe("[mapParamsToPath]", () => {
  it("Checks static parameter with dynamic pair", () => {
    expect(mapParamsToPath(`/${KEY}/:${KEY}`, { key: FOO })).toBe(
      `/${KEY}/${FOO}`
    );
  });

  it("Checks only dynamic parameters", () => {
    expect(
      mapParamsToPath(`/:${VALUE}/:${VALUE2}`, {
        [VALUE]: BAZ,
        [VALUE2]: WIZ,
      })
    ).toBe(`/${BAZ}/${WIZ}`);
  });

  it("Checks one source parameter mapped to multiple segments", () => {
    expect(
      mapParamsToPath(`/:${VALUE}/:${VALUE}`, {
        [VALUE]: BAZ,
      })
    ).toBe(`/${BAZ}/${BAZ}`);
  });
});
