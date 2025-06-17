package com.sleizware.infomarket.sellers;

import jakarta.persistence.Column;

public class LoginRequest {

    @Column(name = "seller_email")
    private String sellerEmail;
    private String password;

    public LoginRequest() {
    }

    public String getSeller_email() {
        return sellerEmail;
    }

    public void setSeller_email(String sellerEmail) {
        this.sellerEmail = sellerEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
