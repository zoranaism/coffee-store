import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  variant = input<'primary' | 'secondary' | 'danger'>('primary');
  type = input<'button' | 'submit'>('button');

  clicked = output<void>();

  onClick(): void {
    this.clicked.emit();
  }
}