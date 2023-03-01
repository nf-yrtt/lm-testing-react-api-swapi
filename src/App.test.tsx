import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { wait } from '@testing-library/user-event/dist/utils';
import { server } from './mocks/server';
import { rest } from 'msw';

test('check first person is rendered', async () => {
  render(<App />);
  await waitFor( ()=> screen.findByText(/Luke Sky/i));
  const nameElement = screen.getByText(/Luke Sky/i);
  expect(nameElement).toBeInTheDocument();
});

test('check error message on 500', async () => {
  server.use(rest.get('https://swapi.dev/api/people/', (req, res, ctx) => {
    return res(ctx.status(500));    
  }));
  render(<App />);
  await waitFor( ()=> screen.findByText(/Oops.../i));
  const element = screen.getByText(/Oops... something went wrong try again/i);
  expect(element).toBeInTheDocument();
});

test('check error message on 418', async () => {
  server.use(rest.get('https://swapi.dev/api/people/', (req, res, ctx) => {
    return res(ctx.status(418));    
  }));
  render(<App />);
  await waitFor( ()=> screen.findByText(/418/i));
  const element = screen.getByText(/418 I'm a tea pot/i);
  expect(element).toBeInTheDocument();
});

