import { describe, it, expect } from 'vitest'
import { transplantDaysSince, chemoDaysSince } from './dateCalculations'

describe('dateCalculations', () => {
  describe('transplantDaysSince', () => {
    it('returns 0 for transplant date itself', () => {
      const date = new Date('2026-02-15')
      const result = transplantDaysSince(date, date)
      expect(result).toBe(0)
    })

    it('returns 1 for one day after transplant', () => {
      const transplantDate = new Date('2026-02-15')
      const nextDay = new Date('2026-02-16')
      const result = transplantDaysSince(transplantDate, nextDay)
      expect(result).toBe(1)
    })

    it('returns 7 for one week after transplant', () => {
      const transplantDate = new Date('2026-02-15')
      const oneWeekLater = new Date('2026-02-22')
      const result = transplantDaysSince(transplantDate, oneWeekLater)
      expect(result).toBe(7)
    })

    it('handles negative days (past dates)', () => {
      const transplantDate = new Date('2026-02-15')
      const beforeTransplant = new Date('2026-02-10')
      const result = transplantDaysSince(transplantDate, beforeTransplant)
      expect(result).toBe(-5)
    })

    it('handles leap year correctly', () => {
      const transplantDate = new Date('2024-02-28')
      const afterLeapDay = new Date('2024-03-01')
      const result = transplantDaysSince(transplantDate, afterLeapDay)
      expect(result).toBe(2)
    })

    it('returns null for invalid transplant date', () => {
      const invalidDate = new Date('invalid')
      const validDate = new Date('2026-02-15')
      const result = transplantDaysSince(invalidDate, validDate)
      expect(result).toBeNull()
    })

    it('returns null for invalid target date', () => {
      const validDate = new Date('2026-02-15')
      const invalidDate = new Date('invalid')
      const result = transplantDaysSince(validDate, invalidDate)
      expect(result).toBeNull()
    })

    it('returns null for both invalid dates', () => {
      const invalidDate1 = new Date('invalid')
      const invalidDate2 = new Date('also invalid')
      const result = transplantDaysSince(invalidDate1, invalidDate2)
      expect(result).toBeNull()
    })

    it('uses current date when target date not provided', () => {
      const pastDate = new Date()
      pastDate.setDate(pastDate.getDate() - 10)
      const result = transplantDaysSince(pastDate)
      expect(result).toBe(10)
    })

    it('handles large date differences', () => {
      const transplantDate = new Date('2020-01-01')
      const targetDate = new Date('2026-02-15')
      const result = transplantDaysSince(transplantDate, targetDate)
      expect(result).toBeGreaterThan(2200)
    })
  })

  describe('chemoDaysSince', () => {
    it('returns 1 for first chemo date itself', () => {
      const date = new Date('2026-02-15')
      const result = chemoDaysSince(date, date)
      expect(result).toBe(1)
    })

    it('returns 2 for one day after first chemo', () => {
      const firstChemoDate = new Date('2026-02-15')
      const nextDay = new Date('2026-02-16')
      const result = chemoDaysSince(firstChemoDate, nextDay)
      expect(result).toBe(2)
    })

    it('returns 8 for one week after first chemo', () => {
      const firstChemoDate = new Date('2026-02-15')
      const oneWeekLater = new Date('2026-02-22')
      const result = chemoDaysSince(firstChemoDate, oneWeekLater)
      expect(result).toBe(8)
    })

    it('handles negative days (before first chemo)', () => {
      const firstChemoDate = new Date('2026-02-15')
      const beforeFirstChemo = new Date('2026-02-10')
      const result = chemoDaysSince(firstChemoDate, beforeFirstChemo)
      expect(result).toBe(-4)
    })

    it('handles leap year correctly', () => {
      const firstChemoDate = new Date('2024-02-28')
      const afterLeapDay = new Date('2024-03-01')
      const result = chemoDaysSince(firstChemoDate, afterLeapDay)
      expect(result).toBe(3)
    })

    it('returns null for invalid first chemo date', () => {
      const invalidDate = new Date('invalid')
      const validDate = new Date('2026-02-15')
      const result = chemoDaysSince(invalidDate, validDate)
      expect(result).toBeNull()
    })

    it('returns null for invalid target date', () => {
      const validDate = new Date('2026-02-15')
      const invalidDate = new Date('invalid')
      const result = chemoDaysSince(validDate, invalidDate)
      expect(result).toBeNull()
    })

    it('returns null for both invalid dates', () => {
      const invalidDate1 = new Date('invalid')
      const invalidDate2 = new Date('also invalid')
      const result = chemoDaysSince(invalidDate1, invalidDate2)
      expect(result).toBeNull()
    })

    it('uses current date when target date not provided', () => {
      const pastDate = new Date()
      pastDate.setDate(pastDate.getDate() - 10)
      const result = chemoDaysSince(pastDate)
      expect(result).toBe(11)
    })

    it('handles large date differences', () => {
      const firstChemoDate = new Date('2020-01-01')
      const targetDate = new Date('2026-02-15')
      const result = chemoDaysSince(firstChemoDate, targetDate)
      expect(result).toBeGreaterThan(2200)
    })

    it('correctly offsets by 1 compared to transplantDaysSince', () => {
      const date1 = new Date('2026-02-15')
      const date2 = new Date('2026-02-20')
      const transplantDays = transplantDaysSince(date1, date2)
      const chemoDays = chemoDaysSince(date1, date2)
      expect(chemoDays).toBe((transplantDays ?? 0) + 1)
    })
  })
})
