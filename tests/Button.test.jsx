import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { Button } from '../components/ui/button';

expect.extend(matchers);

describe('Button', () => {
  it('applies ghost variant styles', () => {
    render(<Button variant="ghost">Test</Button>);
    const btn = screen.getByRole('button', { name: /test/i });
    expect(btn).toHaveClass('px-4 py-2 rounded text-[#FF007B] border border-[#FF007B]');
  });
});
