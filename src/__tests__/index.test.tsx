import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('GIVEN the Homepage is rendered', () => {
  it('THEN the layout is unchanged', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  it('THEN the correct heading is displayed', () => {
    render(<Home />);

    const heading = screen.getByText('👋 Hello World 👋');

    expect(heading).toBeInTheDocument();
  });
});
