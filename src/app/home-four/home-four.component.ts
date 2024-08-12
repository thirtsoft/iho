import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-four',
  templateUrl: './home-four.component.html',
  styleUrls: ['./home-four.component.css']
})
export class HomeFourComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  dotsliderConfig = {
    dots: true,
			autoplay:false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			responsive: [{
				breakpoint: 992,
					settings: {
						slidesToShow: 1
				  	}
			},
			{
				breakpoint: 800,
					settings: {
						slidesToShow: 1
				  	}
			},
			{
				breakpoint: 776,
					settings: {
						slidesToShow: 1
				  	}
			},
			{
				breakpoint: 567,
					settings: {
						slidesToShow: 1
					}
			}]
  };
  clinicsliderConfig = {
    dots: false,
			autoplay:false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			rows: 2,
			responsive: [{
				breakpoint: 992,
					settings: {
						slidesToShow: 3
				  	}
			},
			{
				breakpoint: 800,
					settings: {
						slidesToShow: 3
				  	}
			},
			{
				breakpoint: 776,
					settings: {
						slidesToShow: 3
				  	}
			},
			{
				breakpoint: 567,
					settings: {
						slidesToShow: 1
					}
			}]
  };
  browsesliderConfig = {
    dots: false,
			autoplay:false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			rows: 2,
			responsive: [{
				breakpoint: 992,
					settings: {
						slidesToShow: 3
				  	}
			},
			{
				breakpoint: 800,
					settings: {
						slidesToShow: 3
				  	}
			},
			{
				breakpoint: 776,
					settings: {
						slidesToShow: 3
				  	}
			},
			{
				breakpoint: 567,
					settings: {
						slidesToShow: 1
					}
			}]
  };
  booksliderConfig = {
    dots: false,
			autoplay:false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 992,
					settings: {
						slidesToShow: 3
				  	}
			},
			{
				breakpoint: 800,
					settings: {
						slidesToShow: 3
				  	}
			},
			{
				breakpoint: 776,
					settings: {
						slidesToShow: 2
				  	}
			},
			{
				breakpoint: 567,
					settings: {
						slidesToShow: 1
					}
			}]
  };
  avalsliderConfig = {
    dots: false,
			autoplay:false,
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 992,
					settings: {
						slidesToShow: 2
				  	}
			},
			{
				breakpoint: 800,
					settings: {
						slidesToShow: 2
				  	}
			},
			{
				breakpoint: 776,
					settings: {
						slidesToShow: 2
				  	}
			},
			{
				breakpoint: 567,
					settings: {
						slidesToShow: 1
					}
			}]
  };
  avalsliderslides = [
    {
      img: "assets/img/clinic/spec-01.jpg",
      department: "Operation"
    },
    {
      img: "assets/img/clinic/spec-02.jpg",
      department: "Medical"
    },
    {
      img: "assets/img/clinic/spec-03.jpg",
      department: "Patient Ward"
    },
    {
      img: "assets/img/clinic/spec-01.jpg",
      department: "Operation"
    },
    {
      img: "assets/img/clinic/spec-02.jpg",
      department: "Medical"
    },
  ];
  booksliderslides = [
    {
      img: "assets/img/doctors/book-doc-01.jpg",
      pricerange: "$20 - $50",
      name: "Dr. Ruby Perrin",
      department: "PSICOLOGIST",
      rating: "3.5",
      address: "Georgia, USA",
      count: "450"
    },
    {
      img: "assets/img/doctors/book-doc-02.jpg",
      pricerange: "$20 - $50",
      name: "Dr. Darren Elder",
      department: "PSICOLOGIST",
      rating: "3.5",
      address: "Georgia, USA",
      count: "450"
    },
    {
      img: "assets/img/doctors/book-doc-03.jpg",
      pricerange: "$20 - $50",
      name: "Dr. Paul Richard",
      department: "PSICOLOGIST",
      rating: "3.5",
      address: "Georgia, USA",
      count: "450"
    },
    {
      img: "assets/img/doctors/book-doc-04.jpg",
      pricerange: "$20 - $50",
      name: "Dr. Linda Tobin",
      department: "PSICOLOGIST",
      rating: "3.5",
      address: "Georgia, USA",
      count: "450"
    },
    {
      img: "assets/img/doctors/book-doc-05.jpg",
      pricerange: "$20 - $50",
      name: "Dr. Marvin Paul",
      department: "PSICOLOGIST",
      rating: "3.5",
      address: "Georgia, USA",
      count: "450"
    },
  ];
  browsesliderslides = [
    {
      img: "assets/img/icons/browse-01.jpg",
      img2: "assets/img/icons/clinic-02.png",
      department: "UROLOGY"
    },
    {
      img: "assets/img/icons/browse-01.jpg",
      img2: "assets/img/icons/clinic-02.png",
      department: "UROLOGY"
    },
    {
      img: "assets/img/icons/browse-02.jpg",
      img2: "assets/img/icons/clinic-11.png",
      department: "Orthopedic"
    },
    {
      img: "assets/img/icons/browse-02.jpg",
      img2: "assets/img/icons/clinic-11.png",
      department: "Orthopedic"
    },
    {
      img: "assets/img/icons/browse-03.jpg",
      img2: "assets/img/icons/clinic-03.png",
      department: "Cardiologist"
    },
    {
      img: "assets/img/icons/browse-03.jpg",
      img2: "assets/img/icons/clinic-03.png",
      department: "Cardiologist"
    },
    {
      img: "assets/img/icons/browse-04.jpg",
      img2: "assets/img/icons/clinic-12.png",
      department: "Dentist"
    },
    {
      img: "assets/img/icons/browse-04.jpg",
      img2: "assets/img/icons/clinic-12.png",
      department: "Dentist"
    },
    {
      img: "assets/img/icons/browse-05.jpg",
      img2: "assets/img/icons/clinic-13.png",
      department: "Neurology"
    },
    {
      img: "assets/img/icons/browse-05.jpg",
      img2: "assets/img/icons/clinic-13.png",
      department: "Neurology"
    },
    {
      img: "assets/img/icons/browse-01.jpg",
      img2: "assets/img/icons/clinic-03.png",
      department: "Cardiologist"
    },
    {
      img: "assets/img/icons/browse-01.jpg",
      img2: "assets/img/icons/clinic-03.png",
      department: "Cardiologist"
    },
  ];
  clinicsliderslides = [
    {
      img: "assets/img/icons/clinic-01.png",
      imghover: "assets/img/icons/clinic-hover-01.png",
      department: "Orthopedic",
      doctors: "124"
    },
    {
      img: "assets/img/icons/clinic-02.png",
      imghover: "assets/img/icons/clinic-hover-02.png",
      department: "Urology",
      doctors: "124"
    },
    {
      img: "assets/img/icons/clinic-03.png",
      imghover: "assets/img/icons/clinic-hover-03.png",
      department: "Cardiologist",
      doctors: "124"
    },
    {
      img: "assets/img/icons/clinic-04.png",
      imghover: "assets/img/icons/clinic-hover-04.png",
      department: "Neurology",
      doctors: "124"
    },
    {
      img: "assets/img/icons/clinic-05.png",
      imghover: "assets/img/icons/clinic-hover-05.png",
      department: "Dentist",
      doctors: "124"
    },
    {
      img: "assets/img/icons/clinic-06.png",
      imghover: "assets/img/icons/clinic-hover-06.png",
      department: "Laboratry",
      doctors: "124"
    },
    {
      img: "assets/img/icons/clinic-07.png",
      imghover: "assets/img/icons/clinic-hover-07.png",
      department: "MRI Scans",
      doctors: "124"
    },
    {
      img: "assets/img/icons/clinic-08.png",
      imghover: "assets/img/icons/clinic-hover-08.png",
      department: "Primary Checkup",
      doctors: "124"
    },
    {
      img: "assets/img/icons/clinic-09.png",
      imghover: "assets/img/icons/clinic-hover-09.png",
      department: "Testing",
      doctors: "124"
    },
    {
      img: "assets/img/icons/clinic-10.png",
      imghover: "assets/img/icons/clinic-hover-10.png",
      department: "Pediatrics",
      doctors: "124"
    },
    {
      img: "assets/img/icons/clinic-01.png",
      imghover: "assets/img/icons/clinic-hover-01.png",
      department: "Orthopedic",
      doctors: "124"
    },
    {
      img: "assets/img/icons/clinic-02.png",
      imghover: "assets/img/icons/clinic-hover-02.png",
      department: "Urology",
      doctors: "124"
    },
  ];
  dotsliderslides = [
    {
      img: 'assets/img/slider/slider-4.jpg'
    },
    {
      img: 'assets/img/slider/slider-5.jpg'
    },
    {
      img: 'assets/img/slider/slider-6.jpg'
    },
    {
      img: 'assets/img/slider/slider-7.jpg'
    },
  ];

}
