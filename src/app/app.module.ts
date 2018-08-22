import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { FavoritiesComponent } from './favorities/favorities.component';
import { MyPostComponent } from './my-post/my-post.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { FollowingComponent } from './following/following.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from "@angular/forms"
import { RouteGuard } from './auth/route-guard';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllPostsComponent,
    FavoritiesComponent,
    MyPostComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    FollowingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [RouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
