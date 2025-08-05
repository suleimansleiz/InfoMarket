package com.sleizware.infomarket.payment;

public class ClickPesaResponse {
    private String message;
    private String orderReference;

    public ClickPesaResponse(String message, String orderReference) {
        this.message = message;
        this.orderReference = orderReference;
    }

    public String getMessage() {
        return message;
    }

    public String getOrderReference() {
        return orderReference;
    }
}

