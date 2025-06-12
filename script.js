document.addEventListener("DOMContentLoaded", () => {
  const currentMonthYear = document.querySelector(".current-month-year");
  const dayOfWeek = document.querySelector(".day-of-week");
  const monthPresent = document.querySelector(".month");
  const dayPresent = document.querySelector(".day");
  const calendarDays = document.getElementById("calendar-days");
  const prevMonthBtn = document.querySelector(".prev-month");
  const nextMonthBtn = document.querySelector(".next-month");
  const calendarHeader = document.querySelector("thead");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let viewMode = "month";

  const updateCurrentMonthYearText = () => {
    if (viewMode === "month") {
      currentMonthYear.textContent = `${new Date(year, month).toLocaleString(
        "default",
        {
          month: "long",
        }
      )} ${year}`;
    } else if (viewMode === "year") {
      currentMonthYear.textContent = `${year}`;
    } else {
      const startDecade = Math.floor(year / 10) * 10;
      const endDecade = startDecade + 9;
      currentMonthYear.textContent = `${startDecade} - ${endDecade}`;
    }
  };

  const updateCalendar = () => {
    const calendarGrid = document.querySelector(".calendar-grid");
    if (viewMode === "month") {
      updateMonthView();
      calendarHeader.style.display = "";
      calendarGrid.classList.remove("calendar-year-view");
    } else if (viewMode === "year") {
      updateYearView();
      calendarHeader.style.display = "none";
      calendarGrid.classList.add("calendar-year-view");
    } else if (viewMode === "decade") {
      updateDecadeView();
      calendarHeader.style.display = "none";
      calendarGrid.classList.add("calendar-year-view");
    }
    updateCurrentMonthYearText();
  };

  const updateMonthView = () => {
    dayOfWeek.textContent = today.toLocaleString("default", {
      weekday: "long",
    });
    monthPresent.textContent = today.toLocaleString("default", {
      month: "long",
    });
    dayPresent.textContent = today.getDate();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    calendarDays.innerHTML = "";
    let day = 1 - firstDayOfMonth;

    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");
        const button = document.createElement("button");

        if (day < 1) {
          button.textContent = daysInPrevMonth + day;
          button.classList.add("other-month");
          button.classList.add("hover");
        } else if (day > daysInMonth) {
          button.textContent = day - daysInMonth;
          button.classList.add("other-month");
          button.classList.add("hover");
        } else {
          button.textContent = day;
          if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
          ) {
            button.classList.add("active");
          } else {
            button.classList.add("hover");
          }
        }
        cell.appendChild(button);
        row.appendChild(cell);
        day++;
      }
      calendarDays.appendChild(row);
    }
  };

  const updateYearView = () => {
    calendarDays.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 4; j++) {
        const monthIndex = i * 4 + j;
        const cell = document.createElement("td");
        const button = document.createElement("button");
        button.textContent = months[monthIndex];

        if (month === monthIndex && year === today.getFullYear()) {
          button.classList.add("active");
        } else {
          button.classList.add("hover");
        }

        button.addEventListener("click", () => {
          month = monthIndex;
          viewMode = "month";
          updateCalendar();
        });

        cell.appendChild(button);
        row.appendChild(cell);
      }

      calendarDays.appendChild(row);
    }

    const row = document.createElement("tr");
    for (let j = 0; j < 4; j++) {
      const monthIndex = j;

      const cell = document.createElement("td");
      const button = document.createElement("button");
      button.textContent = months[monthIndex];

      if (month === monthIndex && year === today.getFullYear() + 1) {
        button.classList.add("active");
      } else {
        button.classList.add("hover");
      }

      button.addEventListener("click", () => {
        month = monthIndex;
        viewMode = "month";
        updateCalendar();
      });

      cell.appendChild(button);
      row.appendChild(cell);
    }

    calendarDays.appendChild(row);
  };

  const updateDecadeView = () => {
    const startYear = Math.floor(year / 10) * 10;
    calendarDays.innerHTML = "";

    for (let i = 0; i < 4; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 4; j++) {
        const cell = document.createElement("td");
        const button = document.createElement("button");
        const displayYear = startYear + i * 4 + j;
        button.textContent = displayYear;
        if (displayYear === year && year === today.getFullYear()) {
          button.classList.add("active");
        } else {
          button.classList.add("hover");
        }
        button.addEventListener("click", () => {
          year = displayYear;
          viewMode = "year";
          updateCalendar();
        });
        cell.appendChild(button);
        row.appendChild(cell);
      }
      calendarDays.appendChild(row);
    }
  };

  currentMonthYear.addEventListener("click", () => {
    if (viewMode === "month") {
      viewMode = "year";
    } else if (viewMode === "year") {
      viewMode = "decade";
    } else {
      viewMode = "month";
    }
    updateCalendar();
  });

  prevMonthBtn.addEventListener("click", () => {
    if (viewMode === "month") {
      month = (month - 1 + 12) % 12;
      if (month === 11) year--;
    } else if (viewMode === "year") {
      year--;
    } else if (viewMode === "decade") {
      year -= 10;
    }
    updateCalendar();
  });

  nextMonthBtn.addEventListener("click", () => {
    if (viewMode === "month") {
      month = (month + 1) % 12;
      if (month === 0) year++;
    } else if (viewMode === "year") {
      year++;
    } else if (viewMode === "decade") {
      year += 10;
    }
    updateCalendar();
  });

  updateCalendar();
});

// calendar footer
const timeSpan = document.querySelector(".time span");
const btnMinus = document.querySelector(".icon-minus");
const btnPlus = document.querySelector(".icon-plus");

let minutes = 30;
timeSpan.textContent = minutes;

btnMinus.addEventListener("click", () => {
  if (minutes > 5 && minutes <= 30) {
    minutes -= 5;
    timeSpan.textContent = minutes;
  } else if (minutes > 30 && minutes <= 240) {
    minutes -= 15;
    timeSpan.textContent = minutes;
  }
});

btnPlus.addEventListener("click", () => {
  if (minutes >= 5 && minutes < 30) {
    minutes += 5;
    timeSpan.textContent = minutes;
  } else if (minutes >= 30 && minutes < 240) {
    minutes += 15;
    timeSpan.textContent = minutes;
  } else if (minutes === 240) {
    minutes = 240;
    timeSpan.textContent = minutes;
  }
});
