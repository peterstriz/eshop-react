import { render, screen } from '@testing-library/react';
import Produkty from './Produkty';

test('renders learn react link', () => {
  render(<Produkty />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
