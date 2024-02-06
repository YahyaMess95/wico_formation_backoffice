import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { ActivatedRoute } from '@angular/router';

@NgModule({
  imports: [
    ServerModule,
    AppModule
    
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: ActivatedRoute, useValue: {} },
  ],
})
export class AppServerModule {}
