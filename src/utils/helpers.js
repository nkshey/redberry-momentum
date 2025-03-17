const monthNames = [
  "იანვ",
  "თებ",
  "მარ",
  "აპრ",
  "მაი",
  "ივნ",
  "ივლ",
  "აგვ",
  "სექ",
  "ოქტ",
  "ნოემ",
  "დეკ",
];

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

export function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

export function saveToSessionStorage(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to sessionStorage:", error);
  }
}

export function getFromSessionStorage(key, defaultValue) {
  try {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error("Error loading from sessionStorage:", error);
    return defaultValue;
  }
}
