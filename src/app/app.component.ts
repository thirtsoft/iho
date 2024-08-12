import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewEncapsulation,
  AfterViewChecked,
  ViewChild,
} from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';
import { CommonServiceService } from './common-service.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ApexTheme,
  ApexPlotOptions
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
export type chartOptionsheartrate ={
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  theme: ApexTheme;
  yaxis: ApexYAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
}
export type chartOptionsfbc ={
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
}
export type chartOptionsweight ={
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'doccure';
  url;
  loadFooter = false;
  showheader8:boolean = false;
  hidefooter8:boolean = true;
  showheader1:boolean = false;
  hidefooter1:boolean = true;
  showheader4:boolean = false;
  hidefooter4:boolean = true;
  showheader6:boolean = false;
  hidefooter6:boolean = true;
  showheader7:boolean = false;
  hidefooter7:boolean = true;
  show: boolean = true;
  hideFooter: boolean = false;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptionsheartrate: Partial<chartOptionsheartrate>;
  public chartOptionsfbc: Partial<chartOptionsfbc>;
  public chartOptionsweight: Partial<chartOptionsweight>;
  constructor(
    private activeRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    public Router: Router,
    location: Location,
    public commonServic: CommonServiceService
  ) {
    Router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        const url = event.url.split('/');
        this.url = url[1];
        if (
          event.url == '/login-page' ||
          event.url == '/forgot-password' ||
          event.url == '/Register' ||
          event.url == '/doctor/register' ||
          event.url == '/pharmacy/pharmacy-register' ||
          event.url == '/doctor/doctor-register'
        ) {
          document.querySelector('body').classList.add('account-page');
          document.querySelector('body').classList.remove('mat-typography');
          if (event.url == '/login-page') {
            // this.Router.navigateByUrl('/login-page');
          }
        } else {
          document.querySelector('body').classList.remove('account-page');
          document.querySelector('body').classList.add('mat-typography');
        }
        if (event.url == '/home-eight') {
          this.show = false;
          this.hideFooter = true;
          this.hidefooter8 = false;
          this.showheader8 = true;
          this.hidefooter1 = true;
          this.showheader1 = false;
          this.hidefooter4 = true;
          this.showheader4 = false;
          this.hidefooter6 = true;
          this.showheader6 = false;
          this.hidefooter7 = true;
          this.showheader7 = false;
        }else if (event.url == '/home-four') {
          this.show = false;
          this.hideFooter = true;
          this.hidefooter4 = false;
          this.showheader4 = true;
          this.hidefooter1 = true;
          this.showheader1 = false;
          this.hidefooter8 = true;
          this.showheader8 = false;
          this.hidefooter6 = true;
          this.showheader6 = false;
          this.hidefooter7 = true;
          this.showheader7 = false;
        } 
        else if (event.url == '/home-six') {
          this.show = false;
          this.hideFooter = true;
          this.hidefooter6 = false;
          this.showheader6 = true;
          this.hidefooter1 = true;
          this.showheader1 = false;
          this.hidefooter8 = true;
          this.showheader8 = false;
          this.hidefooter4 = true;
          this.showheader4 = false;
          this.hidefooter7 = true;
          this.showheader7 = false;
        }

        else if (event.url == '/home-seven') {
          this.show = false;
          this.hideFooter = true;
          this.hidefooter7 = false;
          this.showheader7 = true;
          this.hidefooter1 = true;
          this.showheader1 = false;
          this.hidefooter8 = true;
          this.showheader8 = false;
          this.hidefooter4 = true;
          this.showheader4 = false;
          this.hidefooter6 = true;
          this.showheader6 = false;
        }

        else if (event.url == '/home-one') {
          this.show = false;
          this.hideFooter = true;
          this.hidefooter1 = false;
          this.showheader1 = true;
          this.hidefooter8 = true;
          this.showheader8 = false;
          this.hidefooter4 = true;
          this.showheader4 = false;
          this.hidefooter6 = true;
          this.showheader6 = false;
          this.hidefooter7 = true;
          this.showheader7 = false;
          
        } 
        else if (event.url == '/home') {
          this.show = true;
          this.hideFooter = false;
          this.hidefooter1 = true;
          this.showheader1 = false;
           this.hidefooter8 = true;
          this.showheader8 = false;
           this.hidefooter4 = true;
          this.showheader4 = false;
           this.hidefooter6 = true;
          this.showheader6 = false;
          this.hidefooter7 = true;
          this.showheader7 = false;
          
        } 
        else if (this.url == 'admin') {
          this.show = false;
          this.hideFooter = true;
          this.loadFooter = false
          // this.hidefooter1 = true;
          // this.showheader1 = false;
          //  this.hidefooter8 = true;
          // this.showheader8 = false;
          //  this.hidefooter4 = true;
          // this.showheader4 = false;
          //  this.hidefooter6 = true;
          // this.showheader6 = false;
          // this.hidefooter7 = true;
          // this.showheader7 = false;
          
        }
        else if (this.url == 'pharmacy-admin') {
          this.show = false;
          this.hideFooter = true;
          this.loadFooter = false
          // this.hidefooter1 = true;
          // this.showheader1 = false;
          //  this.hidefooter8 = true;
          // this.showheader8 = false;
          //  this.hidefooter4 = true;
          // this.showheader4 = false;
          //  this.hidefooter6 = true;
          // this.showheader6 = false;
          // this.hidefooter7 = true;
          // this.showheader7 = false;
          
        }else if (event.url === '/map-grid' || event.url === '/map-list') {
          this.hideFooter = true;
        }
        else{
          this.show = true;
          this.hideFooter = false;
          this.hidefooter1 = true;
          this.showheader1 = false;
           this.hidefooter8 = true;
          this.showheader8 = false;
           this.hidefooter4 = true;
          this.showheader4 = false;
           this.hidefooter6 = true;
          this.showheader6 = false;
          this.hidefooter7 = true;
          this.showheader7 = false;
        }

       

        if (
          event.url == '/patient-register-step1' || 
          event.url == '/patient-register-step2' || 
          event.url == '/patient-register-step3' || 
          event.url == '/patient-register-step4' || 
          event.url == '/patient-register-step5' ||
          event.url == '/doctor-register-step1' ||
          event.url == '/doctor-register-step2' ||
          event.url == '/doctor-register-step3' ||
          event.url == '/pharmacy/pharmacy-register-step1' ||
          event.url == '/pharmacy/pharmacy-register-step2' ||
          event.url == '/pharmacy/pharmacy-register-step3' 
          ) 
        {
          this.show = false;
          this.hideFooter = true;
        }
        if (
          event.url == '/doctor/chat-doctor' 
          ) 
        {
          this.show = false;
          this.hideFooter = false;
        }
        if (event.url == '/video-call' || event.url == '/voice-call') {
          document.querySelector('body').classList.add('call-page');
          document.querySelector('body').classList.remove('mat-typography');
        } else {
          document.querySelector('body').classList.remove('call-page');
          document.querySelector('body').classList.add('mat-typography');
        }
        if (event.url == '/doctor/message' || event.url == '/patients/patient-chat') {
          document.querySelector('body').classList.add('chat-page');
          document.querySelector('body').classList.remove('mat-typography');
        } else {
          document.querySelector('body').classList.remove('chat-page');
          document.querySelector('body').classList.add('mat-typography');
        }
      }
    });
    this.url = location.path();
    this.show = this.url.includes('admin') ? false : true;
    this.show = this.url.includes('pharmacy-admin') ? false : true;
    this.commonServic.message.subscribe((res) => {
      if (res === 'admin' || res === 'pharmacy-admin') {
        this.show = false;
        this.hideFooter = true;
      } else if (res === 'main') {
        this.show = true;
        this.hideFooter = false;
      } else if (res === 'chat') {
        this.show = true;
        this.hideFooter = true;
      } else {
        this.show = true;
        this.hideFooter = false;
      } 

    });
    this.chartOptions = {
      series: [{
        name: "BMI",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
      chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    }
    };
    this.chartOptionsheartrate = {
      series: [{
        name: 'HeartRate',
        data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
      }],
        chart: {
        height: 350,
        type: 'line',
      },
      stroke: {
        width: 7,
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001','4/11/2001' ,'5/11/2001' ,'6/11/2001'],
        tickAmount: 10,
      },
      title: {
        align: 'left',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: [ '#0de0fe'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        },
      },
      markers: {
        size: 4,
        colors: ["#15558d"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7,
        }
      },
      yaxis: {
        min: -10,
        max: 40,
        title: {
        },
      }
    };
    this.chartOptionsfbc = {
      series: [{
        name: 'FBC',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      }],
        chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#0de0fe',
              colorTo: '#0de0fe',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          }
        }
      
      },
      title: {
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444'
        }
      }
    };
    this.chartOptionsweight = {
      series: [{
        name: 'Weight',
        data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58]
      }],
        chart: {
        type: 'line',
        height: 350
      },
      stroke: {
        curve: 'stepline',
      },
      dataLabels: {
        enabled: false
      },
      title: {
        align: 'left'
      },
      markers: {
        hover: {
          sizeOffset: 4
        }
      }
    };
  }

  ngOnInit() {
    setTimeout(() => (this.loadFooter = true), 2000);
    // Content div min height set
    
    function resizeInnerDiv() {
      var height = $(window).height();	
      var header_height = $(".header").height();
      var footer_height = $(".footer").height();
      var setheight = height - header_height;
      var trueheight = setheight - footer_height;
      $(".content").css("min-height", trueheight);
    }
    
    $(window).resize(function(){
      if($('.content').length > 0 ){
        resizeInnerDiv();
      }
    });
    if($('.content').length > 0 ){
      resizeInnerDiv();
    }
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
}
