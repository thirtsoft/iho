import { Component, OnInit } from '@angular/core';
// declare var FullCalendar: any;

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // var calendarEl = document.getElementById('calendar');

    // var calendar = new FullCalendar.Calendar(calendarEl, {
    //   initialDate: new Date(),
    //   editable: true,
    //   selectable: true,
    //   businessHours: true,
    //   dayMaxEvents: true, // allow "more" link when too many events
    //   events: [
    //     {
    //       title: 'All Day Event',
    //       start: '2020-06-01'
    //     },
    //     {
    //       title: 'Long Event',
    //       start: '2020-06-07',
    //       end: '2020-06-10'
    //     },
    //     {
    //       groupId: 999,
    //       title: 'Repeating Event',
    //       start: '2020-06-09T16:00:00'
    //     },
    //     {
    //       groupId: 999,
    //       title: 'Repeating Event',
    //       start: '2020-06-16T16:00:00'
    //     },
    //     {
    //       title: 'Conference',
    //       start: '2020-06-11',
    //       end: '2020-06-13'
    //     },
    //     {
    //       title: 'Meeting',
    //       start: '2020-06-12T10:30:00',
    //       end: '2020-06-12T12:30:00'
    //     },
    //     {
    //       title: 'Lunch',
    //       start: '2020-06-12T12:00:00'
    //     },
    //     {
    //       title: 'Meeting',
    //       start: '2020-06-12T14:30:00'
    //     },
    //     {
    //       title: 'Happy Hour',
    //       start: '2020-06-12T17:30:00'
    //     },
    //     {
    //       title: 'Dinner',
    //       start: '2020-06-12T20:00:00'
    //     },
    //     {
    //       title: 'Birthday Party',
    //       start: '2020-06-13T07:00:00'
    //     }
    //   ]
    // });

    // calendar.render();
        

  }
  ngAfterViewInit() {
    this.loadBootstrap("assets/css/bootstrap.min.css")
    this.loadStyleScript("assets/plugins/fullcalendar/fullcalendar.min.css")
    this.loadBasicStyleScript("assets/css/style.css")
    this.loadJquery("assets/js/jquery.min.js")
    this.loadPopperjs("assets/js/popper.min.js")
    this.loadBootstarpjs("assets/js/bootstrap.min.js")
    this.loadDynmicallyScript("assets/plugins/jquery-ui/jquery-ui.min.js");
    this.loadFirstScript("assets/plugins/fullcalendar/fullcalendar.min.js")
    this.loadSecondScript("assets/plugins/fullcalendar/jquery.fullcalendar.js")
  }
  loadDynmicallyScript(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
  loadFirstScript(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
  loadSecondScript(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
  loadStyleScript(js) {
    var script = document.createElement('link');
    script.href = js;
    script.rel = "stylesheet"
    // script.async = false;
    document.head.appendChild(script);
  }
  loadBasicStyleScript(js) {
    var script = document.createElement('link');
    script.href = js;
    script.rel = "stylesheet"
    // script.async = false;
    document.head.appendChild(script);
  }
  loadJquery(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
  loadBootstrap(js) {
    var script = document.createElement('link');
    script.href = js;
    script.rel = "stylesheet"
    // script.async = false;
    document.head.appendChild(script);
  }
  loadBootstarpjs(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }
  loadPopperjs(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.body.appendChild(script);
  }

}
