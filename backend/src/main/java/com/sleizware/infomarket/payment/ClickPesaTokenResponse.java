package com.sleizware.infomarket.payment;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ClickPesaTokenResponse {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("expires_in")
    private int expiresIn;

    public String getAccessToken() {
        return accessToken;
    }

    public int getExpiresIn() {
        return expiresIn;
    }
}