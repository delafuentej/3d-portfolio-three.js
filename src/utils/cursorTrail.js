export const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

export const clipIn = (i) => `
    polygon(
      50% ${i * 10}%,
      50% ${i * 10}%,
      50% ${(i + 1) * 10}%,
      50% ${(i + 1) * 10}%
    )
  `;

export const clipOut = (i) => `
    polygon(
      0% ${i * 10}%,
      100% ${i * 10}%,
      100% ${(i + 1) * 10}%,
      0% ${(i + 1) * 10}%
    )
  `;
