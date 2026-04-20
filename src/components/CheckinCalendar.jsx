import { CheckCheck, Flame, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

const WEEK_DAYS = {
  zh: ["一", "二", "三", "四", "五", "六", "日"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `checkin-${year}-${month}-${day}`;
}

function hasCheckin(date, checkedMap) {
  return Boolean(checkedMap[formatDateKey(date)]);
}

function buildCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const leadingCount = (firstDay.getDay() + 6) % 7;
  const cells = [];

  for (let index = leadingCount; index > 0; index -= 1) {
    cells.push({
      type: "previous",
      value: daysInPrevMonth - index + 1,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      type: "current",
      value: day,
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({
      type: "next",
      value: cells.length - (leadingCount + daysInMonth) + 1,
    });
  }

  return cells;
}

function countCheckedDays(year, month, checkedMap) {
  const total = new Date(year, month + 1, 0).getDate();
  let count = 0;

  for (let day = 1; day <= total; day += 1) {
    const date = new Date(year, month, day);
    if (hasCheckin(date, checkedMap)) {
      count += 1;
    }
  }

  return count;
}

function calculateStreak(today, checkedMap) {
  let streak = 0;
  const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  while (hasCheckin(cursor, checkedMap)) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function CheckinCalendar({ language }) {
  const [today] = useState(() => new Date());
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const [checkedMap, setCheckedMap] = useState({});

  useEffect(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const nextCheckedMap = {};

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(currentYear, currentMonth, day);
      const key = formatDateKey(date);
      if (window.localStorage.getItem(key) === "true") {
        nextCheckedMap[key] = true;
      }
    }

    const streakCursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    for (let index = 0; index < 365; index += 1) {
      const key = formatDateKey(streakCursor);
      if (window.localStorage.getItem(key) === "true") {
        nextCheckedMap[key] = true;
      }
      streakCursor.setDate(streakCursor.getDate() - 1);
    }

    setCheckedMap(nextCheckedMap);
  }, [currentMonth, currentYear, today]);

  const calendarCells = buildCalendarDays(currentYear, currentMonth);
  const checkedDays = countCheckedDays(currentYear, currentMonth, checkedMap);
  const streak = calculateStreak(today, checkedMap);
  const isTodayChecked = hasCheckin(today, checkedMap);

  const handleToggle = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const isFutureDate = clickedDate > new Date(currentYear, currentMonth, today.getDate());
    if (isFutureDate) {
      return;
    }

    const key = formatDateKey(clickedDate);
    setCheckedMap((currentMap) => {
      const nextMap = { ...currentMap };

      if (nextMap[key]) {
        delete nextMap[key];
        window.localStorage.removeItem(key);
      } else {
        nextMap[key] = true;
        window.localStorage.setItem(key, "true");
      }

      return nextMap;
    });
  };

  return (
    <div className="panel-card overflow-hidden p-8 md:p-10">
      <div className="mb-6">
        <p className="section-title mb-2">Module B</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {language === "zh" ? "打卡日历" : "Check-in Calendar"}
        </h3>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="glass-panel p-5">
          <div className="flex items-center gap-3 text-cyan-400">
            <CalendarDays size={18} />
            <span className="text-sm uppercase tracking-[0.24em]">
              {language === "zh" ? "本月打卡" : "This Month"}
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            {checkedDays}
            {language === "zh" ? " 天" : " days"}
          </p>
        </div>
        <div className="glass-panel p-5">
          <div className="flex items-center gap-3 text-orange-400">
            <Flame size={18} />
            <span className="text-sm uppercase tracking-[0.24em]">
              {language === "zh" ? "连续打卡" : "Current Streak"}
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            {streak}
            {language === "zh" ? " 天" : " days"}
          </p>
        </div>
        <div className="glass-panel p-5">
          <div className="flex items-center gap-3 text-emerald-400">
            <CheckCheck size={18} />
            <span className="text-sm uppercase tracking-[0.24em]">
              {language === "zh" ? "今日状态" : "Today"}
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            {isTodayChecked ? "✓" : "✗"}
          </p>
        </div>
      </div>

      <div className="glass-panel p-5 md:p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              {language === "zh" ? "当前月份" : "Current Month"}
            </p>
            <h4 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              {language === "zh"
                ? `${currentYear} 年 ${currentMonth + 1} 月`
                : `${today.toLocaleString("en-US", { month: "long" })} ${currentYear}`}
            </h4>
          </div>
        </div>

        <div className="calendar-grid mb-4">
          {WEEK_DAYS[language].map((day) => (
            <div
              key={day}
              className="rounded-2xl py-3 text-center text-sm font-semibold text-slate-500 dark:text-slate-400"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-grid">
          {calendarCells.map((cell, index) => {
            if (cell.type !== "current") {
              return (
                <div
                  key={`${cell.type}-${index}`}
                  className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-white/5 bg-slate-500/5 text-sm text-slate-400/60"
                >
                  {cell.value}
                </div>
              );
            }

            const date = new Date(currentYear, currentMonth, cell.value);
            const key = formatDateKey(date);
            const checked = Boolean(checkedMap[key]);
            const isToday = cell.value === today.getDate();
            const isFuture = cell.value > today.getDate();

            return (
              <button
                key={key}
                className={`relative flex aspect-square items-center justify-center rounded-2xl border text-sm font-semibold transition duration-300 ${
                  checked
                    ? "border-cyan-300/40 bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25"
                    : "border-white/10 bg-white/5 text-slate-700 hover:border-cyan-400/30 hover:bg-cyan-400/10 dark:text-slate-200"
                } ${isToday ? "ring-2 ring-violet-400/70 ring-offset-2 ring-offset-transparent" : ""} ${
                  isFuture ? "cursor-not-allowed opacity-45 hover:border-white/10 hover:bg-white/5" : ""
                }`}
                disabled={isFuture}
                onClick={() => handleToggle(cell.value)}
                type="button"
              >
                {checked ? <span className="absolute right-2 top-2 text-[10px]">✓</span> : null}
                {cell.value}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CheckinCalendar;
