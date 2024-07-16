import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { IUser } from 'src/app/core/interface/user.interface';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/core/services/login/login.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  users: any[] = [];
  profilePicUrl: SafeResourceUrl[] = [];

  constructor(
    private userService:UserService,
    private loginService:LoginService,
    private sanitizer: DomSanitizer,
    private router: Router
  ){}

  ngOnInit(): void {
    this.fetchAllUser();
  }

  fetchAllUser():void {
    this.userService.getAllUsers().subscribe(
      data => {        
        this.users = data.users; 
        this.profilePicUrl = [];
        this.users.forEach(user => {          
          if(user.profilePic) {            
            const filename = user.profilePic.split('\\').pop();
            const fullUrl = `http://localhost:5000/uploads/${filename}`;
            const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
            this.profilePicUrl.push(safeUrl);
            console.log(safeUrl);
            
          } else {
            this.profilePicUrl.push('');
          }
        });
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  editUser(userId: string): void {
    this.router.navigate(['admin/edit-user/', userId]);
  }

  deleteUser(userId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId).subscribe(
          () => {
            this.fetchAllUser(); // Refresh the user list after deletion
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          },
          error => {
            console.error('Error deleting user:', error.message, error);
            Swal.fire('Error!', 'Failed to delete user.', 'error');
          }
        );
      }
    });
  }

}
