import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  examPaper: any = [];
  userAnswers: { [questionId: string]: string } = {};
  userId: string | null = '';
  examId: string = '';
  loading: boolean = true;

  constructor(
    // private examService: ExamService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ){ }

  ngOnInit(): void { }

  viewResults() {
    console.log('Viewing results...');
  }

  viewHistory() {
    console.log('Viewing quiz history...');
    this.router.navigate(['/examHistory'])
  }





}


