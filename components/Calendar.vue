<template>
  <FullCalendar
    default-view="dayGridMonth"
    :locale="locale"
    :header="calendarHeader"
    :weekends="calendarWeekends"
    :plugins="calendarPlugins"
    :events="calendarEvents"
    @dateClick="handleDateClick"
    :options="calendarOptions"
  />
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja' // 日本語化用

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data () {
    return {
      locale: jaLocale, // 日本語化
      // カレンダーヘッダーのデザイン
      calendarHeader: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      calendarWeekends: true, // 土日を表示するか
      // カレンダーで使用するプラグイン
      calendarPlugins: [ 
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin
      ],
      // カレンダーに表示するスケジュール一覧
      calendarEvents:  [
        {
          title: '報告会',
          start: '2019-09-09T10:00:00',
          end : '2019-09-09T12:30:00',
        },
        {
          title: 'ミーティング',
          start: '2019-09-12T10:30:00',
          end : '2019-09-12T12:30:00',
        },
        {
          title: '打ち合わせ',
          start: '2019-09-18T13:30:00',
          end : '2019-09-18T14:30:00',
        },
      ],
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth'
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
    }
  },
}
</script>
