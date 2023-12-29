import { render, screen } from "@testing-library/react";
import App from "./App";

test("테스트에 대한 설명", () => {
  render(<App />);

  // 2.
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
