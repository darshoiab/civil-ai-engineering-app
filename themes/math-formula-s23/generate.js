/*
 * Math Formula Theme generator — shared by index.html (browser) and the
 * Node render script. Produces a dense, packed field of equations sized to
 * the Galaxy S23 Ultra's native 1440 x 3088 display.
 */
(function (global) {
  const W = 1440, H = 3088;

  // Palette presets: a = accent, f = faint field, hero = brightest
  const PALETTES = {
    "AMOLED Cyan": { a: "#2fe0f0", f: "#5fd6e6", hero: "#eafcff" },
    "Amber":       { a: "#ffb347", f: "#caa86a", hero: "#fff4e2" },
    "Magenta":     { a: "#ff5fa2", f: "#d77ba6", hero: "#ffe9f3" },
    "Emerald":     { a: "#3ee08f", f: "#6fc79a", hero: "#e8fff2" },
    "Mono White":  { a: "#dfe7ee", f: "#7e8794", hero: "#ffffff" },
  };

  // A big pool of famous equations across many fields.
  const FORMULAS = [
    "exp(iπ) + 1 = 0", "a² + b² = c²", "E = mc²", "φ = (1+√5)/2",
    "∫ e⁻ˣ² dx = √π", "Σ 1/n² = π²/6", "ζ(s) = Σ 1/nˢ", "Γ(n) = (n−1)!",
    "cos²θ + sin²θ = 1", "eⁱˣ = cos x + i sin x", "∇·E = ρ/ε₀", "∇·B = 0",
    "∇×E = −∂B/∂t", "∇×B = μ₀J + μ₀ε₀ ∂E/∂t", "iℏ ∂ψ/∂t = Ĥψ", "Δx Δp ≥ ℏ/2",
    "F = G m₁m₂/r²", "x = (−b ± √(b²−4ac))/2a", "d/dx eˣ = eˣ", "∫ₐᵇ f(x)dx",
    "lim (1+1/n)ⁿ = e", "f(x) = Σ aₙxⁿ", "∂u/∂t = α ∇²u", "det(A − λI) = 0",
    "P(A|B) = P(B|A)P(A)/P(B)", "n! = ∏ k", "∮ E·dl = −dΦ/dt", "ds² = dx² + dy²",
    "sin(a±b) = sin a cos b ± cos a sin b", "tan θ = sin θ/cos θ", "log(ab) = log a + log b",
    "(a+b)ⁿ = Σ C(n,k) aⁿ⁻ᵏbᵏ", "∇²φ = 0", "∂²u/∂t² = c² ∇²u", "Tr(AB) = Tr(BA)",
    "Aᵀ = A⁻¹", "⟨ψ|ψ⟩ = 1", "S = k log W", "PV = nRT", "F = ma",
    "p = mv", "KE = ½mv²", "λ = h/p", "c = λf", "R = ρL/A",
    "V = IR", "Q = mcΔT", "g = 9.81 m/s²", "∫ 1/x dx = ln|x|",
    "cosh²x − sinh²x = 1", "x̄ = Σxᵢ/n", "σ² = E[(X−μ)²]", "∇f = (∂f/∂x, ∂f/∂y)",
    "∫∫_D dA", "lim (sin x)/x = 1", "aⁿ + bⁿ = cⁿ", "π = 4 Σ (−1)ⁿ/(2n+1)",
    "Δ = b² − 4ac", "i² = −1", "|z| = √(a²+b²)", "z = r eⁱθ",
    "1+2+⋯+n = n(n+1)/2", "Fₙ = Fₙ₋₁ + Fₙ₋₂", "gcd(a,b)·lcm(a,b) = ab",
    "θ = s/r", "A = πr²", "V = ⁴⁄₃πr³", "C = 2πr",
  ];

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Build a packed, flowing field of formulas.
  function buildField(p, rng) {
    const margin = 60, maxX = W - 60, top = 250, bottom = H - 70;
    const sizes = [40, 44, 50, 56, 62];
    let pool = [];
    const refill = () => {
      pool = FORMULAS.slice();
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
    };
    refill();

    const out = [];
    let x = margin + rng() * 30, y = top, rowH = 0;
    while (y < bottom) {
      if (!pool.length) refill();
      const text = pool.pop();
      const size = sizes[Math.floor(rng() * sizes.length)];
      const w = text.length * size * 0.46;
      if (x + w > maxX) {                 // wrap to next row
        x = margin + rng() * 50;
        y += rowH + size * 0.55;
        rowH = 0;
        if (y >= bottom) break;
      }
      const accent = rng() < 0.13;
      const fill = accent ? p.a : p.f;
      const op = accent ? (0.42 + rng() * 0.18) : (0.06 + rng() * 0.07);
      out.push(
        `<text x="${(x).toFixed(0)}" y="${(y).toFixed(0)}" font-size="${size}" ` +
        `fill="${fill}" opacity="${op.toFixed(2)}">${esc(text)}</text>`
      );
      x += w + size * 0.7;
      rowH = Math.max(rowH, size);
    }
    return out.join("\n    ");
  }

  function buildSVG(paletteName, seed) {
    const p = PALETTES[paletteName] || PALETTES["AMOLED Cyan"];
    const rng = mulberry32(seed == null ? 7 : seed);
    const serif = "'Cambria Math','Latin Modern Math','Times New Roman',serif";
    const field = buildField(p, rng);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#070b16"/><stop offset="55%" stop-color="#04060d"/>
      <stop offset="100%" stop-color="#010206"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="32%" r="65%">
      <stop offset="0%" stop-color="${p.a}" stop-opacity="0.14"/>
      <stop offset="45%" stop-color="${p.a}" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g font-family="${serif}" font-style="italic">
    ${field}
  </g>
  <rect x="34" y="34" width="${W - 68}" height="${H - 68}" rx="44" fill="none"
        stroke="${p.a}" stroke-opacity="0.07" stroke-width="2"/>
</svg>`;
  }

  const api = { W, H, PALETTES, FORMULAS, buildSVG };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.MathTheme = api;
})(typeof window !== "undefined" ? window : globalThis);
