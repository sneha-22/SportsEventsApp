import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom matchers

import App from './App'; // Adjust the import path as necessary
import mockEvents from './mocks/MockEvents'; // Make sure this is available in your mocks

// Mock localStorage
beforeEach(() => {
  const mockSetItem = jest.fn();
  const mockGetItem = jest.fn();
  const mockClear = jest.fn();

  Object.defineProperty(window, 'localStorage', {
    value: {
      setItem: mockSetItem,
      getItem: mockGetItem.mockImplementation((key) => {
        if (key === "selectedEvents") {
          return JSON.stringify([]); // Return an empty array for tests
        }
        return null;
      }),
      clear: mockClear,
    },
    writable: true,
  });
});

describe('App Component', () => {
  test('renders the App heading', () => {
    render(<App />);
    expect(screen.getByText(/Sports Events Registration/i)).toBeInTheDocument();
  });

  test('renders AllEvents and SelectedEvents components', () => {
    render(<App />);
    expect(screen.getByText(/All Events/i)).toBeInTheDocument(); // Adjust based on actual text in your AllEvents component
    expect(screen.getByText(/Selected Events/i)).toBeInTheDocument(); // Adjust based on actual text in your SelectedEvents component
  });

  test('does not select more than three events', () => {
    render(<App />);
    
    // Simulate selecting events
    const selectButtons = screen.getAllByText(/Select/i);
    fireEvent.click(selectButtons[0]);
    fireEvent.click(selectButtons[1]);
    fireEvent.click(selectButtons[2]);

    // Attempt to select a fourth event
    fireEvent.click(selectButtons[3]);

    // Expect an alert to be shown (mock window.alert)
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.click(selectButtons[3]);
    expect(window.alert).toHaveBeenCalledWith('You have reached maximum number of events.');
  });

 
});
