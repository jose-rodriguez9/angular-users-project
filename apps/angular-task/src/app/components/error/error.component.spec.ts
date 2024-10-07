import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';

describe('ErrorComponent', () => {

    let component: ErrorComponent;
    let fixture: ComponentFixture<ErrorComponent>;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [ErrorComponent, MatButtonModule],
        }).compileComponents();

        fixture = TestBed.createComponent(ErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

    it('should display the error message', () => {

        const errorMsg = fixture.debugElement.query(By.css('.error-child')).nativeElement;
        expect(errorMsg.textContent).toContain('Something went wrong');

    });

    it('should disable the retry button when isApiInFlight is true', () => {

        component.isApiInFlight = true;
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('button'));
        expect(button.nativeElement.disabled).toBeTruthy();

    });

    it('should enable the retry button when isApiInFlight is false', () => {

        component.isApiInFlight = false;
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('button'));
        expect(button.nativeElement.disabled).toBeFalsy();

    });

    it('should call buttonClicked when the retry button is clicked', () => {

        const buttonClickedSpy = jest.spyOn(component, 'buttonClicked');
        component.isApiInFlight = false;
        fixture.detectChanges();

        const button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();

        expect(buttonClickedSpy).toHaveBeenCalled();

    });

});
