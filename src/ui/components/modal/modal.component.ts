import { NgIf } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";

@Component({
    selector: "modal-component",
    imports: [NgIf, ReactiveFormsModule],
    templateUrl: "./modal.component.html",
    styleUrl: "./modal.component.scss",
})
export class ModalComponent {
    @Output() modalClose = new EventEmitter<boolean>();

    @Output() modalFinished = new EventEmitter<any>();

    isModalOpen = false;
    paymentForm: FormGroup;
    formattedPhoneNumber: string = "";
    formattedCreditCard: string = "";

    constructor() {
        this.paymentForm = new FormGroup({
            fullName: new FormControl("", [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(255),
            ]),
            email: new FormControl("", [Validators.required, Validators.email]),
            phoneNumber: new FormControl("", [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(10),
            ]),
            creditCard: new FormControl("", [
                Validators.required,
                Validators.minLength(16),
                Validators.maxLength(16),
            ]),
        });
    }

    // Accessors for easier form control access
    get fullName() {
        return this.paymentForm.get("fullName");
    }

    get email() {
        return this.paymentForm.get("email");
    }

    get phoneNumber() {
        return this.paymentForm.get("phoneNumber");
    }

    get creditCard() {
        return this.paymentForm.get("creditCard");
    }

    formatPhoneNumber(event: Event): void {
        let input = (event.target as HTMLInputElement).value.replace(/\D/g, "");

        if (input.length > 3 && input.length <= 6) {
            this.formattedPhoneNumber =
                input.substring(0, 3) + "-" + input.substring(3);
        } else if (input.length > 6) {
            this.formattedPhoneNumber =
                input.substring(0, 3) +
                "-" +
                input.substring(3, 6) +
                "-" +
                input.substring(6, 10);
        } else {
            this.formattedPhoneNumber = input;
        }

        this.paymentForm.get("phoneNumber")?.setValue(input);
    }

    formatCreditCard(event: Event): void {
        let input = (event.target as HTMLInputElement).value.replace(/\D/g, "");
        let formatted = "";

        for (let i = 0; i < input.length; i += 4) {
            if (i + 4 <= input.length) {
                formatted += input.substring(i, i + 4) + "-";
            } else {
                formatted += input.substring(i, i + 4);
            }
        }

        if (formatted.endsWith("-")) {
            formatted = formatted.slice(0, -1);
        }

        this.formattedCreditCard = formatted;
        this.paymentForm.get("creditCard")?.setValue(input);
    }

    closeModal() {
        this.modalClose.emit(false);
    }

    submitForm() {
        if (this.paymentForm.valid) {
            this.modalFinished.emit(this.paymentForm.value);

            this.closeModal();
        }
    }
}
