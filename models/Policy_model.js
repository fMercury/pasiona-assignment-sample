
class Policy {
    constructor(
        id,
        amountInsured,
        email,
        inceptionDate,
        installmentPayment,
        clientId
    ) {
        this.id = id;
        this.amountInsured = amountInsured;
        this.email = email;
        this.inceptionDate = inceptionDate;
        this.installmentPayment = installmentPayment;
        this.clientId = clientId;
    }

    toJSON() {
        return {
            id: this.id,
            amountInsured: this.amountInsured,
            email: this.email,
            inceptionDate: this.inceptionDate,
            installmentPayment: this.installmentPayment,
            clientId: this.clientId
        };
    }
}

export default Policy;
