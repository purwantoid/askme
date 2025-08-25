import { dayjs, isValidDate, safeParseDate } from "./date-utils"

let dateFormatter: Intl.DateTimeFormat
let dateTimeFormatter: Intl.DateTimeFormat
let decimalFormatter: Intl.NumberFormat
let numberFormatter: Intl.NumberFormat

export function toIntlDateString(date: any) {
  if (!dateFormatter) {
    dateFormatter = new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  // if date is not valid, return the original date
  const _date = safeParseDate(date)

  return _date instanceof Date ? dateFormatter.format(_date) : date
}

export function toIntlDateTimeString(date: any) {
  if (!isValidDate(date)) return undefined
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  // return moment.tz(date, localTimeZone).format("MM/DD/YYYY, HH:mm z")
}

export function toIntlTimeString(date: any, time: any) {
  if (!time) {
    return ""
  }
  const [hours, minutes] = time.split(":")
  const paddedTime = `${hours.padStart(2, "0")}:${minutes}`

  const intlDate = date ? new Date(date) : new Date()
  const currentDateStr = intlDate.toISOString().substring(0, 10)
  const dateTime = `${currentDateStr}T${paddedTime}Z`
  if (!isValidDate(dateTime)) return undefined

  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  // return moment.tz(dateTime, localTimeZone).format('MM/DD/YYYY, HH:mm z');
}

export const nFormatter = (num: number, digits: number = 2) => {
  if (num < 1000) return num.toFixed(digits)

  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "m" },
    { value: 1e9, symbol: "g" },
    { value: 1e12, symbol: "t" },
    { value: 1e15, symbol: "p" },
    { value: 1e18, symbol: "e" },
  ]

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })

  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0"
}

export function formatNumber(value: string | number) {
  if (typeof value === "string") {
    value = parseFloat(value)
  }

  if (!numberFormatter) {
    numberFormatter = new Intl.NumberFormat("en-US")
  }

  return numberFormatter.format(value)
}

export function formatDecimal(value: string | number) {
  if (!decimalFormatter) {
    decimalFormatter = new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  if (typeof value === "string") {
    value = parseFloat(value)
  }

  let formatted = decimalFormatter.format(value)
  if (formatted === "NaN") return "-"

  // trim trailing zeros
  if (formatted.includes(".")) {
    formatted = formatted.replace(/\.?0*$/, "")
  }

  return formatted
}

export function formatDateTime(raw: string | number | Date, isUtc = false) {
  const date = safeParseDate(raw)
  if (!(date instanceof Date)) return "-"

  const dayjsDate = isUtc ? dayjs.utc(date) : dayjs(date)
  return dayjsDate.format("YYYY-MM-DD hh:mm")
}

export function formatDate(raw: string | number | Date, isUtc = false) {
  const date = safeParseDate(raw)
  if (!(date instanceof Date)) return "-"

  const dayjsDate = isUtc ? dayjs.utc(date) : dayjs(date)

  return dayjsDate.format("YYYY-MM-DD")
}
