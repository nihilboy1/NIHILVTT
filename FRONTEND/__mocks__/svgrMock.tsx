import * as React from 'react';

const SvgrMock = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-testid="svgr-mock" {...props} />
);

export default SvgrMock;
