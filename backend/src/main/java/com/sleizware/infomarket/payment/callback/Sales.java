package com.sleizware.infomarket.payment.callback;

import jakarta.persistence.*;

@Entity
@Table(name = "sales")
public class Sales {
    @Id
    @Column(name = "payment_id")
    private String paymentId;

    @Column(name = "item_name")
    private String itemName;

    private String amount;

    @Column(name = "created_at")
    private String createdAt;

    private String status;

    @Column(name = "user_phone")
    private String customerPhone;



    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }
}
