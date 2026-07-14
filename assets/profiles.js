(function () {
  const STORAGE_KEY = "bazi:profiles";

  function readProfiles() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function writeProfiles(profiles) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    window.dispatchEvent(new CustomEvent("bazi:profiles-updated"));
  }

  function normalizeProfile(profile) {
    const name = String(profile.name || "").trim();
    const date = String(profile.date || "").trim();
    const time = String(profile.time || "12:00").trim();
    const location = String(profile.location || "").trim();
    if (!name || !date) {
      throw new Error("保存档案需要姓名和出生日期。");
    }

    return {
      id: profile.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      gender: profile.gender || "未指定",
      date,
      time,
      location,
      calendar: profile.calendar || "公历",
      leapMonth: Boolean(profile.leapMonth),
      updatedAt: Date.now(),
      createdAt: profile.createdAt || Date.now(),
    };
  }

  function saveProfile(profile) {
    const normalized = normalizeProfile(profile);
    const profiles = readProfiles();
    const sameIndex = profiles.findIndex((item) => item.id === normalized.id || profileKey(item) === profileKey(normalized));
    if (sameIndex >= 0) {
      normalized.id = profiles[sameIndex].id;
      normalized.createdAt = profiles[sameIndex].createdAt || normalized.createdAt;
      profiles[sameIndex] = normalized;
    } else {
      profiles.unshift(normalized);
    }
    writeProfiles(profiles);
    return normalized;
  }

  function deleteProfile(id) {
    const profiles = readProfiles().filter((item) => item.id !== id);
    writeProfiles(profiles);
  }

  function findProfile(id) {
    return readProfiles().find((item) => item.id === id) || null;
  }

  function profileKey(profile) {
    return [profile.name, profile.date, profile.time, profile.location, profile.calendar, profile.leapMonth ? "1" : "0"].join("|");
  }

  function renderSelect(select, placeholder = "从档案选择") {
    if (!select) return;
    const current = select.value;
    const profiles = readProfiles();
    select.innerHTML = [
      `<option value="">${escapeHtml(placeholder)}</option>`,
      ...profiles.map((profile) => {
        const location = profile.location ? ` · ${profile.location}` : "";
        return `<option value="${escapeHtml(profile.id)}">${escapeHtml(profile.name)} · ${escapeHtml(profile.date)} ${escapeHtml(profile.time)}${escapeHtml(location)}</option>`;
      }),
    ].join("");
    if (profiles.some((profile) => profile.id === current)) {
      select.value = current;
    }
  }

  function fillForm(form, profile, prefix = "") {
    if (!form || !profile) return;
    const map = prefix
      ? {
          name: `${prefix}Name`,
          gender: `${prefix}Gender`,
          date: `${prefix}Date`,
          time: `${prefix}Time`,
          location: `${prefix}Location`,
          calendar: `${prefix}Calendar`,
          leapMonth: `${prefix}LeapMonth`,
        }
      : {
          name: "name",
          gender: "gender",
          date: "birthDate",
          time: "birthTime",
          location: "location",
          calendar: "calendar",
          leapMonth: "leapMonth",
        };

    setField(form, map.name, profile.name);
    setField(form, map.gender, profile.gender || "未指定");
    setField(form, map.date, profile.date);
    setField(form, map.time, profile.time || "12:00");
    setField(form, map.location, profile.location || "");
    setField(form, map.calendar, profile.calendar || "公历");
    const leap = form.elements[map.leapMonth];
    if (leap) leap.checked = Boolean(profile.leapMonth);
  }

  function readForm(form, prefix = "") {
    const data = new FormData(form);
    if (prefix) {
      return {
        name: data.get(`${prefix}Name`),
        gender: data.get(`${prefix}Gender`),
        date: data.get(`${prefix}Date`),
        time: data.get(`${prefix}Time`) || "12:00",
        location: data.get(`${prefix}Location`),
        calendar: data.get(`${prefix}Calendar`) || "公历",
        leapMonth: data.get(`${prefix}LeapMonth`) === "on",
      };
    }
    return {
      name: data.get("name"),
      gender: data.get("gender"),
      date: data.get("birthDate"),
      time: data.get("birthTime") || "12:00",
      location: data.get("location"),
      calendar: data.get("calendar") || "公历",
      leapMonth: data.get("leapMonth") === "on",
    };
  }

  function setField(form, name, value) {
    const field = form.elements[name];
    if (field) field.value = value || "";
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  window.BaziProfiles = {
    storageKey: STORAGE_KEY,
    readProfiles,
    saveProfile,
    deleteProfile,
    findProfile,
    renderSelect,
    fillForm,
    readForm,
  };
})();
