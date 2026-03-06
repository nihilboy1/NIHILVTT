export type BoardRendererMode = 'pixi';

export type BoardViewBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type BoardViewportSize = {
  width: number;
  height: number;
};

export type BoardWorldTransform = {
  scaleX: number;
  scaleY: number;
  containerX: number;
  containerY: number;
};

export interface BoardRendererAdapter {
  readonly mode: BoardRendererMode;
  readonly supportsInteractions: boolean;
  getWorldTransform: (params: {
    viewBox: BoardViewBox;
    viewport: BoardViewportSize;
  }) => BoardWorldTransform;
}
