import { renderHook, act } from "@testing-library/react-hooks";

import {useVisualMode} from "hooks/useVisualMode";

const FIRST = "FIRST";
const SECOND = 'SECOND';
const THIRD = 'THIRD';

test("useVisualMode should initialize with default value, empty component", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  expect(result.current.mode).toBe(FIRST);
});

//test the transition mode e.g. from empty component to show component
//this test will initialize the mode to FIRST, then transition to SECOND and then check to see what the current value of mode is.
test("useVisualMode should transition to another mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
});

//test the back transition mode e.g. from warning component back to show component
/*this test will initialize the mode to FIRST and then transition to SECOND.
  The first assertion confirms that we made it to SECOND (If we do not include this assertion, then it's possible for the test to pass even if back isn't working)
  the test then transitions to THIRD. 
  afterwards, the test will attempt to pop back to the most recent mode, which should be SECOND. 
  after another back, we should find ourselves back at the FIRST mode.
*/
test("useVisualMode should return to previous mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.transition(THIRD));
  expect(result.current.mode).toBe(THIRD);

  act(() => result.current.back());
  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});

// this test will confirm that navigating back from the initial mode will not change the mode value
// i.e. we can't go back further than the initial value
test("useVisualMode should not return to previous mode if already at initial", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});

//the test shows that calling back will skip the SECOND mode.
test("useVisualMode should replace the current mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);

  // Passing "true" to transition(THIRD, true) says "Transition to THIRD by REPLACING SECOND"
  act(() => result.current.transition(THIRD, true));
  expect(result.current.mode).toBe(THIRD);

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});