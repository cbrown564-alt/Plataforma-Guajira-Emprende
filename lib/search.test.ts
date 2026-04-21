import { describe, expect, it } from "vitest"
import {
  buildIndex,
  groupResults,
  normalize,
  searchAll,
  sectionLinks,
} from "./search"

describe("normalize", () => {
  it("lowercases and strips diacritics", () => {
    expect(normalize("Artesanías Wayuu")).toBe("artesanias wayuu")
    expect(normalize("  Formación  ")).toBe("formacion")
  })
})

describe("searchAll", () => {
  it("returns no results for an empty query", () => {
    expect(searchAll("")).toEqual([])
    expect(searchAll("   ")).toEqual([])
  })

  it("matches an opportunity by title", () => {
    const results = searchAll("fondo emprender")
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].kind).toBe("opportunity")
    expect(results[0].id).toBe("fondo-emprender-turismo-2024")
  })

  it("matches a program by title", () => {
    const results = searchAll("escuela wayuu")
    const topProgram = results.find((r) => r.kind === "program")
    expect(topProgram?.id).toBe("escuela-turismo-wayuu")
  })

  it("matches a business by tag or category", () => {
    const results = searchAll("mochilas")
    const business = results.find((r) => r.kind === "business")
    expect(business?.id).toBe("artesanias-wayuu-authentic")
  })

  it("matches a business by location", () => {
    const results = searchAll("cabo de la vela")
    const businesses = results.filter((r) => r.kind === "business")
    expect(businesses.length).toBeGreaterThanOrEqual(2)
  })

  it("is case- and diacritic-insensitive", () => {
    const a = searchAll("ARTESANÍAS")
    const b = searchAll("artesanias")
    expect(a.length).toBe(b.length)
    expect(a[0]?.id).toBe(b[0]?.id)
  })

  it("ranks title matches above description matches", () => {
    const results = searchAll("turismo")
    expect(results.length).toBeGreaterThan(1)
    const titleIndex = results.findIndex((r) => normalize(r.title).includes("turismo"))
    const descOnlyIndex = results.findIndex(
      (r) =>
        !normalize(r.title).includes("turismo") &&
        normalize(r.subtitle).includes("turismo"),
    )
    if (titleIndex !== -1 && descOnlyIndex !== -1) {
      expect(titleIndex).toBeLessThan(descOnlyIndex)
    }
  })

  it("matches navigation sections by keyword", () => {
    const results = searchAll("contacto")
    const section = results.find((r) => r.kind === "section")
    expect(section?.id).toBe("contact")
  })

  it("returns empty results for nonsense queries", () => {
    expect(searchAll("zzzzqqqq")).toEqual([])
  })

  it("handles partial multi-token queries", () => {
    const results = searchAll("microcredito")
    expect(results.some((r) => r.id === "microcreditos-bancoldex")).toBe(true)
  })
})

describe("groupResults", () => {
  it("buckets results by kind", () => {
    const grouped = groupResults(searchAll("turismo"))
    expect(Array.isArray(grouped.opportunity)).toBe(true)
    expect(Array.isArray(grouped.program)).toBe(true)
    expect(Array.isArray(grouped.business)).toBe(true)
    expect(Array.isArray(grouped.section)).toBe(true)
  })
})

describe("buildIndex", () => {
  it("indexes every opportunity, program, business, and section", () => {
    const index = buildIndex()
    expect(index.filter((e) => e.kind === "opportunity").length).toBeGreaterThan(0)
    expect(index.filter((e) => e.kind === "program").length).toBeGreaterThan(0)
    expect(index.filter((e) => e.kind === "business").length).toBeGreaterThan(0)
    expect(index.filter((e) => e.kind === "section").length).toBe(sectionLinks.length)
  })
})
