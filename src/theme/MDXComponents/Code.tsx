import React, {type ReactNode} from 'react';
import Code from '@theme-original/MDXComponents/Code';
import type CodeType from '@theme/MDXComponents/Code';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof CodeType>;

export default function CodeWrapper(props: Props): ReactNode {
  return (
    <>
      <Code {...props} />
    </>
  );
}
