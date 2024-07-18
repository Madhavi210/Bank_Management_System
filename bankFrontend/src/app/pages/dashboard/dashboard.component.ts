import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import Chart  from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  totalUsers: number = 0;
  totalCategory: number = 3;
  totalProduct: number = 4;

    // Pie chart data
    public pieChartData: number[] = [];
    public pieChartLabels: string[] = ['Total Users', 'Total Products', 'Total Categories'];
    pieChart?: Chart<'pie', number[], string>;
  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchTotalUser();
  }

  fetchTotalUser():void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.totalUsers = data.totalUser;
        this.pieChartData.push(this.totalUsers);
        this.pieChartData.push(this.totalProduct);
        this.pieChartData.push(this.totalCategory);
        this.updateChart();
      },
      (error) => {
        console.error('Error fetching total users:', error);
      }
    );

    // this.dataService.getTotalProducts().subscribe(
    //   (totalProducts: number) => {
    //     this.pieChartData.push(totalProducts);
    //     this.updateChart();
    //   },
    //   (error) => {
    //     console.error('Error fetching total products:', error);
    //   }
    // );

  }


  private updateChart(): void {
    if (this.pieChartData.length === 3) {
      const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;
      if (ctx) {
        this.pieChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: this.pieChartLabels,
            datasets: [{
              label: 'Data',
              data: this.pieChartData,
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)'
              ],
              hoverOffset: 4
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                enabled: true,
              }
            }
          }
        });
      }
    }
  }


}
