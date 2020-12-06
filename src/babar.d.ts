declare module 'babar' {
  export type Options = {
    caption: string;
    color?: string;
    grid?: string;
    width?: number;
    height?: number;
    xFractions?: number;
    yFractions?: number;
    minX?: number;
    maxX?: number;
    minY?: number;
    maxY?: number;
  };
  function babar(points: [number, number][], options?: Options): string;
  export default babar;
}
