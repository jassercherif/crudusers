// src/pages/RegisterForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SimpleRegistrationForm } from '../pages/RegisterForm';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

describe('SimpleRegistrationForm Component', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('submits the form and resets fields', async () => {
    mockAxios.onPost('http://localhost:3700/api/users').reply(201);

    render(<SimpleRegistrationForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter your first name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your age'), { target: { value: '30' } });
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Enter your first name')).toHaveValue('');
      expect(screen.getByPlaceholderText('Enter your last name')).toHaveValue('');
      expect(screen.getByPlaceholderText('Enter your email')).toHaveValue('');
      expect(screen.getByPlaceholderText('Enter your age')).toHaveValue('');
    });
  });
});
