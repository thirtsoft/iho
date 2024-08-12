import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-eight',
  templateUrl: './home-eight.component.html',
  styleUrls: ['./home-eight.component.css']
})
export class HomeEightComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
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
  booksliderslides = [
    {
      img: "assets/img/doctors/book-doc-05.jpg",
      price: "$20 - $50",
      name: "Dr. Marvin Paul",
      department: "PSICOLOGIST",
      rating: "3.5"
    },
    {
      img: "assets/img/doctors/book-doc-04.jpg",
      price: "$20 - $50",
      name: "Dr. Linda Tobin",
      department: "PSICOLOGIST",
      rating: "3.5"
    },
    {
      img: "assets/img/doctors/book-doc-03.jpg",
      price: "$20 - $50",
      name: "Dr. Paul Richard",
      department: "PSICOLOGIST",
      rating: "3.5"
    },
    {
      img: "assets/img/doctors/book-doc-01.jpg",
      price: "$20 - $50",
      name: "Dr. Ruby Perrin",
      department: "PSICOLOGIST",
      rating: "3.5"
    },
    {
      img: "assets/img/doctors/book-doc-02.jpg",
      price: "$20 - $50",
      name: "Dr. Darren Elder",
      department: "PSICOLOGIST",
      rating: "3.5"
    },
    
  ];
}
