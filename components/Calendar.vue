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
//import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja'
const INITIAL_EVENTS = [
  {
    id: 1,
    title: '報告会',
    start: '2021-02-12T09:30:00',
    end : '2021-02-12T10:30:00',
  },
  {
    id: 2,
    title: 'ミーティング',
    start: '2021-02-12T11:30:00',
    end : '2021-02-12T12:30:00',
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
  created() {
    this.events = this.$accessor.events.fetchEvent()
    //console.log(events)
    // if (events) {
    //   this.events = events
    // } else {
    //   this.$router.push({name: 'address'})
    // }
  },
  data () {
    return {
      events: [
        {
          id: 1,
          title: '報告会',
          start: '2021-02-12T09:30:00',
          end : '2021-02-12T10:30:00',
        },
        {
          id: 2,
          title: 'ミーティング',
          start: '2021-02-12T11:30:00',
          end : '2021-02-12T12:30:00',
        },
        {
          id: 3,
          title: '打ち合わせ',
          start: '2021-02-12T13:30:00',
          end : '2021-02-12T14:30:00',
        },
      ],
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        //initialEvents: INITIAL_EVENTS,
        //initialEvents: this.events,
        locale:jaLocale,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        eventDurationEditable : true,
        timeFormat: "hh:mm",
        select: this.handleDateSelect,
        eventsSet: this.handleEvents,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
      }
    }
  },
  watch: {
    
  },
  mounted() {
    //this.calendarApi = this.$refs.fullCalendar.getApi()
    //this.getEvents()
    console.log(this.events)
    console.log(INITIAL_EVENTS)
  },
}
</script>
