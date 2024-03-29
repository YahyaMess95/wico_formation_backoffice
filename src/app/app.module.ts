import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { LayoutsModule } from "./layouts/layouts.module";
import { LoaderComponent } from "./loader/loader.component";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    LayoutsModule,
  ],
  declarations: [AppComponent, LoaderComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
