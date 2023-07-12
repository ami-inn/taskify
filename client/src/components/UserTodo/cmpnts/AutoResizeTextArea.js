import { Textarea } from '@chakra-ui/react';
import React from 'react';
import ResizeTextarea from 'react-textarea-autosize';

const AutoResizeTextarea = React.forwardRef((props, ref) => {
  return <Textarea as={ResizeTextarea} minH="unset" ref={ref} {...props} />;
});

export default AutoResizeTextarea;
