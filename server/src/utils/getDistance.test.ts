import { getDistance } from "./getDistance";

describe("getDistance", () => {
  test("returns 0 for identical points", () => {
    const point = { lat: 48.8566, lng: 2.3522 };

    expect(getDistance(point, point)).toBeCloseTo(0, 6);
  });

  test("returns known distance between Paris and London", () => {
    const paris = { lat: 48.8566, lng: 2.3522 };
    const london = { lat: 51.5074, lng: -0.1278 };

    // Real distance is ~343.6 km with the current formula and Earth radius.
    expect(getDistance(paris, london)).toBeCloseTo(343.56, 1);
  });
});
