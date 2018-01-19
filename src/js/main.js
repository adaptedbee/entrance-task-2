// Показ и скрытие кнопки "Добавить встречу"
const lines = document.querySelectorAll('.planner-diagram__line-wrapper');
const rooms = document.querySelectorAll('.planner-rooms__room');
for (const line of lines) {
  line.addEventListener('mouseenter', function(event) {
    let addButton = event.target.querySelector('.planner-diagram__add-button');
    addButton.style.left = event.offsetX + 'px';
    addButton.classList.add('planner-diagram__add-button--active');

    const roomIndex = Array.from(lines).indexOf(event.target);
    const selectedRoom = rooms[roomIndex];
    if (!selectedRoom.classList.contains('planner-rooms__room--unavailable')) {
      selectedRoom.classList.add('planner-rooms__room--active');
    }
  });
  line.addEventListener('mouseleave', function(event) {
    var addButton = event.target.querySelector('.planner-diagram__add-button');
    addButton.classList.remove('planner-diagram__add-button--active');

    const selectedRoom = document.querySelector('.planner-rooms__room--active');
    if (selectedRoom) {
      selectedRoom.classList.remove('planner-rooms__room--active');
    }
  });
}

// Подключение и настройка календаря
const field = document.querySelector('.calendar-popup__inner');
if (field) {
  let numberOfMonths = 3;
  const i18nConfig = {
    previousMonth: 'Предыдущий месяц',
    nextMonth: 'Следующий месяц',
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  };
  let picker = new Pikaday({
    numberOfMonths: numberOfMonths,
    firstDay: 1,
    i18n: i18nConfig,
    onSelect: function(date) {
      let selectedDay = `${date.getDate()} ${i18nConfig.months[date.getMonth()].toLowerCase().substr(0, 3)}`;
      const dateField = document.querySelector('.planner__date');
      dateField.textContent = selectedDay;
    }
  });
  field.appendChild(picker.el);
  document.removeEventListener('keydown', picker._onKeyChange);
}

// Показ попапа календаря
const dateField = document.querySelector('.planner__date');
const calendarPopup = document.querySelector('.calendar-popup');
if (dateField) {
  dateField.addEventListener('click', function() {
    calendarPopup.classList.toggle('calendar-popup--active');
    this.classList.toggle('planner__date--active');
  });
}

// Показ тултипа встречи
let meetingFields = document.querySelectorAll('.planner-diagram__meeting');
const roomsMenu = document.querySelector('.planner__left-column');
for (const meetingField of meetingFields) {
  meetingField.addEventListener('click', function(event) {
    const tooltip = this.querySelector('.meeting-tooltip');
    tooltip.classList.toggle('meeting-tooltip--active');
    roomsMenu.classList.toggle('planner__left-column--hidden');
  });
}

// Выбор переговорки из списка
let meetingRooms = document.querySelectorAll('.meeting__room');
for (const meetingRoom of meetingRooms) {
  meetingRoom.addEventListener('click', function(event) {
    if (event.target.classList.contains('meeting__room-unchoose')) {
      this.classList.remove('meeting__room--chosen');
    } else {
      let chosenRoom = document.querySelector('.meeting__room--chosen');
      if (chosenRoom) {
        chosenRoom.classList.remove('meeting__room--chosen');
      }
      this.classList.add('meeting__room--chosen');
    }
  });
}

// Обновляем вид левого меню при скролле на мобильных
let plannerWrapper = document.querySelector('.planner__wrapper');
if (plannerWrapper) {
  plannerWrapper.addEventListener('scroll', function(event) {
    const leftMenu = document.querySelector('.planner__left-column');
    if (!leftMenu.classList.contains('planner__left-column--above')) {
      leftMenu.classList.add('planner__left-column--above');
    }
  });
}

// Подключение кастомного селекта
$(document).ready(function() {
  let membersData = [
    {
      id: 0,
      text: 'Лекс Лютер',
      img: 'https://avatars3.githubusercontent.com/u/15365?s=460&v=4',
      floor: 7
    },
    {
      id: 1,
      text: 'Томас Андерсон',
      img: 'https://avatars1.githubusercontent.com/u/3763844?s=400&v=4',
      floor: 2
    },
    {
      id: 2,
      text: 'Дарт Вейдер',
      img: 'https://avatars0.githubusercontent.com/u/1813468?s=460&v=4',
      floor: 1
    },
    {
      id: 3,
      text: 'Кларк Кент',
      img: 'https://avatars3.githubusercontent.com/u/15365?s=460&v=4',
      floor: 2
    }
  ];
  function formatState(state) {
    if (!state.id) {
      return state.text;
    }

    const $state = $(
      `<div class="searchfield-item">
        <img class="searchfield-item__avatar" src="${state.img}" width="24" height="24" />
        <p class="searchfield-item__name-floor"><span class="searchfield-item__name">${state.text}</span> &bull; ${state.floor} этаж</p>
      </div>`
    );
    return $state;
  }
  $('.multiple-select').select2({
    data: membersData,
    templateResult: formatState,
    placeholder: 'Например, Тор Одинович',
    allowClear: true
  });
});
