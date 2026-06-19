/* AUTO-GENERATED from data/house-plan.json by utils/build-data.js — do not edit. */
window.PLAN_DATA = {
  "project": {
    "name": "Residential Villa",
    "designer": "Mycon Designers & Consultants",
    "drawing": "Ground Floor Plan with Plot",
    "source": "Architectural drawing + 3D renderings",
    "digitized_on": "2026-06-19",
    "units": "feet",
    "notes": "Dimensions transcribed from the supplied ground floor plan. Plot edges are approximate readings of the dimensioned boundary. Only the ground floor is dimensioned in the source; upper floors are visible in renderings but not provided."
  },
  "plot": {
    "shape": "irregular_pentagon",
    "edges": [
      {
        "label": "top",
        "length_ft": 38.67,
        "dim_text": "38'-8\""
      },
      {
        "label": "upper_right_diagonal",
        "length_ft": 36,
        "dim_text": "36'-0\""
      },
      {
        "label": "right_at_main_gate_02",
        "length_ft": 36,
        "dim_text": "36'-0\""
      },
      {
        "label": "bottom_at_main_gate_01",
        "length_ft": 52.08,
        "dim_text": "52'-1\""
      },
      {
        "label": "left",
        "length_ft": 59.67,
        "dim_text": "59'-8\""
      }
    ],
    "left_upper_segment_ft": 33,
    "gates": [
      {
        "id": "main_gate_01",
        "location": "bottom_left_corner"
      },
      {
        "id": "main_gate_02",
        "location": "right_side"
      }
    ],
    "features": [
      {
        "type": "car_park",
        "location": "right_open_area"
      }
    ]
  },
  "building": {
    "type": "villa",
    "storeys_dimensioned": 1,
    "storeys_visible_in_renderings": 3,
    "plinth_area_sqft": 1000,
    "footprint": {
      "approx_width_ft": 33.83,
      "approx_depth_ft": 31.42,
      "width_dim_text": "33'-10\" / 33'-11\"",
      "depth_dim_text": "31'-5\""
    }
  },
  "ground_floor_rooms": [
    {
      "name": "Guest Room",
      "width_ft": 12,
      "length_ft": 12,
      "area_sqft": 144,
      "dim_text": "12'x12'"
    },
    {
      "name": "Bedroom",
      "width_ft": 12,
      "length_ft": 12,
      "area_sqft": 144,
      "dim_text": "12'x12'",
      "features": [
        "TV"
      ]
    },
    {
      "name": "Kitchen",
      "width_ft": 8,
      "length_ft": 12,
      "area_sqft": 96,
      "dim_text": "8'x12'",
      "features": [
        "wash basin"
      ]
    },
    {
      "name": "Hammam",
      "width_ft": 10,
      "length_ft": 11,
      "area_sqft": 110,
      "dim_text": "10'x11'"
    },
    {
      "name": "Bath",
      "width_ft": 5,
      "length_ft": 8,
      "area_sqft": 40,
      "dim_text": "5'x8'"
    },
    {
      "name": "Store",
      "width_ft": 5.67,
      "length_ft": 5,
      "area_sqft": 28.35,
      "dim_text": "5'8\"x5'"
    },
    {
      "name": "Laundry",
      "width_ft": 4,
      "length_ft": 5,
      "area_sqft": 20,
      "dim_text": "4'x5'"
    },
    {
      "name": "Stairs",
      "width_ft": 8,
      "length_ft": 12.5,
      "area_sqft": 100,
      "dim_text": "8'x12'6\""
    },
    {
      "name": "Entrance",
      "width_ft": 4.5,
      "length_ft": 6,
      "area_sqft": 27,
      "dim_text": "4'6\"x6'"
    }
  ],
  "ground_floor_layout": {
    "note": "Interpreted spatial layout used to drive the 3D model. Origin at the south-west corner; x = east, z = north; feet. Positions are an approximation of the plan, not survey-accurate.",
    "building_width_ft": 34,
    "building_depth_ft": 31,
    "rooms": [
      {
        "name": "Guest Room",
        "x0": 0,
        "z0": 0,
        "x1": 12,
        "z1": 12
      },
      {
        "name": "Entrance",
        "x0": 13,
        "z0": 0,
        "x1": 18,
        "z1": 6
      },
      {
        "name": "Stairs",
        "x0": 13,
        "z0": 6,
        "x1": 21,
        "z1": 18
      },
      {
        "name": "Hammam",
        "x0": 0,
        "z0": 13,
        "x1": 10,
        "z1": 24
      },
      {
        "name": "Laundry",
        "x0": 0,
        "z0": 25,
        "x1": 5,
        "z1": 31
      },
      {
        "name": "Store",
        "x0": 6,
        "z0": 25,
        "x1": 12,
        "z1": 31
      },
      {
        "name": "Kitchen",
        "x0": 12,
        "z0": 19,
        "x1": 22,
        "z1": 31
      },
      {
        "name": "Bath",
        "x0": 22,
        "z0": 11,
        "x1": 27,
        "z1": 19
      },
      {
        "name": "Bedroom",
        "x0": 22,
        "z0": 19,
        "x1": 34,
        "z1": 31
      }
    ]
  },
  "summary": {
    "room_count": 9,
    "total_room_area_sqft": 709.35,
    "plinth_area_sqft": 1000,
    "circulation_and_walls_sqft": 290.65
  }
};
