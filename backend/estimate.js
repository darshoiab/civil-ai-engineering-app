/* ---------------------------------------------------------------------------
 * estimate.js — quantity takeoff + BOQ logic for the Civil Engineering AI App.
 *
 * Pure, framework-free functions. Works in the browser (attaches to window)
 * and in Node (module.exports) so the same code can be unit-tested.
 *
 * All geometry is computed in metric (m, sqm, cum). Plan dimensions are in
 * feet and converted here.  Quantity formulas use transparent civil
 * rules-of-thumb; every coefficient is named so it can be tuned.
 * ------------------------------------------------------------------------- */
(function (root) {
  'use strict';

  const FT = 0.3048;          // 1 foot in metres
  const SQFT = 0.09290304;    // 1 sqft in sqm

  // Default takeoff parameters (overridable from the UI).
  const DEFAULTS = {
    numFloors: 2,             // storeys to estimate
    floorHeightFt: 10,        // floor-to-floor height
    extWallThk: 0.23,         // external wall thickness (m) ~ 9"
    intWallThk: 0.115,        // internal wall thickness (m) ~ 4.5"
    slabThk: 0.125,           // RCC slab thickness (m)
    columnFactor: 0.04,       // RCC columns/beams as fraction of built-up area volume
    steelPerCum: 90,          // kg of steel per cum of RCC
    excavationDepth: 1.2,     // foundation excavation depth (m)
    pccFactor: 0.06,          // PCC volume as fraction of built-up area (m)
    openingRatio: 0.12,       // door+window area as fraction of wall area
    roofPitchFactor: 1.18     // sloped roof area vs flat footprint
  };

  // Sum of internal partition wall length (m) from the room layout.
  // Walls are shared between rooms, so total room perimeter is halved.
  function internalWallLength(layout) {
    if (!layout || !layout.rooms) return 0;
    let perim = 0;
    for (const r of layout.rooms) {
      const w = Math.abs(r.x1 - r.x0), d = Math.abs(r.z1 - r.z0);
      perim += 2 * (w + d);
    }
    return (perim * FT) / 2;
  }

  // Derive all geometric quantities from the plan + parameters.
  function computeQuantities(plan, params) {
    const p = Object.assign({}, DEFAULTS, params || {});
    const layout = plan.ground_floor_layout || {};
    const Wft = layout.building_width_ft || plan.building.footprint.approx_width_ft;
    const Dft = layout.building_depth_ft || plan.building.footprint.approx_depth_ft;

    const W = Wft * FT, D = Dft * FT;
    const footprint = W * D;                                   // sqm
    const builtUp = (plan.building.plinth_area_sqft || (Wft * Dft)) * SQFT * p.numFloors;
    const wallH = p.floorHeightFt * FT;

    const extLen = 2 * (W + D);                                // external perimeter
    const intLen = internalWallLength(layout);

    const brickVolume = (extLen * p.extWallThk + intLen * p.intWallThk) * wallH * p.numFloors;
    // Plaster: external walls one face outside + inside; internal walls both faces.
    const plasterArea = (extLen * 2 + intLen * 2) * wallH * p.numFloors;
    const paintArea = plasterArea;                             // paint follows plaster
    const floorArea = builtUp;
    const roofArea = footprint * p.roofPitchFactor;

    const slabVolume = builtUp * p.slabThk;
    const columnBeamVolume = builtUp * p.columnFactor;
    const rccVolume = slabVolume + columnBeamVolume;
    const steelWeight = rccVolume * p.steelPerCum;

    const excavationVolume = extLen * p.extWallThk * p.excavationDepth;
    const pccVolume = footprint * p.pccFactor;

    const wallFaceArea = (extLen + intLen) * wallH * p.numFloors;
    const doorWindowArea = wallFaceArea * p.openingRatio;

    return {
      params: p,
      footprint_sqm: round(footprint),
      built_up_area_sqm: round(builtUp),
      excavation_volume: round(excavationVolume),
      pcc_volume: round(pccVolume),
      rcc_volume: round(rccVolume),
      steel_weight: round(steelWeight),
      brick_volume: round(brickVolume),
      plaster_area: round(plasterArea),
      paint_area: round(paintArea),
      floor_area: round(floorArea),
      roof_area: round(roofArea),
      door_window_area: round(doorWindowArea)
    };
  }

  // Map SSR items onto computed quantities → priced BOQ line items + total.
  function generateBOQ(rateSchedule, quantities) {
    const lines = (rateSchedule.items || []).map(item => {
      const qty = quantities[item.basis];
      const quantity = (typeof qty === 'number') ? qty : 0;
      const amount = round(quantity * item.rate);
      return {
        code: item.code,
        description: item.description,
        unit: item.unit,
        quantity: round(quantity),
        rate: item.rate,
        amount: amount
      };
    });
    const total = round(lines.reduce((s, l) => s + l.amount, 0));
    return {
      currency: (rateSchedule.schedule && rateSchedule.schedule.currency) || 'INR',
      generated_on: new Date().toISOString().slice(0, 10),
      line_items: lines,
      grand_total: total
    };
  }

  // Convenience: plan + rates + params -> full estimate object.
  function estimate(plan, rateSchedule, params) {
    const quantities = computeQuantities(plan, params);
    const boq = generateBOQ(rateSchedule, quantities);
    return { project: plan.project && plan.project.name, quantities, boq };
  }

  function round(n) { return Math.round((n + Number.EPSILON) * 100) / 100; }

  const api = { DEFAULTS, computeQuantities, generateBOQ, estimate, internalWallLength };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.Estimate = api;
})(typeof window !== 'undefined' ? window : globalThis);
