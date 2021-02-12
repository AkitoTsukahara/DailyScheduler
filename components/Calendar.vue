<template>
  <FullCalendar
    :options="calendarOptions"
  >
    <template v-slot:eventContent='arg'>
      <b>{{ arg.timeText }}</b>
      <i>{{ arg.event.title }}</i>
    </template>
  </FullCalendar>
</template>

<script>
import { Calendar } from '@fullcalendar/core';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja' // 日本語化用

const INITIAL_EVENTS = [
  {
    id: 1,
    title: '報告会',
    start: '2021-02-12T00:00:00',
    end : '20121-02-12T12:30:00',
  },
  {
    id: 2,
    title: 'ミーティング',
    start: '2021-02-12T10:30:00',
    end : '2019-02-12T12:30:00',
  },
  {
    id: 3,
    title: '打ち合わせ',
    start: '2021-02-12T13:30:00',
    end : '2021-02-12T14:30:00',
  },
]

export default {
  components: {
    FullCalendar
  },
  data () {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        initialEvents: INITIAL_EVENTS,
        locale:jaLocale,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventsSet: this.handleEvents,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
      }
    }
  },
  methods: {
    handleDateClick (arg) {
      if (confirm('新しいスケジュールを' + arg.dateStr + 'に追加しますか ?')) {
        this.calendarEvents.push({ // add new event data
          title: '新規スケジュール',
          start: arg.date,
          allDay: arg.allDay
        })
      }
    },
    handleEvents(events) {},
    handleWeekendsToggle() {},
    handleDateSelect(selectInfo) {},
    handleEventClick(clickInfo) {},
  },
}
</script>
