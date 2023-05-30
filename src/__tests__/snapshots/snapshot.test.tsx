import HelloComponent from "@/components/basetest/HelloComponent"
import { render, screen } from '@testing-library/react'

describe('Index Page', () => {
  it('renders homepage unchanged', () => {
    let name = "Another update"
    const { container } = render(<HelloComponent name={name} />);

    expect(container).toMatchSnapshot();
    // expect(container).toMatchInlineSnapshot();
  });
})