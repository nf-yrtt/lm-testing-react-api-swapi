import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { wait } from '@testing-library/user-event/dist/utils';

test('check first person is rendered', async () => {
  render(<App />);
  await waitFor( ()=> screen.findByText(/Luke Sky/i));
  const nameElement = screen.getByText(/Luke Sky/i);
  expect(nameElement).toBeInTheDocument();
});
