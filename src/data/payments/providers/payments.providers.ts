import { Provider } from "@angular/core";
import { PaymentsRepository } from "@/core/domain/payments/repositories/payments.repository";
import { PostPaymentsUseCase } from "@/core/domain/payments/usecases/postPayments.usecase";
import { PaymentsImplRepository } from "../repositories/payments.repository.impl";

export const paymentProviders: Provider[] = [
    { provide: PaymentsRepository, useClass: PaymentsImplRepository },
    { provide: PostPaymentsUseCase, useClass: PostPaymentsUseCase },
];
