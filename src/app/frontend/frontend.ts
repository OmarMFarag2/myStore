import { Component } from '@angular/core';
import { Navbar } from "./shared/navbar/navbar";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-frontend',
  imports: [RouterOutlet, Navbar],
  templateUrl: './frontend.html',
  styleUrl: './frontend.css',
})
export class Frontend {}
