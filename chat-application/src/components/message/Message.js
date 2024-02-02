import React from 'react';
import { Stack, Text } from '@fluentui/react';

const Message = ({ message }) => {
  return (
    <Stack
      styles={{
        root: {
          padding: '10px',
          borderBottom: '1px solid #eaeaea',
        },
      }}
    >
      <Text>
        <strong>{`${message.user}: `}</strong>
        {`${message.content} - ${message.timestamp.toLocaleString()}`}
      </Text>
    </Stack>
  );
};

export default Message;