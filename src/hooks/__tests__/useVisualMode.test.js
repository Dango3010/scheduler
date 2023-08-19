import { renderHook, act } from "@testing-library/react-hooks";

import {useVisualMode} from "hooks/useVisualMode";

const FIRST = "FIRST";
const SECOND = 'SECOND';
const THIRD = 'THIRD';

test("useVisualMode should initialize with default value, empty component", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should transition to another mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
});

//test the back transition mode e.g. from warning component back to show component
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