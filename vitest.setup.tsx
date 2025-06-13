import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';

vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <img {...props} />;
  },
}));
