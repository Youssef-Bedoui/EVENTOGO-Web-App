<template>
  <div id="container">
     <div>
        <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<script>

import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar  from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
// import { h } from 'vue'
import axios from "axios";

 import {mapGetters} from 'vuex'

// import EventModal from './EventModal'
// import CommentsModal from './CommentsModal'


export default {
  name: "CalendarView",
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
   data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        eventClick:this.handleEventClick,
        events: []
      }
    }
  },
  mounted: function () {
    
    axios.get("http://localhost:3000/api/event/selectAll").then((result) => {
      console.log(result.data);
      let evenements  = []//result.data;

      for (let i=0 ; i< result.data.length ; i++){

           // var options = {year: "numeric", month: '2-digit', day: "2-digit"};
            let string = new Date(result.data[i].date.substr(0, 9))

        let event = {
          title: result.data[i].title, 
          start: string, 
          id : result.data[i].id,
          url: result.data[i].description, 
          groupId: result.data[i].type
        }

        evenements.push(event)

      }

      this.calendarOptions.events = evenements

      console.log(this.calendarOptions.events)
    });
  },
    computed: {
         ...mapGetters(["EVENTS"])
    },
     methods: {
    handleDateClick: function(arg) {
      alert('date click! ' + arg.dateStr)
    },

    handleEventClick: (clickInfo) => {
      clickInfo.jsEvent.preventDefault();
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {

        axios.delete("http://localhost:3000/api/event/delete/"+clickInfo.event.id).then((result) => {
          console.log(result.data);
        });

        clickInfo.event.remove()
      }

      // clickInfo.jsEvent.preventDefault();

      // alert('event click! '+clickInfo.event.title+' '+clickInfo.event.start+' '+clickInfo.event.groupId+' '+clickInfo.event.url+' ')
    }
  }
    //  methods: {
    // //     // newEvent() {
    // //     //     this.$modal.show(Modal, {
    // //     //         text: "TExt", 
    // //     //     })
            
    // //     // },
    //     renderEvent() {
    //         // let span = h('span')

    //         // span.setAttribute('class', 'fa fa-comments')

    //         // arg.el.appendChild(span)

    //         // span.addEventListener('click', event => {
    //         //     event.stopPropagation(); 
    //         //     // this.$modal.show(CommentsModal, {
    //         //     //     text: "This is for the comments"
    //         //     // })
    //         // })
    //     },
    //     updateEvent (arg) {
    //         this.$store.commit("UPDATE_EVENT", arg.event)
    //     },
    //     handleSelect(arg) {
    //         this.$store.commit("ADD_EVENT", {
    //             id: (new Date()).getTime(),
    //             title: "Something",
    //             start: arg.start,
    //             end: arg.end,
    //             allDay: arg.allDay
    //         })
    //     },
    //     handleEventClick (arg) {
    //        console.log(arg)
    //         // this.$modal.show(EventModal, {
    //         //     text: "This is from the component",
    //         //     event: arg.event
    //         // })
    //     }
    // }
 
 
};
</script>


<style >
#container {
  width: 100%;
  height: 100%;
  padding: 10px;
  margin-top: 80px;
 
}
</style>
