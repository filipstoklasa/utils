type ParamOnly<Segment extends string> = Segment extends `:${infer Param}`
  ? Param
  : never;

type PathSegments<Path extends string> =
  Path extends `${infer SegmentA}/${infer SegmentB}`
    ? ParamOnly<SegmentA> | PathSegments<SegmentB>
    : ParamOnly<Path>;

type Params<Path extends string> = {
  [Key in PathSegments<Path>]: string | number;
};

/**
 *
 * @param path path with generic parameter (requires /:name/ format)
 * @param params object with values to be mapped to the path
 * @returns Returns path with mapped dynamic values from params argument
 */
function mapParamsToPath<Path extends string>(
  path: Path,
  params: Params<Path>
): string {
  return path.replace(/:(\w+)/g, (_, key: string) => {
    return params?.[key as PathSegments<string>] ?? "MISSING_PARAM";
  });
}

export default mapParamsToPath;
