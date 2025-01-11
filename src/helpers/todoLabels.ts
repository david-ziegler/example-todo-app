import dayjs from "dayjs";

export function getDoneLabel(done: boolean) {
  if (done) {
    return "Erledigt";
  }
  return "Offen";
}

export function getDueDateLabel(dateString: string) {
  const inputDate = dayjs(dateString, "DD.MM.YYYY");
  const today = dayjs().startOf("day");

  if (inputDate.isBefore(today)) {
    return "Überfällig";
  }

  return dateString;
}
