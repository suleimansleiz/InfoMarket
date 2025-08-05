package com.sleizware.infomarket.payment;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;
import kong.unirest.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.*;

@Service
public class ClickPesaService {

    @Value("${clickpesa.client.id}")
    private String clientId;

    @Value("${clickpesa.api.key}")
    private String apiKey;

    @Value("${clickpesa.checksum.key}")
    private String checksumKey;

    private String accessToken;
    private Instant tokenGeneratedAt;

    public void ensureAccessToken() {
        if (accessToken == null || tokenGeneratedAt == null || Duration.between(tokenGeneratedAt, Instant.now()).toMinutes() >= 55) {
            generateToken();
        }
    }

    public String generateToken() {
        try {
            HttpResponse<String> response = Unirest.post("https://api.clickpesa.com/third-parties/generate-token")
                    .header("client-id", clientId)
                    .header("api-key", apiKey)
                    .asString();

            if (response.getStatus() == 200) {
                JSONObject json = new JSONObject(response.getBody());
                this.accessToken = json.getString("token");
                this.tokenGeneratedAt = Instant.now();
                return this.accessToken;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public String previewUssdPush(ClickPesaRequest request) {
        ensureAccessToken();

        String externalId = UUID.randomUUID().toString();
        String orderReference = "TX" + externalId.substring(0, 8);


        Map<String, String> payload = new HashMap<>();
        payload.put("amount", request.getAmount());
        payload.put("currency", "TZS");
        payload.put("orderReference", orderReference);

        String checksum = generateChecksum(payload);

        try {
            HttpResponse<String> response = Unirest.post("https://api.clickpesa.com/third-parties/payments/preview-ussd-push-request")
                    .header("Authorization", accessToken)
                    .header("Content-Type", "application/json")
                    .body(new JSONObject()
                            .put("amount", request.getAmount())
                            .put("currency", "TZS")
                            .put("orderReference", orderReference)
                            .put("checksum", checksum)
                            .toString())
                    .asString();

            return response.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error previewing USSD push";
        }
    }

    public ClickPesaResponse initiateUssdPushWithOrderRef(ClickPesaRequest request, String orderReference) {
        ensureAccessToken();

        Map<String, String> payload = new HashMap<>();
        payload.put("amount", request.getAmount());
        payload.put("currency", "TZS");
        payload.put("orderReference", orderReference);
        payload.put("phoneNumber", request.getPhoneNumber());

        String checksum = generateChecksum(payload);

        try {
            HttpResponse<String> response = Unirest.post("https://api.clickpesa.com/third-parties/payments/initiate-ussd-push-request")
                    .header("Authorization", accessToken)
                    .header("Content-Type", "application/json")
                    .body(new JSONObject()
                            .put("amount", request.getAmount())
                            .put("currency", "TZS")
                            .put("orderReference", orderReference)
                            .put("phoneNumber", request.getPhoneNumber())
                            .put("checksum", checksum)
                            .toString())
                    .asString();

            if (response.getStatus() == 200) {
                return new ClickPesaResponse("Payment initiated successfully", orderReference);
            } else {
                return new ClickPesaResponse("Failed to initiate payment", null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ClickPesaResponse("Error occurred while initiating payment", null);
        }
    }


    public String generateChecksum(Map<String, String> payload) {
        try {
            List<String> keys = new ArrayList<>(payload.keySet());
            Collections.sort(keys);

            StringBuilder payloadString = new StringBuilder();
            for (String key : keys) {
                payloadString.append(payload.get(key));
            }

            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(checksumKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256_HMAC.init(secret_key);

            byte[] hash = sha256_HMAC.doFinal(payloadString.toString().getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                hexString.append(String.format("%02x", b));
            }
            return hexString.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
