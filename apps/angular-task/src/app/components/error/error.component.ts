import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'crx-error',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './error.component.html',
    styleUrl: './error.component.scss',
})
export class ErrorComponent {

    @Input() isApiInFlight = false;
    @Output() emitButtonClick: EventEmitter<null> = new EventEmitter();

    buttonClicked(){
        this.emitButtonClick.emit();
    }

}
