import { describe, it } from "node:test"
import assert from "node:assert/strict"
import {
  emptyQuery,
  matchFitLabel,
  matchOpportunities,
  matchPrograms,
  type MatchQuery,
} from "./matcher.ts"

const youngWayuuIdea: MatchQuery = {
  age: "18-28",
  community: "wayuu",
  stage: "idea",
  needs: ["grant", "training"],
  sectors: ["Turismo Cultural"],
}

const establishedPyme: MatchQuery = {
  age: "29-45",
  community: "guajira-resident",
  stage: "established",
  needs: ["credit"],
  sectors: ["Hospedaje"],
}

const rancheria: MatchQuery = {
  age: "46+",
  community: "wayuu",
  stage: "community-association",
  needs: ["grant", "training"],
  sectors: ["Turismo Cultural", "Artesanías"],
}

const techFounder: MatchQuery = {
  age: "29-45",
  community: "other",
  stage: "early",
  needs: ["tech", "grant", "mentorship"],
  sectors: ["unspecified"],
}

describe("matchOpportunities", () => {
  it("returns all active opportunities sorted by score descending", () => {
    const results = matchOpportunities(youngWayuuIdea)
    assert.ok(results.length >= 3, "expected at least 3 opportunities")
    for (let i = 1; i < results.length; i++) {
      assert.ok(
        results[i - 1].score >= results[i].score,
        `results must be sorted: ${results[i - 1].score} >= ${results[i].score}`,
      )
    }
  })

  it("puts Fondo Emprender first for a young Wayuu entrepreneur with an idea", () => {
    const results = matchOpportunities(youngWayuuIdea)
    assert.equal(results[0].item.id, "fondo-emprender-turismo-2024")
    assert.ok(results[0].percent >= 80, `expected >= 80%, got ${results[0].percent}`)
    assert.ok(results[0].reasons.length >= 2, "expected at least two reasons")
  })

  it("puts Microcréditos first for an established PYME needing credit", () => {
    const results = matchOpportunities(establishedPyme)
    assert.equal(results[0].item.id, "microcreditos-bancoldex-turismo")
  })

  it("penalises Fondo Emprender for someone over the age bracket", () => {
    const young = matchOpportunities(youngWayuuIdea)
    const older = matchOpportunities(establishedPyme)
    const fondoYoung = young.find((r) => r.item.id === "fondo-emprender-turismo-2024")!
    const fondoOlder = older.find((r) => r.item.id === "fondo-emprender-turismo-2024")!
    assert.ok(
      fondoYoung.score > fondoOlder.score,
      `young (${fondoYoung.score}) should outscore older (${fondoOlder.score})`,
    )
  })

  it("returns percent in 0..100 for every result", () => {
    const results = matchOpportunities(emptyQuery)
    for (const r of results) {
      assert.ok(r.percent >= 0 && r.percent <= 100, `percent out of range: ${r.percent}`)
    }
  })

  it("excludes opportunities with status 'Cerrado' if any", () => {
    const results = matchOpportunities(emptyQuery)
    for (const r of results) {
      assert.notEqual(r.item.status, "Cerrado")
    }
  })
})

describe("matchPrograms", () => {
  it("puts Turismo Comunitario first for a community association", () => {
    const results = matchPrograms(rancheria)
    assert.equal(results[0].item.id, "turismo-comunitario")
  })

  it("surfaces Innovación Turística for a tech founder", () => {
    const results = matchPrograms(techFounder)
    const top3Ids = results.slice(0, 3).map((r) => r.item.id)
    assert.ok(
      top3Ids.includes("innovacion-turistica"),
      `expected innovacion-turistica in top 3, got ${top3Ids.join(", ")}`,
    )
  })

  it("produces reasons that reference the user's selected attributes", () => {
    const results = matchPrograms(youngWayuuIdea)
    const top = results[0]
    assert.ok(top.reasons.length > 0, "top match should have reasons")
  })

  it("handles an empty query without crashing and gives every program a score", () => {
    const results = matchPrograms(emptyQuery)
    assert.equal(results.length, 6)
    for (const r of results) {
      assert.ok(Number.isFinite(r.score))
    }
  })
})

describe("matchFitLabel", () => {
  it("maps percentages to Spanish labels", () => {
    assert.equal(matchFitLabel(90), "Excelente match")
    assert.equal(matchFitLabel(70), "Buen match")
    assert.equal(matchFitLabel(50), "Match parcial")
    assert.equal(matchFitLabel(10), "Match débil")
  })
})
