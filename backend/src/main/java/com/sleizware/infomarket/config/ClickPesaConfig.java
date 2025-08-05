package com.sleizware.infomarket.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ClickPesaConfig {

    @Value("${clickpesa.api.url}")
    public String apiUrl;

    @Value("${clickpesa.api.key}")
    public String apiKey;

    @Value("${clickpesa.client.id}")
    public String clientId;

    @Value("${clickpesa.auth.url}")
    public String authUrl;
}

