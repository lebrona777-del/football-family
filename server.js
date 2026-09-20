const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/*
  L-LIVE
  ქართული ფეხბურთის მატჩების API

  სტრუქტურა:
  /api/matches
  /api/matches/today
  /api/matches/upcoming
  /api/matches/results
  /api/matches/live
*/

// დროებითი მონაცემთა ფენა.
// შემდეგ აქ ერთიანად ჩავრთავთ GFF-ის ყველა წყაროს.
let matches = [];

// ყველა მატჩი
app.get("/api/matches", (req, res) => {
  res.json({
    success: true,
    count: matches.length,
    matches
  });
});

// დღევანდელი მატჩები
app.get("/api/matches/today", (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  const result = matches.filter(match =>
    match.date === today
  );

  res.json({
    success: true,
    count: result.length,
    matches: result
  });
});

// მომავალი მატჩები
app.get("/api/matches/upcoming", (req, res) => {
  const now = new Date();

  const result = matches.filter(match =>
    new Date(match.kickoff) > now &&
    match.status !== "finished"
  );

  res.json({
    success: true,
    count: result.length,
    matches: result
  });
});

// დასრულებული მატჩები
app.get("/api/matches/results", (req, res) => {
  const result = matches.filter(match =>
    match.status === "finished"
  );

  res.json({
    success: true,
    count: result.length,
    matches: result
  });
});

// LIVE მატჩები
app.get("/api/matches/live", (req, res) => {
  const result = matches.filter(match =>
    match.status === "live"
  );

  res.json({
    success: true,
    count: result.length,
    matches: result
  });
});

// ჩემპიონატები
app.get("/api/competitions", (req, res) => {
  res.json([
    {
      id: "national-league",
      name: "ეროვნული ლიგა"
    },
    {
      id: "national-league-2",
      name: "ეროვნული ლიგა 2"
    },
    {
      id: "liga-3",
      name: "ლიგა 3"
    },
    {
      id: "liga-4",
      name: "ლიგა 4"
    },
    {
      id: "regional-league",
      name: "რეგიონული ლიგა"
    },
    {
      id: "georgian-cup",
      name: "საქართველოს თასი"
    },
    {
      id: "womens-league",
      name: "ქალთა ლიგა"
    },
    {
      id: "futsal",
      name: "ფუტსალი"
    }
  ]);
});

// ჯანმრთელობის შემოწმება
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "L-LIVE",
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`L-LIVE server running on port ${PORT}`);
});
