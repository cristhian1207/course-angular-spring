import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { AppComponent } from '../app.component';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  message: string = 'Some Welcome Message';
  name = '';
  welcomeMessageFromService = '';

  constructor(private route: ActivatedRoute, private welcomeDataService: WelcomeDataService) { }

  ngOnInit() {
    // console.log(this.message);
    // console.log(this.route.snapshot.params['name']);
    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage(){
    // console.log(this.welcomeDataService.executeHelloWorldService());
    this.welcomeDataService.executeHelloWorldService().subscribe(
      response => this.handleSuccessfullResponse(response),
      error =>this.handleErrorResponse(error)
    );
    // console.log('last line of getWelcomeMessage');
  }

  getWelcomeMessageWithParameter(){
    this.welcomeDataService.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfullResponse(response),
      error =>this.handleErrorResponse(error)
    );
  }

  handleSuccessfullResponse(response){
    this.welcomeMessageFromService = response.message;
    // console.log(response);
    // console.log(response.message);
  }

  handleErrorResponse(error){
    this.welcomeMessageFromService = error.error.message;
  }
}
