import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-six',
  templateUrl: './home-six.component.html',
  styleUrls: ['./home-six.component.css']
})
export class HomeSixComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }
  clinicsOptions = {
    loop:true,
			margin:15,
			dots: false,
			nav:true,
			navText: [ '<i class="fas fa-chevron-left custom-arrow"></i>', '<i class="fas fa-chevron-right custom-arrow"></i>' ], 
			responsive:{
				0:{
					items:1
				},
				500:{
					items:1
				},
				768:{
					items:3
				},
				1000:{
					items:4
				},
				1300:{
					items:6
				}
			}
  };
  ourdoctorsOptions = {
   loop:true,
      margin:15,
      dots: false,
      nav:true,
      navText: [ '<i class="fas fa-chevron-left custom-arrow"></i>', '<i class="fas fa-chevron-right custom-arrow"></i>' ], 
      responsive:{
        0:{
          items:1
        },
        500:{
          items:1
        },
        768:{
          items:2
        },
        1000:{
          items:3
        },
        1300:{
          items:4
        }
      }
  };
  clinicfeatureOptions = {
    loop:true,
			margin:15,
			dots: false,
			nav:true,
			navText: [ '<i class="fas fa-chevron-left custom-arrow"></i>', '<i class="fas fa-chevron-right custom-arrow"></i>' ], 
			responsive:{
				0:{
					items:1
				},
				500:{
					items:1
				},
				768:{
					items:3
				},
				1000:{
					items:4
				},
				1300:{
					items:5
				}
			}
  };
  blogsOptions = {
    loop:true,
			margin:15,
			dots: false,
			nav:true,
			navText: [ '<i class="fas fa-chevron-left custom-arrow"></i>', '<i class="fas fa-chevron-right custom-arrow"></i>' ], 
			responsive:{
				0:{
					items:1
				},
				500:{
					items:1
				},
				768:{
					items:2
				},
				1000:{
					items:3
				},
				1300:{
					items:4
				}
			}
  };
  blogsslides = [
    {
      img: "assets/img/blog-1.jpg",
      img2: "assets/img/doctors/doctor-thumb-01.jpg",
      name: "Dr. Ruby Perrin",
      department: "Urology",
      header: "Doccure – Making your clinic painless visit?",
      content: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
      date: "3 Dec 2021"
    },
    {
      img: "assets/img/blog-2.jpg",
      img2: "assets/img/doctors/doctor-thumb-01.jpg",
      name: "Dr. Ruby Perrin",
      department: "Neurology",
      header: "What are the benefits of Online Doctor Booking?",
      content: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
      date: "3 Dec 2021"
    },
    {
      img: "assets/img/blog-3.jpg",
      img2: "assets/img/doctors/doctor-thumb-01.jpg",
      name: "Dr. Ruby Perrin",
      department: "Orthopedic",
      header: "Benefits of consulting with an Online Doctor",
      content: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
      date: "3 Dec 2021"
    },
    {
      img: "assets/img/blog-4.jpg",
      img2: "assets/img/doctors/doctor-thumb-01.jpg",
      name: "Dr. Ruby Perrin",
      department: "Cardiologist",
      header: "5 Great reasons to use an Online Doctor",
      content: "Lorem ipsum dolor sit amet, consectetur em adipiscing elit, sed do eiusmod tempor.",
      date: "3 Dec 2021"
    },
  ];
  clinicfeatureslides = [
    {
      img: "assets/img/clinic/clinic-6.jpg",
      department: "Operation"
    },
    {
      img: "assets/img/clinic/clinic-7.jpg",
      department: "Medical"
    },
    {
      img: "assets/img/clinic/clinic-8.jpg",
      department: "Patient Ward"
    },
    {
      img: "assets/img/clinic/clinic-9.jpg",
      department: "TEST ROOM"
    },
    {
      img: "assets/img/clinic/clinic-10.jpg",
      department: "ICU"
    },
  ];
  ourdoctorsslides = [
    {
      img: "assets/img/doctors/doctor-01.jpg",
      range: "$20 - $50",
      rating: "3.5",
      name: "Dr. Ruby Perrin",
      speciality: "BDS, MDS - Oral & Maxillofacial Surgery",
      address: "Georgia, USA",
      count: "450"
    },
    {
      img: "assets/img/doctors/doctor-04.jpg",
      range: "$20 - $50",
      rating: "3.5",
      name: "Dr. Deborah Angel",
      speciality: "MBBS, MD - General Medicine, DNB",
      address: "Georgia, USA",
      count: "450"
    },
    {
      img: "assets/img/doctors/doctor-03.jpg",
      range: "$20 - $50",
      rating: "3.5",
      name: "Dr. Sofia Brient",
      speciality: "MBBS, MS - General Surgery, MCh",
      address: "Georgia, USA",
      count: "450"
    },
    {
      img: "assets/img/doctors/doctor-02.jpg",
      range: "$20 - $50",
      rating: "3.5",
      name: "Dr. Darren Elder",
      speciality: "BDS, MDS - Oral & Maxillofacial Surgery",
      address: "Georgia, USA",
      count: "450"
    },
  ];
  clinicsslides = [
    {
      img: "assets/img/clinic/clinic-1.jpg",
      img2: "assets/img/category/1.png",
      department: "UROLOGY"
    },
    {
      img: "assets/img/clinic/clinic-2.jpg",
      img2: "assets/img/category/2.png",
      department: "Orthopedic"
    },
    {
      img: "assets/img/clinic/clinic-4.jpg",
      img2: "assets/img/category/4.png",
      department: "Cardiologist"
    },
    {
      img: "assets/img/clinic/clinic-3.jpg",
      img2: "assets/img/category/5.png",
      department: "Dentist"
    },
    {
      img: "assets/img/clinic/clinic-5.jpg",
      img2: "assets/img/category/3.png",
      department: "Neurology"
    },
    {
      img: "assets/img/clinic/clinic-1.jpg",
      img2: "assets/img/category/4.png",
      department: "Cardiologist"
    },
  ];
}
