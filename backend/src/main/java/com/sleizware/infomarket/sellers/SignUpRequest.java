package com.sleizware.infomarket.sellers;

import jakarta.persistence.Column;

public class SignUpRequest {
    private String seller_name;

    @Column(name = "seller_email")
    private String sellerEmail;
    private String seller_phone;
    private String password;

    public SignUpRequest() {
    }

    public String getSeller_name() {
        return seller_name;
    }

    public void setSeller_name(String seller_name) {
        this.seller_name = seller_name;
    }

    public String getSellerEmail() {
        return sellerEmail;
    }

    public void setSeller_email(String seller_email) {
        this.sellerEmail = seller_email;
    }

    public String getSeller_phone() {
        return seller_phone;
    }

    public void setSeller_phone(String seller_phone) {
        this.seller_phone = seller_phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
