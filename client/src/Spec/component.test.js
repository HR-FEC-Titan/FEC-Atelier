const overview = require('../components/Overview/Overview.jsx')

test("If Overview is rendered!", () => {
  const { getByText } = render(<App id={window.initialProductId} />);
  expect(getElementById("h1")).toBeInTheDocument();
});