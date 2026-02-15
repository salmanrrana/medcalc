import { differenceInDays, isValid } from 'date-fns'

/**
 * Calculate the day difference between two dates, returning null if either is invalid.
 *
 * @param offset - Added to the raw difference (0 for day-0 counting, 1 for day-1 counting)
 */
function daysSince(
  startDate: Date,
  targetDate: Date,
  offset: number
): number | null {
  if (!isValid(startDate) || !isValid(targetDate)) {
    return null
  }

  return differenceInDays(targetDate, startDate) + offset
}

/**
 * Calculate the number of days since a transplant date.
 * Day 0 = transplant day, Day 1 = next day, etc.
 *
 * @param transplantDate - The date of the transplant procedure
 * @param targetDate - The target date to calculate from (defaults to today)
 * @returns The number of days since transplant, or null if dates are invalid
 */
export function transplantDaysSince(
  transplantDate: Date,
  targetDate: Date = new Date()
): number | null {
  return daysSince(transplantDate, targetDate, 0)
}

/**
 * Calculate the current chemotherapy day.
 * Day 1 = first chemo, Day 2 = second chemo, etc.
 *
 * @param firstChemoDate - The date of the first chemotherapy treatment
 * @param targetDate - The target date to calculate from (defaults to today)
 * @returns The current chemo day number, or null if dates are invalid
 */
export function chemoDaysSince(
  firstChemoDate: Date,
  targetDate: Date = new Date()
): number | null {
  return daysSince(firstChemoDate, targetDate, 1)
}
