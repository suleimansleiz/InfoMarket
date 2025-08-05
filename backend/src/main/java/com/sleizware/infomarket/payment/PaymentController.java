package com.sleizware.infomarket.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/infomarket/v1/payments")
public class PaymentController {

    @Autowired
    private ClickPesaService clickPesaService;

    @Autowired
    private PurchaseIntentRepository intentRepository;

    @GetMapping("/token")
    public String getToken() {
        return clickPesaService.generateToken();
    }

    @PostMapping("/preview-ussd")
    public String previewUssdPush(@RequestBody ClickPesaRequest request) {
        return clickPesaService.previewUssdPush(request);
    }

    @PostMapping("/initiate-ussd")
    public ResponseEntity<ClickPesaResponse> initiatePurchase(@RequestBody PurchaseIntent intent) {
        String orderRef = "IM" + UUID.randomUUID().toString().substring(0, 8);
        intent.setOrderReference(orderRef);
        intent.setCreatedAt(LocalDateTime.now());
        intent.setStatus("PENDING");

        intentRepository.save(intent);

        ClickPesaRequest request = new ClickPesaRequest();
        request.setAmount(intent.getItemPrice());
        request.setCurrency("TZS");
        request.setPhoneNumber(intent.getBuyerPhone());

        ClickPesaResponse response = clickPesaService.initiateUssdPushWithOrderRef(request, orderRef); // custom method

        return ResponseEntity.ok(response);
    }
}
